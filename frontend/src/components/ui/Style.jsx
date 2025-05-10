// src/components/Flex.jsx
import PropTypes from "prop-types";
import classNames from "classnames";

const Flex = ({
  children,
  direction = "row",
  justify = "start",
  align = "stretch",
  wrap = false,
  gap = 0,
  className = "",
}) => {
  const directionMap = {
    row: "flex-row",
    col: "flex-col",
    "row-reverse": "flex-row-reverse",
    "col-reverse": "flex-col-reverse",
  };

  const justifyMap = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const alignMap = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch",
  };

  return (
    <div
      className={classNames(
        "flex",
        directionMap[direction],
        justifyMap[justify],
        alignMap[align],
        wrap ? "flex-wrap" : "flex-nowrap",
        gap && `gap-${gap}`,
        className,
      )}
    >
      {children}
    </div>
  );
};

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["row", "col", "row-reverse", "col-reverse"]),
  justify: PropTypes.oneOf([
    "start",
    "end",
    "center",
    "between",
    "around",
    "evenly",
  ]),
  align: PropTypes.oneOf(["start", "end", "center", "baseline", "stretch"]),
  wrap: PropTypes.bool,
  gap: PropTypes.number,
  className: PropTypes.string,
};

export default Flex;
