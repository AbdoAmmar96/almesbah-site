import { Head } from "@inertiajs/react";
import type { ReactNode } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import WhatsAppFloat from "@/Components/WhatsAppFloat";
import WeChatFloat from "@/Components/WeChatFloat";
import { useShared } from "@/i18n";
import type { Seo } from "@/types";

export default function SiteLayout({ seo, children }: { seo: Seo; children: ReactNode }) {
    const { locale, locales, settings } = useShared();
    const path = typeof window !== "undefined" ? window.location.pathname : `/${locale}`;
    const bare = path.replace(new RegExp(`^/${locale}`), "");

    const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ALMESBAH For Export",
        url: typeof window !== "undefined" ? window.location.origin : "",
        email: settings.email,
        telephone: [settings.phone, settings.phone2].filter(Boolean),
        address: { "@type": "PostalAddress", addressLocality: "Shubramillis, Zefta", addressRegion: "Gharbia", addressCountry: "EG" },
        sameAs: settings.linkedin ? [settings.linkedin] : [],
    };

    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                {locales.map((l) => (
                    <link key={l} rel="alternate" hrefLang={l} href={`/${l}${bare}`} />
                ))}
                <link rel="alternate" hrefLang="x-default" href={`/en${bare}`} />
                <script type="application/ld+json">{JSON.stringify(org)}</script>
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
            <WeChatFloat />
            <WhatsAppFloat />
        </>
    );
}
