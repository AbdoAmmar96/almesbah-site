import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import RfqBanner from "@/Components/RfqBanner";
import { useShared, useT } from "@/i18n";
import type { Seo } from "@/types";

export default function About({ seo }: { seo: Seo }) {
    const { t } = useT();
    const { settings } = useShared();
    return (
        <SiteLayout seo={seo}>
            <PageHero
                eyebrow={t("nav.about")}
                title={<>The Delta grows it.<br /><em style={{ color: "var(--terracotta)" }}>We dress it for the world.</em></>}
                lead="One of the Middle East's oldest and largest flax producers — a mill in Shubrameles, offices in Guangzhou & Hebei, and customers across Europe and Asia."
            />
            <section>
                <div className="wrap split">
                    <Reveal>
                        <h2 style={{ marginBottom: "1rem" }}>Built where the flax is</h2>
                        <p>
                            ALMESBAH operates from Shubrameles, Zefta, in Egypt's Gharbia governorate —
                            the heart of the Nile Delta flax belt. Working at the source means we control
                            the fiber from retted straw to pressed bale, and grade it with our own hands
                            before it ever meets a container.
                        </p>
                        <p style={{ marginTop: "1rem" }}>
                            Our range covers the full chain: scutched flax in Grades A and B, hackled flax
                            and line sliver, rescutched tow (Arrous), cottonised fiber for cotton-system
                            spinning, plus finished put-ups — dolls, twines, spools, and 1-gram plumbing sliver.
                        </p>
                        <ul className="ticks">
                            <li>Mill & headquarters: {settings.address_en}</li>
                            <li>China presence: {settings.china_office} — Asia inquiries answered in your time zone</li>
                            <li>Long-term markets in India & Pakistan for long fiber, short fiber, cottonised flax & sliver</li>
                            <li>Shipping to Belgium, France, China, Russia, Romania, Turkey, Poland, Spain, India & Pakistan</li>
                        </ul>
                    </Reveal>
                    <Reveal delay={1} className="img">
                        <img src="/images/factory.jpg" alt="ALMESBAH flax processing" />
                    </Reveal>
                </div>
            </section>

            <section style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <div className="stitch" style={{ marginBottom: "3rem" }} />
                    <div className="grid grid-3">
                        <Reveal className="card"><div className="pad">
                            <h3>Quality, audited</h3>
                            <p>Our management system is certified to ISO 9001:2015 by OSS Middle East — covering how we buy, process, and export fiber, and how we handle your claims if something is ever off.</p>
                        </div></Reveal>
                        <Reveal delay={1} className="card"><div className="pad">
                            <h3>Two time zones, one team</h3>
                            <p>Egypt handles production and logistics; our Guangzhou office and Hebei representation handle Asia-facing sales and support. Your questions get answered while your working day is still running.</p>
                        </div></Reveal>
                        <Reveal delay={2} className="card"><div className="pad">
                            <h3>Open to partnership</h3>
                            <p>Distributors, private-label buyers, and mills with recurring programs: we build long supply relationships, not one-off trades. Tell us your market and volumes.</p>
                        </div></Reveal>
                    </div>
                </div>
            </section>
            <RfqBanner />
        </SiteLayout>
    );
}
