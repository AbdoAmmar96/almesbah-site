<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

/**
 * All copy below is the OLD site's content professionally rewritten —
 * same facts, same meaning, export-grade English.
 */
class ProductSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->data() as $i => $row) {
            $product = Product::updateOrCreate(
                ['id' => $i + 1],
                [
                    'image'          => $row['image'],
                    'sort'           => $i,
                    'is_published'   => true,
                    'export_markets' => $row['markets'],
                ]
            );
            $product->translations()->updateOrCreate(['locale' => 'en'], $row['en']);
        }
    }

    private function data(): array
    {
        return [
            [
                'image'   => '/images/products/cottonised-flax.jpg',
                'markets' => ['India', 'Pakistan', 'Worldwide'],
                'en' => [
                    'name'    => 'Cottonised Flax',
                    'slug'    => 'cottonised-flax',
                    'summary' => 'Short-cut flax refined to run on cotton spinning systems — blend it with cotton, polyester, or viscose without touching your line.',
                    'description' => <<<'MD'
Cottonised flax is flax fiber cut and processed to behave like cotton on standard short-staple spinning equipment. We cut to your specification — anywhere between **38 and 51 mm** — so the fiber drops straight into your existing process.

We produce cottonised flax from **all types of long flax fiber, short flax fiber, machine tow, and bleached flax** — so the input can be matched to your target quality and price point.

Mills typically blend **10% to over 50%** flax with cotton, polyester, or viscose. The right ratio depends on the fineness of the fiber and the thickness of the yarn you are targeting; the resulting yarns run from **Ne 8 up to Ne 55**.

The same fiber also performs outside textiles — in high-grade specialty paper and in natural insulation.
MD,
                    'specs' => [
                        ['label' => 'Raw material',      'value' => 'Long fiber · Short fiber · Machine tow · Bleached flax'],
                        ['label' => 'Cut length',        'value' => '38 – 51 mm, to customer requirement'],
                        ['label' => 'Blend ratio',       'value' => '10% – 50%+ with other fibers'],
                        ['label' => 'Compatible fibers', 'value' => 'Cotton · Polyester · Viscose'],
                        ['label' => 'Yarn range',        'value' => 'Ne 8 – Ne 55'],
                        ['label' => 'Packing',           'value' => 'Pressed bales, 200 kg'],
                    ],
                    'uses' => ['Cotton-system spinning', 'Blended yarns', 'Specialty paper', 'Natural insulation'],
                    'seo_title'       => 'Cottonised Flax for Cotton-System Spinning | ALMESBAH Egypt',
                    'seo_description' => 'Cottonised flax cut to 38–51 mm for blending with cotton, polyester, or viscose at 10–50%+. Yarns Ne 8–55. Pressed 200 kg bales from our Egyptian mill.',
                ],
            ],
            [
                'image'   => '/images/products/scutched-flax.jpg',
                'markets' => ['Belgium', 'France', 'China', 'India', 'Pakistan'],
                'en' => [
                    'name'    => 'Scutched Flax',
                    'slug'    => 'scutched-flax',
                    'summary' => 'Long line fiber straight off the scutching turbine — graded A, B, and C to match your spec and your budget.',
                    'description' => <<<'MD'
Scutching separates the long line fiber from the flax straw. We grade the output the way European buyers expect:

- **Grade A** — clean, well-dressed fiber, free of shives.
- **Grade B** — carries more shive content at a lower price point, for applications where absolute cleanliness matters less.
- **Grade C** — the entry grade, with the highest shive content and the lowest price, for cost-driven applications and processes with their own cleaning stage.

Bales are pressed at roughly **250 kg** for efficient container loading. Our scutched flax ships regularly to spinners and processors in **Belgium, France, and China**.
MD,
                    'specs' => [
                        ['label' => 'Grades',       'value' => 'A (clean, shive-free) · B (economical) · C (entry)'],
                        ['label' => 'Packing',      'value' => 'Pressed bales, ≈ 250 kg'],
                        ['label' => 'Destinations', 'value' => 'Belgium · France · China · India · Pakistan'],
                    ],
                    'uses' => ['Wet spinning', 'Hackling feedstock', 'Technical textiles'],
                    'seo_title'       => 'Scutched Flax Grades A, B & C — Egyptian Supplier | ALMESBAH',
                    'seo_description' => 'Scutched flax in Grades A, B and C — 250 kg pressed bales exported to Belgium, France, China, India and Pakistan from our Nile Delta mill.',
                ],
            ],
            [
                'image'   => '/images/products/hackled-flax.jpg',
                'markets' => ['Belgium', 'France', 'Russia', 'Romania', 'India', 'Pakistan'],
                'en' => [
                    'name'    => 'Hackled Flax',
                    'slug'    => 'hackled-flax',
                    'summary' => 'Combed line flax with short fiber and residual shives removed — the stage right before fine linen yarn.',
                    'description' => <<<'MD'
Hackling combs scutched flax over beds of fine pins, stripping out short fibers and remaining shives until only parallel, uniform line fiber is left. It is the raw material for fine linen spinning.

We supply **hackled flax** to mills in Belgium, France, and Russia, and **hackled line sliver** to Belgium and Romania. We also have a good and long-term market in **India and Pakistan** for long flax fiber, short flax fiber, cottonised flax, and flax sliver.
MD,
                    'specs' => [
                        ['label' => 'Process',        'value' => 'Combed (hackled) line fiber'],
                        ['label' => 'Also available', 'value' => 'Hackled line sliver'],
                        ['label' => 'Destinations',   'value' => 'Belgium · France · Russia · Romania · India · Pakistan'],
                    ],
                    'uses' => ['Fine linen yarn', 'Wet spinning', 'Line sliver production'],
                    'seo_title'       => 'Hackled Flax & Line Sliver Supplier | ALMESBAH Egypt',
                    'seo_description' => 'Uniform hackled line flax and line sliver for fine linen spinning, exported to Belgium, France, Russia, and Romania.',
                ],
            ],
            [
                'image'   => '/images/products/hackled-flax-in-dolls.jpg',
                'markets' => ['Belgium', 'Turkey', 'Poland', 'Spain'],
                'en' => [
                    'name'    => 'Hackled Flax in Dolls',
                    'slug'    => 'hackled-flax-in-dolls',
                    'summary' => 'Hand-twisted hackled flax in dolls — the traditional plumbing fiber, in three put-ups from 50 g to 1 kg.',
                    'description' => <<<'MD'
Hackled flax twisted into "dolls" is the classic sealing fiber for threaded plumbing joints. Shape and weight vary by type, and each bale holds **two 25 kg units — 50 kg total — wrapped in jute**.

We produce three put-ups to match how your market sells:

- **Jokia** — 50, 100, 200, 250, 500, and 1000 g
- **2-head dolls** — 200 – 250 g
- **4-head dolls** — 200 – 250 g
MD,
                    'specs' => [
                        ['label' => 'Types',              'value' => 'Jokia · 2-head · 4-head'],
                        ['label' => 'Jokia weights',      'value' => '50 – 1000 g'],
                        ['label' => '2-head / 4-head',    'value' => '200 – 250 g'],
                        ['label' => 'Bale',               'value' => '2 × 25 kg = 50 kg, jute-wrapped'],
                        ['label' => 'Destinations',       'value' => 'Belgium · Turkey · Poland · Spain'],
                    ],
                    'uses' => ['Plumbing joint sealing', 'Hardware retail packs'],
                    'seo_title'       => 'Hackled Flax in Dolls (Jokia, 2-Head, 4-Head) | ALMESBAH',
                    'seo_description' => 'Plumbing flax dolls in Jokia 50–1000 g and 2/4-head 200–250 g put-ups. Jute-wrapped 50 kg bales, exported to Belgium, Turkey, Poland, and Spain.',
                ],
            ],
            [
                'image'   => '/images/products/rescutched-tow-arrous.jpg',
                'markets' => ['China', 'Belgium', 'India', 'Pakistan'],
                'en' => [
                    'name'    => 'Rescutched Tow (Arrous)',
                    'slug'    => 'rescutched-tow-arrous',
                    'summary' => 'Double-cleaned scutching tow in 2- to 6-drum qualities — with optional manual cleaning and UV inspection for contamination-free lots.',
                    'description' => <<<'MD'
Rescutched tow — known in the trade as **Arrous** — is short flax fiber recovered from scutching and passed through a second cleaning stage to bring shive content down. The result is a consistent, economical fiber for coarser yarns, felts, and technical applications.

Arrous is available in **2, 3, 4, 5, and 6 drums**. On request, **manual cleaning and UV inspection** bring the fiber to the highest quality level and ensure the material is completely free from contamination.

Our Arrous ships primarily to **China**, alongside machine tow supplied to **Belgium** — and we hold long-term short-fiber markets in **India and Pakistan**.
MD,
                    'specs' => [
                        ['label' => 'Trade name',       'value' => 'Arrous'],
                        ['label' => 'Process',          'value' => 'Double-cleaned scutching tow'],
                        ['label' => 'Drum qualities',   'value' => '2 · 3 · 4 · 5 · 6 drums'],
                        ['label' => 'Quality control',  'value' => 'Manual cleaning · UV inspection — contamination-free'],
                        ['label' => 'Main destinations','value' => 'China · India · Pakistan (machine tow → Belgium)'],
                    ],
                    'uses' => ['Coarse yarns', 'Felts & nonwovens', 'Technical fiber'],
                    'seo_title'       => 'Rescutched Flax Tow (Arrous) Exporter | ALMESBAH Egypt',
                    'seo_description' => 'Rescutched flax tow (Arrous) in 2–6 drum qualities with optional manual cleaning and UV inspection — shipped from Egypt to China, India, Pakistan and Belgium.',
                ],
            ],
            [
                'image'   => '/images/products/flax-spools-on-bobbin.jpg',
                'markets' => ['Worldwide'],
                'en' => [
                    'name'    => 'Flax Spools on Bobbin',
                    'slug'    => 'flax-spools-on-bobbin',
                    'summary' => 'Flax yarn wound and ready on bobbins — natural or dyed, polished or matte, bleached on request.',
                    'description' => <<<'MD'
Flax yarn delivered ready on bobbins, in the finish your product needs: **natural color or dyed shades**, **polished or unpolished** surface, and **bleached** options for lighter applications.
MD,
                    'specs' => [
                        ['label' => 'Color',   'value' => 'Natural · Dyed'],
                        ['label' => 'Finish',  'value' => 'Polished · Unpolished'],
                        ['label' => 'Bleached','value' => 'Available'],
                        ['label' => 'Put-up',  'value' => 'Wound on bobbins'],
                    ],
                    'uses' => ['Crafts & décor', 'Binding', 'Light cordage'],
                    'seo_title'       => 'Flax Yarn Spools on Bobbin | ALMESBAH Egypt',
                    'seo_description' => 'Flax yarn on bobbins in natural or dyed colors, polished or unpolished, with bleached options — direct from our Egyptian mill.',
                ],
            ],
            [
                'image'   => '/images/products/flax-twines.jpg',
                'markets' => ['Worldwide'],
                'en' => [
                    'name'    => 'Flax Twines',
                    'slug'    => 'flax-twines',
                    'summary' => 'Twine in balls from 85 g to 500 g — single or twisted, long-fiber or tow qualities, packed to your order.',
                    'description' => <<<'MD'
Our twine program covers the full range a distributor needs. Balls run from a minimum of **85 g** up to **500 g**. We spin from **long fiber (LF)** or short-fiber qualities (**MT & RT**), polished or unpolished, bleached or colored, in **single or twisted** construction — and we pack according to your order.
MD,
                    'specs' => [
                        ['label' => 'Ball weight',  'value' => '85 – 500 g'],
                        ['label' => 'Raw material', 'value' => 'LF · MT · RT'],
                        ['label' => 'Finish',       'value' => 'Polished · Unpolished'],
                        ['label' => 'Color',        'value' => 'Bleached · Colored · Natural'],
                        ['label' => 'Construction', 'value' => 'Single · Twisted'],
                        ['label' => 'Packing',      'value' => 'According to customer order'],
                    ],
                    'uses' => ['Packaging & tying', 'Gardening', 'Food & butchery', 'Crafts'],
                    'seo_title'       => 'Flax Twine Manufacturer — 85 g to 500 g Balls | ALMESBAH',
                    'seo_description' => 'Flax twines in 85–500 g balls from LF, MT & RT fiber. Single or twisted, polished or matte, bleached or colored. Custom packing from Egypt.',
                ],
            ],
            [
                'image'   => '/images/products/plumbing-flax-fibres.jpg',
                'markets' => ['Belgium', 'Turkey', 'Poland', 'Spain'],
                'en' => [
                    'name'    => 'Flax Fibres for Plumbing',
                    'slug'    => 'plumbing-flax-fibres',
                    'summary' => 'One-gram hackled sliver for pipe-thread sealing — on carton tubes with shrink wrap, or in plastic dispensers.',
                    'description' => <<<'MD'
Fine hackled sliver portioned at **one gram** for professional pipe-thread sealing. Choose the put-up your market prefers: wound on a **carton tube with shrink film**, or packed in a ready-to-use **plastic dispenser**.
MD,
                    'specs' => [
                        ['label' => 'Fiber',  'value' => 'Hackled sliver, 1 g'],
                        ['label' => 'Put-up', 'value' => 'Carton tube + shrink · Plastic dispenser'],
                    ],
                    'uses' => ['Pipe thread sealing', 'Professional plumbing kits'],
                    'seo_title'       => 'Plumbing Flax Fibres — 1 g Hackled Sliver | ALMESBAH',
                    'seo_description' => '1-gram hackled flax sliver for pipe sealing, supplied on carton tubes with shrink wrap or in plastic dispensers. Egyptian mill-direct.',
                ],
            ],
        ];
    }
}
