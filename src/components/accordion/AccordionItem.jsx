import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-2 overflow-hidden flex-1">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white/10 hover:bg-white/20 transition-colors duration-200 flex justify-between items-center focus:outline-none text-gray-50"
      >
        <span className="font-medium pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 360 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeInOut" }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-white/5 border-t border-gray-200">
              <p className="text-gray-50 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;