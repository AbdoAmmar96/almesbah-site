import { WaIcon, WcIcon } from "@/Components/ChannelIcons";
import { useContactLines, telHref } from "@/contactLines";
import { useT } from "@/i18n";

/** Both company lines carry WhatsApp and WeChat — the badges say so, and link out. */
export default function PhoneLines({ compact = false }: { compact?: boolean }) {
    const lines = useContactLines();
    const { t } = useT();

    return (
        <>
            {lines.map((l) => (
                <li key={l.phone}>
                    <a href={telHref(l.phone)} dir="ltr">{l.phone}</a>
                    <span className="chans">
                        {l.whatsapp && (
                            <a className="chan chan-wa" href={`https://wa.me/${l.whatsapp}`}
                                target="_blank" rel="noreferrer" aria-label={`WhatsApp ${l.phone}`}>
                                <WaIcon />WhatsApp
                            </a>
                        )}
                        {l.wechatUrl && (
                            <a className="chan chan-wc" href={l.wechatUrl}
                                target="_blank" rel="noreferrer" aria-label={`WeChat ${l.phone}`}>
                                <WcIcon />WeChat
                            </a>
                        )}
                    </span>
                </li>
            ))}
            {!compact && (
                <li className="chan-note">
                    {t("contact.both_channels", "Both lines are reachable on WhatsApp and WeChat.")}
                </li>
            )}
        </>
    );
}
