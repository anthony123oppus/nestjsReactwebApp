/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
import * as React from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import clsx from "clsx";


const UploadImg = ({ children, className, onClick } : {children : React.ReactNode, className : string, onClick?: () => void}) => {
  
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false)

    let mouseX = useMotionValue(4);
    let mouseY = useMotionValue(4);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-600),
          transparent 100%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        // className="p-[2px] border-[1px] border-[#02266F] rounded-lg transition duration-300 group/input"
        className={clsx(`p-[2px] border-[1px] flex justify-center items-center border-[#02266F] rounded-lg transition duration-300 group/input`, className)}
        onClick={onClick}
      >
        {children}

      </motion.div>
    );
}

export { UploadImg };
