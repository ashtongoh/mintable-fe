"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { BrandData } from '@/types/nftTypes';

const BrandPage = () => {

    const pathname = usePathname();
    const [brandData, setBrandData] = useState<BrandData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Gets brand data from supabase
    const getBrandData = async (brandName: string) => {
        const { data, error, } = await supabase
            .from('brands')
            .select('*')
            .eq('name', brandName);

        //console.log(data);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            setError('Brand not found');
            return;
        }

        setBrandData(data[0]);
    }

    const handleViewClick = (contractAddress: string, tokenId: string, tokenType: string) => {
        router.push(`/nft/${tokenType}/${contractAddress}/${tokenId}`);
    };

    useEffect(() => {
        const brandName = pathname.split('/')[2]; // Extract brand name from URL
        if (!brandName) return;

        getBrandData(brandName);
    }, [pathname]);


    return (
        <div className="p-4">
            {
                error ? (
                    <h1 className="text-2xl font-bold">PAGE NOT FOUND!</h1>
                ) : (
                    <div className="min-h-screen flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-bold mb-5">{brandData?.name}</h1>
                        <p>{brandData?.description}</p>
                        <div className="flex flex-col w-full border-opacity-50 mt-10">
                            <div className="divider font-bold text-2xl">ON SALE</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-4">
                            {brandData?.nfts.map(nft => (
                                <div key={nft.id} className="card bg-base-100 shadow-xl m-2 p-4">
                                    <figure><img src={nft.image.originalUrl} alt={nft.name} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{nft.name}</h2>
                                        <p>Sell Price: {nft.sellPrice} ETH</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary">Buy</button>
                                            <button className="btn btn-secondary" onClick={() => handleViewClick(nft.contract.address, nft.tokenId, nft.tokenType)}>View</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default BrandPage;
