import React, { useState, useRef, useMemo } from "react";
import "./styles/Wheel.css";

const Wheel = () => {
   const segments = useMemo(
      () => ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
      []
   ); // Мемоизация массива сегментов

   const [rotation, setRotation] = useState(0); // текущий угол поворота
   const [spinning, setSpinning] = useState(false); // состояние вращения
   const [result, setResult] = useState(null); // результат вращения
   const pointerRef = useRef(null); // ссылка на язычок

   // Функция вращения
   const spinWheel = () => {
      if (spinning) return;

      setSpinning(true);
      const randomDegree = Math.floor(Math.random() * 360) + 3600; // Случайный угол поворота (по минимуму 10 полных оборотов)
      const finalRotation = rotation + randomDegree;

      setRotation(finalRotation);

      // После завершения вращения определяем результат
      setTimeout(() => {
         const segmentAngle = 360 / segments.length;
         const finalAngle = finalRotation % 360;
         const winningSegmentIndex = Math.floor(
            (360 - finalAngle) / segmentAngle
         );
         setResult(segments[winningSegmentIndex]);

         setSpinning(false);
      }, 3000); // продолжительность вращения (3 сек)
   };

   return (
      <div className="wheel-container">
         <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
            <div className="wheel-segments">
               {segments.map((segment, index) => {
                  const angle = (360 / segments.length) * index;
                  const transform = `rotate(${angle}deg) translateY(-50%)`;
                  return (
                     <div
                        className="wheel-segment"
                        style={{ transform }}
                        key={index}
                     >
                        <span>{segment}</span>
                     </div>
                  );
               })}
            </div>
         </div>

         {/* Язычок */}
         <div className="wheel-pointer" ref={pointerRef}></div>

         <div className="button-container">
            <button onClick={spinWheel} disabled={spinning}>
               {spinning ? "Вращается..." : "Вращать"}
            </button>
         </div>

         {result && <div className="result">Вы выиграли: {result}</div>}
      </div>
   );
};

export default Wheel;
