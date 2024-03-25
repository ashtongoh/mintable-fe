"use client";

import { formatAddress } from '@/utils/formatAddress';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount, useEnsName, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

const NavBar = () => {

    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Function to check the authentication state of the user
    const checkAuth = async () => {

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error('Error fetching auth user', error);
            return;
        }
        //console.log(user);
        setIsAuthenticated(true);
    };

    checkAuth();

    // useEffect(() => {
    //     checkAuth()
    // }, []);

    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                {
                    isAuthenticated && (
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link href="/dashboard" >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/create">
                                        Create Brand
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">MintableLite</a>
            </div>
            {
                isAuthenticated && (

                    isConnected ? (
                        <div className="flex navbar-end gap-3">
                            <span className="">{address && formatAddress(address)}</span>
                            <a className="btn btn-error" onClick={() => disconnect()}>Disconnect</a>
                        </div>
                    ) :
                        (
                            <div className="navbar-end">
                                <a className="btn btn-primary" onClick={() => connect({ connector: injected() })}>Connect</a>
                            </div>
                        )
                )
            }
        </div>
    )
}

export default NavBar;