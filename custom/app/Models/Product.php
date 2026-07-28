<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = ['image', 'sort', 'is_published', 'export_markets'];
    protected $casts = ['is_published' => 'bool', 'export_markets' => 'array'];

    public function translations(): HasMany
    {
        return $this->hasMany(ProductTranslation::class);
    }

    public function tr(?string $locale = null): ?ProductTranslation
    {
        $locale ??= app()->getLocale();
        return $this->translations->firstWhere('locale', $locale)
            ?? $this->translations->firstWhere('locale', config('localization.default'));
    }

    public function scopePublished($q)
    {
        return $q->where('is_published', true)->orderBy('sort');
    }

    public static function findBySlug(string $slug): ?self
    {
        $tr = ProductTranslation::where('slug', $slug)->first();
        return $tr?->product()->with('translations')->first();
    }
}
