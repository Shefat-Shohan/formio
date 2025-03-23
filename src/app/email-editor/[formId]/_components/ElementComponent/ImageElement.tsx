import Image from "next/image";
import React from "react";
const ImageElement = ({
  style,
  imageUrl,
  outerStyle,
  alt,
}: {
  style: {};
  imageUrl: string;
  outerStyle: {};
  alt: string;
}) => {
  return (
    <div className="w-full" style={outerStyle}>
      <img
        src={imageUrl}
        alt={alt}
        style={style}
        className="w-full h-full"
      />
    </div>
  );
};

export default ImageElement;
