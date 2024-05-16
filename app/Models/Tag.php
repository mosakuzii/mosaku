<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tag_name',
        'tag_color',
    ];
    /**
     * The roles that belong to the Tag
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function memos(): BelongsToMany
    {
        return $this->belongsToMany(Memo::class, 'memo_tag', 'memo_id', 'tag_id');
    }
}
