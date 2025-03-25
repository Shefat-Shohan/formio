const TextElement = ({ style, content }: { style: {}; content: string }) => {
  return (
    <table className="w-full" style={style}>
      <tr>
        <td>
          <h2> {content} </h2>
        </td>
      </tr>
    </table>
  );
};

export default TextElement;
