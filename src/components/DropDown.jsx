import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({ options, onSelect,defaultOption}) => {   // Accepts options & onSelect callback   // 1️⃣
  const [isOpen, setIsOpen] = useState(false);  // Dropdown state  // 2️⃣
  const [selected, setSelected] = useState(defaultOption);  // Default selected value  // 3️⃣

  const handleSelect = (option) => {  // 4️⃣
    setSelected(option);
    onSelect(option); // Notify parent
    setIsOpen(false); // Close dropdown
  };

  return (
    <div className="relative w-64">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 text-white 
          bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 
          hover:bg-white/20 transition"
      >
        {selected} {/* Show selected option */}
        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute w-full mt-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 overflow-hidden z-10"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 cursor-pointer text-white hover:bg-green-500/30 transition"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
