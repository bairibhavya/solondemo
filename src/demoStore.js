// Explicitly local-only demonstration state. Not suitable for real customer data.
const PREFIX='elora-demo-v1-';
export const DEMO=true;
export const read=(key,fallback=[])=>{try{const v=JSON.parse(localStorage.getItem(PREFIX+key)||'null');return v===null?fallback:v;}catch{return fallback;}};
export const write=(key,value)=>{localStorage.setItem(PREFIX+key,JSON.stringify(value));window.dispatchEvent(new Event('elora:demo-updated'));};
export const create=(key,value)=>{const items=read(key); const record={...value,id:globalThis.crypto?.randomUUID?.()||`demo-${Date.now()}`,created_at:new Date().toISOString()};write(key,[record,...items]);return record;};
export const update=(key,id,changes)=>{const next=read(key).map(item=>item.id===id?{...item,...changes}:item);write(key,next);return next;};
export const remove=(key,id)=>write(key,read(key).filter(item=>item.id!==id));
// The public demo never submits to a real backend unless VITE_ values are configured.
export const liveConfigured=Boolean(import.meta.env.VITE_SUPABASE_URL&&import.meta.env.VITE_SUPABASE_ANON_KEY&&import.meta.env.VITE_TURNSTILE_SITE_KEY);
