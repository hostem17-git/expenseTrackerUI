import React, { useCallback, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import Auth from "./Auth";
import ButtonGreenGradient from "../components/ButtonGreenGradient";
import ToastManager from "../components/ToastManager";
import Accordion from "../components/accordion/Accordion";
import IconButton from "../components/IconButton";

function FAQ() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);
  const FAQs = [
    {
      question: "How to join whatsPense channel",
      answer:
        "To join the WhatsPense channel, simply send a message WhatsApp number - +1 (415) 523-8886 with the text 'Join expect-proud'. You will receive a confirmation message once you are added to the channel.",
    },
    {
      question: "What is WhatsPense?",
      answer:
        "WhatsPense is an expense management app that helps you track and manage your expenses efficiently through simple whatsapp messages.",
    },
    {
      question: "How do I use whatsPense?",
      answer:
        "You can use WhatsPense by sending messages to our WhatsApp number. Just join our channel, and type your expenses in the format - [<expense> <amount>].We'll take care of the rest.",
    },
    {
      question: "Where can I find my expenses?",
      answer:
        "You can find your expenses in the WhatsPense app. Just log in with your phone number, and you'll see all your expenses organized by date and category.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 w-full h-screen flex flex-col relative overflow-scroll sm:overflow-hidden p-4 md:p-6 lg:p-8">
      <div className="absolute inset-0 bg-[url(/homeBGdark.png)] bg-cover bg-center opacity-30"></div>

      <div className="relative z-10 flex-1 flex flex-col items-center bg-white/10 rounded-lg  backdrop-blur-sm outline-[1px] outline-white/20 justify-center p-4">
        <button
          onClick={handleBack}
          className="flex  gap-4 p-4 outline rounded-lg items-center text-gray-50 
        from-[#128C7E] to-[#25D366] bg-gradient-to-r hover:bg-gradient-to-l
        transition-all duration-300 mb-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to home
        </button>
        <Accordion items={FAQs} />
      </div>

      <ToastManager position="bottom-right" />
    </div>
  );
}

export default FAQ;
