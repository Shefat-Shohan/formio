import React from "react";

const TextElement = ({ style, content }: { style: {}; content: string }) => {
  return (
    <div className="w-full" style={style}>
      <h2> {content} </h2>
    </div>
  );
};

export default TextElement;
