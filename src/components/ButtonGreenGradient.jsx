const ButtonGreenGradient=({onClick,buttonText})=>{

    return (<>
        <button
        onClick={onClick} 
        className="px-6 py-3 w-full rounded-full font-semibold text-xl text-white bg-gradient-to-r from-[#128C7E] to-[#25D366] shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-white hover:text-[#128C7E] border border-transparent hover:border-[#128C7E]">
            {buttonText}
        </button>
    </>)
}
export default ButtonGreenGradient;