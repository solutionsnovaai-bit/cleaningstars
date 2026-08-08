// Converts an inline CSS-text string ("display:flex;gap:12px") into a React style object.
export function css(str) {
  const out = {};
  if (!str) return out;
  String(str).split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i === -1) return;
    let prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop || !val) return;
    if (!prop.startsWith('--')) prop = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[prop] = val;
  });
  return out;
}
