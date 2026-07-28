import { useEffect, useState } from "react";
import { api } from "../api";

export default function Inquiries() {
    const [page, setPage] = useState<any>(null);
    const [filter, setFilter] = useState("");
    const load = (f = filter) =>
        api.get(`/dashboard/api/inquiries${f ? `?status=${f}` : ""}`).then(setPage);
    useEffect(() => { load(); }, [filter]);

    const setStatus = async (id: number, status: string) => {
        await api.patch(`/dashboard/api/inquiries/${id}`, { status });
        load();
    };

    return (
        <>
            <div className="bar">
                <h1>Inquiries</h1>
                <div style={{ display: "flex", gap: ".5rem" }}>
                    {["", "new", "replied", "closed"].map((f) => (
                        <button key={f} className={`btn-s ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>
                            {f === "" ? "All" : f}
                        </button>
                    ))}
                </div>
            </div>
            <div className="panel">
                <table>
                    <thead><tr><th>Contact</th><th>Country</th><th>Product</th><th>Message</th><th>Status</th></tr></thead>
                    <tbody>
                        {page?.data?.map((q: any) => (
                            <tr key={q.id}>
                                <td>
                                    <b>{q.name}</b>{q.company ? ` — ${q.company}` : ""}<br />
                                    <a href={`mailto:${q.email}`} style={{ color: "var(--terra)" }}>{q.email}</a>
                                    {q.phone && <> · <a href={`https://wa.me/${q.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" style={{ color: "var(--ok)" }}>WhatsApp</a></>}
                                </td>
                                <td>{q.country ?? "—"}</td>
                                <td>{q.product_interest ?? "—"}</td>
                                <td style={{ maxWidth: 340, whiteSpace: "pre-wrap" }}>{q.message}</td>
                                <td>
                                    <span className={`badge ${q.status}`}>{q.status}</span>
                                    <div style={{ display: "flex", gap: ".35rem", marginTop: ".5rem" }}>
                                        <button className="btn-s" onClick={() => setStatus(q.id, "replied")}>Replied</button>
                                        <button className="btn-s" onClick={() => setStatus(q.id, "closed")}>Close</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {page?.data?.length === 0 && <tr><td colSpan={5}>Nothing here.</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
}
