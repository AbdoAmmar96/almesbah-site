import { Link } from "@inertiajs/react";
import SiteLayout from "@/Layouts/SiteLayout";
import Reveal from "@/Components/Reveal";
import ProductCardItem from "@/Components/ProductCardItem";
import ArticleCardItem from "@/Components/ArticleCardItem";
import RfqBanner from "@/Components/RfqBanner";
import { useT } from "@/i18n";
import type { ArticleCard, ProductCard, Seo } from "@/types";

const STEPS = [
    ["01", "home.step1_t", "Field", "home.step1_p", "Nile Delta flax straw, retted under the same sun it grew in."],
    ["02", "home.step2_t", "Scutch", "home.step2_p", "Turbines free the long line fiber and knock out the shives."],
    ["03", "home.step3_t", "Hackle", "home.step3_p", "Steel pins comb the fiber parallel, uniform, spinning-ready."],
    ["04", "home.step4_t", "Bale", "home.step4_p", "Pressed at 200–250 kg, graded, marked, container-planned."],
    ["05", "home.step5_t", "Ship", "home.step5_p", "FOB, CFR, or CIF — to your port, with full export documents."],
] as const;

const MARKETS = ["Belgium", "France", "China", "Russia", "Romania", "Turkey", "Poland", "Spain", "India", "Pakistan"];

