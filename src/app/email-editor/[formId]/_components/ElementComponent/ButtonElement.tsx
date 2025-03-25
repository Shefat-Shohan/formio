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
    <table className="w-full">
      <tr>
        <td>
          <a href={url} style={outerStyle}>
            <button onClick={handleClick} style={style}>
              {content}
            </button>
          </a>
        </td>
      </tr>
    </table>
  );
};

export default ButtonElement;
