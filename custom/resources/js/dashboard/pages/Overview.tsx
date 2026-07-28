import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Overview() {
    const [s, setS] = useState<any>(null);
    useEffect(() => { api.get("/dashboard/api/stats").then(setS); }, []);
    if (!s) return <h1>Loading…</h1>;

    return (
        <>
            <h1>Overview</h1>
            <div className="cards">
                <div className="stat hot"><b>{s.inquiries_new}</b><span>NEW INQUIRIES</span></div>
                <div className="stat"><b>{s.inquiries}</b><span>TOTAL INQUIRIES</span></div>
                <div className="stat"><b>{s.products}</b><span>PRODUCTS LIVE</span></div>
                <div className="stat"><b>{s.articles} / {s.articles + s.drafts}</b><span>ARTICLES PUBLISHED</span></div>
            </div>
            <div className="panel">
                <h2>Latest inquiries</h2>
                <table>
                    <thead><tr><th>Name</th><th>Company</th><th>Country</th><th>Product</th><th>Status</th></tr></thead>
                    <tbody>
                        {s.latest.map((q: any) => (
                            <tr key={q.id}>
                                <td><Link to="/inquiries" style={{ fontWeight: 700 }}>{q.name}</Link></td>
                                <td>{q.company ?? "—"}</td>
                                <td>{q.country ?? "—"}</td>
                                <td>{q.product_interest ?? "—"}</td>
                                <td><span className={`badge ${q.status}`}>{q.status}</span></td>
                            </tr>
                        ))}
                        {s.latest.length === 0 && <tr><td colSpan={5}>No inquiries yet — share the site and watch this table.</td></tr>}
                    </tbody>
                </table>
            </div>
            {s.by_product.length > 0 && (
                <div className="panel" style={{ marginTop: "1.2rem" }}>
                    <h2>Demand by product</h2>
                    <table>
                        <tbody>
                            {s.by_product.map((r: any) => (
                                <tr key={r.product_interest}>
                                    <td>{r.product_interest}</td>
                                    <td style={{ width: "60%" }}>
                                        <div style={{ background: "var(--line)", borderRadius: 99 }}>
                                            <div style={{ width: `${(r.c / s.by_product[0].c) * 100}%`, background: "var(--terra)", color: "#fff", fontSize: ".72rem", padding: ".15rem .6rem", borderRadius: 99 }}>{r.c}</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
