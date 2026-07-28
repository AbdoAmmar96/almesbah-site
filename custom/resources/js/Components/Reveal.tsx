import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", style }:
    { children: ReactNode; delay?: 0 | 1 | 2 | 3; as?: any; className?: string; style?: CSSProperties }) {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
        }, { threshold: 0.12 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return <Tag ref={ref} style={style} className={`rv ${delay ? `rv-d${delay}` : ""} ${className}`}>{children}</Tag>;
}
