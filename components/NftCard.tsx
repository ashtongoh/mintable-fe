import { NFT } from "@/types/nftTypes";

export type NftCardProps = {
    nft: NFT;
    onClick: () => void;
}

const NftCard: React.FC<NftCardProps> = ({ nft, onClick }) => {
    return (
        <div className="card card-normal w-96 bg-base-100 shadow-xl m-2 p-4">
            <figure><img src={nft.image.cachedUrl} alt="nft-image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{nft.name}</h2>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary btn-wide" onClick={onClick}>View</button>
                </div>
            </div>
        </div>
    )
}

export default NftCard;