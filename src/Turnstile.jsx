import React,{useEffect,useRef} from 'react';
import {liveConfigured} from './demoStore';
export default function Turnstile({onToken}){
  const widget=useRef(null);
  useEffect(()=>{
    if(!liveConfigured)return;
    const sitekey=import.meta.env.VITE_TURNSTILE_SITE_KEY;
    let id;
    const render=()=>{
      if(!window.turnstile||!widget.current||widget.current.dataset.rendered)return;
      id=window.turnstile.render(widget.current,{
        sitekey,callback:(token)=>onToken(token),
        'expired-callback':()=>onToken(''),
        'error-callback':()=>onToken('')
      });
      widget.current.dataset.rendered='true';
    };
    if(!document.querySelector('script[data-elora-turnstile]')){
      const script=document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async=true;script.defer=true;script.dataset.eloraTurnstile='true';script.onload=render;
      document.head.appendChild(script);
    }else render();
    const t=setInterval(render,300);
    return()=>{clearInterval(t);if(window.turnstile&&id!==undefined)window.turnstile.remove(id)};
  },[onToken]);
  return liveConfigured?<div ref={widget} className="e-turnstile"/>:null;
}
