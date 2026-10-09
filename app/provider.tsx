"use client";

import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import axios from 'axios';

const provider = ({ children }: { children: React.ReactNode }) => {

    const { data } = useSession();

    useEffect(() => {
        if (data?.user?.email) {
            createNewUser();
        }
    }, [data]);


    const createNewUser = async () => {
        const res = await axios.post('/api/user', { name: data?.user?.name, email: data?.user?.email });
        console.log(res.data);
    }
    

    return (
        <div>
            {children}
        </div>
    )
}

export default provider

