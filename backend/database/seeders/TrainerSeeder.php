<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trainer;

class TrainerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainers = [
            [
                'name' => 'Maria Rodriguez',
                'email' => 'maria.rodriguez@matchable.com',
                'phone' => '+1-555-0101',
                'specializations' => ['padel', 'tennis'],
                'bio' => 'Professional padel and tennis coach with 8 years of experience. Former national champion.',
                'is_active' => true
            ],
            [
                'name' => 'John Smith',
                'email' => 'john.smith@matchable.com',
                'phone' => '+1-555-0102',
                'specializations' => ['fitness', 'tennis'],
                'bio' => 'Certified personal trainer and tennis instructor. Specializes in strength training and technique.',
                'is_active' => true
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.johnson@matchable.com',
                'phone' => '+1-555-0103',
                'specializations' => ['padel', 'fitness'],
                'bio' => 'Multi-sport coach with expertise in padel and functional fitness training.',
                'is_active' => true
            ],
            [
                'name' => 'Carlos Martinez',
                'email' => 'carlos.martinez@matchable.com',
                'phone' => '+1-555-0104',
                'specializations' => ['tennis'],
                'bio' => 'Former ATP player with 15 years of coaching experience. Specializes in advanced techniques.',
                'is_active' => true
            ],
            [
                'name' => 'Emma Wilson',
                'email' => 'emma.wilson@matchable.com',
                'phone' => '+1-555-0105',
                'specializations' => ['fitness'],
                'bio' => 'Certified fitness trainer with focus on HIIT and strength training.',
                'is_active' => true
            ]
        ];

        foreach ($trainers as $trainer) {
            Trainer::create($trainer);
        }
    }
}
