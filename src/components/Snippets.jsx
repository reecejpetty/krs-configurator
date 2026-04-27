export function Tooltip({ name, text }) {
  return (
    <div className="tooltip">
      <div className="tooltipIndicator" style={{anchorName: `--tooltip-${name}`}}>?</div>
      <div className="tooltipContent" style={{positionAnchor: `--tooltip-${name}`}}>{text}</div>
    </div>
  )
}