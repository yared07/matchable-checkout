<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Session;
use App\Models\Trainer;
use Carbon\Carbon;

class SessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainers = Trainer::all();
        
        // Generate sessions for the next 7 days
        for ($day = 0; $day < 7; $day++) {
            $date = Carbon::now()->addDays($day);
            
            foreach ($trainers as $trainer) {
                // Create 2-3 sessions per trainer per day
                $sessionCount = rand(2, 3);
                
                for ($i = 0; $i < $sessionCount; $i++) {
                    $startHour = 9 + ($i * 3); // 9 AM, 12 PM, 3 PM
                    $startTime = $date->copy()->setTime($startHour, 0, 0);
                    $endTime = $startTime->copy()->addHours(1);
                    
                    // Randomly select a session type from trainer's specializations
                    $type = $trainer->specializations[array_rand($trainer->specializations)];
                    
                    // Price varies by type and trainer
                    $basePrice = match($type) {
                        'padel' => 60,
                        'tennis' => 80,
                        'fitness' => 50,
                        default => 60
                    };
                    
                    // Add some price variation
                    $price = $basePrice + rand(-10, 20);
                    
                    Session::create([
                        'trainer_id' => $trainer->id,
                        'type' => $type,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'duration_minutes' => 60,
                        'price' => $price,
                        'max_participants' => 1,
                        'current_participants' => 0,
                        'status' => 'available',
                        'description' => "Professional {$type} training session with {$trainer->name}"
                    ]);
                }
            }
        }
    }
}
