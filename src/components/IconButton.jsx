const IconButton = ({ onClick, buttonContent, iconColor }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="text-white px-2 py-1 my-2 mx-1.5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 hover:bg-white/20 transition"
      >
        {buttonContent}
      </button>
    </>
  );
};
export default IconButton;
