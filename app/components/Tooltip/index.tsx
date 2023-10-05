import classNames from "classnames"
import styles from "./index.module.css"

interface TooltipProps {
  children: React.ReactNode
  text: string
  direction?: "top" | "left" | "bottom" | "right"
}

export default function Tooltip({
  children,
  text,
  direction = "top",
}: TooltipProps) {
  return (
    <div
      className={classNames(styles.tooltip, {
        [styles.tooltipTop]: direction === "top",
        [styles.tooltipLeft]: direction === "left",
        [styles.tooltipBottom]: direction === "bottom",
        [styles.tooltipRight]: direction === "right",
      })}
      data-tooltip={text}
    >
      {children}
    </div>
  )
}
