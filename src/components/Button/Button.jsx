import React, { useState } from "react";

const Button = ({
  borderColour,
  textColor,
  textContent,
  togglePopup,
  backgroundColor,
  hoverTextColor,
  widthStatus,
  disabled = false,
  type = "button",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const getBackgroundColor = () => {
    if (isHovered) {
      if (
        backgroundColor === "var(--dropdown-icon-color)" ||
        backgroundColor === "var(--secondary-color)"
      )
        return "var(--hover-secondary-color)";
      else if (backgroundColor === "var(--tooltip-price-color)")
        return "var(--hover-price-color)";
      else return "var(--tooltip-heading-bg-color)";
    } else return backgroundColor;
  };

  const getDisabledColor = () => {
    if (
      backgroundColor === "var(--dropdown-icon-color)" ||
      backgroundColor === "var(--secondary-color)"
    )
      return "var(--hover-secondary-color)";
    else if (backgroundColor === "var(--tooltip-price-color)")
      return "var(--hover-price-color)";
    else return "var(--tooltip-heading-bg-color)";
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${
        widthStatus && "w-full"
      } rounded-[10px] h-9 whitespace-nowrap py-0 px-2 min-w-[76px] ${
        !disabled && "cursor-pointer"
      }`}
      style={{
        border: borderColour ? `1.5px solid ${borderColour}` : "none",
        background: disabled ? getDisabledColor() : getBackgroundColor(),
        outline: "none",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...(type === "button" && { onClick: togglePopup })} // ONLY attach onClick if it's type button
    >
      <span
        className="font-semibold text-[13px]"
        style={{
          color: isHovered && hoverTextColor ? hoverTextColor : textColor,
        }}
      >
        {textContent}
      </span>
    </button>
  );
};

export default Button;
