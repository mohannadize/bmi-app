import { bmiCheck, heightCheck } from "@/lib/equations";
import CountUp from "react-countup";
import { dict, type State } from "./BMIApp";
import { useEffect } from "react";
import { useState } from "react";

const positive_cases = new Set([
  "obese",
  "severe_shortness",
  "shortness",
  "thinness",
  "severe_thinness",
  "giantism",
]);

const cases_styling = {
  obese: "text-red-500",
  overweight: "text-orange-500",
  thinness: "text-yellow-500",
  severe_thinness: "text-red-500",
  tallness: "text-green-500",
  giantism: "text-purple-500",
  shortness: "text-blue-500",
  severe_shortness: "text-red-500",
  shortness_first_degree: "text-orange-500",
  normal: "text-green-500",
  height: "text-purple-500",
  bmi: "text-blue-500",
  "--": "text-gray-500",
};

export default function Results({
  bmi,
  state,
}: {
  bmi: number | undefined;
  state: State;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getBMIStatus = () => {
    return bmiCheck(Number(state.age), bmi ?? 0, state.gender);
  };

  const getHeightStatus = () => {
    return heightCheck(Number(state.age), Number(state.height), state.gender);
  };

  const result: {
    bmi: string | undefined;
    height: string | undefined;
  } = {
    bmi: getBMIStatus(),
    height: getHeightStatus(),
  };

  if (result.bmi && positive_cases.has(result.bmi)) {
    result.bmi = dict[result.bmi as keyof typeof dict];
  } else {
    result.bmi = undefined;
  }

  if (result.height && positive_cases.has(result.height)) {
    result.height = dict[result.height as keyof typeof dict];
  } else {
    result.height = undefined;
  }

  const result_string = Object.values(result).filter((value) => value !== undefined).join(" + ");

  return (
    <section className="w-[95%] mx-auto grid grid-cols-3 gap-2 justify-center items-stretch md:gap-8">
      <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4">
        <span className="text-gray-600 text-sm mb-1">الكتلة</span>
        <span className={`text-xl font-bold ${cases_styling.bmi}`}>
          {isClient && <CountUp duration={0.3} decimals={2} end={(state.gender && state.age && bmi) ? bmi : 0} />}
        </span>
      </div>
      <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 col-span-2">
        <span className="text-gray-600 text-sm mb-1">النتيجة</span>
        <span
          className={`text-md font-bold ${result_string === "" ? "text-green-500" : "text-red-500"}`}
        >
          {state.gender && bmi && state.age ? result_string || "طبيعي" : ""}
        </span>
      </div>
    </section>
  );
}
