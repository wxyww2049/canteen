export default function Text(props) {
  return (
    <span {...props}>{props.children}</span>
  );
}