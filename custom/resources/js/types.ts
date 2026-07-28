export type Settings = Record<string, string>;

export type Shared = {
    locale: string;
    locales: string[];
    rtl: boolean;
    settings: Settings;
    t: Record<string, string>;
    flash: { success?: boolean };
};

export type Seo = { title: string; description: string };

export type ProductCard = { name: string; slug: string; summary: string; image: string };
export type ArticleCard = { title: string; slug: string; excerpt: string; image: string | null; published_at: string };
