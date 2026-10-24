import type { ReactNode } from "react";

// Drawing kit for the course diagrams: light "paper" panel colours and small shapes (fixed colours, so they read the same in light and dark themes).

export const INK = "#1f2937";
export const SOFT = "#6b7280";
export const LINE = "#d1d5db";
export const PAPER = "#ffffff";
export const SUNK = "#f3f4f6";
export const RED = "#dc2626";
export const BLUE = "#2563eb";
export const GREEN = "#16a34a";
export const ORANGE = "#ea580c";
export const SKY = "#dbeafe";
export const MINT = "#dcfce7";
export const PEACH = "#ffedd5";
export const ROSE = "#fee2e2";
export const YELLOW = "#fef9c3";

export type P = { x: number; y: number };
export const Rect = ({ x, y, w, h, fill = PAPER, stroke = LINE, r = 6, sw = 1.5, dash }: { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; r?: number; sw?: number; dash?: string }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
);
export const Txt = ({ x, y, children, s = 13, fill = INK, anchor = "start", bold = false, italic = false }: { x: number; y: number; children: ReactNode; s?: number; fill?: string; anchor?: "start" | "middle" | "end"; bold?: boolean; italic?: boolean }) => (
  <text x={x} y={y} fontSize={s} fill={fill} textAnchor={anchor} fontWeight={bold ? 700 : 400} fontStyle={italic ? "italic" : "normal"} fontFamily="system-ui, -apple-system, Segoe UI, sans-serif">
    {children}
  </text>
);
export const Line = ({ a, b, c = SOFT, sw = 2, arrow = false, dash }: { a: P; b: P; c?: string; sw?: number; arrow?: boolean; dash?: string }) => (
  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c} strokeWidth={sw} strokeDasharray={dash} markerEnd={arrow ? "url(#arrow)" : undefined} />
);
/** A numbered red dot, used to point at parts of a screen. */
export const Dot = ({ x, y, n }: { x: number; y: number; n: number }) => (
  <g>
    <circle cx={x} cy={y} r={10} fill={RED} />
    <Txt x={x} y={y + 4} s={12} fill="#fff" anchor="middle" bold>{n}</Txt>
  </g>
);
/** A key on a keyboard. */
export const Key = ({ x, y, w = 44, children }: { x: number; y: number; w?: number; children: ReactNode }) => (
  <g>
    <rect x={x} y={y + 3} width={w} height={34} rx={7} fill={LINE} />
    <rect x={x} y={y} width={w} height={34} rx={7} fill={PAPER} stroke={SOFT} strokeWidth={1.5} />
    <Txt x={x + w / 2} y={y + 22} anchor="middle" bold s={13}>{children}</Txt>
  </g>
);
export const Win = ({ x, y, w, h, title, color }: { x: number; y: number; w: number; h: number; title: string; color: string }) => (
  <g>
    <Rect x={x} y={y} w={w} h={h} fill={PAPER} stroke={color} sw={2} />
    <path d={`M${x} ${y + 24} V${y + 6} a6 6 0 0 1 6 -6 H${x + w - 6} a6 6 0 0 1 6 6 V${y + 24} Z`} fill={color} />
    <Txt x={x + 10} y={y + 17} s={12} fill="#fff" bold>{title}</Txt>
    <circle cx={x + w - 14} cy={y + 12} r={4} fill="#fff" opacity={0.9} />
    <circle cx={x + w - 28} cy={y + 12} r={4} fill="#fff" opacity={0.6} />
  </g>
);
/** A spreadsheet grid starting at (x,y); cells = rows of strings. */
export const Grid = ({ x, y, cols, rows, cw = 80, ch = 26, cells, hi = [], head = true, hiFill = YELLOW, colLabels }: { x: number; y: number; cols: number; rows: number; cw?: number; ch?: number; cells: string[][]; hi?: [number, number][]; head?: boolean; hiFill?: string; colLabels?: string[] }) => {
  const letters = colLabels ?? "ABCDEFGH".split("");
  const off = head ? ch : 0;
  const rowHead = head ? 30 : 0;
  return (
    <g>
      {head &&
        Array.from({ length: cols }).map((_, c) => (
          <g key={`h${c}`}>
            <rect x={x + rowHead + c * cw} y={y} width={cw} height={ch} fill={SUNK} stroke={LINE} />
            <Txt x={x + rowHead + c * cw + cw / 2} y={y + 17} anchor="middle" s={12} fill={SOFT} bold>{letters[c]}</Txt>
          </g>
        ))}
      {Array.from({ length: rows }).map((_, r) => (
        <g key={`r${r}`}>
          {head && (
            <g>
              <rect x={x} y={y + off + r * ch} width={rowHead} height={ch} fill={SUNK} stroke={LINE} />
              <Txt x={x + rowHead / 2} y={y + off + r * ch + 17} anchor="middle" s={12} fill={SOFT} bold>{r + 1}</Txt>
            </g>
          )}
          {Array.from({ length: cols }).map((_, c) => {
            const on = hi.some(([hr, hc]) => hr === r && hc === c);
            return (
              <g key={`c${c}`}>
                <rect x={x + rowHead + c * cw} y={y + off + r * ch} width={cw} height={ch} fill={on ? hiFill : PAPER} stroke={on ? ORANGE : LINE} strokeWidth={on ? 2 : 1} />
                <Txt x={x + rowHead + c * cw + 8} y={y + off + r * ch + 17} s={12}>{cells[r]?.[c] ?? ""}</Txt>
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
};
export const Pill = ({ x, y, w, children, fill = SKY, stroke = BLUE, h = 30 }: { x: number; y: number; w: number; children: ReactNode; fill?: string; stroke?: string; h?: number }) => (
  <g>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={stroke} r={h / 2} />
    <Txt x={x + w / 2} y={y + h / 2 + 4} anchor="middle" s={12} bold>{children}</Txt>
  </g>
);
export const Page = ({ x, y, w = 110, h = 150, lines = 6, fill = PAPER }: { x: number; y: number; w?: number; h?: number; lines?: number; fill?: string }) => (
  <g>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={SOFT} r={4} />
    {Array.from({ length: lines }).map((_, i) => (
      <rect key={i} x={x + 12} y={y + 16 + i * ((h - 32) / lines)} width={i % 3 === 2 ? w * 0.5 : w - 24} height={5} rx={2.5} fill={LINE} />
    ))}
  </g>
);
export const Ribbon = ({ x, y, w, tabs, color }: { x: number; y: number; w: number; tabs: string[]; color: string }) => (
  <g>
    {tabs.map((t, i) => (
      <g key={t}>
        <Txt x={x + 10 + i * 78} y={y + 14} s={11} fill={i === 1 ? color : SOFT} bold={i === 1}>{t}</Txt>
        {i === 1 && <rect x={x + 6 + i * 78} y={y + 19} width={t.length * 7 + 8} height={3} fill={color} />}
      </g>
    ))}
    <Rect x={x} y={y + 24} w={w} h={34} fill={SUNK} stroke={LINE} r={0} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={x + 10 + i * 34} y={y + 31} width={24} height={20} rx={4} fill={PAPER} stroke={LINE} />
    ))}
  </g>
);

export const Box = ({ x, y, w, h, t, s, fill = SKY, stroke = BLUE, size = 13 }: { x: number; y: number; w: number; h: number; t: string; s?: string; fill?: string; stroke?: string; size?: number }) => (
  <g>
    <Rect x={x} y={y} w={w} h={h} fill={fill} stroke={stroke} sw={2} r={10} />
    <Txt x={x + w / 2} y={y + (s ? h / 2 - 2 : h / 2 + 5)} anchor="middle" bold s={size}>{t}</Txt>
    {s && <Txt x={x + w / 2} y={y + h / 2 + 15} anchor="middle" s={10.5} fill={SOFT}>{s}</Txt>}
  </g>
);
export const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => <Line a={{ x: x1, y: y1 }} b={{ x: x2, y: y2 }} c={RED} sw={2.5} arrow />;

/** A row of boxes joined by arrows. */
export const Flow = ({ y, items, h = 54, x0 = 20, w = 600, fill = SKY, stroke = BLUE }: { y: number; items: [string, string?][]; h?: number; x0?: number; w?: number; fill?: string; stroke?: string }) => {
  const n = items.length;
  const gap = 22;
  const bw = (w - gap * (n - 1)) / n;
  return (
    <g>
      {items.map(([t, s], i) => (
        <g key={t}>
          <Box x={x0 + i * (bw + gap)} y={y} w={bw} h={h} t={t} s={s} fill={fill} stroke={stroke} size={bw < 100 ? 11.5 : 13} />
          {i < n - 1 && <Arrow x1={x0 + i * (bw + gap) + bw + 2} y1={y + h / 2} x2={x0 + (i + 1) * (bw + gap) - 2} y2={y + h / 2} />}
        </g>
      ))}
    </g>
  );
};
export const Note = ({ x, y, children, anchor = "start" as "start" | "middle" | "end" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) => (
  <Txt x={x} y={y} s={12} fill={SOFT} anchor={anchor}>{children}</Txt>
);
export const Screen = ({ title, color = BLUE, children }: { title: string; color?: string; children?: ReactNode }) => (
  <g>
    <Win x={20} y={8} w={600} h={268} title={title} color={color} />
    {children}
  </g>
);
export const Menu = ({ x, y, items, color = BLUE }: { x: number; y: number; items: string[]; color?: string }) => (
  <g>
    {items.map((t, i) => (
      <Txt key={t} x={x + i * 78} y={y} s={11} fill={i === 1 ? color : SOFT} bold={i === 1}>{t}</Txt>
    ))}
  </g>
);
export const Kanban = ({ cols, y = 40, h = 190 }: { cols: { t: string; cards: string[]; c: string }[]; y?: number; h?: number }) => {
  const w = (600 - 15 * (cols.length - 1)) / cols.length;
  return (
    <g>
      {cols.map((c, i) => (
        <g key={c.t}>
          <Rect x={20 + i * (w + 15)} y={y} w={w} h={h} fill={SUNK} stroke={LINE} r={8} />
          <Rect x={20 + i * (w + 15)} y={y} w={w} h={26} fill={c.c} stroke={c.c} r={8} />
          <Txt x={20 + i * (w + 15) + w / 2} y={y + 18} anchor="middle" bold s={12} fill="#fff">{c.t}</Txt>
          {c.cards.map((t, j) => (
            <g key={t}>
              <Rect x={28 + i * (w + 15)} y={y + 36 + j * 50} w={w - 16} h={42} fill={PAPER} stroke={LINE} r={6} />
              <Txt x={36 + i * (w + 15)} y={y + 54 + j * 50} s={11} bold>{t.split("|")[0]}</Txt>
              <Txt x={36 + i * (w + 15)} y={y + 70 + j * 50} s={10} fill={SOFT}>{t.split("|")[1] ?? ""}</Txt>
            </g>
          ))}
        </g>
      ))}
    </g>
  );
};


export type Fig = { caption: string; body: ReactNode };
