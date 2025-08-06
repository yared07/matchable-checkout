<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Session extends Model
{
    protected $fillable = [
        'trainer_id',
        'type',
        'start_time',
        'end_time',
        'duration_minutes',
        'price',
        'max_participants',
        'current_participants',
        'status',
        'description'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'price' => 'decimal:2'
    ];

    public function trainer(): BelongsTo
    {
        return $this->belongsTo(Trainer::class);
    }

    public function bookings(): BelongsToMany
    {
        return $this->belongsToMany(Booking::class)
            ->withPivot('price_paid')
            ->withTimestamps();
    }

    public function isAvailable(): bool
    {
        return $this->status === 'available' && 
               $this->current_participants < $this->max_participants;
    }
}
