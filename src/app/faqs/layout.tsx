import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Faq({children}:Readonly<{
  children: React.ReactNode;
}>) {
    console.warn('%cWARNING!%c Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.',
      'font-size: 26px; font-weight: bold; color: #FF4C00;',  // Modern orange with larger size
      'font-size: 18px; color: #4A90E2;'                     // Subtle blue color for the second part
    );
  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  );
}
