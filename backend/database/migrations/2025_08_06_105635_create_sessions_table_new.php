<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trainer_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['padel', 'fitness', 'tennis']);
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('duration_minutes');
            $table->decimal('price', 8, 2);
            $table->integer('max_participants')->default(1);
            $table->integer('current_participants')->default(0);
            $table->enum('status', ['available', 'booked', 'cancelled'])->default('available');
            $table->text('description')->nullable();
            $table->timestamps();
            
            $table->index(['trainer_id', 'start_time']);
            $table->index(['type', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
