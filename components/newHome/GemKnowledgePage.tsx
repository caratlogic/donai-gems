"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import ReactLenis from "lenis/react";
import { Marcellus, Jost } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export interface GemData {
  title: string;
  subtitle: string;
  introTitle: string;
  introContent: string;
  introImage: string;
  valueSection: {
    title: string;
    keyFactors: {
      title: string;
      factors: Array<{ label: string; content: string }>;
    };
    pricingInsights: {
      title: string;
      insights: Array<{ title: string; content: string }>;
    };
  };
  characteristics: {
    title: string;
    whatMakes: {
      title: string;
      content: string;
    };
    inclusions: {
      title: string;
      description: string;
      types: Array<{ title: string; content: string; image: string }>;
      additionalInfo?: string;
    };
  };
  luminescence: {
    title: string;
    content: string;
  };
  sources: {
    title: string;
    description: string;
    regions: Array<{ label: string; content: string }>;
    additionalInfo?: string;
  };
  synthetics: {
    title: string;
    sections: Array<{ title: string; content: string }>;
    notableExamples?: {
      title: string;
      description: string;
      examples: Array<{ label: string; content: string }>;
    };
  };
  care: {
    title: string;
    description: string;
    tips: Array<{ label: string; content: string }>;
  };
  whyChoose: {
    title: string;
    content: string[];
  };
}

interface GemKnowledgePageProps {
  data: GemData;
}

