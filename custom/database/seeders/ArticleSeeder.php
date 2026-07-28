<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->published() as $i => $row) {
            $a = Article::updateOrCreate(
                ['id' => $i + 1],
                [
                    'image'        => $row['image'] ?? null,
                    'status'       => 'published',
                    'published_at' => now()->subDays(21 - $i * 6),
                    'author'       => 'ALMESBAH Editorial',
                ]
            );
            $a->translations()->updateOrCreate(['locale' => 'en'], $row['en']);
        }

        foreach ($this->drafts() as $j => $row) {
            $a = Article::updateOrCreate(
                ['id' => 100 + $j],
                ['status' => 'draft', 'author' => 'ALMESBAH Editorial']
            );
            $a->translations()->updateOrCreate(['locale' => 'en'], $row);
        }
    }

    private function published(): array
    {
        return [
            [
                'image' => '/images/products/scutched-flax.jpg',
                'en' => [
                    'title'   => "Scutched vs Hackled Flax: What's the Difference?",
                    'slug'    => 'scutched-vs-hackled-flax',
                    'excerpt' => 'Two words that decide what your fiber can become. Here is what each process does, what the output looks like, and which one your application actually needs.',
                    'seo_title'       => 'Scutched vs Hackled Flax — Differences, Uses & Which to Buy',
                    'seo_description' => 'Scutched flax is long fiber freed from the straw; hackled flax is that fiber combed clean and parallel. Learn the differences, grades, and which to order.',
                    'body' => <<<'MD'
Buyers new to flax mix these two terms up all the time — and ordering the wrong one is an expensive mistake. The short version: **scutching frees the fiber, hackling refines it.** Everything else follows from that.

## What scutching does

Flax fiber grows inside the stem of the plant, bonded to a woody core. After the straw is retted (partially broken down by moisture), it goes through the scutching turbine. Rotating blades beat the straw, shattering the woody parts — called **shives** — and separating out the long line fiber.

What comes out is **scutched flax**: long, usable fiber that still carries some shive and some tangled short fiber. At our mill we press it into bales of roughly 250 kg and grade it two ways:

- **Grade A** — clean, well-dressed, free of shives. This is what spinners running finer counts ask for.
- **Grade B** — more shive content, lower price. Perfectly good where absolute cleanliness is not critical.

Scutching also produces a valuable by-product: **tow**, the short fiber knocked out during the process. Cleaned a second time, it becomes [rescutched tow (Arrous)](/en/products/rescutched-tow-arrous) — a workhorse fiber for coarser yarns and felts.

## What hackling adds

Hackling takes Grade A scutched flax one step further. The fiber is drawn through beds of steel pins, from coarse to fine. The pins comb out the remaining short fibers and shives and leave the long fibers **parallel, uniform, and smooth**.

The result — [hackled flax](/en/products/hackled-flax) — is the direct raw material for **fine linen yarn**. It can also be formed into a continuous ribbon called **hackled line sliver**, which feeds straight into the spinning preparation line.

## Which one do you need?

| If you are... | Order |
| --- | --- |
| Spinning fine linen yarn | Hackled flax or line sliver |
| Running your own hackling line | Scutched flax, Grade A |
| Producing coarser yarns, felts, technical fiber | Scutched Grade B or rescutched tow |
| Supplying the plumbing trade | Hackled flax [in dolls](/en/products/hackled-flax-in-dolls) or [1 g sliver](/en/products/plumbing-flax-fibres) |

## The practical difference in one sentence

Scutched flax is *potential* — hackled flax is *precision*. You pay more per kilo for hackled fiber because the mill has already removed everything your spinning frame would have rejected.

Not sure which grade fits your line? [Send us your target yarn count](/en/contact) and we will recommend the fiber and quote both options.
MD,
                ],
            ],
            [
                'image' => '/images/products/cottonised-flax.jpg',
                'en' => [
                    'title'   => "What Is Cottonised Flax? A Spinner's Guide to Flax–Cotton Blends",
                    'slug'    => 'what-is-cottonised-flax',
                    'excerpt' => 'Linen character on cotton machinery — no new equipment required. How cottonised flax is made, how much to blend, and what yarn counts to expect.',
                    'seo_title'       => 'What Is Cottonised Flax? Blending Ratios & Yarn Counts Explained',
                    'seo_description' => 'Cottonised flax is flax cut to 38–51 mm to run on cotton spinning systems. Learn blend ratios (10–50%+), achievable counts (Ne 8–55), and buying specs.',
                    'body' => <<<'MD'
Linen demand keeps growing, but most of the world's spinning capacity is built for cotton. **Cottonised flax** solves that mismatch: it is flax fiber cut and refined until it behaves like cotton on standard short-staple machinery.

## How it's made

Regular flax line fiber is far too long for a cotton system — it would wrap and choke the cards. Cottonising cuts the fiber down to a staple length the machines expect. We produce it from **all types of long flax fiber, short flax fiber, machine tow, and bleached flax** — matched to your target quality and price. At ALMESBAH we cut to order, anywhere in the **38 – 51 mm** window, and refine the fiber so it opens, cards, and drafts alongside cotton without special handling.

## How much flax goes in the blend?

There is no single answer — it depends on two things:

1. **The fineness of the flax fiber.** Finer fiber tolerates higher percentages.
2. **The yarn you are targeting.** Thicker yarns forgive more flax; fine counts want less.

In practice, mills blend anywhere from **10% up to more than 50%** flax with cotton, polyester, or viscose. A 15–30% blend is the common starting point for apparel yarns: enough flax to bring the dry, textured linen hand and its natural slub character, while the cotton keeps the yarn strong and regular.

## What counts can you spin?

Blended yarns from our cottonised flax run from **Ne 8 for heavy, rustic constructions up to Ne 55** for fine shirting-weight yarns. If you tell us your target count and blend partner, we can recommend the cut length and fiber quality to match.

## Beyond the spinning mill

The same fiber has two other steady customers: **specialty paper makers**, who prize flax for strength and permanence (think currency-grade and archival papers), and **natural insulation producers**, where flax competes on thermal performance and sustainability.

## Buying checklist

- Cut length required (38–51 mm)
- Blend partner and ratio
- Target yarn count (Ne)
- Monthly volume — we press **200 kg bales**, so plan container loads around that

Ready to sample? [Request a quote](/en/contact) with your specs and our team will respond with fiber recommendations and pricing.
MD,
                ],
            ],
            [
                'image' => '/images/products/hackled-flax.jpg',
                'en' => [
                    'title'   => 'Flax Fiber Grades Explained: Grades A, B & C',
                    'slug'    => 'flax-fiber-grades-explained',
                    'excerpt' => 'Shive content is the whole story. What separates Grades A, B, and C of scutched flax, how to inspect a bale, and when the cheaper grade is the smarter buy.',
                    'seo_title'       => 'Flax Fiber Grades: A, B & C Scutched Flax Compared',
                    'seo_description' => 'Grade A scutched flax is clean and shive-free; Grades B and C trade cleanliness for price. How grading works, how to inspect bales, and which grade to buy.',
                    'body' => <<<'MD'
Ask three suppliers about flax grades and you may get three vocabularies. At ALMESBAH we keep it simple, because the thing that actually matters is simple: **how much shive is left in the fiber.**

## What shives are, and why they matter

Shives are the fragments of the woody stem core that scutching shatters and (mostly) removes. Whatever remains travels with the fiber into your process — and every gram of it is a gram you paid fiber price for, plus a defect your machines must deal with. In spinning, shives cause breaks and neps. In visible applications, they show up as dark specks.

## Grade A

**Clean, well-dressed, free of shives.** Grade A is the fiber we send to spinners chasing finer counts and to our own hackling line — hackling only makes economic sense when the input is already clean. If your end product is fine linen yarn or anything surface-critical, Grade A is not a luxury; it is the spec.

## Grade B

**Lower cleanliness, lower price.** Grade B carries more shive and less uniform dressing. That is not a defect — it is a fit-for-purpose product. Coarser yarns, felts, technical applications, and any process with its own cleaning stage can run Grade B and pocket the price difference.

## Grade C

**The entry grade.** Grade C carries the highest shive content at the lowest price. It exists for one honest reason: some processes clean the fiber anyway, and some products simply do not need dressed fiber. If that describes your line, paying for Grade A is paying twice.

## How to inspect a bale

1. **Open the middle, not the face.** Any bale looks good on the outside.
2. **Shake a handful over dark paper.** The shive fall-out tells you more than any certificate.
3. **Check fiber length and dressing.** Grade A should pull out long and parallel, with minimal tangled tow.
4. **Smell it.** Clean flax smells like hay. Musty notes mean moisture problems in retting or storage.

## Which grade should you order?

| Your process | Recommended |
| --- | --- |
| Fine linen spinning | Grade A |
| Feeding your own hackling machines | Grade A |
| Coarse yarn, twines, felts | Grade B |
| Technical / composite fiber | Grade B (test first) |
| Price-driven, own cleaning stage downstream | Grade C |

Both grades ship from our mill in pressed bales of about 250 kg. [Tell us your application](/en/contact) and we will quote the grades side by side — sometimes the honest answer is that Grade B or C does your job at Grade B or C money.
MD,
                ],
            ],
            [
                'image' => '/images/products/rescutched-tow-arrous.jpg',
                'en' => [
                    'title'   => 'How to Import Flax Fiber from Egypt: A Buyer\'s Checklist',
                    'slug'    => 'import-flax-fiber-from-egypt',
                    'excerpt' => 'Bale weights, container math, Incoterms, documents, and the questions to settle before your first order leaves the Nile Delta.',
                    'seo_title'       => 'Importing Flax Fiber from Egypt — Packing, Incoterms & Checklist',
                    'seo_description' => 'A practical guide to importing Egyptian flax: bale weights (200–250 kg), container planning, Incoterms, documents, and the specs to agree before ordering.',
                    'body' => <<<'MD'
Egypt has processed flax in the Nile Delta for thousands of years, and today it remains one of the few origins outside Western Europe with a complete scutching-to-hackling industry. Here is how a first order actually runs — and what to settle before it does.

## Step 1 — Nail the specification

"Flax fiber" is not a spec. Before pricing means anything, agree on:

- **Product & grade** — scutched (A, B or C), hackled, tow/Arrous, dolls, twines, or cottonised fiber
- **For cottonised flax:** cut length (38–51 mm) and target yarn count
- **For dolls:** put-up type (Jokia, 2-head, 4-head) and unit weights
- **Quantity** and delivery schedule

A serious supplier will ask you these questions before quoting. Treat silence on specs as a warning sign.

## Step 2 — Do the container math

Our standard packing makes planning straightforward:

- **Scutched flax:** pressed bales ≈ 250 kg
- **Cottonised flax:** pressed bales 200 kg
- **Dolls:** 50 kg jute-wrapped bales (2 × 25 kg)

A 40-foot container typically carries in the range of 20–24 tonnes of pressed fiber depending on product and press density — confirm the exact loading plan with your supplier at quotation, not at booking.

## Step 3 — Choose your Incoterm deliberately

- **FOB (Egyptian port)** — you control the freight and insurance; most experienced importers' default.
- **CFR / CIF** — the mill arranges ocean freight (and insurance under CIF); simpler for a first order.
- **EXW** — only if you have your own forwarder inside Egypt.

Whichever you choose, name the destination port precisely and agree who pays for fumigation certificates if your customs authority requires them for plant-origin fiber.

## Step 4 — Documents to expect

Commercial invoice, packing list, bill of lading, certificate of origin, and — where required — a phytosanitary certificate. If quality certification matters to your buyers, note that ALMESBAH operates under an **ISO 9001:2015** certified management system.

## Step 5 — Sample before you scale

Ask for a bale sample or a trial quantity from the actual production lot. Run it. Then contract the volume. Every reputable mill will support this sequence, because a customer whose trial ran clean is a customer for years.

Have a destination and a target spec in mind? [Send us the details](/en/contact) — our team in Egypt and our Guangzhou office respond with packing options, lead times, and a firm offer.
MD,
                ],
            ],
        ];
    }

    private function drafts(): array
    {
        $outline = fn (array $points) => "## Planned outline\n\n- " . implode("\n- ", $points) . "\n\n*Draft — expand each point to 150–250 words, add one internal link per section, then publish.*";

        return [
            [
                'locale' => 'en',
                'title'  => 'The Complete Buyer\'s Guide to Egyptian Flax Fiber',
                'slug'   => 'egyptian-flax-fiber-buyers-guide',
                'excerpt'=> 'Pillar guide: every product, grade, and packing option from a Nile Delta mill — and how to buy each one well.',
                'body'   => $outline(['Why Egypt grows exceptional flax (Nile Delta conditions)', 'The full product map: scutched → hackled → tow → consumer put-ups', 'Grades and how to read them', 'Packing & container planning', 'Quality systems: what ISO 9001:2015 covers', 'How to run a first trial order']),
                'seo_title' => 'Egyptian Flax Fiber: The Complete Buyer\'s Guide',
                'seo_description' => 'Everything importers need to know about Egyptian flax fiber: products, grades, packing, quality systems, and how to run a first trial order.',
            ],
            [
                'locale' => 'en',
                'title'  => 'From Straw to Fiber: How Egyptian Flax Is Processed',
                'slug'   => 'how-flax-is-processed',
                'excerpt'=> 'Retting, scutching, hackling, baling — the four stages that turn a field crop into export-grade fiber.',
                'body'   => $outline(['Harvest & retting in the Delta climate', 'Scutching: freeing the line fiber', 'Tow recovery and rescutching', 'Hackling: combing to spinning grade', 'Pressing, grading, and bale marking']),
                'seo_title' => 'How Flax Fiber Is Processed: From Straw to Export Bale',
                'seo_description' => 'The four processing stages of Egyptian flax — retting, scutching, hackling, and baling — explained for fiber buyers.',
            ],
            [
                'locale' => 'en',
                'title'  => 'Egyptian Flax vs European Flax: An Honest Comparison',
                'slug'   => 'egyptian-vs-european-flax',
                'excerpt'=> 'Where Delta fiber wins, where it differs, and how buyers combine both origins.',
                'body'   => $outline(['Climate & retting differences', 'Fiber character comparison', 'Price positioning', 'Supply reliability & seasonality', 'When to dual-source']),
                'seo_title' => 'Egyptian Flax vs European Flax — Honest Origin Comparison',
                'seo_description' => 'How Egyptian flax compares with Western European fiber on character, price, and supply — and when dual-sourcing makes sense.',
            ],
            [
                'locale' => 'en',
                'title'  => 'Flax Tow: Industrial Uses You Might Not Expect',
                'slug'   => 'flax-tow-uses',
                'excerpt'=> 'The short fiber is not a by-product — it is a product. Where tow and Arrous end up.',
                'body'   => $outline(['What tow is and how Arrous differs', 'Coarse yarn & twine production', 'Felts and nonwovens', 'Composite & technical applications', 'Buying specs for tow']),
                'seo_title' => 'Flax Tow Uses — Yarns, Felts, Nonwovens & Technical Fiber',
                'seo_description' => 'Industrial applications of flax tow and rescutched Arrous: coarse yarns, felts, nonwovens, and composites.',
            ],
            [
                'locale' => 'en',
                'title'  => 'Why Paper and Insulation Makers Choose Flax',
                'slug'   => 'flax-in-paper-and-insulation',
                'excerpt'=> 'Strength, permanence, and sustainability: flax beyond the textile mill.',
                'body'   => $outline(['Flax in currency-grade & archival paper', 'Fiber properties papermakers care about', 'Flax as natural insulation', 'Sustainability story for spec sheets', 'Which ALMESBAH fiber fits each use']),
                'seo_title' => 'Flax Fiber in Paper & Insulation — Why Producers Choose It',
                'seo_description' => 'Why specialty paper and natural insulation producers specify flax fiber, and which grades fit each application.',
            ],
            [
                'locale' => 'en',
                'title'  => 'Plumbing Flax (Oakum) — A Complete Buyer\'s Guide',
                'slug'   => 'plumbing-flax-oakum-guide',
                'excerpt'=> 'Dolls, sliver dispensers, unit weights, and how the plumbing trade buys sealing fiber.',
                'body'   => $outline(['How flax seals a threaded joint', 'Doll types: Jokia vs 2-head vs 4-head', '1 g sliver put-ups for retail', 'Bale & carton logistics', 'Private-label options']),
                'seo_title' => 'Plumbing Flax & Oakum Buyer\'s Guide — Dolls, Sliver, Put-Ups',
                'seo_description' => 'A trade guide to plumbing flax: doll types and weights, 1 g sliver dispensers, packing, and private-label options.',
            ],
            [
                'locale' => 'en',
                'title'  => 'Linen Yarn Counts (Ne 8–55): Choosing the Right Fiber',
                'slug'   => 'linen-yarn-counts-guide',
                'excerpt'=> 'Match your target count to cut length, blend ratio, and fiber grade.',
                'body'   => $outline(['How Ne counts work for blends', 'Coarse counts (Ne 8–20): fiber choices', 'Medium counts (Ne 20–40)', 'Fine counts (Ne 40–55): what it takes', 'Sampling protocol before scaling']),
                'seo_title' => 'Linen Yarn Counts Ne 8–55 — Fiber Selection Guide',
                'seo_description' => 'How to match yarn counts from Ne 8 to Ne 55 with the right flax cut length, blend ratio, and grade.',
            ],
            [
                'locale' => 'en',
                'title'  => 'What Drives Flax Fiber Prices in 2026',
                'slug'   => 'flax-fiber-price-factors',
                'excerpt'=> 'Harvest, retting weather, grade mix, freight — the variables behind every quotation.',
                'body'   => $outline(['Harvest volumes & straw quality', 'Retting weather risk', 'Grade yield economics', 'Freight & currency effects', 'How to structure contracts against volatility']),
                'seo_title' => 'Flax Fiber Price Factors — What Moves the Market',
                'seo_description' => 'The variables behind flax fiber pricing: harvest, retting weather, grade yields, freight, and contract structures that manage volatility.',
            ],
        ];
    }
}
