import SiteLayout from "@/Layouts/SiteLayout";
import PageHero from "@/Components/PageHero";
import Reveal from "@/Components/Reveal";
import ArticleCardItem from "@/Components/ArticleCardItem";
import { useT } from "@/i18n";
import type { ArticleCard, Seo } from "@/types";

export default function Blog({ seo, articles }: { seo: Seo; articles: ArticleCard[] }) {
    const { t } = useT();
    return (
        <SiteLayout seo={seo}>
            <PageHero
                eyebrow={t("nav.blog")}
                title={t("blog.title")}
                lead={t("blog.sub")}
            />
            <section>
                <div className="wrap">
                    <div className="grid grid-3">
                        {articles.map((a, i) => (
                            <Reveal key={a.slug} delay={(i % 3) as 0 | 1 | 2}>
                                <ArticleCardItem a={a} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
