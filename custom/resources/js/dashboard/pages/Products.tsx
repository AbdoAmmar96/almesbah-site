import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Products() {
    const [rows, setRows] = useState<any[]>([]);
    const load = () => api.get("/dashboard/api/products").then(setRows);
    useEffect(() => { load(); }, []);

    const del = async (id: number) => {
        if (!confirm("Delete this product?")) return;
        await api.del(`/dashboard/api/products/${id}`);
        load();
    };

    return (
        <>
            <div className="bar">
                <h1>Products</h1>
                <Link to="/products/new" className="btn btn-p">+ New product</Link>
            </div>
            <div className="panel">
                <table>
                    <thead><tr><th></th><th>Name (en)</th><th>Slug</th><th>Markets</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                        {rows.map((p) => {
                            const en = p.translations.find((t: any) => t.locale === "en");
                            return (
                                <tr key={p.id}>
                                    <td><img src={p.image} alt="" style={{ width: 52, height: 40, objectFit: "cover", borderRadius: 6 }} /></td>
                                    <td><Link to={`/products/${p.id}`} style={{ fontWeight: 700 }}>{en?.name}</Link></td>
                                    <td style={{ color: "var(--muted)" }}>{en?.slug}</td>
                                    <td>{(p.export_markets ?? []).join(", ")}</td>
                                    <td><span className={`badge ${p.is_published ? "published" : "draft"}`}>{p.is_published ? "live" : "hidden"}</span></td>
                                    <td><button className="btn-danger" onClick={() => del(p.id)}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
