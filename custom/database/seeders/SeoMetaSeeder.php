<?php

namespace Database\Seeders;

use App\Models\SeoMeta;
use Illuminate\Database\Seeder;

class SeoMetaSeeder extends Seeder
{
    public function run(): void
    {
        $en = [
            'home' => [
                'Egyptian Flax Fiber Supplier & Exporter | ALMESBAH',
                'ALMESBAH mills flax in Egypt\'s Nile Delta and ships scutched flax, hackled flax, tow, and twines to 10 countries. ISO 9001:2015 certified. Request a quote.',
            ],
            'about' => [
                'About ALMESBAH — Flax Mill in Egypt, Office in Guangzhou',
                'One of the Middle East\'s oldest and largest flax producers. Mill in Shubrameles, Egypt; offices in Guangzhou & Hebei, China; customers across Europe and Asia.',
            ],
            'products' => [
                'Flax Fiber Products — Scutched, Hackled, Tow, Twines | ALMESBAH',
                'Eight flax product lines from one Egyptian mill: cottonised flax, scutched flax (Grade A/B), hackled flax, dolls, Arrous tow, spools, twines, and plumbing fiber.',
            ],
            'industries' => [
                'Industries We Supply — Spinning, Paper, Insulation, Plumbing',
                'Where Egyptian flax fiber ends up: cotton-system spinning mills, fine linen producers, specialty paper, natural insulation, and plumbing trade suppliers.',
            ],
            'export' => [
                'How We Export — Packing, Bales, Incoterms | ALMESBAH',
                'Container-ready bales (200–250 kg), jute-wrapped dolls, flexible put-ups, and shipping terms that work for importers. See how an ALMESBAH order runs.',
            ],
            'gallery' => [
                'Gallery — Inside Our Flax Mill | ALMESBAH',
                'Photos from the ALMESBAH mill in Shubrameles: scutching, hackling, baling, and shipments on their way to Europe and Asia.',
            ],
            'blog' => [
                'Flax Fiber Knowledge Base | ALMESBAH Blog',
                'Plain-language guides for flax buyers: grades, processing stages, blending ratios, import logistics, and market insight from an Egyptian mill.',
            ],
            'certifications' => [
                'Certifications — ISO 9001:2015 | ALMESBAH',
                'ALMESBAH is ISO 9001:2015 certified by OSS Middle East, covering quality management across our import and export operations.',
            ],
            'contact' => [
                'Contact ALMESBAH — Request a Flax Fiber Quote',
                'Tell us the fiber, quantity, and destination. Our team in Egypt and Guangzhou replies with specs, packing options, and a firm offer.',
            ],
        ];

        foreach ($en as $route => [$title, $description]) {
            SeoMeta::updateOrCreate(
                ['route' => $route, 'locale' => 'en'],
                ['title' => $title, 'description' => $description]
            );
        }
    }
}
