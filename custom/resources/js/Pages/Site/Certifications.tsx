import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import RfqBanner from "@/Components/RfqBanner";
import type { Seo } from "@/types";

export default function Certifications({ seo }: { seo: Seo }) {
    return (
        <SiteLayout seo={seo}>
            <PageHero
                eyebrow="Certifications"
                title={<>ISO 9001:2015, <em style={{ color: "var(--terracotta)" }}>audited annually</em></>}
                lead="Certified by OSS Middle East — covering quality management across our import and export operations."
            />
            <section>
                <div className="wrap split">
                    <Reveal>
                        <h2 style={{ marginBottom: "1rem" }}>What the certificate covers</h2>
                        <p>
                            ISO 9001:2015 is a management-system standard: it audits how we run the business,
                            not just what leaves the gate. For a fiber buyer, that means documented procedures for
                            grading, traceable lots, recorded corrective actions, and a claims process that
                            actually functions.
                        </p>
                        <ul className="ticks">
                            <li>Certified scope: import & export operations</li>
                            <li>Certification body: OSS Middle East</li>
                            <li>Surveillance audits keep the certificate live year to year</li>
                        </ul>
                        <p style={{ marginTop: "1.2rem", color: "var(--muted)" }}>
                            Need the certificate PDF for your supplier file? Request it with your inquiry and
                            we attach the current copy.
                        </p>
                    </Reveal>
                    <Reveal delay={1} className="img">
                        <img src="/images/iso-certificate.jpg" alt="ALMESBAH ISO 9001:2015 certificate" style={{ objectFit: "contain", background: "var(--paper)" }} />
                    </Reveal>
                </div>
            </section>
            <RfqBanner />
        </SiteLayout>
    );
}
