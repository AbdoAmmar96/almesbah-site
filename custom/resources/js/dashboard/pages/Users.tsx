import { useEffect, useState } from "react";
import { api } from "../api";

type Row = { id: number; name: string; email: string; is_admin: boolean; created_at: string };

const BLANK = { name: "", email: "", password: "", is_admin: false };

export default function Users({ meId }: { meId: number }) {
    const [rows, setRows] = useState<Row[]>([]);
    const [draft, setDraft] = useState({ ...BLANK });
    const [adding, setAdding] = useState(false);
    const [pwFor, setPwFor] = useState<number | null>(null);
    const [pw, setPw] = useState("");
    const [toast, setToast] = useState("");
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);

    const load = () => api.get("/dashboard/api/users").then(setRows);
    useEffect(() => { load(); }, []);

    const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 1800); };

    const add = async () => {
        setErr(""); setBusy(true);
        try {
            await api.post("/dashboard/api/users", draft);
            setDraft({ ...BLANK }); setAdding(false);
            flash("User added ✓"); load();
        } catch (e: any) { setErr(e.data?.message ?? e.message); }
        finally { setBusy(false); }
    };

    const savePw = async (id: number) => {
        setErr(""); setBusy(true);
        try {
            await api.put(`/dashboard/api/users/${id}`, { password: pw });
            setPwFor(null); setPw("");
            flash("Password changed ✓");
        } catch (e: any) { setErr(e.data?.message ?? e.message); }
        finally { setBusy(false); }
    };

    const del = async (u: Row) => {
        if (!confirm(`Delete ${u.email}? They will lose dashboard access.`)) return;
        setErr("");
        try { await api.del(`/dashboard/api/users/${u.id}`); flash("User deleted ✓"); load(); }
        catch (e: any) { setErr(e.data?.message ?? e.message); }
    };

    return (
        <>
            <div className="bar">
                <h1>Users</h1>
                <button className="btn btn-p" onClick={() => setAdding(!adding)}>
                    {adding ? "Cancel" : "+ Add user"}
                </button>
            </div>

            {adding && (
                <div className="panel" style={{ marginBottom: "1.2rem" }}>
                    <div className="form">
                        <div className="field">
                            <label>Name</label>
                            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
                        </div>
                        <div className="field">
                            <label>Password (min 8 chars)</label>
                            <input type="password" value={draft.password} onChange={(e) => setDraft({ ...draft, password: e.target.value })} />
                        </div>
                        <div className="field">
                            <label>Role</label>
                            <select value={draft.is_admin ? "1" : "0"} onChange={(e) => setDraft({ ...draft, is_admin: e.target.value === "1" })}>
                                <option value="0">Editor — can only change their own password</option>
                                <option value="1">Admin — full user management</option>
                            </select>
                        </div>
                        <div className="full">
                            <button className="btn btn-p" onClick={add} disabled={busy}>{busy ? "Saving…" : "Create user"}</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="panel">
                <table>
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Added</th><th></th></tr></thead>
                    <tbody>
                        {rows.map((u) => (
                            <tr key={u.id}>
                                <td style={{ fontWeight: 700 }}>{u.name}{u.id === meId && <span style={{ color: "var(--muted)", fontWeight: 400 }}> (you)</span>}</td>
                                <td>{u.email}</td>
                                <td><span className={`badge ${u.is_admin ? "published" : "draft"}`}>{u.is_admin ? "admin" : "editor"}</span></td>
                                <td style={{ color: "var(--muted)" }}>{u.created_at?.slice(0, 10)}</td>
                                <td style={{ whiteSpace: "nowrap" }}>
                                    {u.id === meId ? (
                                        <span className="hint">change yours in Account</span>
                                    ) : pwFor === u.id ? (
                                        <span style={{ display: "inline-flex", gap: ".4rem" }}>
                                            <input type="password" autoFocus placeholder="New password"
                                                value={pw} onChange={(e) => setPw(e.target.value)}
                                                style={{ padding: ".35rem .6rem", borderRadius: 8, border: "1.5px solid var(--line)" }} />
                                            <button className="btn btn-p" style={{ padding: ".35rem .8rem", fontSize: ".78rem" }} onClick={() => savePw(u.id)} disabled={busy}>{busy ? "…" : "Save"}</button>
                                            <button className="btn-s" onClick={() => { setPwFor(null); setPw(""); }}>Cancel</button>
                                        </span>
                                    ) : (
                                        <button className="btn-s" onClick={() => { setPwFor(u.id); setPw(""); }}>Change password</button>
                                    )}
                                    {u.id !== meId && (
                                        <button className="btn-danger" style={{ marginLeft: ".5rem" }} onClick={() => del(u)}>Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {err && <div className="err" style={{ marginTop: ".8rem" }}>{err}</div>}
            {toast && <div className="toast">{toast}</div>}
        </>
    );
}
