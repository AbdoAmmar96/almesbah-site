<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->route('locale', config('localization.default'));
        abort_unless(in_array($locale, config('localization.supported')), 404);
        app()->setLocale($locale);
        return $next($request);
    }
}
