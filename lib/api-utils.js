import {createClient} from '@supabase/supabase-js';
export {clean,phoneValid,validateBooking} from './validation.js';
export async function verifyTurnstile(token,req){
  const secret=process.env.TURNSTILE_SECRET_KEY;
  if(!secret)throw new Error('Booking service is not configured.');
  if(typeof token!=='string'||token.length<15||token.length>4096)throw new Error('Security verification required.');
  const body=new URLSearchParams({secret,response:token});
  const ip=req.headers['x-forwarded-for']?.split(',')[0]?.trim();if(ip)body.set('remoteip',ip);
  const r=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body,signal:AbortSignal.timeout(8000)});
  if(!r.ok)throw new Error('Security verification is unavailable.');
  const result=await r.json();if(!result.success)throw new Error('Security verification failed. Please retry.');
}
export function serverClient(){
  if(!process.env.SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY)throw new Error('Database is not configured.');
  return createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{autoRefreshToken:false,persistSession:false}});
}
export function respond(res,status,payload){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.status(status).json(payload)}
export function postOnly(req,res){if(req.method!=='POST'){res.setHeader('Allow','POST');respond(res,405,{error:'Method not allowed.'});return false;}return true;}
