"use client"

import NftCard from '@/components/NftCard';
import SkeletonCard from '@/components/SkeletonCard';
import { getNFTsForOwner } from '@/services/alchemyService';
import { NFT } from '@/types/nftTypes';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

const DashboardPage = () => {

    const router = useRouter();
    const { address, isConnected, isDisconnected, isConnecting } = useAccount();

    const [nfts, setNfts] = useState<NFT[]>([]);
    const [pageKey, setPageKey] = useState<string | undefined>(undefined); // Pagination key for fetching more NFTs
    const [pageSize, setPageSize] = useState<number>(10); // Number of NFTs to fetch per page [5, 10, 20, 30, 40, 50
    const [nftCount, setNftCount] = useState<number>(0); // Total number of NFTs owned by the user

    const checkAuth = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            router.push('/');
        }
    }

    const handleViewClick = (contractAddress: string, tokenId: string, tokenType: string) => {
        router.push(`/nft/${tokenType}/${contractAddress}/${tokenId}`);
    };

    const callGetNFTsForOwner = async (owner: string, pageKey?: string) => {

        if (!owner) return;

        try {
            const data = await getNFTsForOwner(owner, pageKey, pageSize);
            //console.log(data);
            setNfts(prev => [...prev, ...data.ownedNfts]);
            setPageKey(data.pageKey);
            setNftCount(data.totalCount);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(event.target.value, 10);
        setPageSize(newSize); // Update the page size state
        setPageKey(undefined); // Reset pageKey to start from the first page
        setNfts([]); // Clear existing NFT data to refresh with new page size data
    };

    // Load NFTs on first render
    useEffect(() => {
        if (isConnected) {
            setNfts([]);
            callGetNFTsForOwner(address as string);
        }
    }, [isConnected, pageSize]);

    useEffect(() => {
        checkAuth();
        supabase.auth.onAuthStateChange((event, session) => {
            // Ignore this for now
            // Using manual redirect
        })
    }, []);


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your NFT Portfolio</h1>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total NFTs Owned</div>
                        <div className="stat-value">{isConnected ? nftCount : "-"}</div>
                    </div>
                </div>
                <select className="select select-bordered w-full max-w-xs mt-4 sm:mt-0" onChange={handlePageSizeChange} defaultValue={pageSize}>
                    <option disabled>Page Size</option>
                    <option value="5">5</option>
                    <option value="10" defaultChecked>10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>

            </div>

            {isDisconnected || isConnecting ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
                    {nfts.map(nft => (
                        <NftCard key={nft.tokenId} nft={nft} onClick={() => handleViewClick(nft.contract.address, nft.tokenId, nft.tokenType)} />
                    ))}
                </div>
            )}

            {pageKey && isConnected &&
                (
                    <div className="flex justify-center">
                        <button className="btn btn-primary mt-4" onClick={() => callGetNFTsForOwner(address as string, pageKey)}>
                            Load More
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default DashboardPage;