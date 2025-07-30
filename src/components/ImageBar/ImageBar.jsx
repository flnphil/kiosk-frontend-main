import React from "react";
import loginImage from "../../assets/images/login.jpg"; // adjust the path as needed

const ImageBar = () => {
  return (
    <div className="flex-1 md:w-1/2 w-full h-[300px] md:h-auto z-20">
      <img
        src={loginImage}
        alt="Signup"
        className="bject-cover mt-[100px] h-[calc(100%-100px)]"
      />
    </div>
  );
};

export default ImageBar;
