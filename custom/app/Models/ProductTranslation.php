<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductTranslation extends Model
{
    protected $fillable = [
        'product_id', 'locale', 'name', 'slug', 'summary', 'description',
        'specs', 'uses', 'seo_title', 'seo_description',
    ];
    protected $casts = ['specs' => 'array', 'uses' => 'array'];
    public $timestamps = false;

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
