import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
// import WhyChooseUs from '../Components/WhyChooseUs';
// import HowItWorks from '../Components/HowItWorks';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
             <Navbar></Navbar>
             <Outlet></Outlet>
             {/* <WhyChooseUs></WhyChooseUs>
             <HowItWorks></HowItWorks> */}
             <Footer></Footer> 
        </div>
    );
};

export default MainLayout;  