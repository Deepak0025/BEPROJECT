import { Button } from '@/components/ui/button';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog"
import axios from 'axios';
import Sidebar from '@/components/ui/custom/Sidebar';

function DashboardDetails() {
    const [openDailog, setOpenDailog] = useState(false);
    const navigate = useNavigate();

    const toSalesDetails = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDailog(true);
            return;
        }
        setOpenDailog(false);
        navigate('/sales-details');
    };

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDailog(false);
            toDashboard();
        }).catch((error) => {
            console.error(error);
        });
    };
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex flex-col items-center mx-44 gap-9'>
                <h1
                    className='font-bold text-[60px] text-center mt-28'
                >
                    Nothing to show here for the moment...<br /><span className='text-[#f56551]'>Try creating new bills</span>
                </h1>
                <p
                    className='text-2xl text-gray-700 text-center'
                >
                    Your personal sales dashboard will be shown here after creating bills for some time.<br /><span className='text-[#f56551] font-semibold'>Sign in to start creating Bills</span>
                </p>
                <Button onClick={toSalesDetails}>Create a new bill here</Button>
                <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                    <DialogContent>
                        <DialogDescription>
                            <img src="/logo.svg" alt="" />
                            <h2 className='font-bold text-lg mt-5 items-center'>Please <span className='text-[#f56551]'>Sign In</span> before creating new bill</h2>
                            <p className='mt-5'>Sign in to the app to save progress of billing information , Thank You.</p>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default DashboardDetails;
