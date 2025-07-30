import React from "react";

const InputBox = ({ label, value, setValue, placeholder, type }) => {
  return (
    <>
      <div className="font-medium text-base mt-[16px] text-[#1E1E1E]">
        {label}
      </div>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="border-[1px] border-[#1E1E1E] h-[35px] px-[12px] pt-[8px] pb-[7px] text-sm rounded-[10px] mt-[4px] w-full font-medium text-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default InputBox;
