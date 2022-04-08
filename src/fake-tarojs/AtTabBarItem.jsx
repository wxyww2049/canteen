export default function AtTabBarItem(props) {
  return (
    <button className={"at-tab-bar-item" + (props.current ? ' current' : '')} onClick={props.onClick}>
      <img src={props.image} alt='' />
      <div className="at-tab-bar-item-title">{props.title}</div>
    </button>
  )
}