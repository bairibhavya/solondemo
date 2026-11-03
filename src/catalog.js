export const SERVICES = [
  { id:'haircut', title:'Haircut & Styling', category:'Hair', from:899, duration:60, image:'haircut.webp', alt:'Model with styled voluminous brunette hair', desc:'A personalised cut, blowout and finish designed around your face shape and lifestyle.', details:['Personal consultation','Shampoo and scalp preparation','Cut and professional styling'] },
  { id:'haircolor', title:'Hair Colour', category:'Hair', from:2499, duration:120, image:'haircolor.webp', alt:'Rich auburn professionally coloured hair', desc:'Rich, dimensional colour, gloss and customised highlights with a consultation-first approach.', details:['Colour and tone consultation','Patch test when appropriate','Finish and home-care advice'] },
  { id:'keratin', title:'Keratin Treatment', category:'Hair', from:3999, duration:150, image:'keratin.webp', alt:'Smooth long brunette hair', desc:'Smoothness-focused salon treatment with tailored care for frizz and texture.', details:['Hair suitability check','Product selection','Aftercare instructions'] },
  { id:'bridal', title:'Bridal Makeup', category:'Bridal', from:7999, duration:180, image:'bridal.webp', alt:'Bride wearing professional makeup and floral hair accessories', desc:'A refined, long-lasting bridal look personalised to your outfit, features and celebration.', details:['Look consultation','Makeup and hairstyling','Optional trial appointment'] },
  { id:'facial', title:'Facials & Skincare', category:'Skin', from:1499, duration:60, image:'facial.webp', alt:'Woman receiving a professional facial', desc:'Restorative facials focused on cleansing, comfort and a beautiful refreshed appearance.', details:['Skin comfort discussion','Professional cleansing','Hydration and relaxation'] },
  { id:'nails', title:'Nail Art Studio', category:'Nails', from:699, duration:75, image:'nails.webp', alt:'Rose-pink manicured nails with nail art', desc:'Fresh manicures, gels, classic finishes and bespoke nail artistry.', details:['Nail shape and prep','Colour selection','Detailed finish'] },
  { id:'spa', title:'Spa Therapy', category:'Spa', from:1899, duration:90, image:'spa.webp', alt:'Relaxing spa massage in warm ambience', desc:'Unwind with thoughtfully designed rituals and relaxing body therapies.', details:['Comfort consultation','Relaxing therapy','Personalised post-care tips'] },
  { id:'skintreatment', title:'Skin Treatments', category:'Skin', from:1999, duration:75, image:'skin-service.webp', alt:'Professional skincare salon treatment', desc:'Salon skincare options with clear suitability guidance. Medical concerns require a qualified clinician.', details:['Consultation','Appropriate salon skincare','Guidance on next steps'] }
];
export const CATEGORIES=['All','Hair','Skin','Bridal','Nails','Spa'];
export const STAFF=[
 {id:'emma',name:'Emma Carter',role:'Senior Hair Stylist',initials:'EC',image:'haircut.webp'},
 {id:'sophia',name:'Sophia Reed',role:'Colour Specialist',initials:'SR',image:'haircolor.webp'},
 {id:'olivia',name:'Olivia Moore',role:'Bridal Makeup Artist',initials:'OM',image:'bridal.webp'},
 {id:'isabella',name:'Isabella Grant',role:'Skin & Spa Specialist',initials:'IG',image:'facial.webp'}
];
export const GALLERY=[
 {id:1,image:'haircut.webp',category:'Hair',label:'Salon finish'},
 {id:2,image:'gallery-hair.webp',category:'Hair',label:'Hair transformation inspiration'},
 {id:3,image:'bridal.webp',category:'Bridal',label:'Bridal glam'},
 {id:4,image:'nails.webp',category:'Nails',label:'Blush manicure'},
 {id:5,image:'facial.webp',category:'Skin',label:'Hydrating facial'},
 {id:6,image:'spa.webp',category:'Spa',label:'Spa moments'},
 {id:7,image:'gallery-makeup.webp',category:'Bridal',label:'Evening beauty'},
 {id:8,image:'haircolor.webp',category:'Hair',label:'Glossy colour'},
 {id:9,image:'salon-reception.webp',category:'Salon',label:'At Élora'},
 {id:10,image:'salon-chairs.webp',category:'Salon',label:'Inside our studio'}
];
export const INR=(n)=>'₹'+Number(n||0).toLocaleString('en-IN');
export const PIC=(image)=>`/images/${image}`;
export const DEMO_REVIEWS=[
 {by:'Demo guest · Hair & Colour',text:'Sample testimonial layout. Replace with a real, consented review from your salon.',stars:5},
 {by:'Demo guest · Bridal',text:'Your actual verified customer feedback will appear here after launch.',stars:5},
 {by:'Demo guest · Spa',text:'A beautiful place to highlight genuine client experiences with permission.',stars:5}
];
