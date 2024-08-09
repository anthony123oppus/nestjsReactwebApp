/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
import * as React from "react";
import { cn } from "../../util/cn";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

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
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] border-[1px] border-[#02266F] rounded-lg transition duration-300 group/input"
      >
        <textarea
          className={cn(
            `flex h-[37px] w-full border-none bg-white text-[16px] leading-[20.8px] font-[400] text-[#01091D] shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-500 
          focus-visible:outline-none focus-visible:ring-[2px]   
           disabled:cursor-not-allowed disabled:opacity-50
           group-hover/input:shadow-none transition duration-400
           `,
            className
          )}
          ref={ref}
          {...props}
        ></textarea>
      </motion.div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
