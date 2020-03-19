<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Accounts extends Model
{
    protected $fillable = [
        'uname', 'category', 'upass', 'unumber', 'country', 'lang', 'starred', '_ref', 'status'
    ];

    protected $casts = [
        'starred' => 'boolean',
        'read' => 'boolean'
    ];
}
