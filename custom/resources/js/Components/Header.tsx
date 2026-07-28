import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useShared, useT } from "@/i18n";

const LOCALE_LABELS: Record<string, string> = { en: "EN", zh: "中文", ar: "العربية" };

export default function Header() {
    const { locales } = useShared();
    const { t, url, locale } = useT();
    const [open, setOpen] = useState(false);
    const path = (usePage().url as string) || "";
    const bare = path.replace(new RegExp(`^/${locale}`), "") || "/";

    // fullscreen mobile menu: freeze the page behind it
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const links = [
        ["/", "nav.home"], ["/about", "nav.about"], ["/products", "nav.products"],
        ["/industries", "nav.industries"], ["/export", "nav.export"],
        ["/blog", "nav.blog"], ["/contact", "nav.contact"],
    ] as const;

    return (
        <header>
            <nav className="nav">
                <div className="wrap">
                    <Link href={url("/")} className="brand" aria-label="ALMESBAH — home">
                        <strong>ALMESBAH</strong>
                        <span>EGYPTIAN FLAX · EST. NILE DELTA</span>
                    </Link>
                    <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? "✕" : "☰"}</button>
                    <div className={`nav-links ${open ? "open" : ""}`}>
                        {links.map(([href, key]) => (
                            <Link key={href} href={url(href)}
                                className={path === url(href) ? "active" : ""}
                                onClick={() => setOpen(false)}>
                                {t(key)}
                            </Link>
                        ))}
                        {locales.length > 1 && (
                            <span className="lang-switch">
                                {locales.map((l) => (
                                    <a key={l} href={`/${l}${bare === "/" ? "" : bare}`}
                                        className={l === locale ? "on" : ""}>
                                        {LOCALE_LABELS[l] ?? l.toUpperCase()}
                                    </a>
                                ))}
                            </span>
                        )}
                        <Link href={url("/contact")} className="btn btn-primary" style={{ padding: ".65rem 1.3rem" }}>
                            {t("cta.quote")}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
