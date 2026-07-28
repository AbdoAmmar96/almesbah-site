import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { api } from "./api";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Products from "./pages/Products";
import ProductEdit from "./pages/ProductEdit";
import Articles from "./pages/Articles";
import ArticleEdit from "./pages/ArticleEdit";
import Inquiries from "./pages/Inquiries";
import GalleryPage from "./pages/Gallery";
import Settings from "./pages/Settings";
import SeoPage from "./pages/Seo";
import Users from "./pages/Users";
import Account from "./pages/Account";

type User = { id: number; name: string; email: string; is_admin: boolean };

export default function App() {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const nav = useNavigate();

    useEffect(() => {
        api.get("/dashboard/api/me")
            .then((d) => setUser(d.user))
            .catch(() => setUser(null));
    }, []);

    if (user === undefined) return null;
    if (user === null) return <Login onLogin={(u) => { setUser(u); nav("/"); }} />;

    const logout = async () => {
        await api.post("/dashboard/logout");
        setUser(null);
    };

    const links: [string, string][] = [
        ["/", "Overview"], ["/products", "Products"], ["/articles", "Articles"],
        ["/inquiries", "Inquiries"], ["/gallery", "Gallery"], ["/seo", "SEO"], ["/settings", "Settings"],
        ...(user.is_admin ? [["/users", "Users"] as [string, string]] : []),
        ["/account", "Account"],
    ];

    return (
        <div className="layout">
            <aside className="side">
                <div className="logo">ALMESBAH<span>CONTROL ROOM</span></div>
                {links.map(([to, label]) => (
                    <NavLink key={to} to={to} end={to === "/"}
                        className={({ isActive }) => (isActive ? "active" : "")}>
                        {label}
                    </NavLink>
                ))}
                <div className="spacer" />
                <button className="logout" onClick={logout}>Sign out — {user.name}</button>
            </aside>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductEdit />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/articles/:id" element={<ArticleEdit />} />
                    <Route path="/inquiries" element={<Inquiries />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/seo" element={<SeoPage />} />
                    <Route path="/settings" element={<Settings />} />
                    {user.is_admin && <Route path="/users" element={<Users meId={user.id} />} />}
                    <Route path="/account" element={<Account me={user} />} />
                </Routes>
            </main>
        </div>
    );
}
