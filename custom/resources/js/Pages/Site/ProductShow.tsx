import { Link } from "@inertiajs/react";
import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import ProductCardItem from "@/Components/ProductCardItem";
import { md, useT } from "@/i18n";
import type { ProductCard, Seo } from "@/types";

type P = {
    name: string; slug: string; summary: string; description: string;
    specs: { label: string; value: string }[]; uses: string[];
    image: string; export_markets: string[];
};

export default function ProductShow({ seo, product, related }:
    { seo: Seo; product: P; related: ProductCard[] }) {
    const { t, url } = useT();
    return (
        <SiteLayout seo={seo}>
            <PageHero eyebrow={t("nav.products")} title={product.name} lead={product.summary} crumb={product.name} />
            <section>
                <div className="wrap pd">
                    <Reveal className="photo">
                        <img src={product.image} alt={product.name} />
                    </Reveal>
                    <Reveal delay={1}>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: md(product.description || "") }} />

                        {product.specs.length > 0 && (
                            <>
                                <h2 style={{ marginTop: "2rem", fontSize: "1.4rem" }}>Specifications</h2>
                                <div className="specs">
                                    {product.specs.map((s) => (
                                        <div className="row" key={s.label}>
                                            <div>{s.label}</div>
                                            <div>{s.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {product.uses.length > 0 && (
                            <>
                                <h2 style={{ marginTop: "2rem", fontSize: "1.4rem" }}>Typical uses</h2>
                                <div className="tags">
                                    {product.uses.map((u) => <span className="tag" key={u}>{u}</span>)}
                                </div>
                            </>
                        )}

                        {product.export_markets.length > 0 && (
                            <>
                                <h2 style={{ marginTop: "2rem", fontSize: "1.4rem" }}>Export destinations</h2>
                                <div className="tags">
                                    {product.export_markets.map((m) => <span className="tag" key={m}>{m}</span>)}
                                </div>
                            </>
                        )}

                        <div style={{ marginTop: "2.4rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <Link href={url("/contact") + `?product=${encodeURIComponent(product.name)}`} className="btn btn-primary">
                                {t("cta.quote")} — {product.name} <span className="arrow">→</span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {related.length > 0 && (
                <section style={{ paddingTop: 0 }}>
                    <div className="wrap">
                        <div className="stitch" style={{ marginBottom: "2.6rem" }} />
                        <h2 style={{ fontSize: "1.6rem", marginBottom: "1.6rem" }}>Related products</h2>
                        <div className="grid grid-3">
                            {related.map((p) => <ProductCardItem key={p.slug} p={p} />)}
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    );
}
