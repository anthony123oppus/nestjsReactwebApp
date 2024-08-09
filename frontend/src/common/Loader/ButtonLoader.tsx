import React from "react";

const ButtonLoader = () => {
    return (
        <div className="flex bg-white/50 h-[14px] w-[30px] justify-center rounded-full items-center">
            <span className="circle animate-loader"></span>
            <span className="circle animate-loader animation-delay-200"></span>
            <span className="circle animate-loader animation-delay-400"></span>
        </div>
    );
};

export default ButtonLoader;
