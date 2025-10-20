const KEY = "installed_apps";
const read = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const write = (ids) => localStorage.setItem(KEY, JSON.stringify(ids));
export const getInstalled = () => read();
export const isInstalled = (id) => read().includes(id);
export const installApp = (id) => { const s = new Set(read()); s.add(id); write([...s]); };
export const uninstallApp = (id) => { write(read().filter(x => x !== id)); };
