import { useState } from "react";
import { api } from "../api";

export default function Login({ onLogin }: { onLogin: (u: any) => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBusy(true); setErr("");
        try {
            const d = await api.post("/dashboard/login", { email, password });
            onLogin(d.user);
        } catch (ex: any) {
            setErr(ex.message ?? "Login failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="login">
            <form className="box" onSubmit={submit}>
                <h1>ALMESBAH</h1>
                <p>Control room — flax goes in, orders come out.</p>
                <div className="field">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className="btn btn-p" disabled={busy} style={{ width: "100%", justifyContent: "center" }}>
                    {busy ? "…" : "Sign in"}
                </button>
                {err && <div className="err">{err}</div>}
            </form>
        </div>
    );
}
