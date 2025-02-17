import React from "react";

export default function NewsLetter() {
  return (
    <div className="w-[90%] sm:w-[85%] lg:w-[82%] h-auto sm:h-[40vh] mt-[60px] flex flex-col items-center justify-center mx-auto py-10 sm:py-20 mb-[60px] sm:mb-[100px] gap-4 sm:gap-5 bg-gradient-to-b from-[#fde1ff] via-[#e1ffea22] to-transparent text-center">
      
      <h1 className="text-[#454545] text-2xl sm:text-3xl md:text-4xl font-medium">
        Get Exclusive Offers On Your Email
      </h1>
      <p className="text-[#454545] text-sm sm:text-base md:text-lg font-medium">
        Subscribe to our newsletter and stay updated
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[730px]">
        
        <div className="w-full bg-white border border-[#e3e3e3] rounded-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full text-[#616161] text-sm sm:text-base px-4 py-3 sm:py-3 outline-none rounded-md"
          />
        </div>

        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-black text-white text-sm sm:text-base rounded-lg cursor-pointer">
          Subscribe
        </button>

      </div>
    </div>
  );
}
