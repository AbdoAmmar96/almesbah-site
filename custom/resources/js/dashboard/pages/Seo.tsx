import { useEffect, useState } from "react";
import { api } from "../api";

export default function SeoPage() {
    const [rows, setRows] = useState<any[]>([]);
    const [saved, setSaved] = useState(false);
    useEffect(() => { api.get("/dashboard/api/seo").then(setRows); }, []);

    const save = async (r: any) => {
        await api.put(`/dashboard/api/seo/${r.id}`, { title: r.title, description: r.description });
        setSaved(true); setTimeout(() => setSaved(false), 1400);
    };

    const set = (id: number, patch: any) =>
        setRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

    return (
        <>
            <h1>SEO — static pages</h1>
            <p style={{ color: "var(--muted)", margin: ".4rem 0 1.2rem" }}>
                Products and articles carry their own SEO fields in their editors. These control the fixed pages.
            </p>
            <div className="panel">
                <table>
                    <thead><tr><th>Page</th><th>Title tag</th><th>Meta description</th><th></th></tr></thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.id}>
                                <td style={{ fontWeight: 700 }}>{r.route} <span style={{ color: "var(--muted)" }}>({r.locale})</span></td>
                                <td><input style={{ width: "100%", padding: ".5rem", border: "1px solid var(--line)", borderRadius: 6 }}
                                    value={r.title ?? ""} onChange={(e) => set(r.id, { title: e.target.value })} /></td>
                                <td><textarea rows={2} style={{ width: "100%", padding: ".5rem", border: "1px solid var(--line)", borderRadius: 6 }}
                                    value={r.description ?? ""} onChange={(e) => set(r.id, { description: e.target.value })} /></td>
                                <td><button className="btn btn-g" onClick={() => save(r)}>Save</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {saved && <div className="toast">Saved ✓</div>}
        </>
    );
}
