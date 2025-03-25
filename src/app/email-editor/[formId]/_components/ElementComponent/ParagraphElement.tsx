const ParagraphElement = ({
  style,
  textarea,
}: {
  style: {};
  textarea: string;
}) => {
  return (
    <table className="w-full" style={style}>
      <tr>
        <td>
          <h2> {textarea} </h2>
        </td>
      </tr>
    </table>
  );
};

export default ParagraphElement;
