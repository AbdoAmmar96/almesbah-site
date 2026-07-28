<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'locale'   => fn () => app()->getLocale(),
            'locales'  => config('localization.supported'),
            'rtl'      => in_array(app()->getLocale(), config('localization.rtl')),
            'settings' => fn () => Setting::asArray(),
            't'        => fn () => json_decode(
                file_get_contents(lang_path(app()->getLocale() . '.json')) ?: '{}', true
            ),
            'flash'    => fn () => ['success' => session('success')],
        ]);
    }
}
