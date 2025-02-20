import React from "react";
import Image from "next/image";
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
    <div style={outerStyle}>
      <Image src={imageUrl} alt={alt} style={style} />
    </div>
  );
};

export default ImageElement;
