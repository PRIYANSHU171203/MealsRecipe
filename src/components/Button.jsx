import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-solid-svg-icons'

export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className ='',
    ...props
}) {
    return (
        <button 
        type={type}
        className= {`px-4 py-2 rounded-lg cursor-pointer  ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export  function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Show button when scrolled down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
         <button
            onClick={scrollToTop}
            className={`
            fixed bottom-6 right-6 bg-blue-600 text-white p-1 rounded-full shadow-lg 
            hover:bg-blue-800 transition-all duration-500 ease-in-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
            `}
        >
            <FontAwesomeIcon icon={faCircleUp} size="2xl" />
        </button>
      )}
    </>
  );
}