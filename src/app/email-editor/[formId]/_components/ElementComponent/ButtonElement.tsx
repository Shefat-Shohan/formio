const ButtonElement = ({
  style,
  content,
  url,
  outerStyle,
}: {
  style: {};
  content: string;
  url: string;
  outerStyle: {};
}) => {
  return (
    <div className="w-full">
      <a href={url} style={outerStyle}>
        <button style={style}> {content} </button>
      </a>
    </div>
  );
};

export default ButtonElement;
