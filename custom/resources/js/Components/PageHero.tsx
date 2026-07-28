import { Link } from "@inertiajs/react";
import { useT } from "@/i18n";
import type { ReactNode } from "react";

export default function PageHero({ eyebrow, title, lead, crumb }:
    { eyebrow: string; title: ReactNode; lead?: string; crumb?: string }) {
    const { t, url } = useT();
    return (
        <div className="page-hero">
            <div className="wrap">
                <div className="crumb">
                    <Link href={url("/")}>{t("nav.home")}</Link> / {crumb ?? eyebrow}
                </div>
                <span className="eyebrow">{eyebrow}</span>
                <h1 style={{ margin: ".7rem 0 .6rem", fontSize: "clamp(2rem,4.4vw,3.2rem)" }}>{title}</h1>
                {lead && <p className="lead">{lead}</p>}
            </div>
        </div>
    );
}
