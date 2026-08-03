import { useEffect, useRef, useState } from "react";
import { useShared, useT } from "@/i18n";

/**
 * WeChat has no wa.me-style number link, so the button opens a small panel:
 * QR to scan from a desktop, add-friend link for phones that have the app.
 * Sits directly above <WhatsAppFloat /> — deliberately on a different line.
 */
export default function WeChatFloat() {
    const { settings } = useShared();
    const { t } = useT();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const box = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        const onClick = (e: MouseEvent) => {
            if (!box.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onClick);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onClick);
        };
    }, [open]);

    const id = settings.wechat_id;
    const qr = settings.wechat_qr;
    if (!id && !qr && !settings.wechat_url) return null;

    const copy = () => {
        navigator.clipboard?.writeText(id).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        });
    };

    return (
        <div className="wechat-float" ref={box}>
            {open && (
                <div className="wechat-card" role="dialog" aria-label={t("cta.wechat", "Chat on WeChat")}>
                    <button className="wechat-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
                    <strong>{t("wechat.title", "Add us on WeChat")}</strong>
                    {qr && <img src={qr} alt={t("wechat.scan", "Scan this QR code in WeChat to add us")} width={168} height={168} />}
                    {id && (
                        <button className="wechat-id" onClick={copy} title={t("wechat.copy", "Copy")}>
                            <span dir="ltr">{id}</span>
                            <em>{copied ? t("wechat.copied", "Copied ✓") : t("wechat.copy", "Copy")}</em>
                        </button>
                    )}
                    {settings.wechat_url && (
                        <a className="wechat-open" href={settings.wechat_url} target="_blank" rel="noreferrer">
                            {t("wechat.open", "Open in WeChat")} →
                        </a>
                    )}
                    <small>{t("wechat.hint", "Both our lines are on WhatsApp and WeChat.")}</small>
                </div>
            )}
            <button className="wechat-btn" onClick={() => setOpen(!open)}
                aria-label={t("cta.wechat", "Chat on WeChat")} aria-expanded={open}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8.69 2.19C3.89 2.19 0 5.48 0 9.53c0 2.21 1.17 4.2 3 5.55a.59.59 0 0 1 .21.66l-.39 1.48a.44.44 0 0 0-.04.21c0 .17.13.3.29.3a.33.33 0 0 0 .17-.06l1.9-1.11a.86.86 0 0 1 .72-.1c.9.26 1.85.4 2.83.4.28 0 .55-.02.82-.05-.86-2.58.15-4.97 1.93-6.44 1.7-1.42 3.88-1.98 5.85-1.84-.58-3.58-4.2-6.35-8.6-6.35Zm-2.9 3.8c.64 0 1.16.53 1.16 1.18a1.17 1.17 0 0 1-1.17 1.18 1.17 1.17 0 0 1-1.16-1.18c0-.65.52-1.18 1.16-1.18Zm5.81 0c.65 0 1.17.53 1.17 1.18a1.17 1.17 0 0 1-1.17 1.18 1.17 1.17 0 0 1-1.16-1.18c0-.65.52-1.18 1.16-1.18Zm5.34 2.87c-1.79-.05-3.74.51-5.28 1.78-1.72 1.43-2.68 3.72-1.78 6.22.95 2.46 3.67 4.23 6.89 4.23.82 0 1.62-.12 2.36-.35a.72.72 0 0 1 .6.09l1.58.92a.27.27 0 0 0 .14.05c.13 0 .24-.11.24-.25a.62.62 0 0 0-.04-.17l-.32-1.24a.58.58 0 0 1-.03-.15.49.49 0 0 1 .2-.4C23.02 18.48 24 16.82 24 14.98c0-3.21-2.93-5.84-6.66-6.09Zm-3.35 3.19c.53 0 .97.44.97.98a.98.98 0 0 1-.97.99.98.98 0 0 1-.97-.99c0-.54.43-.98.97-.98Zm4.84 0c.54 0 .97.44.97.98a.98.98 0 0 1-.97.99.98.98 0 0 1-.97-.99c0-.54.44-.98.97-.98Z" />
                </svg>
            </button>
        </div>
    );
}
