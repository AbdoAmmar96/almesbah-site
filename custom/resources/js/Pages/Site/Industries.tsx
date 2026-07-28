import { Link } from "@inertiajs/react";
import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import RfqBanner from "@/Components/RfqBanner";
import { useT } from "@/i18n";
import type { Seo } from "@/types";

const ROWS = [
    {
        title: "Linen & blended spinning",
        text: "Hackled line fiber and sliver for wet-spun linen; cottonised flax (38–51 mm) for cotton-system blends at 10–50%+, spinning Ne 8–55.",
        links: [["Hackled Flax", "/products/hackled-flax"], ["Cottonised Flax", "/products/cottonised-flax"]],
    },
    {
        title: "Coarse yarns, felts & technical fiber",
        text: "Rescutched tow (Arrous) and Grade B/C scutched flax: consistent, economical fiber for twines, felts, nonwovens, and composite applications.",
        links: [["Rescutched Tow", "/products/rescutched-tow-arrous"], ["Scutched Flax", "/products/scutched-flax"]],
    },
    {
        title: "Specialty paper & insulation",
        text: "Flax brings tensile strength and permanence to currency-grade and archival papers, and natural thermal performance to insulation boards.",
        links: [["Cottonised Flax", "/products/cottonised-flax"]],
    },
    {
        title: "Plumbing & hardware trade",
        text: "Hackled flax in dolls (Jokia, 2-head, 4-head) and 1 g sliver dispensers — the classic pipe-thread sealing fiber, packed for retail.",
        links: [["Flax in Dolls", "/products/hackled-flax-in-dolls"], ["Plumbing Fibres", "/products/plumbing-flax-fibres"]],
    },
    {
        title: "Packaging, gardening & crafts",
        text: "Flax twines in 85–500 g balls and yarn on bobbins — polished or matte, natural, bleached, or dyed, packed to your order.",
        links: [["Flax Twines", "/products/flax-twines"], ["Spools on Bobbin", "/products/flax-spools-on-bobbin"]],
    },
];

export default function Industries({ seo }: { seo: Seo }) {
    const { t, url } = useT();
    return (
        <SiteLayout seo={seo}>
            <PageHero
                eyebrow={t("nav.industries")}
                title={<>{t("industries.hero_t1", "Where our fiber")} <em style={{ color: "var(--terracotta)" }}>{t("industries.hero_t2", "ends up")}</em></>}
                lead={t("industries.hero_lead", "Five industries, one mill. Find your application and the fiber that fits it.")}
            />
            <section>
                <div className="wrap" style={{ display: "grid", gap: "1.6rem" }}>
                    {ROWS.map((r, i) => (
                        <Reveal key={r.title} delay={(i % 3) as 0 | 1 | 2} className="card">
                            <div className="pad" style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: "1.4rem" }}>
                                <div style={{ flex: "1 1 380px" }}>
                                    <h3>{r.title}</h3>
                                    <p style={{ marginTop: ".4rem" }}>{r.text}</p>
                                </div>
                                <div className="tags" style={{ marginTop: 0 }}>
                                    {r.links.map(([label, href]) => (
                                        <Link key={href} href={url(href)} className="tag" style={{ background: "var(--forest)", color: "var(--cream)", borderColor: "var(--forest)" }}>
                                            {label} →
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
            <RfqBanner />
        </SiteLayout>
    );
}
