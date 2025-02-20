import Link from "next/link";
import React from "react";

type Props = {};

const ButtonElement = ({
  style,
  content,
  url,
}: {
  style: {};
  content: string;
  url: string;
}) => {
  return (
    <div>
      <a href={url}>
        <button style={style}> {content} </button>
      </a>
    </div>
  );
};

export default ButtonElement;
