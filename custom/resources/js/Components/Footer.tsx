import { Link } from "@inertiajs/react";
import { useShared, useT } from "@/i18n";

export default function Footer() {
    const { settings } = useShared();
    const { t, url } = useT();
    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="wrap">
                <div className="contact-ribbon">
                    <span>✦ {settings.address_en} · {settings.china_office}</span>
                    <span>
                        <a href={`mailto:${settings.email}`}>{settings.email}</a>
                        &nbsp;·&nbsp;
                        <a href={`tel:${settings.phone?.replace(/\s/g, "")}`}>{settings.phone}</a>
                    </span>
                </div>
                <div className="cols">
                    <div className="foot-brand">
                        <img src="/images/logo-light.png" alt="ALMESBAH — For Egy Flax" />
                        <p>{t("footer.tagline")}</p>
                        <p style={{ marginTop: "1rem", fontSize: ".85rem" }}>ISO 9001:2015 · OSS Middle East</p>
                    </div>
                    <div>
                        <h4>{t("footer.sitemap")}</h4>
                        <ul>
                            <li><Link href={url("/products")}>{t("nav.products")}</Link></li>
                            <li><Link href={url("/industries")}>{t("nav.industries")}</Link></li>
                            <li><Link href={url("/export")}>{t("nav.export")}</Link></li>
                            <li><Link href={url("/gallery")}>{t("nav.gallery")}</Link></li>
                            <li><Link href={url("/certifications")}>ISO 9001:2015</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>{t("nav.blog")}</h4>
                        <ul>
                            <li><Link href={url("/blog")}>{t("blog.title")}</Link></li>
                            <li><Link href={url("/blog/scutched-vs-hackled-flax")}>Scutched vs Hackled</Link></li>
                            <li><Link href={url("/blog/import-flax-fiber-from-egypt")}>Import from Egypt</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>{t("footer.contact")}</h4>
                        <ul>
                            <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
                            <li><a href={`tel:${settings.phone?.replace(/\s/g, "")}`}>{settings.phone}</a></li>
                            <li><a href={settings.map_url} target="_blank" rel="noopener">{settings.address_en}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="foot-legal">
                    <span>© {year} ALMESBAH For Export. {t("footer.rights")}</span>
                    <span>© {year} <a href="https://bp-eg.com/" target="_blank" rel="noopener">Business Partner for Information Technology</a>. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
