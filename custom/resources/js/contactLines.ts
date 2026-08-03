import { useShared } from "@/i18n";

export type ContactLine = {
    phone: string;
    whatsapp?: string;
    wechatUrl?: string;
    wechatQr?: string;
};

/**
 * The company's phone lines. Each one carries both WhatsApp and WeChat, and each
 * has its own WeChat account — so the QR and add-friend link are per line, not global.
 */
export function useContactLines(): ContactLine[] {
    const { settings } = useShared();
    return [
        {
            phone: settings.phone,
            whatsapp: settings.whatsapp,
            wechatUrl: settings.wechat_url,
            wechatQr: settings.wechat_qr,
        },
        {
            phone: settings.phone2,
            whatsapp: settings.whatsapp2,
            wechatUrl: settings.wechat_url2,
            wechatQr: settings.wechat_qr2,
        },
    ].filter((l) => l.phone);
}

export const telHref = (phone: string) => `tel:${phone.replace(/[\s()-]/g, "")}`;
