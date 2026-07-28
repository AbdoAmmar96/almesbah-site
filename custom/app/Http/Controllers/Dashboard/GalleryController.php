<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return GalleryItem::orderBy('sort')->get();
    }

    public function store(Request $request)
    {
        return GalleryItem::create($request->validate([
            'image'   => 'required|string',
            'caption' => 'nullable|string|max:190',
            'album'   => 'nullable|string|max:60',
            'sort'    => 'integer|min:0',
        ]));
    }

    public function destroy(GalleryItem $gallery)
    {
        $gallery->delete();
        return response()->json(['ok' => true]);
    }
}
