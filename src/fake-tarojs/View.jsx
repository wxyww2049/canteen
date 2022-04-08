export default function View(props) {
  return (
    <div {...props}>{props.children}</div>
  );
}