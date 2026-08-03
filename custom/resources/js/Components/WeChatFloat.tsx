import { useEffect, useRef, useState } from "react";
import { WcIcon } from "@/Components/ChannelIcons";
import { useContactLines } from "@/contactLines";
import { useT } from "@/i18n";

/**
 * WeChat has no wa.me-style number link, so the button opens a panel instead:
 * one QR per line to scan from a desktop, plus an add-friend link for phones
 * that already have the app. Sits directly above <WhatsAppFloat />.
 */
export default function WeChatFloat() {
    const { t } = useT();
    const [open, setOpen] = useState(false);
    const box = useRef<HTMLDivElement>(null);

    const accounts = useContactLines().filter((l) => l.wechatQr || l.wechatUrl);

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

    if (!accounts.length) return null;

    return (
        <div className="wechat-float" ref={box}>
            {open && (
                <div className="wechat-card" role="dialog" aria-label={t("cta.wechat", "Chat on WeChat")}>
                    <button className="wechat-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
                    <strong>{t("wechat.title", "Add us on WeChat")}</strong>
                    <div className="wechat-accounts">
                        {accounts.map((a) => (
                            <div className="wechat-acct" key={a.phone}>
                                {a.wechatQr && (
                                    <img src={a.wechatQr} width={150} height={150}
                                        alt={t("wechat.scan", "Scan this QR code in WeChat to add us")} />
                                )}
                                <span dir="ltr">{a.phone}</span>
                                {a.wechatUrl && (
                                    <a className="wechat-open" href={a.wechatUrl} target="_blank" rel="noreferrer">
                                        {t("wechat.open", "Open in WeChat")} →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                    <small>{t("wechat.hint", "Both our lines are on WhatsApp and WeChat.")}</small>
                </div>
            )}
            <button className="wechat-btn" onClick={() => setOpen(!open)}
                aria-label={t("cta.wechat", "Chat on WeChat")} aria-expanded={open}>
                <WcIcon />
            </button>
        </div>
    );
}
