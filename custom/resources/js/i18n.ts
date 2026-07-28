import { usePage } from "@inertiajs/react";
import type { Shared } from "./types";

export function useShared(): Shared {
    return usePage().props as unknown as Shared;
}

export function useT() {
    const { t, locale } = useShared();
    return {
        locale,
        t: (key: string, fallback?: string) => t?.[key] ?? fallback ?? key,
        url: (path = "") => `/${locale}${path}`,
    };
}

/** Tiny markdown renderer for trusted, admin-authored content. */
export function md(src: string): string {
    let h = src
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/^### (.*)$/gm, "<h3>$1</h3>")
        .replace(/^## (.*)$/gm, "<h2>$1</h2>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

    // tables
    h = h.replace(/((?:^\|.*\|\s*$\n?)+)/gm, (block) => {
        const rows = block.trim().split("\n").map((r) => r.trim());
        if (rows.length < 2 || !/^\|[\s:-]+\|/.test(rows[1] ?? "")) return block;
        const cells = (r: string) => r.slice(1, -1).split("|").map((c) => c.trim());
        const head = cells(rows[0]).map((c) => `<th>${c}</th>`).join("");
        const body = rows.slice(2).map((r) => `<tr>${cells(r).map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
        return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
    });

    // lists
    h = h.replace(/((?:^- .*$\n?)+)/gm, (block) => {
        const items = block.trim().split("\n").map((l) => `<li>${l.replace(/^- /, "")}</li>`).join("");
        return `<ul>${items}</ul>`;
    });
    h = h.replace(/((?:^\d+\. .*$\n?)+)/gm, (block) => {
        const items = block.trim().split("\n").map((l) => `<li>${l.replace(/^\d+\. /, "")}</li>`).join("");
        return `<ol>${items}</ol>`;
    });

    return h.split(/\n{2,}/).map((b) => {
        const t = b.trim();
        if (!t) return "";
        return /^<(h\d|ul|ol|table|blockquote)/.test(t) ? t : `<p>${t.replace(/\n/g, "<br/>")}</p>`;
    }).join("\n");
}
