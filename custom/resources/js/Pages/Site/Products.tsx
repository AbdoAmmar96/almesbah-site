import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import ProductCardItem from "@/Components/ProductCardItem";
import RfqBanner from "@/Components/RfqBanner";
import { useT } from "@/i18n";
import type { ProductCard, Seo } from "@/types";

export default function Products({ seo, products }: { seo: Seo; products: ProductCard[] }) {
    const { t } = useT();
    return (
        <SiteLayout seo={seo}>
            <PageHero
                eyebrow={t("nav.products")}
                title={<>{t("products.hero_t1", "Eight product lines.")} <em style={{ color: "var(--terracotta)" }}>{t("products.hero_t2", "One quality system.")}</em></>}
                lead={t("products.hero_lead", "Every stage of the flax value chain, from turbine-fresh scutched fiber to retail-ready plumbing dispensers.")}
            />
            <section>
                <div className="wrap">
                    <div className="grid grid-3">
                        {products.map((p, i) => (
                            <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2}>
                                <ProductCardItem p={p} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
            <RfqBanner />
        </SiteLayout>
    );
}
