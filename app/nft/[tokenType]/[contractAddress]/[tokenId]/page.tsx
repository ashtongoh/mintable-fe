"use client";

import { getNFTMetadata } from '@/services/alchemyService';
import { NFT } from '@/types/nftTypes';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const NftDetailPage = () => {

    //const { address, isConnected, isDisconnected, isConnecting } = useAccount();

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [nftDetails, setNftDetails] = useState<NFT | null>(null);

    const pathArray = pathName.split('/');
    const tokenType = pathArray[2];
    const contractAddress = pathArray[3];
    const tokenId = pathArray[4];

    const callGetNFTMetadata = async (tokenType: string, contractAddress: string, tokenId: string) => {
        try {
            const data = await getNFTMetadata(contractAddress, tokenId, tokenType);
            //console.log(data);
            setNftDetails(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // Wallet doesnt have to be connected because this is a details page
        callGetNFTMetadata(tokenType, contractAddress, tokenId);
    }, [searchParams]);

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl max-w-7xl my-10">

            <figure><img src={nftDetails?.image.originalUrl} alt="nft-image" /></figure>

            <div className="card-body">
                <h2 className="card-title">{nftDetails?.name}</h2>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Price</div>
                        <div className="stat-value">{nftDetails?.contract.openSeaMetadata.floorPrice}</div>
                    </div>
                </div>

                <button className="btn btn-primary">Sell</button>
                <div className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        Description
                    </div>
                    <div className="collapse-content">
                        {nftDetails?.description}
                    </div>
                </div>

                <div className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        Contract Details
                    </div>
                    <div className="collapse-content">
                        <label className="label">
                            <span className="label-text">Contract Address:</span> {contractAddress}
                        </label>
                        <label className="label">
                            <span className="label-text">Token ID:</span> {tokenId}
                        </label>
                        <label className="label">
                            <span className="label-text">Token Standard:</span> {nftDetails?.tokenType}
                        </label>
                        <label className="label">
                            <span className="label-text">Chain:</span> Ethereum {/* Adjust as necessary */}
                        </label>
                        <label className="label">
                            <span className="label-text">Last Updated:</span> {nftDetails?.timeLastUpdated ? new Date(nftDetails.timeLastUpdated).toLocaleString() : 'N/A'}
                        </label>
                    </div>
                </div>
                <div className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium">
                        Traits
                    </div>
                    <div className="collapse-content overflow-auto">
                        <div className="stats stats-vertical lg:stats-horizontal shadow">
                            {nftDetails?.raw.metadata.attributes.map((attribute: any, index: any) => (

                                <div className="stat" key={index}>
                                    <div className="stat-title">{attribute.trait_type}</div>
                                    <div className="stat-value text-md">{attribute.value}</div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NftDetailPage;
