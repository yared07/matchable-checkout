<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Booking extends Model
{
    protected $fillable = [
        'booking_number',
        'customer_name',
        'customer_email',
        'customer_phone',
        'selected_sessions',
        'total_amount',
        'status',
        'notes',
        'terms_accepted'
    ];

    protected $casts = [
        'selected_sessions' => 'array',
        'total_amount' => 'decimal:2',
        'terms_accepted' => 'boolean'
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($booking) {
            if (empty($booking->booking_number)) {
                $booking->booking_number = 'BK-' . strtoupper(Str::random(8));
            }
        });
    }

    public function sessions(): BelongsToMany
    {
        return $this->belongsToMany(Session::class)
            ->withPivot('price_paid')
            ->withTimestamps();
    }
}
