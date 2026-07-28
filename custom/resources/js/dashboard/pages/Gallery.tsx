import { useEffect, useState } from "react";
import { api } from "../api";

export default function GalleryPage() {
    const [rows, setRows] = useState<any[]>([]);
    const [caption, setCaption] = useState("");
    const load = () => api.get("/dashboard/api/gallery").then(setRows);
    useEffect(() => { load(); }, []);

    const add = async (f?: File) => {
        if (!f) return;
        const { path } = await api.upload(f);
        await api.post("/dashboard/api/gallery", { image: path, caption, album: "factory", sort: rows.length });
        setCaption(""); load();
    };

    const del = async (id: number) => {
        await api.del(`/dashboard/api/gallery/${id}`);
        load();
    };

    return (
        <>
            <div className="bar">
                <h1>Gallery</h1>
                <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
                    <input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)}
                        style={{ padding: ".5rem .8rem", borderRadius: 8, border: "1.5px solid var(--line)" }} />
                    <label className="btn btn-p" style={{ cursor: "pointer" }}>
                        + Upload photo
                        <input type="file" accept="image/*" hidden onChange={(e) => add(e.target.files?.[0])} />
                    </label>
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1rem" }}>
                {rows.map((g) => (
                    <div key={g.id} className="panel" style={{ padding: 0 }}>
                        <img src={g.image} alt="" style={{ width: "100%", height: 140, objectFit: "cover" }} />
                        <div style={{ padding: ".6rem .8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>{g.caption || "—"}</span>
                            <button className="btn-danger" onClick={() => del(g.id)}>×</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
