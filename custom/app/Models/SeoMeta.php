<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $fillable = ['route', 'locale', 'title', 'description'];
    public $timestamps = false;

    public static function for(string $route, array $fallback = []): array
    {
        $m = static::where('route', $route)->where('locale', app()->getLocale())->first();
        return [
            'title'       => $m->title ?? $fallback['title'] ?? config('app.name'),
            'description' => $m->description ?? $fallback['description'] ?? '',
        ];
    }
}
