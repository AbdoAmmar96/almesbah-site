<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
    protected $fillable = ['image', 'status', 'published_at', 'author'];
    protected $casts = ['published_at' => 'datetime'];

    public function translations(): HasMany
    {
        return $this->hasMany(ArticleTranslation::class);
    }

    public function tr(?string $locale = null): ?ArticleTranslation
    {
        $locale ??= app()->getLocale();
        return $this->translations->firstWhere('locale', $locale)
            ?? $this->translations->firstWhere('locale', config('localization.default'));
    }

    public function scopePublished($q)
    {
        return $q->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at');
    }

    public static function findBySlug(string $slug): ?self
    {
        $tr = ArticleTranslation::where('slug', $slug)->first();
        return $tr?->article()->with('translations')->first();
    }
}
