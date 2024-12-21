

export default function Basic() {
    return <div className="h-screen w-screen flex flex-col bg-red-500">
        {/* three divs */}
        <div className="flex-1 flex gap-1 p-1 bg-blue-500">
            {/* three equally divs */}
            <div className="flex-1 bg-purple-500"></div>
            <div className="flex-1 bg-pink-500"></div>
            <div className="flex-1 bg-orange-500"></div>
        </div>
        <div className="flex-1 flex gap-1 p-1 bg-green-500">
            <div className="h-full w-2/3 bg-gray-500"></div>
            <div className="h-full w-1/3 bg-gray-500"></div>
        </div>
        <div className="flex-1 flex gap-1 p-1 bg-yellow-500">
            <div className="h-full w-1/3 bg-gray-500"></div>
            <div className="h-full w-2/3 bg-gray-500"></div>

        </div>
    </div>
}