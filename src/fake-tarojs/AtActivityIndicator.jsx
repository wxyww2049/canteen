export default function AtActivityIndicator({ mode, content }) {
  return (
    <div className={'at-activity-indicator' + (mode ? ` at-${mode}` : '')}>
      <div className='at-activity-indicator-inner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {content && (<div className="at-activity-indicator-content">{content}</div>)}
    </div>
  )
}