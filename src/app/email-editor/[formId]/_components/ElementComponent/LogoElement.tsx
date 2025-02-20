import Image from "next/image";
import React from "react";
type Props = {};

const LogoElement = ({
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
    <div>
      <Image src={imageUrl} alt={alt} style={style} />
    </div>
  );
};

export default LogoElement;
