import Image from "next/image";
import Logo from "../../public/logo/CodeMatrix.webp";
import Link from "next/link";
import { navData } from "@/data/navbar";

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-12 py-12 md:py-16 ">
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start">
        <Link
          href={"/"}
          className="flex items-center mb-6 md:mb-0 justify-center md:justify-start"
        >
          <Image
            src={Logo}
            height={50}
            width={50}
            alt="codematrics"
            placeholder="blur"
          />
          <p className="text-2xl font-bold ml-2">CodeMatrics</p>
        </Link>

        <div className="flex flex-col  items-center md:items-end w-full md:w-auto">
          <div className="flex gap-4 mb-4 justify-center md:justify-start">
            <Link href="https://www.linkedin.com" passHref>
              <Image
                src={"/assets/svgs/social/linkdin.svg"}
                height={24}
                width={24}
                alt="LinkedIn"
              />
            </Link>
            <Link href="https://www.facebook.com" passHref>
              <Image
                src={"/assets/svgs/social/facebook.svg"}
                height={24}
                width={24}
                alt="Facebook"
              />
            </Link>
            <Link href="https://www.instagram.com" passHref>
              <Image
                src={"/assets/svgs/social/instagram.svg"}
                height={24}
                width={24}
                alt="Instagram"
              />
            </Link>
            <Link href="https://www.youtube.com" passHref>
              <Image
                src={"/assets/svgs/social/youtube.svg"}
                height={24}
                width={24}
                alt="YouTube"
              />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            {navData.map((data, _) => {
              return (
                <Link key={_} href={data.link} passHref>
                  <p className="text-lg md:text-md font-semibold text-center">
                    {data.label}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
