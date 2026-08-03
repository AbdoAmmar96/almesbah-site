import { Link } from "@inertiajs/react";
import Reveal from "@/Components/Reveal";
import { useT } from "@/i18n";

export default function RfqBanner() {
    const { t, url } = useT();
    return (
        <section className="band rfq">
            <div className="wrap">
                <Reveal>
                    <h2>{t("rfq.title_1", "Tell us the fiber and the port.")}<br /><em>{t("rfq.title_2", "We handle the rest.")}</em></h2>
                    <p className="lead" style={{ margin: "1rem auto 0", maxWidth: "52ch" }}>
                        {t("rfq.lead", "Specs, packing options, and a firm offer — from our mill in Egypt and our offices in Guangzhou & Hebei.")}
                    </p>
                    <Link href={url("/contact")} className="btn btn-light">{t("cta.quote")} <span className="arrow">→</span></Link>
                </Reveal>
            </div>
        </section>
    );
}
