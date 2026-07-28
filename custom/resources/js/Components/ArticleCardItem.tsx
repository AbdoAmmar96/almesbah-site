import { Link } from "@inertiajs/react";
import { useT } from "@/i18n";
import type { ArticleCard } from "@/types";

export default function ArticleCardItem({ a }: { a: ArticleCard }) {
    const { t, url } = useT();
    return (
        <article className="card post">
            {a.image && <img src={a.image} alt="" loading="lazy" />}
            <div className="thread" />
            <div className="pad">
                <div className="meta">{a.published_at}</div>
                <h3><Link href={url(`/blog/${a.slug}`)}>{a.title}</Link></h3>
                <p>{a.excerpt}</p>
                <Link href={url(`/blog/${a.slug}`)} className="go">
                    {t("cta.read")} <span className="arrow">→</span>
                </Link>
            </div>
        </article>
    );
}
