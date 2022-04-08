export default function AtListItem(props) {
  return (
    <button className={"at-list-item" + ((props.hasBorder ?? true) ? ' border' : '')} onClick={props.onClick}>
      <div className='at-list-item-row'>
        <div className='at-list-item-title'>{props.title}</div>
        <div className='at-list-item-row'>
          {props.extraText && (<div className='at-list-item-extra'>{props.extraText}</div>)}
          <i className={'fas fa-angle-' + (props.arrow ?? 'right')} style={{ visibility: props.arrow ? '' : 'hidden' }} />
        </div>
      </div>
      <div className='at-list-item-note'>{props.note}</div>
    </button>
  )
}
