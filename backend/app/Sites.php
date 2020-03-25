<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sites extends Model
{
    protected $fillable = [
        'url', 'category', 'status'
    ];

    protected $casts = [
        /* 'starred' => 'boolean',
        'read' => 'boolean' */
    ];
}
