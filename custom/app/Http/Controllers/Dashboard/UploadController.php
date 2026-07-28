<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['file' => 'required|image|max:8192']);
        $path = $request->file('file')->store('uploads', 'public');
        return response()->json(['path' => '/storage/' . $path]);
    }
}
