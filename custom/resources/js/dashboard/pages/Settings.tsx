import { useEffect, useState } from "react";
import { api } from "../api";

const FIELDS: [string, string][] = [
    ["email", "Public email"], ["inquiry_email", "Inquiries go to"],
    ["phone", "Line 1 — phone"], ["whatsapp", "Line 1 — WhatsApp (digits only)"],
    ["wechat_url", "Line 1 — WeChat link (u.wechat.com/…)"], ["wechat_qr", "Line 1 — WeChat QR image"],
    ["phone2", "Line 2 — phone"], ["whatsapp2", "Line 2 — WhatsApp (digits only)"],
    ["wechat_url2", "Line 2 — WeChat link (u.wechat.com/…)"], ["wechat_qr2", "Line 2 — WeChat QR image"],
    ["address_en", "Address (EN)"], ["china_office", "China office"],
    ["map_url", "Google Maps URL"],
    ["founded", "Founded year"], ["linkedin", "LinkedIn URL"],
];

export default function Settings() {
    const [s, setS] = useState<Record<string, string>>({});
    const [saved, setSaved] = useState(false);
    useEffect(() => { api.get("/dashboard/api/settings").then(setS); }, []);

    const save = async () => {
        await api.put("/dashboard/api/settings", s);
        setSaved(true); setTimeout(() => setSaved(false), 1800);
    };

    return (
        <>
            <div className="bar">
                <h1>Settings</h1>
                <button className="btn btn-p" onClick={save}>Save</button>
            </div>
            <div className="panel">
                <div className="form">
                    {FIELDS.map(([key, label]) => (
                        <div className="field" key={key}>
                            <label>{label}</label>
                            <input value={s[key] ?? ""} onChange={(e) => setS({ ...s, [key]: e.target.value })} />
                        </div>
                    ))}
                </div>
            </div>
            {saved && <div className="toast">Saved ✓</div>}
        </>
    );
}
