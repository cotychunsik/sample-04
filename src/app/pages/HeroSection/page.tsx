'use client';


export default function HeroSection() {
  return (
    <header className="relative mx-auto w-full">
      <div className="relative bg-stars bg-cover bg-center w-full h-96  sm:px-40  md:px-60 md:h-screen lg:px-80">
        </div>
      <div className="px-10 sm:px-20 md:px-40 lg:px-80 absolute inset-0 flex flex-col justify-center items-center  mix-blend-screen ">
        <p className="animate-fadeIn text-slate-100 font-extralight text-xl pb-4
        sm:text-4xl sm:font-bold">Your Journey Beyond the Stars</p>
        <div className="border-4 border-spacing-1 border-white p-4 animate-fadeIn">
       <h1 className="bg-slate-50 text-black font-bold text-5xl sm:text-7xl hover:animate-pulse"> Become the Final Frontier</h1>
        </div>
      </div>
    </header>
  );
}
