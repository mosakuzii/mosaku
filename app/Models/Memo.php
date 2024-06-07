<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Memo extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'notebook_id',
        'title',
        'content',
        'starred',
    ];

    /**
     * The roles that belong to the Memo
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'memo_tag', 'memo_id', 'tag_id');
    }

    /**
     * Get the user that owns the Memo
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function notebook(): BelongsTo
    {
        return $this->belongsTo(Notebook::class);
    }
}
