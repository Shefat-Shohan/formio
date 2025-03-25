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
    <table className="w-full" style={outerStyle}>
      <tr>
        <td>
          <img
            src={imageUrl}
            alt={alt}
            style={style}
            className="w-full h-full"
          />
        </td>
      </tr>
    </table>
  );
};

export default ImageElement;
