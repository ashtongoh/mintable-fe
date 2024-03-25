export type NFT = {
    id: string;
    sellPrice: string;
    contract: {
        address: string;
        name: string;
        symbol: string;
        totalSupply: string;
        tokenType: string;
        contractDeployer: string | null;
        deployedBlockNumber: string | null;
        openSeaMetadata: any;
        isSpam: boolean | null;
        spamClassifications: any[];
    };
    tokenId: string;
    tokenType: string;
    name: string;
    description: string;
    tokenUri: string;
    image: {
        cachedUrl: string;
        thumbnailUrl: string | null;
        pngUrl: string | null;
        contentType: string | null;
        size: number | null;
        originalUrl: string;
    };
    raw: any;
    collection: any | null;
    mint: any | null;
    owners: any | null;
    timeLastUpdated: string;
    balance: string;
    acquiredAt: {
        blockTimestamp: string | null;
        blockNumber: string | null;
    };
}

export type GetNFTsForOwnerResponse = {
    ownedNfts: NFT[];
    totalCount: number;
    pageKey?: string;
}

export type NFTPathParams = {
    tokenType: string;
    contractAddress: string;
    tokenId: string;
}

export type BrandData = {
    name: string;
    description: string;
    nfts: NFT[];
}
