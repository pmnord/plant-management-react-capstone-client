import React, { useState } from "react";

import "./Tooltip.css";

const Tooltip = ({ children, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="tooltip"
    >
      {children}
      {showTooltip && <div className="tooltip__box">{content}</div>}
    </div>
  );
};

export default Tooltip;
