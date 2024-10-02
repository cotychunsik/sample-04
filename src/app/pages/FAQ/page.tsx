'use client';

import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function FAQ() {
  // State to track which FAQ item is open
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  // Toggle function to open/close the question
  const toggleQuestion = (index: number) => {
    if (openQuestion === index) {
      setOpenQuestion(null); // Close the question if it's already open
    } else {
      setOpenQuestion(index); // Open the clicked question
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y:50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
                ease: "easeInOut",
                duration: 2,
                y: { duration: 1 },
            }}className="text-slate-100 px-10 py-5 sm:px-40 sm:py-10 md:py-20  md:px-40 lg:py-40 lg:px-96">
      <div className="mb-4">
        <p className="font-semibold text-2xl animate-fadeIn">
          Frequently asked Questions
        </p>
        <p className="font-light text-slate-400 break-keep animate-fadeIn">
          우주여행에 대해 궁금한 점이 있으신가요? 아래에서 자주 묻는 질문들을 확인해보세요.
        </p>
      </div>
      <div className="pt-4">
        {/* FAQ Item 1 */}
        <div className="pb-5 border-b-2 border-indigo-900">
          <div className="flex flex-row items-center justify-between">
            <p className="font-light">우주여행 비용은 얼마나 되나요?</p>
            <button onClick={() => toggleQuestion(1)}>
              {openQuestion === 1 ? (
                <MinusIcon className="h-6 w-6" />
              ) : (
                <PlusIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          {/* Answer */}
          {openQuestion === 1 && (
            <div className="pt-4 animate-fadeIn">
              <p className="font-light text-slate-400 leading-relaxed">
                우주여행의 비용은 다양한 요인에 따라 다르지만, 평균적으로 수백만 달러 정도로 예상됩니다.<br/>
                하지만 저희 Galaxia Journey에서는 합리적인 비용으로 여행패키지를 운영하기 위해 연단위로 
                여행고객님을 모집하며 패키지에 따라 1만달러부터 우주여행을 즐기실 수 있습니다!
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 2 */}
        <div className="py-5 border-b-2 border-indigo-900">
          <div className="flex flex-row items-center justify-between">
            <p className="font-light">우주 여행에 필요한 사전 준비는 무엇인가요?</p>
            <button onClick={() => toggleQuestion(2)}>
              {openQuestion === 2 ? (
                <MinusIcon className="h-6 w-6" />
              ) : (
                <PlusIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          {/* Answer */}
          {openQuestion === 2 && (
            <div className="pt-4 animate-fadeIn">
              <p className="font-light text-slate-400 leading-relaxed">
                우주여행을 위한 신체적, 정신적 준비가 필요하며, 특별한 훈련 프로그램이 포함될 수 있습니다.<br/>
                안전한 여행을 위해 만들어진 훈련으로 고객님의 상황에 따라 6개월에서 최장 1년이 소요될 수 있습니다. 
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 3 */}
        <div className="py-5 border-b-2 border-indigo-900">
          <div className="flex flex-row items-center justify-between">
            <p className="font-light">여행은 얼마나 걸리나요?</p>
            <button onClick={() => toggleQuestion(3)}>
              {openQuestion === 3 ? (
                <MinusIcon className="h-6 w-6" />
              ) : (
                <PlusIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          {/* Answer */}
          {openQuestion === 3 && (
            <div className="pt-4 animate-fadeIn">
              <p className="font-light text-slate-400 leading-relaxed">
                여행에 소요되는 시간은 패키지마다 다릅니다. <br/>
                예를 들어 <span className="font-semibold">Low Earth Orbit</span> 프로그램의 경우 36시간이 소요되며, 
                <span className="font-semibold">Deep Space Journey</span> 프로그램의 경우 최장 3년까지 소요될 수 있습니다. 
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
