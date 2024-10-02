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
          <div className="flip-card-front card-frontal-css">
            <FontAwesomeIcon icon={faSpaceShuttle} size="3x" className="-rotate-45 text-red-50" />
          </div>
          {/* Back side */}
          <div className="flip-card-back card-back-css">
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
          <div className="flip-card-front card-frontal-css">
            <FontAwesomeIcon icon={faHandsHoldingCircle} size="3x" className=" text-red-50" />
          </div>
          {/* Back side */}
          <div className="flip-card-back card-back-css">
            <p>Zero Gravity Comfort</p>
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
          <div className="flip-card-front card-frontal-css
           ">
            <FontAwesomeIcon icon={faMeteor} size="3x" className=" text-red-50" />
          </div>
          {/* Back side */}
          <div className="flip-card-back card-back-css
          ">
            <p>Low Earth Orbit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
