import React from "react";

export type SnowflakeProps = {
  id: number;
  style: React.CSSProperties;
};

const Snowflake: React.FC<SnowflakeProps> = ({ id, style }) => {
  return (
    <p className="Snowflake" id={`item${id}`} style={style}>
      *
    </p>
  );
};

export default Snowflake;
