import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import { useT } from "@/i18n";
import type { Seo } from "@/types";

type Item = { image: string; caption: string | null; album: string };

export default function Gallery({ seo, items }: { seo: Seo; items: Item[] }) {
    const { t } = useT();
    return (
        <SiteLayout seo={seo}>
            <PageHero
                eyebrow={t("nav.gallery")}
                title={<>Inside the mill</>}
                lead="Scutching lines, hackling beds, pressed bales, and shipments on their way out."
            />
            <section>
                <div className="wrap">
                    {items.length === 0 ? (
                        <p className="lead">Photos are being curated — check back soon, or ask us for our latest production video on WhatsApp.</p>
                    ) : (
                        <Reveal className="masonry">
                            {items.map((it, i) => (
                                <figure key={i}>
                                    <img src={it.image} alt={it.caption ?? "ALMESBAH mill"} loading="lazy" />
                                    {it.caption && <figcaption>{it.caption}</figcaption>}
                                </figure>
                            ))}
                        </Reveal>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
}
