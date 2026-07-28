import SiteLayout from "@/Layouts/SiteLayout";
import Reveal from "@/Components/Reveal";
import ArticleCardItem from "@/Components/ArticleCardItem";
import RfqBanner from "@/Components/RfqBanner";
import { md, useT } from "@/i18n";
import { Link } from "@inertiajs/react";
import type { ArticleCard, Seo } from "@/types";

type A = { title: string; excerpt: string; body: string; image: string | null; author: string; published_at: string };

export default function BlogShow({ seo, article, more }: { seo: Seo; article: A; more: ArticleCard[] }) {
    const { t, url } = useT();
    return (
        <SiteLayout seo={seo}>
            <div className="page-hero">
                <div className="wrap" style={{ maxWidth: "820px" }}>
                    <div className="crumb"><Link href={url("/blog")}>{t("nav.blog")}</Link> / {article.title}</div>
                    <span className="eyebrow">{article.published_at} · {article.author}</span>
                    <h1 style={{ margin: ".7rem 0 .6rem", fontSize: "clamp(1.9rem,4vw,2.9rem)" }}>{article.title}</h1>
                    <p className="lead">{article.excerpt}</p>
                </div>
            </div>
            <section>
                <div className="wrap" style={{ maxWidth: "820px" }}>
                    {article.image && (
                        <Reveal className="img" style={{ borderRadius: "var(--radius)", overflow: "hidden", marginBottom: "2.2rem", boxShadow: "var(--shadow)" }}>
                            <img src={article.image} alt="" style={{ width: "100%", maxHeight: "420px", objectFit: "cover" }} />
                        </Reveal>
                    )}
                    <div className="prose" dangerouslySetInnerHTML={{ __html: md(article.body || "") }} />
                </div>
            </section>
            {more.length > 0 && (
                <section style={{ paddingTop: 0 }}>
                    <div className="wrap">
                        <div className="stitch" style={{ marginBottom: "2.6rem" }} />
                        <h2 style={{ fontSize: "1.6rem", marginBottom: "1.6rem" }}>Keep reading</h2>
                        <div className="grid grid-3">
                            {more.map((a) => <ArticleCardItem key={a.slug} a={a} />)}
                        </div>
                    </div>
                </section>
            )}
            <RfqBanner />
        </SiteLayout>
    );
}
