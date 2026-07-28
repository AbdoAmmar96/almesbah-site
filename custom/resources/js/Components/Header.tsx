import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useT } from "@/i18n";

export default function Header() {
    const { t, url } = useT();
    const [open, setOpen] = useState(false);
    const path = (usePage().url as string) || "";

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
                    <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
                    <div className={`nav-links ${open ? "open" : ""}`}>
                        {links.map(([href, key]) => (
                            <Link key={href} href={url(href)}
                                className={path === url(href) ? "active" : ""}
                                onClick={() => setOpen(false)}>
                                {t(key)}
                            </Link>
                        ))}
                        <Link href={url("/contact")} className="btn btn-primary" style={{ padding: ".65rem 1.3rem" }}>
                            {t("cta.quote")}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
