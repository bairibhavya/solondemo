import {clean,phoneValid,verifyTurnstile,serverClient,respond,postOnly} from '../lib/api-utils.js';
export default async function handler(req,res){
  if(!postOnly(req,res))return;
  try{
    const b=typeof req.body==='string'?JSON.parse(req.body):req.body;
    if(!b||typeof b!=='object'||b.website)return respond(res,400,{error:'Invalid submission.'});
    const name=clean(b.name,90),phone=clean(b.phone,18),email=clean(b.email,120),subject=clean(b.subject,80),message=clean(b.message,1200);
    if(name.length<2||!phoneValid(phone)||message.length<3)return respond(res,400,{error:'Enter a valid name, phone and message.'});
    if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return respond(res,400,{error:'Invalid email address.'});
    await verifyTurnstile(b.turnstileToken,req);
    const db=serverClient();const {error}=await db.from('salon_enquiries').insert({name,phone,email:email||null,subject:subject||'General enquiry',message,status:'new'});
    if(error)throw error;
    return respond(res,201,{ok:true});
  }catch(error){
    const message=error?.message||'Request failed.';
    const internal=/Database is not configured|SUPABASE|relation|permission|Booking service is not configured/.test(message);
    if(internal)console.error('[enquiries]',message);
    return respond(res,internal?503:400,{error:internal?'Enquiries are temporarily unavailable. Please call the salon.':message});
  }
}
