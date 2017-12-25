<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Password extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'password' => $this->password,
            'comment' => $this->comment,
            'icon' => $this->icon,
        ];
    }
}
