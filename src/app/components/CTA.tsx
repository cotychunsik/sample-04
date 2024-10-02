import AnimatedButton from "./AnimatedButton"
export default function CTA(){
    return(
        <div className="px-10 sm:px-40 ">
            <div className="text-slate-100 bg-indigo-800 bg-opacity-25 backdrop-blur-xl p-10 rounded-2xl flex flex-col gap-5">
                <p>About Galaxia Journeys</p>
                <p className="font-light">Galaxia Journeys는 우주 탐험의 선두주자로, 여러분의 꿈을 현실로 만드는 데 주력하고 있습니다. 세계 최고의 우주 전문가들과 함께, 우리는 안전하고 혁신적인 우주 여행을 제공합니다.</p>
            <AnimatedButton text={'Contact Us'}/>
            
            </div>
        </div>
    )
}