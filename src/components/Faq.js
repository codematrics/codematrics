"use client";

import { useState } from "react";
import { faqs } from "../data/faqs";
import Button from "./common/Button";

// FAQ Component for each FAQ
const FaqHoc = ({ question, answer, openIndex, setOpenIndex, faqIndex }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-4">
      <div
        className="w-full flex items-center justify-between cursor-pointer p-3 sm:p-4 md:p-5 bg-[#3486dd21] hover:bg-gray-700 rounded-md transition-colors duration-300"
        onClick={() => setOpenIndex(faqIndex === openIndex ? null : faqIndex)}
      >
        <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">
          {question}
        </p>
        <p className="text-xl text-white">
          {faqIndex === openIndex ? "-" : "+"}
        </p>
      </div>
      {faqIndex === openIndex && (
        <div className="w-full p-4 sm:p-5 md:p-6 mt-4 bg-black text-white rounded-lg shadow-lg transition-all duration-300">
          <p className="text-base sm:text-lg md:text-xl">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faqs = ({ showAllFaqs = false, showFaqDigit = 5 }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqsToShow = showAllFaqs ? faqs : faqs.slice(0, showFaqDigit);

  return (
    <section className="w-full bg-black relative text-white py-8 flex flex-col items-center justify-center mt-16">
      <div className="w-full max-w-4xl px-4">
        <p className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-8">
          FAQs
        </p>
        {faqsToShow.map((faq, faqIndex) => {
          return (
            <FaqHoc
              key={faqIndex}
              faqIndex={faqIndex}
              question={faq.question}
              answer={faq.answer}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          );
        })}
      </div>

      {/* Show more button only if showAllFaqs is false */}
      {!showAllFaqs && (
        <div className="mt-6 px-4 w-full flex justify-center">
          <Button
            label={"Show More FAQs"}
            href={"/faqs"}
            showArrow
            classes="max-w-xs sm:max-w-md lg:max-w-lg"
          />
        </div>
      )}
    </section>
  );
};

export default Faqs;
