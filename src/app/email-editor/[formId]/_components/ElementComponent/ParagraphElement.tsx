const ParagraphElement = ({
  style,
  textarea,
}: {
  style: {};
  textarea: string;
}) => {
  return (
    <div className="w-full" style={style}>
      <h2> {textarea} </h2>
    </div>
  );
};

export default ParagraphElement;