const GemKnowledgePage: React.FC<GemKnowledgePageProps> = ({ data }) => {
  return (
    <div>
      <ReactLenis />

      {/* Banner Section */}
      <section>
        <div className="relative w-full h-64 md:h-80 lg:h-70 overflow-hidden">
          <Image
            src="/images/bannerForGem.png"
            alt="Banner background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4 ${marcellus.className}`}
              >
                {data.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <h3
              className={`text-green-600 ${marcellus.className} font-semibold text-sm md:text-base tracking-wider uppercase`}
            >
              {data.subtitle}
            </h3>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 ${marcellus.className}`}
            >
              {data.introTitle}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {data.introContent}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src={data.introImage}
              alt={data.introTitle}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-5"
        >
          <h2
            className={`text-[26px] font-light text-[#181818] leading-[39px] ${marcellus.className}`}
          >
            {data.valueSection.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <h3
            className={`text-[26px] text-center font-light text-[#181818] leading-[39px] mb-6 ${marcellus.className}`}
          >
            {data.valueSection.keyFactors.title}
          </h3>
          <ul className={`space-y-4 ${jost.className}`}>
            {data.valueSection.keyFactors.factors.map((factor, index) => (
              <li
                key={index}
                className="text-[16px] font-normal text-[#606060] leading-[27.2px]"
              >
                <strong>{factor.label}:</strong> {factor.content}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3
            className={`text-[26px] font-light text-[#181818] leading-[39px] mb-8 text-center ${marcellus.className}`}
          >
            {data.valueSection.pricingInsights.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            {data.valueSection.pricingInsights.insights.map((insight, index) => (
              <div key={index} className="space-y-4">
                <h4
                  className={`text-[26px] font-light text-[#181818] leading-[39px] ${marcellus.className}`}
                >
                  {insight.title}
                </h4>
                <p
                  className={`text-[16px] font-normal text-[#606060] leading-[27.2px] ${jost.className}`}
                >
                  {insight.content}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Characteristics Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-light text-[#181818] mb-8 ${marcellus.className}`}
          >
            {data.characteristics.title}
          </h2>

          <h3
            className={`text-2xl md:text-3xl font-light text-[#181818] mb-6 ${marcellus.className}`}
          >
            {data.characteristics.whatMakes.title}
          </h3>
          <p
            className={`text-[16px] font-normal text-[#606060] leading-[27.2px] max-w-5xl mx-auto ${jost.className}`}
          >
            {data.characteristics.whatMakes.content}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h3
            className={`text-2xl md:text-3xl font-light text-[#181818] mb-6 text-center ${marcellus.className}`}
          >
            {data.characteristics.inclusions.title}
          </h3>
          <p
            className={`text-[16px] font-normal text-[#606060] leading-[27.2px] text-center max-w-4xl mx-auto mb-12 ${jost.className}`}
          >
            {data.characteristics.inclusions.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {data.characteristics.inclusions.types.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center"
              >
                <div className="relative h-[250px] mb-4 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <h4
                  className={`text-xl font-light text-[#181818] mb-3 ${marcellus.className}`}
                >
                  {type.title}
                </h4>
                <p
                  className={`text-[14px] font-normal text-[#606060] leading-[23.8px] ${jost.className}`}
                >
                  {type.content}
                </p>
              </motion.div>
            ))}
          </div>

          {data.characteristics.inclusions.additionalInfo && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`text-[16px] font-normal text-[#606060] leading-[27.2px] text-center max-w-5xl mx-auto mt-12 ${jost.className}`}
            >
              {data.characteristics.inclusions.additionalInfo}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Luminescence Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2
            className={`text-3xl md:text-4xl font-light text-[#181818] mb-6 ${marcellus.className}`}
          >
            {data.luminescence.title}
          </h2>
          <p
            className={`text-[16px] font-normal text-[#606060] leading-[27.2px] max-w-5xl mx-auto ${jost.className}`}
          >
            {data.luminescence.content}
          </p>
        </motion.div>
      </section>

      {/* Sources Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-light text-[#181818] mb-6 ${marcellus.className}`}
          >
            {data.sources.title}
          </h2>
          <p
            className={`text-[16px] font-normal text-[#606060] leading-[27.2px] max-w-4xl mx-auto mb-12 ${jost.className}`}
          >
            {data.sources.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6 max-w-5xl mx-auto"
        >
          {data.sources.regions.map((region, index) => (
            <div key={index} className={`${jost.className}`}>
              <p className="text-[16px] font-normal text-[#606060] leading-[27.2px]">
                <strong>{region.label} :</strong> {region.content}
              </p>
            </div>
          ))}

          {data.sources.additionalInfo && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`text-[16px] font-normal text-[#606060] leading-[27.2px] text-center pt-6 ${jost.className}`}
            >
              {data.sources.additionalInfo}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Synthetics Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-light text-[#181818] mb-12 ${marcellus.className}`}
          >
            {data.synthetics.title}
          </h2>

          {data.synthetics.sections.map((section, index) => (
            <div key={index} className="mb-16">
              <h3
                className={`text-2xl md:text-3xl font-light text-[#181818] mb-6 ${marcellus.className}`}
              >
                {section.title}
              </h3>
              <p
                className={`text-[16px] font-normal text-[#606060] leading-[27.2px] max-w-5xl mx-auto ${jost.className}`}
              >
                {section.content}
              </p>
            </div>
          ))}

          {data.synthetics.notableExamples && (
            <>
              <h3
                className={`text-2xl md:text-3xl font-light text-[#181818] mb-6 ${marcellus.className}`}
              >
                {data.synthetics.notableExamples.title}
              </h3>
              <p
                className={`text-[16px] font-normal text-[#606060] leading-[27.2px] max-w-5xl mx-auto mb-8 ${jost.className}`}
              >
                {data.synthetics.notableExamples.description}
              </p>

              <div className={`space-y-4 max-w-5xl mx-auto ${jost.className}`}>
                {data.synthetics.notableExamples.examples.map((example, index) => (
                  <p
                    key={index}
                    className="text-[16px] font-normal text-[#606060] leading-[27.2px]"
                  >
                    <strong>{example.label} :</strong> {example.content}
                  </p>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* Care Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-light text-[#181818] mb-6 ${marcellus.className}`}
          >
            {data.care.title}
          </h2>
          <p
            className={`text-[16px] font-normal text-[#606060] leading-[27.2px] max-w-5xl mx-auto mb-12 ${jost.className}`}
          >
            {data.care.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`space-y-6 max-w-5xl mx-auto ${jost.className}`}
        >
          {data.care.tips.map((tip, index) => (
            <p
              key={index}
              className="text-[16px] font-normal text-[#606060] leading-[27.2px]"
            >
              <strong>{tip.label} :</strong> {tip.content}
            </p>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2
            className={`text-3xl md:text-4xl font-light text-[#181818] mb-6 ${marcellus.className}`}
          >
            {data.whyChoose.title}
          </h2>
          {data.whyChoose.content.map((paragraph, index) => (
            <p
              key={index}
              className={`text-[16px] font-normal text-[#606060] leading-[27.2px] max-w-5xl mx-auto ${
                index < data.whyChoose.content.length - 1 ? "mb-8" : ""
              } ${jost.className}`}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default GemKnowledgePage;
