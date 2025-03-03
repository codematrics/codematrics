import { ScrollDown } from "@/assets/svgs/svg";
import Button from "@/components/common/Button";

const TagLine = () => {
  return (
    <section className="w-full bg-black min-1024:py-[260px] max-1024:min-768:py-[170px] max-768:py-[130px] relative text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 right-0 bottom-0 w-full min-h-full object-fill z-[1]"
      >
        <source src="/assets/video/tagline-wave-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full flex justify-center items-center relative z-[2]">
        <div className="text-center w-[60%] max-1500:w-[75%] max-1200:w-[80%] max-768:w-[90%] max-768:px-[40px] max-600:px-[20px]">
          <h1 className="static text-[52px] leading-[57px] max-1200:text-[48px] max-1200:leading-[53px] max-1030:text-[40px] max-1030:leading-[45px] max-600:text-[35px] max-600:leading-[40px] max-420:text-[27px] max-420:leading-[32px] font-bold text-white">
            The Only Partner You&apos;ll Need for Web, App, and Software
            Excellence.
          </h1>
          <p className="text-[18px] w-[80%] max-1200:text-[16px] max-1030:text-[14px] max-600:text-[12px] max-1030:w-[90%] max-600:w-full mt-5 opacity-80 mx-auto">
            Empowering businesses with innovative web, mobile, and software
            solutions to transform visions into seamless digital experiences and
            maximize ROI.
          </p>
          <div className="mt-10 flex justify-center">
            <Button label={"Let's discuss your Project"} href={"/"} showArrow />
          </div>
        </div>
      </div>
      <div className="absolute animate-bounce bottom-[10px] left-[50%] translate-x-[-50%] z-40">
        <ScrollDown height={30} width={30} />
      </div>
    </section>
  );
};

export default TagLine;
