import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='flex flex-col items-center mx-44 gap-9'>
            <h1 className='font-extrabold text-[60px] text-center mt-10'>
                <span className='text-[#f56551]'>Stock Your Inventory with AI</span> <br /> 
                Personalised suggestions at Your Fingertips
            </h1>
            <p className='text-xl text-gray-500 text-center'>
                Your personal smart inventory management system, creating custom suggestions tailored to your product's sales
            </p>
            <Link to="/dashboard">
                <Button> Get Started, It's Free </Button>
            </Link>
            
            <div>
                <img
                    src="/Designer.png"
                    alt="Image 3"
                    className="w-full h-[45vh] object-cover"
                />
            </div>
        </div>
    );
}

export default Hero;
