import { useForm } from "@inertiajs/react";
import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import { useShared, useT } from "@/i18n";
import type { Seo } from "@/types";

export default function Contact({ seo, products }: { seo: Seo; products: string[] }) {
    const { t, url } = useT();
    const { settings, flash } = useShared();
    const preselect = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("product") ?? ""
        : "";

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "", company: "", email: "", phone: "", country: "",
        product_interest: preselect, message: "", website: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(url("/contact"), { onSuccess: () => reset() });
    };

    return (
        <SiteLayout seo={seo}>
            <PageHero
                eyebrow={t("nav.contact")}
                title={<>Fiber, quantity, destination.<br /><em style={{ color: "var(--terracotta)" }}>We take it from there.</em></>}
                lead="One business day to a reply — from Egypt or Guangzhou, whichever is awake."
            />
            <section>
                <div className="wrap split" style={{ alignItems: "start" }}>
                    <Reveal>
                        {flash.success && <div className="form-ok" style={{ marginBottom: "1.4rem" }}>{t("contact.success")}</div>}
                        <form className="form" onSubmit={submit}>
                            {/* honeypot */}
                            <input type="text" name="website" value={data.website} onChange={(e) => setData("website", e.target.value)}
                                style={{ position: "absolute", left: "-9999px" }} tabIndex={-1} autoComplete="off" aria-hidden />
                            <div className="field">
                                <label>{t("contact.name")} *</label>
                                <input name="name" value={data.name} onChange={(e) => setData("name", e.target.value)} required />
                                {errors.name && <div className="err">{errors.name}</div>}
                            </div>
                            <div className="field">
                                <label>{t("contact.company")}</label>
                                <input name="company" value={data.company} onChange={(e) => setData("company", e.target.value)} />
                            </div>
                            <div className="field">
                                <label>{t("contact.email")} *</label>
                                <input type="email" name="email" value={data.email} onChange={(e) => setData("email", e.target.value)} required />
                                {errors.email && <div className="err">{errors.email}</div>}
                            </div>
                            <div className="field">
                                <label>{t("contact.phone")}</label>
                                <input name="phone" value={data.phone} onChange={(e) => setData("phone", e.target.value)} />
                            </div>
                            <div className="field">
                                <label>{t("contact.country")}</label>
                                <input name="country" value={data.country} onChange={(e) => setData("country", e.target.value)} />
                            </div>
                            <div className="field">
                                <label>{t("contact.product")}</label>
                                <select name="product_interest" value={data.product_interest} onChange={(e) => setData("product_interest", e.target.value)}>
                                    <option value="">—</option>
                                    {products.map((p) => <option key={p} value={p}>{p}</option>)}
                                    <option value="Other / multiple">Other / multiple</option>
                                </select>
                            </div>
                            <div className="field full">
                                <label>{t("contact.message")} *</label>
                                <textarea name="message" rows={5} value={data.message} onChange={(e) => setData("message", e.target.value)} required />
                                {errors.message && <div className="err">{errors.message}</div>}
                            </div>
                            <div className="full">
                                <button className="btn btn-primary" disabled={processing}>
                                    {processing ? "…" : t("cta.send")} <span className="arrow">→</span>
                                </button>
                            </div>
                        </form>
                    </Reveal>
                    <Reveal delay={1}>
                        <div className="card"><div className="pad">
                            <h3>Direct lines</h3>
                            <ul className="ticks" style={{ marginTop: ".8rem" }}>
                                <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
                                <li><a href={`tel:${settings.phone?.replace(/\s/g, "")}`}>{settings.phone}</a></li>
                                <li>
                                    <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer">
                                        WhatsApp — fastest for samples & photos
                                    </a>
                                </li>
                                <li>{settings.address_en}</li>
                                <li>{settings.china_office}</li>
                            </ul>
                            {settings.map_url && (
                                <a href={settings.map_url} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ marginTop: "1.4rem" }}>
                                    Open mill location →
                                </a>
                            )}
                        </div></div>
                    </Reveal>
                </div>
            </section>
        </SiteLayout>
    );
}
