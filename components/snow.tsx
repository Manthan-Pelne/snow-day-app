"use client";

import React, { useEffect, useState } from "react";
import Snowflake from "./Snowflake";

type SnowflakeItem = {
  id: number;
  style: React.CSSProperties;
};

const Snow: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<SnowflakeItem[]>([]);

  useEffect(() => {
    const text =
      "Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!! ".repeat(
        3
      );

    const arr = Array.from(text);

    const generated = arr.map((_, i) => {
      const animationDelay = `${(Math.random() * 16).toFixed(2)}s`;
      const fontSize = `${Math.floor(Math.random() * 10 + 10)}px`;

      return {
        id: i,
        style: {
          animationDelay,
          fontSize,
        },
      };
    });

    setSnowflakes(generated);
  }, []);

  return (
    <div className="App">
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          id={flake.id}
          style={flake.style}
        />
      ))}
    </div>
  );
};

export default Snow;