export default function Home({ seo, products, articles }:
    { seo: Seo; products: ProductCard[]; articles: ArticleCard[] }) {
    const { t, url } = useT();

    return (
        <SiteLayout seo={seo}>
            {/* ---------- HERO ---------- */}
            <section className="hero">
                <div className="wrap">
                    <div>
                        <Reveal as="span" className="eyebrow">{t("home.hero_eyebrow", "ISO 9001:2015 · Nile Delta, Egypt")}</Reveal>
                        <Reveal delay={1}><h1>{t("home.hero_t1", "Egyptian flax fiber, ")}<em>{t("home.hero_t2", "straight from the mill.")}</em></h1></Reveal>
                        <Reveal delay={2}>
                            <p className="lead" style={{ marginTop: "1.2rem" }}>
                                {t("home.hero_lead", "ALMESBAH scutches, hackles, and bales flax in Shubrameles — then ships it to spinners and manufacturers in ten countries. One supplier, from field to container.")}
                            </p>
                        </Reveal>
                        <Reveal delay={3}>
                            <div className="hero-ctas">
                                <Link href={url("/contact")} className="btn btn-primary">{t("cta.quote")} <span className="arrow">→</span></Link>
                                <Link href={url("/products")} className="btn btn-ghost">{t("cta.browse")}</Link>
                            </div>
                            <div className="hero-proof">
                                <div><strong>8</strong><span>{t("home.proof_products", "product lines")}</span></div>
                                <div><strong>10</strong><span>{t("home.proof_countries", "export countries")}</span></div>
                                <div><strong>ISO</strong><span>{t("home.proof_iso", "9001:2015 certified")}</span></div>
                                <div><strong>EG + CN</strong><span>{t("home.proof_offices", "mill & Guangzhou office")}</span></div>
                            </div>
                        </Reveal>
                    </div>
                    <Reveal delay={2} className="hero-art">
                        <div className="strands" aria-hidden>
                            {[12, 26, 41, 57, 72, 88].map((top, i) => (
                                <span key={i} style={{ top: `${top}%`, transform: `rotate(${i % 2 ? -2 : 2}deg)` }} />
                            ))}
                        </div>
                        <div className="frame">
                            <img src="/images/products/hackled-flax.jpg" alt="Hackled Egyptian flax fiber" />
                        </div>
                        <div className="chip">
                            <strong>{t("home.chip_t", "Shubrameles → the world.")}</strong><br />
                            {t("home.chip_p", "The Delta has dressed flax for 5,000 years. We just put it in containers.")}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------- PRODUCTS ---------- */}
            <section style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <Reveal className="sec-head">
                        <span className="eyebrow">{t("nav.products")}</span>
                        <h2>{t("home.products_title")}</h2>
                        <p className="lead">{t("home.products_sub")}</p>
                    </Reveal>
                    <div className="grid grid-4">
                        {products.map((p, i) => (
                            <Reveal key={p.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
                                <ProductCardItem p={p} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- PROCESS (dark band) ---------- */}
            <svg className="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
                <path fill="currentColor" d="M0,30 C240,60 480,0 720,25 C960,50 1200,10 1440,35 L1440,60 L0,60 Z" />
            </svg>
            <section className="band" style={{ marginTop: "-1px" }}>
                <div className="wrap">
                    <Reveal className="sec-head">
                        <span className="eyebrow" style={{ color: "var(--gold)" }}>{t("home.steps_eyebrow", "From straw to shipment")}</span>
                        <h2>{t("home.steps_title", "Five steps. One roof.")}</h2>
                    </Reveal>
                    <div className="steps">
                        {STEPS.map(([n, tKey, tDef, pKey, pDef], i) => (
                            <Reveal key={n} delay={(i % 4) as 0 | 1 | 2 | 3} className="step">
                                <b>{n}</b>
                                <h3>{t(tKey, tDef)}</h3>
                                <p>{t(pKey, pDef)}</p>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal style={{ marginTop: "3rem" }}>
                        <h3 style={{ fontSize: "1.15rem" }}>{t("home.markets_title", "Where our fiber lands")}</h3>
                        <div className="flags">
                            {MARKETS.map((m) => <span key={m} className="flag">{m}</span>)}
                        </div>
                    </Reveal>
                </div>
            </section>
            <svg className="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden style={{ transform: "scaleY(-1)" }}>
                <path fill="currentColor" d="M0,30 C240,60 480,0 720,25 C960,50 1200,10 1440,35 L1440,60 L0,60 Z" />
            </svg>

            {/* ---------- ABOUT TEASER ---------- */}
            <section>
                <div className="wrap split">
                    <Reveal className="img">
                        <img src="/images/factory.jpg" alt="Inside the ALMESBAH flax mill" />
                    </Reveal>
                    <Reveal delay={1}>
                        <span className="eyebrow">{t("nav.about")}</span>
                        <h2 style={{ margin: ".7rem 0 1rem" }}>{t("home.about_title", "One of the Middle East's oldest flax houses")}</h2>
                        <p>
                            {t("home.about_p", "Our mill sits in Shubrameles, Gharbia — in the Delta soil where flax has been worked for millennia — and our offices in Guangzhou and Hebei keep us a phone call away from Asia's spinning industry.")}
                        </p>
                        <ul className="ticks">
                            <li>{t("home.tick1", "Complete line: scutching, hackling, tow recovery, twines, retail put-ups")}</li>
                            <li>{t("home.tick2", "ISO 9001:2015 quality management, certified by OSS Middle East")}</li>
                            <li>{t("home.tick3", "Regular shipments to Belgium, France, China, Russia, India, Pakistan & more")}</li>
                        </ul>
                        <Link href={url("/about")} className="btn btn-ghost" style={{ marginTop: "1.6rem" }}>
                            {t("nav.about")} <span className="arrow">→</span>
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ---------- BLOG TEASER ---------- */}
            {articles.length > 0 && (
                <section style={{ paddingTop: 0 }}>
                    <div className="wrap">
                        <Reveal className="sec-head">
                            <span className="eyebrow">{t("nav.blog")}</span>
                            <h2>{t("blog.title")}</h2>
                            <p className="lead">{t("blog.sub")}</p>
                        </Reveal>
                        <div className="grid grid-3">
                            {articles.map((a, i) => (
                                <Reveal key={a.slug} delay={(i % 3) as 0 | 1 | 2}>
                                    <ArticleCardItem a={a} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <RfqBanner />
        </SiteLayout>
    );
}
