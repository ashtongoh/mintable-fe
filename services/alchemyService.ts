import { GetNFTsForOwnerResponse } from '@/types/nftTypes';
import axios from 'axios';

const apiKey = "KY-V6LZjLlebzHArPtdS9n30yNphKPXQ"; // Fucking hide this shit

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

// const API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY; // Assuming you have an environment variable for the API key

// // Base fetch function
// const fetchWithBaseConfig = (endpoint: string) => {
//     const baseUrl = `https://eth-mainnet.g.alchemy.com/nft/v3/${API_KEY}`;
//     const options = {method: 'GET', headers: {accept: 'application/json'}};
//     return fetch(`${baseUrl}${endpoint}`, options);
// };

// // Specific API function
// export const getNFTsForOwner = async (owner: string, pageKey: string = '', pageSize: number = 100) => {
//     try {
//         const response = await fetchWithBaseConfig(`/getNFTsForOwner?owner=${owner}&withMetadata=true&pageKey=${pageKey}&pageSize=${pageSize}`);
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };


