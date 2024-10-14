import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [openDailog, setOpenDailog] = useState(false);

    const checkUserLogin = (path) => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDailog(true);
            return;
        }
        navigate(path);
    };

    const toSalesDetails = () => checkUserLogin('/sales-details');
    const toMagic = () => checkUserLogin('/magic-ai');
    const toDashboard = () => checkUserLogin('/dashboard');

    const isActive = (path) => location.pathname === path ? 'bg-[#f56551] text-white' : 'bg-gray-500 text-white';

    return (
        <div className="h-screen p-4 flex flex-col justify-between w-48 bg-gray-100">
            <div className="flex flex-col gap-4 mt-5">
                <Button
                    onClick={toDashboard}
                    className={`w-full ${isActive('/dashboard')} hover:bg-[#f56551] hover:text-white transition-all duration-300`}
                >
                    Dashboard
                </Button>
                <Button
                    onClick={toSalesDetails}
                    className={`w-full ${isActive('/sales-details')} hover:bg-[#f56551] hover:text-white transition-all duration-300`}
                >
                    Add Bill
                </Button>
                <Button
                    onClick={toMagic}
                    className={`w-full ${isActive('/magic-ai')} hover:bg-[#f56551] hover:text-white transition-all duration-300`}
                >
                    Magic
                </Button>
            </div>
            <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                <DialogContent>
                    <DialogDescription>
                        <img src="/logo.svg" alt="App Logo" />
                        <h2 className='font-bold text-lg mt-5 items-center'>
                            Please <span className='text-[#f56551]'>Sign In</span> before performing this action
                        </h2>
                        <p className='mt-5'>
                            Sign in to the app to save progress. Thank you.
                        </p>

                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Sidebar;
