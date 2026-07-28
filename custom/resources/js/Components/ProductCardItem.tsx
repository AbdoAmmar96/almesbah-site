import { Link } from "@inertiajs/react";
import { useT } from "@/i18n";
import type { ProductCard } from "@/types";

export default function ProductCardItem({ p }: { p: ProductCard }) {
    const { url } = useT();
    return (
        <Link href={url(`/products/${p.slug}`)} className="card">
            <img src={p.image} alt={p.name} loading="lazy" />
            <div className="thread" />
            <div className="pad">
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <span className="go">Specs & details <span className="arrow">→</span></span>
            </div>
        </Link>
    );
}
