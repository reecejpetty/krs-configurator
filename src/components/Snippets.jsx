export function Tooltip({ text }) {
  return (
    <>
      <div className="tooltipIndicator">
        ?
        <div className="tooltipContent">{text}</div>
      </div>
    </>
  )
}