<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'name', 'company', 'email', 'phone', 'country', 'product_interest',
        'message', 'status', 'locale',
    ];
}
