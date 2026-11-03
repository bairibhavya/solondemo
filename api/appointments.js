import {clean,validateBooking,verifyTurnstile,serverClient,respond,postOnly} from '../lib/api-utils.js';
export default async function handler(req,res){
  if(!postOnly(req,res))return;
  try{
    const b=typeof req.body==='string'?JSON.parse(req.body):req.body;
    if(!b||typeof b!=='object'||b.website) return respond(res,400,{error:'Invalid submission.'});
    const record=validateBooking(b);
    await verifyTurnstile(b.turnstileToken,req);
    const db=serverClient();
    const {data,error}=await db.from('salon_appointments').insert(record).select('id').single();
    if(error)throw error;
    return respond(res,201,{ok:true,id:data.id,message:'Appointment request received. Confirmation is pending.'});
  }catch(error){
    const message=error?.message||'Could not process request.';
    const internal=/Database is not configured|SUPABASE|relation|permission|duplicate|Booking service is not configured/.test(message);
    if(internal)console.error('[appointments]',message);
    return respond(res,internal?503:400,{error:internal?'Bookings are temporarily unavailable. Please contact the salon.':message});
  }
}
