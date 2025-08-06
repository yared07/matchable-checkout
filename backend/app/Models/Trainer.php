<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trainer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'specializations',
        'bio',
        'is_active'
    ];

    protected $casts = [
        'specializations' => 'array',
        'is_active' => 'boolean'
    ];

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }
}
