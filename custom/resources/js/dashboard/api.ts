const metaCsrf = () =>
    (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? "";

// Laravel regenerates the session (and CSRF token) on login. The XSRF-TOKEN
// cookie always carries the CURRENT token, so we prefer it over the static meta.
const xsrfCookie = () => {
    const m = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : "";
};

async function req(method: string, path: string, body?: unknown) {
    const isForm = body instanceof FormData;
    const res = await fetch(path, {
        method,
        headers: {
            ...(xsrfCookie() ? { "X-XSRF-TOKEN": xsrfCookie() } : { "X-CSRF-TOKEN": metaCsrf() }),
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            ...(body && !isForm ? { "Content-Type": "application/json" } : {}),
        },
        body: body ? (isForm ? (body as FormData) : JSON.stringify(body)) : undefined,
        credentials: "same-origin",
    });
    if (res.status === 401) throw Object.assign(new Error("unauthenticated"), { status: 401 });
    const data = res.status === 204 ? null : await res.json().catch(() => null);
    if (!res.ok) throw Object.assign(new Error(data?.message ?? "Request failed"), { status: res.status, data });
    return data;
}

export const api = {
    get: (p: string) => req("GET", p),
    post: (p: string, b?: unknown) => req("POST", p, b),
    put: (p: string, b?: unknown) => req("PUT", p, b),
    patch: (p: string, b?: unknown) => req("PATCH", p, b),
    del: (p: string) => req("DELETE", p),
    upload: async (file: File) => {
        const fd = new FormData();
        fd.append("file", file);
        return req("POST", "/dashboard/api/upload", fd) as Promise<{ path: string }>;
    },
};
