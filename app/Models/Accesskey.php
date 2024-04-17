<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accesskey extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'registration_status',
        'access_key',
        'expiration_date',
    ];
}
