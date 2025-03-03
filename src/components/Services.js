"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import { useState } from "react";
import { TickArrow } from "./../assets/svgs/svg";
import { services } from "./../data/services";

const Services = () => {
  const [currentService, setCurrentService] = useState(services[0]);
  return (
    <section className="py-12 flex justify-center">
      <div className="w-[70%] max-1500:w-[75%] max-1200:w-[80%] max-768:w-[90%]">
        <p className="text-[52px] leading-[57px] max-1200:text-[48px] max-1200:leading-[53px] max-1030:text-[40px] max-1030:leading-[45px] max-600:text-[35px] max-600:leading-[40px] max-420:text-[27px] max-420:leading-[32px] text-center font-bold">
          Delivering Seamless Digital Experiences Through Innovation
        </p>
        <p className="text-base sm:text-lg md:text-xl text-center mt-4 sm:mt-5 md:mt-6">
          Partnering to Design, Develop & Deliver Innovative Digital Solutions
        </p>
        <div className="mt-10 sm:mt-12 md:mt-14">
          <div className="sm:hidden">
            <label
              htmlFor="service-dropdown"
              className="block text-sm text-white mb-2"
            >
              Select a Service
            </label>
            <select
              id="service-dropdown"
              className="w-full p-4 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              onChange={(e) => {
                const selectedService = services.find(
                  (service) => service.shortName === e.target.value
                );
                setCurrentService(selectedService);
              }}
              value={currentService?.shortName || ""}
            >
              <option value="" disabled className="text-gray-500">
                Choose a service
              </option>
              {services?.map((service, index) => (
                <option key={index} value={service.shortName}>
                  {service?.shortName ?? "Service"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 md:mt-14">
          <div className="lg:flex lg:flex-wrap lg:justify-center lg:gap-[60px] lg:overflow-x-auto lg:pb-4 lg:scroll-smooth hidden sm:flex sm:w-full sm:justify-center sm:gap-6 sm:overflow-x-auto sm:pb-4 sm:scroll-smooth">
            {services?.map((service, serviceIndex) => (
              <p
                key={serviceIndex}
                onClick={() => setCurrentService(service)}
                className="font-bold relative cursor-pointer pb-1 group transition-all duration-300 flex-shrink-0"
              >
                <span className="z-10">{service.shortName ?? ""}</span>

                <span
                  className={`absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full ${
                    currentService === service ? "w-full" : ""
                  }`}
                ></span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="flex flex-col justify-center">
            <p className="text-[40px] leading-[45px] max-1200:text-[36px] max-1200:leading-[41px] max-1030:text-[28px] max-1030:leading-[33px] max-600:text-[23px] max-600:leading-[28px] max-420:text-[15px] max-420:leading-[20px] text-center font-bold">
              {currentService?.title ?? ""}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-center mt-4 sm:mt-5 md:mt-6">
              {currentService?.subTitle ?? ""}
            </p>

            <div className=" w-full flex justify-center">
              <div className="flex flex-wrap flex-col justify-center gap-6 mt-10 sm:mt-12 md:mt-14">
                {currentService?.subServices?.map(
                  (subService, subServiceIndex) => (
                    <p
                      key={subServiceIndex}
                      className="font-bold relative cursor-pointer pb-1 group transition-all duration-300 flex gap-2 items-center"
                    >
                      <TickArrow fill="white" />
                      <span>{subService?.label ?? ""}</span>
                    </p>
                  )
                )}
              </div>
            </div>

            <div className="mt-10 sm:mt-12 md:mt-14 flex justify-center">
              <Button
                label={"Learn More"}
                href={currentService?.link ?? "/"}
                showArrow
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Image
              width={500}
              height={500}
              src={currentService?.image}
              alt={currentService?.title ?? "Service Image"}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
