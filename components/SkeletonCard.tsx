const SkeletonCard: React.FC = () => {

    return (
        <div className="flex flex-col gap-4 w-96 m-2 p-4">
            <div className="skeleton h-48 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    )
}

export default SkeletonCard;