<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\GalleryItem;
use App\Models\Product;
use App\Models\SeoMeta;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function home()
    {
        return Inertia::render('Site/Home', [
            'seo'      => SeoMeta::for('home'),
            'products' => $this->productCards(),
            'articles' => $this->articleCards(3),
        ]);
    }

    public function about()
    {
        return Inertia::render('Site/About', ['seo' => SeoMeta::for('about')]);
    }

    public function products()
    {
        return Inertia::render('Site/Products', [
            'seo'      => SeoMeta::for('products'),
            'products' => $this->productCards(),
        ]);
    }

    public function product(string $locale, string $slug)
    {
        $product = Product::findBySlug($slug);
        abort_unless($product && $product->is_published, 404);
        $tr = $product->tr();

        return Inertia::render('Site/ProductShow', [
            'seo' => [
                'title'       => $tr->seo_title ?: $tr->name . ' — ALMESBAH',
                'description' => $tr->seo_description ?: $tr->summary,
            ],
            'product' => [
                'name'           => $tr->name,
                'slug'           => $tr->slug,
                'summary'        => $tr->summary,
                'description'    => $tr->description,
                'specs'          => $tr->specs ?? [],
                'uses'           => $tr->uses ?? [],
                'image'          => $product->image,
                'export_markets' => $product->export_markets ?? [],
            ],
            'related' => $this->productCards(3, $product->id),
        ]);
    }

    public function industries()
    {
        return Inertia::render('Site/Industries', ['seo' => SeoMeta::for('industries')]);
    }

    public function export()
    {
        return Inertia::render('Site/Export', ['seo' => SeoMeta::for('export')]);
    }

    public function gallery()
    {
        return Inertia::render('Site/Gallery', [
            'seo'   => SeoMeta::for('gallery'),
            'items' => GalleryItem::orderBy('sort')->get(['image', 'caption', 'album']),
        ]);
    }

    public function blog()
    {
        return Inertia::render('Site/Blog', [
            'seo'      => SeoMeta::for('blog'),
            'articles' => $this->articleCards(24),
        ]);
    }

    public function article(string $locale, string $slug)
    {
        $article = Article::findBySlug($slug);
        abort_unless($article && $article->status === 'published', 404);
        $tr = $article->tr();

        return Inertia::render('Site/BlogShow', [
            'seo' => [
                'title'       => $tr->seo_title ?: $tr->title . ' — ALMESBAH Blog',
                'description' => $tr->seo_description ?: $tr->excerpt,
            ],
            'article' => [
                'title'        => $tr->title,
                'excerpt'      => $tr->excerpt,
                'body'         => $tr->body,
                'image'        => $article->image,
                'author'       => $article->author,
                'published_at' => $article->published_at?->format('M j, Y'),
            ],
            'more' => $this->articleCards(3, $article->id),
        ]);
    }

    public function certifications()
    {
        return Inertia::render('Site/Certifications', ['seo' => SeoMeta::for('certifications')]);
    }

    public function contact()
    {
        return Inertia::render('Site/Contact', [
            'seo'      => SeoMeta::for('contact'),
            'products' => Product::published()->with('translations')->get()
                ->map(fn ($p) => $p->tr()->name)->values(),
        ]);
    }

    private function productCards(int $limit = 20, ?int $except = null)
    {
        return Product::published()->with('translations')
            ->when($except, fn ($q) => $q->where('id', '!=', $except))
            ->take($limit)->get()
            ->map(fn ($p) => [
                'name'    => $p->tr()->name,
                'slug'    => $p->tr()->slug,
                'summary' => $p->tr()->summary,
                'image'   => $p->image,
            ]);
    }

    private function articleCards(int $limit, ?int $except = null)
    {
        return Article::published()->with('translations')
            ->when($except, fn ($q) => $q->where('id', '!=', $except))
            ->take($limit)->get()
            ->map(fn ($a) => [
                'title'        => $a->tr()->title,
                'slug'         => $a->tr()->slug,
                'excerpt'      => $a->tr()->excerpt,
                'image'        => $a->image,
                'published_at' => $a->published_at?->format('M j, Y'),
            ]);
    }
}
