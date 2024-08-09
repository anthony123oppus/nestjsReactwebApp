const menuSlide = {
    initial: { y: "calc(-100%)", opacity : 0 },
    enter: { y: "0%", opacity :1,  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: {
      y: "calc(-100%)",
      opacity :0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const menuLeftSlide = {
    initial: { x: "calc(-100%)", opacity : 0 },
    enter: { x: "0%", opacity :1,  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: {
        x: "calc(100%)",
        opacity :0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      },
  };

  const menuRightSlide = {
    initial: { x: "calc(100%)", opacity : 0},
    enter: { x: "0%", opacity :1,  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: {
        x: "calc(100%)",
        opacity :0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      },
  };

  const menuPopup = {
    initial: { scale : .5, width : 0, opacity : 0 },
    enter: { scale : 1, width : '78px', opacity :1,  transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] } },
    exit: {
      scale : .5,
      opacity :4,
      width: 0,
      transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] },
    },
  };

const fadeIn = (direction : string, delay :number) => {
    return {
      hidden: {
        y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
        opacity: 0,
        x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
        transition: {
          type: 'tween',
          duration: 1.5,
          delay: delay,
          ease: [0.25, 0.6, 0.3, 0.8],
        },
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 1.4,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };

const iconSvg = {
    hidden: {
        pathLength: 0,
        fill: "rgba(255, 255, 255, 0)",
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    visible: {
        pathLength: 1,
        fill: "rgba(255, 255, 255, 1)",
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

export {menuLeftSlide, menuRightSlide, menuSlide, menuPopup, fadeIn, iconSvg}