interface TiltleProps {
  title: string;
}
const Title = (props: TiltleProps) => {
  const { title } = props;
  return (
    <div>
      {title}
    </div>
  );
};

export default Title;
