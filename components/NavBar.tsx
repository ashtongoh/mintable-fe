"use client";

import { formatAddress } from '@/utils/formatAddress';
import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';
import { useAccount, useEnsName, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

const NavBar = () => {

    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();

    const { data, error, status } = useEnsName({ address });
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    // Function to check the authentication state of the user
    const checkAuth = async () => {

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error('Error fetching auth user', error);
            return;
        }

        console.log(user);

        setAuthenticated(true);
    };

    useEffect(() => {
        checkAuth()
    }, []);

    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">MintableLite</a>
            </div>
            {
                isConnected && authenticated ? (
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
            }
        </div>
    )
}

export default NavBar;