<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::with('translations')->latest()->get();
    }

    public function show(Article $article)
    {
        return $article->load('translations');
    }

    public function store(Request $request)
    {
        return $this->save(new Article(), $request);
    }

    public function update(Request $request, Article $article)
    {
        return $this->save($article, $request);
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['ok' => true]);
    }

    private function save(Article $article, Request $request)
    {
        $data = $request->validate([
            'image'        => 'nullable|string',
            'status'       => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'author'       => 'nullable|string|max:120',
            'translations' => 'required|array|min:1',
            'translations.*.locale'          => 'required|string|max:5',
            'translations.*.title'           => 'required|string|max:190',
            'translations.*.slug'            => 'required|string|max:190',
            'translations.*.excerpt'         => 'nullable|string|max:500',
            'translations.*.body'            => 'nullable|string',
            'translations.*.seo_title'       => 'nullable|string|max:190',
            'translations.*.seo_description' => 'nullable|string|max:320',
        ]);

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }
        $article->fill(collect($data)->except('translations')->toArray())->save();
        foreach ($data['translations'] as $tr) {
            $article->translations()->updateOrCreate(['locale' => $tr['locale']], $tr);
        }
        return $article->load('translations');
    }
}
