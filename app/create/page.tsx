"use client";

import SkeletonCard from "@/components/SkeletonCard";
import { getNFTsForOwner } from "@/services/alchemyService";
import { NFT } from "@/types/nftTypes";
import { supabase } from "@/utils/supabaseClient";
import { use, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from 'next/navigation';

const CreateBrandPage = () => {

    const router = useRouter();
    const { address, isConnected, isDisconnected, isConnecting } = useAccount();

    const [brandName, setBrandName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [selectedNfts, setSelectedNfts] = useState<{ [key: string]: { selected: boolean, price: string } }>({});

    const checkAuth = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            router.push('/');
        }
    }

    const callGetNFTsForOwner = async (owner: string, pageKey?: string) => {

        if (!owner) return;

        try {
            const data = await getNFTsForOwner(owner, pageKey, 8); // Keep it as 8 for simplicity
            //console.log(data);
            setNfts(prev => [...prev, ...data.ownedNfts]);
        } catch (error) {
            console.error(error);
        }
    }

    const handleNftSelectToggle = (id: string) => {
        setSelectedNfts(prev => ({
            ...prev,
            [id]: {
                selected: !prev[id]?.selected,
                price: prev[id]?.price || ''
            }
        }));
    };

    const handlePriceChange = (id: string, price: string) => {
        setSelectedNfts(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                price: price
            }
        }));
    };

    const handleSubmit = async () => {
        
        if (!brandName || !description) {
            alert('Brand name and description are required.');
            return;
        }

        // Filter selected NFTs and prepare them for submission
        const nftsToSubmit = Object.entries(selectedNfts)
            .filter(([_, value]) => value.selected)
            .map(([id, value]) => ({
                id,
                sellPrice: value.price,
                ...nfts.find(nft => nft.tokenId === id)
            }));

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { status, error } = await supabase
                .from('brands')
                .insert({ name: brandName, description: description, nfts: nftsToSubmit, ownerId: user.id })

            if (error) console.error('Error inserting brand data:', error);
            if (status === 201) {
                alert('Brand created successfully');
            }
        }

        // Reset fields
        setBrandName('');
        setDescription('');
        setSelectedNfts({});
    };

    const handleBrandNameChange = (e: any) => setBrandName(e.target.value);
    const handleDescriptionChange = (e: any) => setDescription(e.target.value);

    useEffect(() => {
        checkAuth();
    }, []);

    const nftCards = nfts.map((nft) => (
        <div key={nft.tokenId} className="card w-96 bg-base-100 shadow-xl m-2">
            <figure><img src={nft.image.originalUrl} alt={nft.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{nft.name}</h2>
                <label className="cursor-pointer label">
                    <span className="label-text">Select</span>
                    <input type="checkbox" checked={selectedNfts[nft.tokenId]?.selected || false} onChange={() => handleNftSelectToggle(nft.tokenId)} className="checkbox" />
                </label>
                {selectedNfts[nft.tokenId]?.selected && (
                    <input type="text" placeholder="Set ETH price" value={selectedNfts[nft.tokenId]?.price} onChange={(e) => handlePriceChange(nft.tokenId, e.target.value)} className="input input-bordered w-full max-w-xs" />
                )}
            </div>
        </div>
    ));

    // Load when connected
    useEffect(() => {
        if (isConnected) {
            setNfts([]);
            callGetNFTsForOwner(address as string);
        }
    }, [isConnected]);

    return (
        <div className="p-4">
            <div className="form-control w-full max-w-xs mx-auto mb-8">
                <label className="label">
                    <span className="label-text">Brand Name (No spaces)</span>
                </label>
                <input
                    disabled={isDisconnected || isConnecting}
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full max-w-xs"
                    value={brandName}
                    onChange={handleBrandNameChange}
                />

                <label className="label">
                    <span className="label-text">Brand Description</span>
                </label>
                <textarea
                    disabled={isDisconnected || isConnecting}
                    className="textarea textarea-bordered h-24"
                    placeholder="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>

            {isDisconnected || isConnecting ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
                    {nftCards}
                </div>
            )}

            <div className="flex justify-center">
                <button disabled={isDisconnected || isConnecting} onClick={handleSubmit} className="btn btn-wide btn-primary mt-4">Create Brand</button>
            </div>
        </div>
    );
}

export default CreateBrandPage;