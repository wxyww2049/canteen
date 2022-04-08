export default function AtGrid(props) {
  return (
    <div className='at-grid' style={{ gridTemplateColumns: `repeat(${props?.columnNum ?? 4}, 1fr)` }}>
      {props.data.map((item, index) => (
        <button className='at-grid-item' key={index} onClick={() => props?.onClick(item, index)}>
          <div className='at-grid-item-image'>
            <img src={item.image} alt={item.value} />
          </div>
          <div className='at-grid-item-text'>{item.value}</div>
        </button>
      ))}
    </div>
  )
}
