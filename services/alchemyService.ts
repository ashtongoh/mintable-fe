import { GetNFTsForOwnerResponse } from '@/types/nftTypes';
import axios from 'axios';

process.env.NEXT_PUBLIC_SUPABASE_URL

// const apiKey = "KY-V6LZjLlebzHArPtdS9n30yNphKPXQ"; // Fucking hide this shit
const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY as string; // Fucking hide this shit

const client = axios.create({
    // baseURL: `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}`,
    baseURL: `https://eth-sepolia.g.alchemy.com/nft/v3/${apiKey}`,
    headers: {'Content-Type': 'application/json',}
});

export const getNFTsForOwner = async (owner: string, pageKey?: string, pageSize: number = 10): Promise<GetNFTsForOwnerResponse> => {
    try{
        const response = await client.get(`/getNFTsForOwner`, {
            params: {
                owner,
                withMetadata: "true",
                pageSize,
                pageKey,
            }   
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getNFTMetadata = async (contractAddress: string, tokenId: string, tokenType: string) => {
    try {
        const response = await client.get(`/getNFTMetadata`, {
            params: {
                contractAddress,
                tokenId,
                tokenType,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


