import assert from 'node:assert/strict';
import {validateBooking,phoneValid} from '../lib/validation.js';
const d=new Date(Date.now()+3*86400000).toISOString().slice(0,10);
const sample={name:'Demo Guest',phone:'9876543210',email:'demo@example.com',service_id:'haircut',staff_id:'any',date:d,time:'11:00',note:'Consultation request'};
const value=validateBooking(sample);
assert.equal(value.status,'pending');
assert.equal(value.service_id,'haircut');
assert.equal(value.preferred_date,d);
assert.equal(value.phone,'9876543210');
assert.equal(phoneValid('bad'),false);
for(const change of [{name:'A'},{phone:'x'},{service_id:'not-a-service'},{staff_id:'admin'},{date:'2020-01-01'},{date:'9999-01-01'},{time:'07:00'},{email:'invalid'}]){
  assert.throws(()=>validateBooking({...sample,...change}),`expected failure for ${JSON.stringify(change)}`)
}
console.log('PASS: 12 booking validation checks');
