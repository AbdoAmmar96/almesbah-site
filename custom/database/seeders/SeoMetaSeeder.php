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
                'About ALMESBAH — Egypt Flax Mill, Guangzhou & Hebei Offices',
                'One of the Middle East\'s oldest and largest flax producers. Mill in Shubramillis, Egypt; offices in Guangzhou & Hebei, China; customers across Europe and Asia.',
            ],
            'products' => [
                'Flax Fiber Products — Scutched, Hackled, Tow, Twines | ALMESBAH',
                'Eight flax product lines from one Egyptian mill: cottonised flax, scutched flax (Grades A/B/C), hackled flax, dolls, Arrous tow, spools, twines, and plumbing fiber.',
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
                'Photos from the ALMESBAH mill in Shubramillis: scutching, hackling, baling, and shipments on their way to Europe and Asia.',
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
                'Tell us the fiber, quantity, and destination. Our team in Egypt, Guangzhou and Hebei replies with specs, packing options, and a firm offer.',
            ],
        ];

        $zh = [
            'home' => [
                '埃及亚麻纤维供应商与出口商 | ALMESBAH（麦斯巴赫）',
                'ALMESBAH 在埃及尼罗河三角洲自有工厂加工亚麻，向全球十国出口打成麻、梳成麻、短麻与麻线。ISO 9001:2015 认证，欢迎询价。',
            ],
            'about' => [
                '关于 ALMESBAH —— 埃及亚麻工厂，广州与河北办事处',
                '中东历史最悠久、规模最大的亚麻生产商之一。工厂位于埃及舒卜拉米利斯，办事处设在广州与河北，客户遍布欧亚。',
            ],
            'products' => [
                '亚麻纤维产品 —— 打成麻、梳成麻、短麻、麻线 | ALMESBAH',
                '一家埃及工厂的八大亚麻产品线：棉型亚麻、打成麻（A/B/C 级）、梳成麻、麻把、回收短麻、麻纱线轴、麻线与管道密封麻。',
            ],
            'industries' => [
                '供应行业 —— 纺纱、造纸、保温、管道密封',
                '埃及亚麻纤维的应用去向：棉纺系统纺纱厂、高档亚麻布生产商、特种纸、天然保温材料与管道五金贸易商。',
            ],
            'export' => [
                '出口流程 —— 包装、麻包、贸易术语 | ALMESBAH',
                '集装箱适配麻包（200–250 公斤）、麻布包装麻把、灵活的零售包装，以及适合进口商的贸易条款。了解 ALMESBAH 订单的运作方式。',
            ],
            'gallery' => [
                '工厂实景 —— 走进我们的亚麻工厂 | ALMESBAH',
                '舒卜拉米利斯 ALMESBAH 工厂实拍：打麻、梳麻、打包，以及发往欧亚的货柜。',
            ],
            'blog' => [
                '亚麻纤维知识库 | ALMESBAH 博客',
                '为亚麻采购商准备的通俗指南：等级、加工工序、混纺比例、进口物流，以及来自埃及工厂的市场洞察。',
            ],
            'certifications' => [
                '资质认证 —— ISO 9001:2015 | ALMESBAH',
                'ALMESBAH 通过 OSS Middle East 的 ISO 9001:2015 认证，覆盖进出口业务的质量管理体系。',
            ],
            'contact' => [
                '联系 ALMESBAH —— 获取亚麻纤维报价',
                '告诉我们纤维品类、数量与目的港。埃及、广州与河北团队将回复规格、包装方案与正式报价。',
            ],
        ];

        foreach (['en' => $en, 'zh' => $zh] as $locale => $rows) {
            foreach ($rows as $route => [$title, $description]) {
                SeoMeta::updateOrCreate(
                    ['route' => $route, 'locale' => $locale],
                    ['title' => $title, 'description' => $description]
                );
            }
        }
    }
}
