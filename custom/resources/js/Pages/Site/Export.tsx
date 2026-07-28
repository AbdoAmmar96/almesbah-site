import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import RfqBanner from "@/Components/RfqBanner";
import { useT } from "@/i18n";
import type { Seo } from "@/types";

export default function Export({ seo }: { seo: Seo }) {
    const { t } = useT();
    return (
        <SiteLayout seo={seo}>
            <PageHero
                eyebrow={t("nav.export")}
                title={<>How an order <em style={{ color: "var(--terracotta)" }}>actually runs</em></>}
                lead="Packing standards, container math, and shipping terms — so your first order feels like your tenth."
            />
            <section>
                <div className="wrap" style={{ display: "grid", gap: "2.6rem" }}>
                    <Reveal>
                        <h2 style={{ fontSize: "1.6rem" }}>Packing standards</h2>
                        <div className="specs" style={{ maxWidth: "760px" }}>
                            <div className="row"><div>Scutched flax</div><div>Pressed bales, ≈ 250 kg</div></div>
                            <div className="row"><div>Cottonised flax</div><div>Pressed bales, 200 kg</div></div>
                            <div className="row"><div>Hackled dolls</div><div>2 × 25 kg = 50 kg bales, jute-wrapped</div></div>
                            <div className="row"><div>Twines</div><div>Balls 85–500 g, cartons to order</div></div>
                            <div className="row"><div>Plumbing sliver</div><div>1 g put-ups — carton tube + shrink, or dispensers</div></div>
                        </div>
                    </Reveal>
                    <Reveal>
                        <h2 style={{ fontSize: "1.6rem" }}>Shipping terms</h2>
                        <p style={{ maxWidth: "70ch" }}>
                            We quote <strong>FOB Egyptian ports</strong> as standard, with <strong>CFR / CIF</strong> available
                            when you prefer us to arrange the ocean leg. Every shipment travels with commercial invoice,
                            packing list, bill of lading, certificate of origin, and — where your customs authority
                            requires it — a phytosanitary certificate.
                        </p>
                    </Reveal>
                    <Reveal>
                        <h2 style={{ fontSize: "1.6rem" }}>Sampling first</h2>
                        <p style={{ maxWidth: "70ch" }}>
                            Serious programs start with a bale sample or trial quantity from the actual production lot.
                            Run it on your line, then contract the volume. That sequence protects both sides — and
                            it's how our longest customer relationships began.
                        </p>
                    </Reveal>
                </div>
            </section>
            <RfqBanner />
        </SiteLayout>
    );
}
