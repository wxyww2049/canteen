import AtActivityIndicator from "./AtActivityIndicator";

export default function AtButton(props) {
  return (
    <button
      className={'at-button ' +
        (props.className ?? '') +
        (props.type ? (' at-button--' + props.type) : '')
      }
      disabled={props.disabled || props.loading}
      onClick={props.onClick}
      style={props.style}
    >
      {props.loading && (<AtActivityIndicator />)}
      {props.children}
    </button>
  )
}