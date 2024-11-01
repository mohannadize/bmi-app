import { bmiCheck, heightCheck } from "@/lib/equations";
import CountUp from "react-countup";
import { dict, type State } from "./BMIApp";

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
};

export default function Results({
  bmi,
  state,
}: {
  bmi: number | undefined;
  state: State;
}) {
  const getBMIStatus = () => {
    return bmiCheck(
      Number(state.age),
      bmi ?? 0,
      state.gender === "male" ? "boy" : "girl"
    );
  };

  const getHeightStatus = () => {
    return heightCheck(
      Number(state.age),
      Number(state.height),
      state.gender === "male" ? "boy" : "girl"
    );
  };

  return (
    <section className="w-[95%] mx-auto grid grid-cols-3 gap-2 justify-center items-center md:gap-8">
      <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
        <span className="text-gray-600 text-sm mb-1">الكتلة</span>
        <span className={`text-xl font-bold ${cases_styling.bmi}`}>
          <CountUp duration={0.3} decimals={2} end={bmi ?? 0} />
        </span>
      </div>
      <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
        <span className="text-gray-600 text-sm mb-1">الحالة</span>
        <span className={`text-md font-bold ${cases_styling[getBMIStatus()]}`}>
          {Number(bmi) > 0 && Number(state.age) > 0
            ? dict[getBMIStatus()]
            : "--"}
        </span>
      </div>
      <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
        <span className="text-gray-600 text-sm mb-1">الطول</span>
        <span
          className={`text-md font-bold ${cases_styling[getHeightStatus()]}`}
        >
          {Number(state.height) > 0 && Number(state.age) > 0
            ? dict[getHeightStatus()]
            : "--"}
        </span>
      </div>
    </section>
  );
}
