import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Articles() {
    const [rows, setRows] = useState<any[]>([]);
    const load = () => api.get("/dashboard/api/articles").then(setRows);
    useEffect(() => { load(); }, []);

    const del = async (id: number) => {
        if (!confirm("Delete this article?")) return;
        await api.del(`/dashboard/api/articles/${id}`);
        load();
    };

    return (
        <>
            <div className="bar">
                <h1>Articles</h1>
                <Link to="/articles/new" className="btn btn-p">+ New article</Link>
            </div>
            <div className="panel">
                <table>
                    <thead><tr><th>Title (en)</th><th>Slug</th><th>Status</th><th>Published</th><th></th></tr></thead>
                    <tbody>
                        {rows.map((a) => {
                            const en = a.translations.find((t: any) => t.locale === "en");
                            return (
                                <tr key={a.id}>
                                    <td><Link to={`/articles/${a.id}`} style={{ fontWeight: 700 }}>{en?.title}</Link></td>
                                    <td style={{ color: "var(--muted)" }}>{en?.slug}</td>
                                    <td><span className={`badge ${a.status}`}>{a.status}</span></td>
                                    <td>{a.published_at ? a.published_at.slice(0, 10) : "—"}</td>
                                    <td><button className="btn-danger" onClick={() => del(a.id)}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
