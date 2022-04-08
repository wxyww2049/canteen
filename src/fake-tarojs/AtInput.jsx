import { Fragment } from "react/cjs/react.production.min";

export default function AtInput(props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.onConfirm?.()
      }}
    >
      <div className={'at-input ' + (props.className ?? '')}>
        <input
          placeholder={props.placeholder}
          onChange={e => props.onChange?.(e.target.value)}
          value={props.value}
          type={props.type}
        />
        {props.children && (
          <Fragment>
            <div className='at-input-split'></div>
            {props.children}
          </Fragment>
        )}
      </div>
    </form>
  )
}
