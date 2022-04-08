export default function AtList(props) {
  return (
    <div className={"at-list " + (props.className ?? '')}>
      {props.children}
    </div>
  )
}
