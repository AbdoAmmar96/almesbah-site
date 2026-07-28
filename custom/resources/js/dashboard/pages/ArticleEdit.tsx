import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

const blankTr = { locale: "en", title: "", slug: "", excerpt: "", body: "", seo_title: "", seo_description: "" };

export default function ArticleEdit() {
    const { id } = useParams();
    const isNew = id === "new";
    const nav = useNavigate();
    const [a, setA] = useState<any>({ image: "", status: "draft", published_at: null, author: "ALMESBAH Editorial", translations: [{ ...blankTr }] });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!isNew) api.get(`/dashboard/api/articles/${id}`).then(setA);
    }, [id]);

    const tr = a.translations[0] ?? blankTr;
    const setTr = (patch: any) => setA({ ...a, translations: [{ ...tr, ...patch }] });

    const save = async () => {
        const res = isNew
            ? await api.post("/dashboard/api/articles", { ...a, translations: [tr] })
            : await api.put(`/dashboard/api/articles/${id}`, { ...a, translations: [tr] });
        setSaved(true); setTimeout(() => setSaved(false), 1800);
        if (isNew) nav(`/articles/${res.id}`);
    };

    const uploadImg = async (f?: File) => {
        if (!f) return;
        const { path } = await api.upload(f);
        setA({ ...a, image: path });
    };

    return (
        <>
            <div className="bar">
                <h1>{isNew ? "New article" : tr.title}</h1>
                <div style={{ display: "flex", gap: ".6rem" }}>
                    <select value={a.status} onChange={(e) => setA({ ...a, status: e.target.value })}
                        style={{ borderRadius: 999, padding: ".45rem .9rem", border: "1.5px solid var(--line)" }}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    <button className="btn btn-p" onClick={save}>Save</button>
                </div>
            </div>
            <div className="panel">
                <div className="form">
                    <div className="field"><label>Title</label>
                        <input value={tr.title} onChange={(e) => setTr({ title: e.target.value })} /></div>
                    <div className="field"><label>Slug</label>
                        <input value={tr.slug} onChange={(e) => setTr({ slug: e.target.value })} /></div>
                    <div className="field full"><label>Excerpt</label>
                        <input value={tr.excerpt ?? ""} onChange={(e) => setTr({ excerpt: e.target.value })} /></div>
                    <div className="field full"><label>Body (Markdown — ##, **, [link](url), tables, lists)</label>
                        <textarea rows={18} value={tr.body ?? ""} onChange={(e) => setTr({ body: e.target.value })} /></div>
                    <div className="field"><label>SEO title</label>
                        <input value={tr.seo_title ?? ""} onChange={(e) => setTr({ seo_title: e.target.value })} /></div>
                    <div className="field"><label>SEO description</label>
                        <input value={tr.seo_description ?? ""} onChange={(e) => setTr({ seo_description: e.target.value })} /></div>
                    <div className="field"><label>Cover image</label>
                        <input type="file" accept="image/*" onChange={(e) => uploadImg(e.target.files?.[0])} />
                        {a.image && <div className="hint">{a.image}</div>}</div>
                    <div className="field"><label>Author</label>
                        <input value={a.author ?? ""} onChange={(e) => setA({ ...a, author: e.target.value })} /></div>
                </div>
            </div>
            {saved && <div className="toast">Saved ✓</div>}
        </>
    );
}
