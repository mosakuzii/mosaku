<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notebook extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'theme_id',
        'title',
        'starred',
    ];

    /**
     * The roles that belong to the Notebook
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'notebook_tag', 'notebook_id', 'tag_id');
    }

    /**
     * Get the user that owns the Notebook
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function memos(): HasMany
    {
        return $this->hasMany(Memo::class);
    }
}
