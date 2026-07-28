<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $t) {
            $t->id();
            $t->string('key')->unique();
            $t->text('value')->nullable();
        });

        Schema::create('products', function (Blueprint $t) {
            $t->id();
            $t->string('image')->nullable();
            $t->unsignedSmallInteger('sort')->default(0);
            $t->boolean('is_published')->default(true);
            $t->json('export_markets')->nullable();
            $t->timestamps();
        });

        Schema::create('product_translations', function (Blueprint $t) {
            $t->id();
            $t->foreignId('product_id')->constrained()->cascadeOnDelete();
            $t->string('locale', 5)->index();
            $t->string('name');
            $t->string('slug');
            $t->string('summary', 500)->nullable();
            $t->longText('description')->nullable();
            $t->json('specs')->nullable();   // [{label, value}]
            $t->json('uses')->nullable();    // ["Textile spinning", ...]
            $t->string('seo_title')->nullable();
            $t->string('seo_description', 320)->nullable();
            $t->unique(['locale', 'slug']);
            $t->unique(['product_id', 'locale']);
        });

        Schema::create('articles', function (Blueprint $t) {
            $t->id();
            $t->string('image')->nullable();
            $t->enum('status', ['draft', 'published'])->default('draft');
            $t->timestamp('published_at')->nullable();
            $t->string('author')->default('ALMESBAH Editorial');
            $t->timestamps();
        });

        Schema::create('article_translations', function (Blueprint $t) {
            $t->id();
            $t->foreignId('article_id')->constrained()->cascadeOnDelete();
            $t->string('locale', 5)->index();
            $t->string('title');
            $t->string('slug');
            $t->string('excerpt', 500)->nullable();
            $t->longText('body')->nullable(); // Markdown
            $t->string('seo_title')->nullable();
            $t->string('seo_description', 320)->nullable();
            $t->unique(['locale', 'slug']);
            $t->unique(['article_id', 'locale']);
        });

        Schema::create('inquiries', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('company')->nullable();
            $t->string('email');
            $t->string('phone')->nullable();
            $t->string('country')->nullable();
            $t->string('product_interest')->nullable();
            $t->text('message');
            $t->enum('status', ['new', 'replied', 'closed'])->default('new');
            $t->string('locale', 5)->default('en');
            $t->timestamps();
        });

        Schema::create('gallery_items', function (Blueprint $t) {
            $t->id();
            $t->string('image');
            $t->string('caption')->nullable();
            $t->string('album')->default('factory');
            $t->unsignedSmallInteger('sort')->default(0);
            $t->timestamps();
        });

        Schema::create('seo_metas', function (Blueprint $t) {
            $t->id();
            $t->string('route');           // home, about, products, ...
            $t->string('locale', 5);
            $t->string('title')->nullable();
            $t->string('description', 320)->nullable();
            $t->unique(['route', 'locale']);
        });
    }

    public function down(): void
    {
        foreach (['seo_metas','gallery_items','inquiries','article_translations','articles',
                  'product_translations','products','settings'] as $tbl) {
            Schema::dropIfExists($tbl);
        }
    }
};
