'use client';

import { faSpaceShuttle } from "@fortawesome/free-solid-svg-icons/faSpaceShuttle";
import { faHandsHoldingCircle } from "@fortawesome/free-solid-svg-icons";
import { faMeteor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Section3() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Flip the card on tap for mobile, but hover will still work for PC
  const handleFlip = () => {
    if (window.innerWidth <= 768) { // Assuming mobile width
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="
    bg-gradient-to-t from-zinc-950 from-opacity-100 to-indigo-950 to-opacity-50
    w-screen h-full px-20 py-10 mx-auto grid grid-flow-row sm:grid-cols-3 gap-3 relative items-center justify-items-center">
      {/* Card 1 */}
      <div
        className={`flip-card w-full h-48 rounded-md flex justify-center items-center ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip} // Flip on tap/click for mobile
      >
        <div className="flip-card-inner">
          {/* Front side */}
          <div className="
          backdrop-blur-2xl
          flip-card-front w-full h-48 rounded-md flex justify-center items-center hover:scale-105 ">
            <FontAwesomeIcon icon={faSpaceShuttle} size="3x" className="-rotate-45 text-red-50" />
          </div>
          {/* Back side */}
          <div className="
          bg-gradient-to-bl from-blue-500 from-opacity-70 via-purple-500 to-pink-500 to-opacity-50
          flip-card-back w-full h-48 rounded-md flex justify-center items-center text-white">
            <p>Deep Space Journey</p>
          </div>
        </div>
      </div>
{/* Card2 */}
      <div
        className={`flip-card w-full h-48 rounded-md flex justify-center items-center ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip} // Flip on tap/click for mobile
      >
        <div className="flip-card-inner">
          {/* Front side */}
          <div className="
          backdrop-blur-2xl
          flip-card-front w-full h-48 rounded-md flex justify-center items-center hover:scale-105 ">
            <FontAwesomeIcon icon={faHandsHoldingCircle} size="3x" className=" text-red-50" />
          </div>
          {/* Back side */}
          <div className="
          bg-gradient-to-bl from-blue-500 from-opacity-70 via-purple-500 to-pink-500 to-opacity-50
          flip-card-back w-full h-48 rounded-md flex justify-center items-center text-white">
            <p>Deep Space Journey</p>
          </div>
        </div>
      </div>
      {/* card 3 */}
      <div
        className={`flip-card w-full h-48 rounded-md flex justify-center items-center ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip} // Flip on tap/click for mobile
      >
        <div className="flip-card-inner">
          {/* Front side */}
          <div className="
          backdrop-blur-2xl
          flip-card-front w-full h-48 rounded-md flex justify-center items-center hover:scale-105 ">
            <FontAwesomeIcon icon={faMeteor} size="3x" className=" text-red-50" />
          </div>
          {/* Back side */}
          <div className="
          bg-gradient-to-bl from-blue-500 from-opacity-70 via-purple-500 to-pink-500 to-opacity-50
          flip-card-back w-full h-48 rounded-md flex justify-center items-center text-white">
            <p>Deep Space Journey</p>
          </div>
        </div>
      </div>
    </div>
  );
}
