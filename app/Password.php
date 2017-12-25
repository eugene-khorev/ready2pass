<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Password extends Model
{
    protected $fillable = ['user_id', 'name', 'password', 'comment', 'icon'];
    protected $hidden = ['password'];
    
    public function scopeOwn($query)
    {
        return $query
                ->where('user_id', \Auth::id())
                ->orderBy('name');
    }
}
