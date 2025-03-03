"use client";

import { NavBarCloseIcon, NavBarToggleIcon } from "@/assets/svgs/svg";
import Button from "@/components/common/Button";
import { navData } from "@/data/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../public/logo/CodeMatrix.webp";
import Link from "next/link";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const toggleNav = () => setShowNav(!showNav);
  const handleSubCategoryClick = (category) => {
    setActiveSubCategory(category);
  };

  const handleResize = () => {
    if (window.innerWidth > 1250) {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`w-full max-768:px-[20px] px-[40px] py-5 absolute top-0 z-50 text-white ${
        showNav ? "bg-black" : ""
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <Link href={"/"} className="flex items-center z-[51]">
          <Image
            src={Logo}
            height={50}
            alt="codematrics"
            // blurDataURL={blurBase64}
            placeholder="blur"
          />
          <p className="text-2xl font-bold ml-1 max-420:hidden">CodeMatrics</p>
        </Link>
        <div className="max-1250:hidden">
          <ul className="flex max-1250:block gap-8 max-1250:py-[40px]">
            {navData.map((data, _) => {
              return (
                <li key={_} className="group/main max-1250:py-[20px]">
                  {data.subCategories ? (
                    <>
                      <p
                        className="cursor-pointer flex items-center relative font-bold max-1250:text-[30px] max-768:text-[25px] text-start"
                        onClick={() => handleSubCategoryClick(data.label)}
                      >
                        {data.label}
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 8 5"
                            fill="none"
                            className="ml-1 group-hover:rotate-180 transition-all duration-300 h-[10px] w-[8px] max-1250:h-[28px] max-1250:ml-0 max-1250:w-[26px] max-1250:rotate-[270deg]"
                          >
                            <path
                              d="M1 1.396L4.03773 3.99976L7.07546 1.396"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover/main:w-full"></span>
                      </p>
                      <ul className="hidden group-hover/main:block absolute p-2 shadow-lg py-6 bg-black min-w-[250px] z-50">
                        {data.subCategories?.map((category, _) => (
                          <li key={_} className="group/sub py-2">
                            {category.subCategories?.length ? (
                              <>
                                <p className="relative font-bold cursor-pointer mx-6 max-1250:text-[30px] max-768:text-[25px] text-start">
                                  {category.label}
                                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover/sub:w-full"></span>
                                </p>
                                <ul className="hidden group-hover/sub:block absolute left-full top-0 p-2 shadow-lg py-6 min-w-[250px] bg-black px-6 z-[51] min-h-full">
                                  {category.subCategories.map(
                                    (subCategory, _) => (
                                      <li key={_} className="py-1">
                                        <Link
                                          href={subCategory.link}
                                          className="after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:bottom-0 after:transition-all after:duration-300 font-bold max-1250:text-[30px] max-768:text-[25px] text-start"
                                        >
                                          {subCategory.label}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </>
                            ) : (
                              <div className="px-6">
                                <Link
                                  href={category.link}
                                  className="after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:bottom-0 after:transition-all after:duration-300 font-bold max-1250:text-[30px] max-768:text-[25px] text-start"
                                >
                                  {category.label}
                                </Link>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={data.link}
                      className="font-bold after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:bottom-0 after:transition-all after:duration-300 max-1250:text-[30px] max-768:text-[25px] text-start"
                    >
                      {data.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`${
            showNav
              ? "max-1250:block max-1250:absolute top-full left-0 min-h-dvh w-full bg-black max-768:px-[20px] px-[40px]"
              : "hidden"
          }`}
        >
          <ul className="flex max-1250:block gap-8 max-1250:py-[40px]">
            {navData.map((data, _) => {
              return (
                <li key={_} className="group/main max-1250:py-[20px]">
                  <button
                    className="cursor-buttonpointer flex items-center relative font-bold max-1250:text-[30px] max-768:text-[25px] text-start"
                    onClick={() => handleSubCategoryClick(data)}
                  >
                    {data.label}
                    <span>
                      {data.subCategories?.length && (
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 8 5"
                            fill="none"
                            className="ml-1 group-hover:rotate-180 transition-all duration-300 h-[10px] w-[8px] max-1250:h-[28px] max-1250:ml-0 max-1250:w-[26px] max-1250:rotate-[270deg]"
                          >
                            <path
                              d="M1 1.396L4.03773 3.99976L7.07546 1.396"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {activeSubCategory && (
            <ul className="hidden max-1250:block absolute top-0 bottom-0 right-0 left-0 bg-black gap-8 max-768:px-[20px] p-[40px]">
              <li className="pb-5">
                <button
                  className="cursor-pointer p-2 border border-white rounded-full"
                  onClick={() => setActiveSubCategory(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 8 5"
                    fill="none"
                    className="h-[28px] w-[26px] rotate-90"
                  >
                    <path
                      d="M1 1.396L4.03773 3.99976L7.07546 1.396"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </li>
              {activeSubCategory.subCategories?.map((data, _) => {
                return (
                  <li key={_} className="group/main max-1250:py-[20px]">
                    <button
                      className="cursor-pointer flex items-center relative font-bold max-1250:text-[30px] max-768:text-[25px] text-start"
                      onClick={() => handleSubCategoryClick(data)}
                    >
                      {data.label}
                      {data.subCategories?.length && (
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 8 5"
                            fill="none"
                            className="ml-1 group-hover:rotate-180 transition-all duration-300 h-[10px] w-[8px] max-1250:h-[28px] max-1250:ml-0 max-1250:w-[26px] max-1250:rotate-[270deg]"
                          >
                            <path
                              d="M1 1.396L4.03773 3.99976L7.07546 1.396"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-8 z-[51]">
          <div className="max-675:hidden">
            <Button label={"Contact Us"} href={"/"} showArrow />
          </div>
          <div className="hidden max-1250:flex items-center">
            <button onClick={toggleNav} className="text-white">
              {showNav ? <NavBarCloseIcon /> : <NavBarToggleIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
