import React,{useEffect} from 'react';
import {Routes,Route,useLocation} from 'react-router-dom';
import {Header,Footer,Home,Services,ServiceDetail,Gallery,About,Contact,NotFound} from './Site.jsx';
import Booking from './Booking.jsx';
import Admin from './Admin.jsx';
function ScrollTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo({top:0,behavior:'auto'})},[pathname]);return null}
function Public({children}){return <div className="e-site"><Header/><main id="main-content">{children}</main><Footer/></div>}
export default function App(){return <><ScrollTop/><Routes><Route path="/" element={<Public><Home/></Public>}/><Route path="/services" element={<Public><Services/></Public>}/><Route path="/services/:slug" element={<Public><ServiceDetail/></Public>}/><Route path="/about" element={<Public><About/></Public>}/><Route path="/gallery" element={<Public><Gallery/></Public>}/><Route path="/booking" element={<Public><Booking/></Public>}/><Route path="/contact" element={<Public><Contact/></Public>}/><Route path="/admin/*" element={<Admin/>}/><Route path="*" element={<Public><NotFound/></Public>}/></Routes></>}
