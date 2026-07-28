<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SeoMeta;
use Illuminate\Http\Request;

class SeoMetaController extends Controller
{
    public function index()
    {
        return SeoMeta::orderBy('route')->get();
    }

    public function update(Request $request, SeoMeta $seoMeta)
    {
        $seoMeta->update($request->validate([
            'title'       => 'nullable|string|max:190',
            'description' => 'nullable|string|max:320',
        ]));
        return $seoMeta;
    }
}
