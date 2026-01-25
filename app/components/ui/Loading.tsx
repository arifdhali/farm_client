const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full fixed z-50 bg-black">
            <img
                src="/loading.gif"
                className="size-36 animate-spin"
            />
        </div>
    )
}

export default Loading