import CountUp from "@/app/components/CountUp";


export default function Section1() {
  return (
    <div className="
    bg-gradient-to-t from-indigo-950 from-opacity-100 to-zinc-950 to-opacity-50
    w-full grid grid-cols-3  relative items-center justify-items-center h-36 sm:h-48">
      <div className="text-3xl font-extralight text-slate-50 text-center">
      <CountUp start={200} end={15465} duration={2000} className="" />
      <span className="text-xl">Customers</span>
      </div>
      <div className="text-3xl font-extralight text-slate-50 text-center">
      <CountUp start={0} end={617} duration={2000} className="text-3xl font-extralight text-slate-50" />
      <span className="text-xl">Engineers</span>
      </div>
      <div className="text-3xl font-extralight text-slate-50 text-center">
      <CountUp start={0} end={318} duration={2000} className="text-3xl font-extralight text-slate-50" />
      <span className="text-xl">Countries</span>
      </div>
    </div>
  );
}
