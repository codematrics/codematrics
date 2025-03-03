import Button from "@/components/common/Button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 min-h-dvh">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          404 - Not Found
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 opacity-80">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <div className="relative w-full max-w-lg">
          <p className="text-[120px] sm:text-[150px] md:text-[200px] font-extrabold text-gray-600/20 absolute top-0 left-1/2 transform -translate-x-1/2">
            404
          </p>
        </div>

        <Button label={"Return Home"} classes={"mt-6"} href={"/"} showArrow />
      </div>
      <Footer />
    </div>
  );
}
