import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const useTypingAnimation = (text, speed) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    let typingTimeout;
    if (isDeleting) {
      typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(speed / 2);
      }, typingSpeed);
    } else {
      typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => text.substring(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayedText === text) {
      setIsDeleting(true);
      setTypingSpeed(speed);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(speed);
    }

    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, speed, text, typingSpeed, loopNum]);

  return displayedText;
};

const Loader = () => {
  const location = useLocation();
  const getText = () => {
    if (location.pathname === "/tech" || location.pathname === "/nontech") {
      return "Generating questions ...";
    } else if (location.pathname === "/generate") {
      return "Analyzing Feedback ...";
    }
    return "";
  };

  const typingText = useTypingAnimation(getText(), 150);

  return (
    <div className="flex justify-center items-center my-12 flex-col">
      <span>{typingText}</span>
    </div>
  );
};

export default Loader;
