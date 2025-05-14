'use client';
import { useState, CSSProperties } from "react";
import { PulseLoader } from "react-spinners";



function ButtonLoader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#fff");

  return (
    <div >
      <PulseLoader
        color={color}
        loading={loading}
        size={6}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default ButtonLoader;