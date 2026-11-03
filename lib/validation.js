const SERVICE_IDS=new Set(['haircut','haircolor','keratin','bridal','facial','nails','spa','skintreatment']);
const STAFF_IDS=new Set(['any','emma','sophia','olivia','isabella']);
export const clean=(v,max=120)=>typeof v==='string'?v.trim().slice(0,max):'';
export const phoneValid=(p)=>/^[+\d ()-]{8,18}$/.test(p);
export function validateBooking(b){
  const name=clean(b.name,100),phone=clean(b.phone,18),email=clean(b.email,150),service=clean(b.service_id,40),staff=clean(b.staff_id,30)||'any',date=clean(b.date,12),time=clean(b.time,5),note=clean(b.note,500);
  if(name.length<2||!phoneValid(phone))throw new Error('Enter a valid name and phone number.');
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new Error('Invalid email address.');
  if(!SERVICE_IDS.has(service)||!STAFF_IDS.has(staff))throw new Error('Invalid service or stylist.');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:00$/.test(time))throw new Error('Invalid preferred date or time.');
  const d=new Date(date+'T12:00:00Z');if(Number.isNaN(d.getTime())||d.toISOString().slice(0,10)!==date)throw new Error('Invalid date.');
  const today=new Date(); const todayUtc=new Date(Date.UTC(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()));
  if(d<todayUtc||d>new Date(todayUtc.getTime()+183*86400000))throw new Error('Choose a date within the next six months.');
  const hour=Number(time.slice(0,2));if(!Number.isInteger(hour)||hour<10||hour>18)throw new Error('Choose a valid salon hour.');
  return {name,phone,email:email||null,service_id:service,staff_id:staff,preferred_date:date,preferred_time:time,note,status:'pending'};
}
