'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import { config } from '@/config'

export function Providers(props: { children: ReactNode }) {

    //const [queryClient] = useState(() => new QueryClient())

    const queryClient = new QueryClient()

    return (
        <RecoilRoot>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {props.children}
                </QueryClientProvider>
            </WagmiProvider>
        </RecoilRoot>
    )
}