
export default function JobRow() {
    return (
    <>
        <div className="bg-white p-4 rounded-lg shadow-sm ">
            <div className="flex gap-4">
                <div className="content-center">
                    <img 
                    className="size-10" 
                    src="./spotify.png" />
                </div>
                <div className="grow">
                    <div className="bg-slate-100 rounded-md">
                        <div className="font-bold text-gray-500 text-sm">Spotify</div>
                        <div className="font-light text-gray-400 mb-1">Productor</div>
                        <div className=" font-light text-gray-400 text-xs">
                            Remoto &middot; Los Angeles, US &middot; Full-time
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-end text-gray-400">
                2 semanas
            </div>
        </div>
    </>
    );
}