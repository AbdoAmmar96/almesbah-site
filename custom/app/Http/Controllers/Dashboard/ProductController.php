<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('translations')->orderBy('sort')->get();
    }

    public function show(Product $product)
    {
        return $product->load('translations');
    }

    public function store(Request $request)
    {
        return $this->save(new Product(), $request);
    }

    public function update(Request $request, Product $product)
    {
        return $this->save($product, $request);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['ok' => true]);
    }

    private function save(Product $product, Request $request)
    {
        $data = $request->validate([
            'image'          => 'nullable|string',
            'sort'           => 'integer|min:0',
            'is_published'   => 'boolean',
            'export_markets' => 'nullable|array',
            'translations'   => 'required|array|min:1',
            'translations.*.locale'          => 'required|string|max:5',
            'translations.*.name'            => 'required|string|max:190',
            'translations.*.slug'            => 'required|string|max:190',
            'translations.*.summary'         => 'nullable|string|max:500',
            'translations.*.description'     => 'nullable|string',
            'translations.*.specs'           => 'nullable|array',
            'translations.*.uses'            => 'nullable|array',
            'translations.*.seo_title'       => 'nullable|string|max:190',
            'translations.*.seo_description' => 'nullable|string|max:320',
        ]);

        $product->fill(collect($data)->except('translations')->toArray())->save();
        foreach ($data['translations'] as $tr) {
            $product->translations()->updateOrCreate(['locale' => $tr['locale']], $tr);
        }
        return $product->load('translations');
    }
}
