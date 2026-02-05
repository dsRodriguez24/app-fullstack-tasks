<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'task';
    protected $fillable = [
        'title',
        'description',
        'status',
        'completion_at',
    ];

    public function user()
    {
        // Una tarea PERTENECE A un usuario
        return $this->belongsTo(User::class);
    }
}
