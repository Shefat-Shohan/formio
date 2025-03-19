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
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  return (
    <div className="w-full">
      <a href={url} style={outerStyle}>
        <button onClick={handleClick} style={style}>
          {content}
        </button>
      </a>
    </div>
  );
};

export default ButtonElement;
