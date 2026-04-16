function LoadingScreen(){
    return(
        <div className="w-full h-screen fixed flex justify-center items-center top-0 left-0 z-10 backdrop-blur-[2px] text-white">
            <p className="text-2xl uppercase">Loading ...</p>
        </div>  
    )
}

export default LoadingScreen;