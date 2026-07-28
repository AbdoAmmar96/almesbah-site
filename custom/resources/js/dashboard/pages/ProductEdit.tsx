import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

const blankTr = { locale: "en", name: "", slug: "", summary: "", description: "", specs: [], uses: [], seo_title: "", seo_description: "" };

export default function ProductEdit() {
    const { id } = useParams();
    const isNew = id === "new";
    const nav = useNavigate();
    const [p, setP] = useState<any>({ image: "", sort: 0, is_published: true, export_markets: [], translations: [ { ...blankTr } ] });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!isNew) api.get(`/dashboard/api/products/${id}`).then(setP);
    }, [id]);

    const tr = p.translations[0] ?? blankTr;
    const setTr = (patch: any) => setP({ ...p, translations: [{ ...tr, ...patch }] });

    const save = async () => {
        const payload = { ...p, export_markets: p.export_markets, translations: [tr] };
        const res = isNew
            ? await api.post("/dashboard/api/products", payload)
            : await api.put(`/dashboard/api/products/${id}`, payload);
        setSaved(true); setTimeout(() => setSaved(false), 1800);
        if (isNew) nav(`/products/${res.id}`);
    };

    const uploadImg = async (f?: File) => {
        if (!f) return;
        const { path } = await api.upload(f);
        setP({ ...p, image: path });
    };

    const setSpec = (i: number, k: "label" | "value", v: string) => {
        const specs = [...(tr.specs ?? [])];
        specs[i] = { ...specs[i], [k]: v };
        setTr({ specs });
    };

    return (
        <>
            <div className="bar">
                <h1>{isNew ? "New product" : tr.name}</h1>
                <button className="btn btn-p" onClick={save}>Save</button>
            </div>
            <div className="panel">
                <div className="form">
                    <div className="field"><label>Name</label>
                        <input value={tr.name} onChange={(e) => setTr({ name: e.target.value })} /></div>
                    <div className="field"><label>Slug</label>
                        <input value={tr.slug} onChange={(e) => setTr({ slug: e.target.value })} />
                        <div className="hint">Changing a live slug breaks old links — add a redirect if you must.</div></div>
                    <div className="field full"><label>Summary (card text)</label>
                        <input value={tr.summary ?? ""} onChange={(e) => setTr({ summary: e.target.value })} /></div>
                    <div className="field full"><label>Description (Markdown)</label>
                        <textarea rows={8} value={tr.description ?? ""} onChange={(e) => setTr({ description: e.target.value })} /></div>

                    <div className="field full"><label>Specifications</label>
                        <div className="speclist">
                            {(tr.specs ?? []).map((s: any, i: number) => (
                                <div className="specrow" key={i}>
                                    <input placeholder="Label" value={s.label} onChange={(e) => setSpec(i, "label", e.target.value)} />
                                    <input placeholder="Value" value={s.value} onChange={(e) => setSpec(i, "value", e.target.value)} />
                                    <button className="btn-danger" onClick={() => setTr({ specs: tr.specs.filter((_: any, j: number) => j !== i) })}>×</button>
                                </div>
                            ))}
                            <button className="btn btn-g" onClick={() => setTr({ specs: [...(tr.specs ?? []), { label: "", value: "" }] })}>+ Add spec</button>
                        </div></div>

                    <div className="field"><label>Uses (comma-separated)</label>
                        <input value={(tr.uses ?? []).join(", ")}
                            onChange={(e) => setTr({ uses: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>
                    <div className="field"><label>Export markets (comma-separated)</label>
                        <input value={(p.export_markets ?? []).join(", ")}
                            onChange={(e) => setP({ ...p, export_markets: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} /></div>

                    <div className="field"><label>SEO title</label>
                        <input value={tr.seo_title ?? ""} onChange={(e) => setTr({ seo_title: e.target.value })} /></div>
                    <div className="field"><label>SEO description</label>
                        <input value={tr.seo_description ?? ""} onChange={(e) => setTr({ seo_description: e.target.value })} /></div>

                    <div className="field"><label>Image</label>
                        <input type="file" accept="image/*" onChange={(e) => uploadImg(e.target.files?.[0])} />
                        {p.image && <div className="hint">{p.image}</div>}</div>
                    <div className="field"><label>Visibility / sort</label>
                        <select value={p.is_published ? "1" : "0"} onChange={(e) => setP({ ...p, is_published: e.target.value === "1" })}>
                            <option value="1">Live</option><option value="0">Hidden</option>
                        </select>
                        <input type="number" style={{ marginTop: ".5rem" }} value={p.sort} onChange={(e) => setP({ ...p, sort: +e.target.value })} /></div>
                </div>
            </div>
            {saved && <div className="toast">Saved ✓</div>}
        </>
    );
}
