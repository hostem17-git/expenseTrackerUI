import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({ options, onSelect, defaultOption,placeholder}) => {   
  const [isOpen, setIsOpen] = useState(false); 
  const [selected, setSelected] = useState(defaultOption);  

  const handleSelect = (option) => {  
    setSelected(option);
    onSelect(option); 
    setIsOpen(false); 
  };

  return (
    <div className="relative w-64 flex-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 text-white 
          bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 
          hover:bg-white/20 transition break-keep"
      >
        {selected || placeholder} 
        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute w-full mt-2 bg-black/55 block backdrop-blur-lg rounded-lg shadow-2xl border border-white/20 overflow-hidden z-10"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          ><div className="w-full h-full bg-white/40  backdrop-blur-lg">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 cursor-pointer text-white hover:bg-green-500/30 transition"
              >
                {option}
              </li>
            ))}
          </div>

          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
