<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Inquiry;
use App\Models\Product;

class StatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'products'      => Product::count(),
            'articles'      => Article::where('status', 'published')->count(),
            'drafts'        => Article::where('status', 'draft')->count(),
            'inquiries_new' => Inquiry::where('status', 'new')->count(),
            'inquiries'     => Inquiry::count(),
            'latest'        => Inquiry::latest()->take(6)
                ->get(['id', 'name', 'company', 'country', 'product_interest', 'status', 'created_at']),
            'by_product'    => Inquiry::selectRaw('product_interest, count(*) as c')
                ->whereNotNull('product_interest')->groupBy('product_interest')
                ->orderByDesc('c')->take(8)->get(),
        ]);
    }
}
