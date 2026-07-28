import { useState } from "react";
import { api } from "../api";

export default function Account({ me }: { me: { id: number; name: string; email: string } }) {
    const [current, setCurrent] = useState("");
    const [pw, setPw] = useState("");
    const [confirm, setConfirm] = useState("");
    const [err, setErr] = useState("");
    const [toast, setToast] = useState("");
    const [busy, setBusy] = useState(false);

    const save = async () => {
        setErr("");
        if (pw.length < 8) { setErr("New password must be at least 8 characters."); return; }
        if (pw !== confirm) { setErr("New password and confirmation do not match."); return; }
        setBusy(true);
        try {
            await api.put(`/dashboard/api/users/${me.id}`, { current_password: current, password: pw });
            setCurrent(""); setPw(""); setConfirm("");
            setToast("Password changed ✓"); setTimeout(() => setToast(""), 1800);
        } catch (e: any) {
            setErr(e.data?.errors?.current_password?.[0] ?? e.data?.message ?? e.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <>
            <div className="bar"><h1>Account</h1></div>
            <div className="panel" style={{ maxWidth: 520 }}>
                <h2>Change password — {me.email}</h2>
                <div className="form" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="field">
                        <label>Current password</label>
                        <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
                    </div>
                    <div className="field">
                        <label>New password (min 8 chars)</label>
                        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
                    </div>
                    <div className="field">
                        <label>Confirm new password</label>
                        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                    </div>
                    <div>
                        <button className="btn btn-p" onClick={save} disabled={busy}>{busy ? "Saving…" : "Change password"}</button>
                        {err && <div className="err">{err}</div>}
                    </div>
                </div>
            </div>
            {toast && <div className="toast">{toast}</div>}
        </>
    );
}
