"use client"
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const Security = () => {
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        redirect("/login");
    }
    return (
        <div className='border-t-2 border-[#dadada] pt-6 -mt-[11px] w-full'>
            <div className="self-stretch inline-flex flex-col justify-start items-start gap-6 w-full">
                <div className="self-stretch flex flex-col justify-start items-start gap-6 w-full">
                    <div className="self-stretch flex justify-between items-center w-[60%] border-b-2 border-[#dadada] pb-6">
                        <div className="inline-flex flex-col justify-start items-start gap-2">
                            <div className="justify-start text-zinc-800 text-base font-medium font-['Inter'] leading-normal">Change password</div>
                        </div>
                        <Link href="/forgot-password" className="flex justify-start items-center cursor-pointer">
                            <div className="justify-start text-zinc-800 text-base font-medium font-['Inter'] underline leading-tight flex items-center gap-1">Change <FiArrowUpRight className='w-6 h-6' /></div>   
                        </Link>
                    </div>

                    <div className="self-stretch flex justify-between items-center w-[60%] border-b-2 border-[#dadada] pb-6">
                        <div className="inline-flex flex-col justify-start items-start gap-2">
                            <div className="justify-start text-zinc-800 text-base font-medium font-['Inter'] leading-normal">Logout</div>
                        </div>
                        <div className="flex justify-start items-center cursor-pointer" onClick={logout}>
                            <div className="justify-start text-zinc-800 text-base font-medium font-['Inter'] underline leading-tight flex items-center gap-1">Logout <FiArrowUpRight className='w-6 h-6' /></div>   
                        </div>
                    </div>

                    <div className="self-stretch flex justify-between items-center w-[60%] border-b-2 border-[#dadada] pb-6">
                        <div className="inline-flex flex-col justify-start items-start gap-2">
                            <div className="justify-start text-zinc-800 text-base font-medium font-['Inter'] leading-normal">Delete account</div>
                        </div>
                        <Link href="/delete-account" className="flex justify-start items-center cursor-pointer">
                            <div className="justify-start text-zinc-800 text-base font-medium font-['Inter'] underline leading-tight flex items-center gap-1">Delete <FiArrowUpRight className='w-6 h-6' /></div>   
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Security