import { useState, useRef, useEffect } from "react";
import { usePosition } from "./hook/usePosition";
import "./SmartTooltip.scss";
import React from "react";

interface SmartTooltipProps {
  text: string;
  children: React.ReactNode;
}

export const SmartTooltip = React.memo<SmartTooltipProps>(({
  text,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const anchorRef = useRef(null);
  const tooltipRef = useRef(null);
  const { position, placement, calculatePosition, arrowPosition } = usePosition();

  const updatePosition = () => {
    if (anchorRef.current && tooltipRef.current) {
      calculatePosition(anchorRef.current, tooltipRef.current);
    }
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const handleResize = () => {
      updatePosition();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible]);

  return (
    <div
      ref={anchorRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`smart-tooltip smart-tooltip--${placement}`}
          style={{ top: position.top, left: position.left }}
        >
          {text}
          <span className="smart-tooltip__arrow" style={{left: `${arrowPosition}`}} />
        </div>
      )}
    </div>
  );
},(prevProps, nextProps) => {
  return prevProps.text === nextProps.text;
})
