import { Input } from "./Input";
import { GenderPicker } from "./GenderPicker";
import { useEffect, useState } from "react";
import RefrencesComponent from "./RefrencesComponent";
import Results from "./Results";

export const dict = {
  obese: "سمنة",
  overweight: "وزن زائد",
  thinness: "نحافة",
  severe_thinness: "نحافة شديدة",
  tallness: "طول زائد",
  giantism: "عملقة",
  shortness: "تقزم",
  severe_shortness: "تقزم شديد",
  shortness_first_degree: "تقزم درجة أولى",
  normal: "طبيعي",
  height: "طول",
  bmi: "كتلة",
};

export interface State {
  height: string;
  weight: string;
  age: string;
  gender: "male" | "female";
  id: string;
}

function BMIApp() {
  const [isClient, setIsClient] = useState(false);
  const [state, setState] = useState<State>({
    height: "",
    weight: "",
    age: "",
    gender: "male",
    id: "",
  });

  const onChange = (key: keyof State, value: string) => {
    if (key === "id") {
      return setState((prev) => {
        if (value.length === 5) {
          const age = calculateAge(value);
          return { ...prev, age: age.toString(), id: value };
        }
        return { ...prev, age: "", id: value };
      });
    }
    if (key === "age") {
      if (value.length > 0) {
        return setState((prev) => ({ ...prev, age: value }));
      }
      return setState((prev) => ({ ...prev, age: "" }));
    }
    return setState((prev) => ({ ...prev, [key]: value }));
  };

  let bmi;
  if (Number(state.weight) > 0 && Number(state.height) > 0) {
    bmi = Number(state.weight) / (Number(state.height) / 100) ** 2;
    if (Number(state.height) - 3 < 0) {
      bmi = Number(state.weight) / Number(state.height) ** 2;
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <section className="grid grid-cols-6 w-[95%] mx-auto gap-2">
          <div className="col-span-3 relative h-[80px]">
            <Input
              label="الهوية"
              type="number"
              value={state.id}
              onChange={(value) => onChange("id", value.toString())}
            />
          </div>
          <div className="col-span-3 relative h-[80px]">
            <Input
              label="العمر"
              type="number"
              value={state.age}
              onChange={(value) => onChange("age", value.toString())}
            />
          </div>
          <div className="col-span-2 relative h-[80px]">
            <GenderPicker
              selectedGender={state.gender}
              onChange={(value) => onChange("gender", value)}
            />
          </div>
          <div className="col-span-2 relative h-[80px]">
            <Input
              label="الوزن"
              type="number"
              value={state.weight}
              onChange={(value) => onChange("weight", value.toString())}
            />
          </div>
          <div className="col-span-2 relative h-[80px]">
            <Input
              label="الطول"
              type="number"
              value={state.height}
              onChange={(value) => onChange("height", value.toString())}
            />
          </div>
        </section>
        {isClient && <Results bmi={bmi} state={state} />}
      </div>
      <div >
        <div className="w-[95%] mx-auto bg-gray-50 rounded-lg shadow-sm px-4 pb-4 pt-2 border border-gray-200 mt-4">
          <RefrencesComponent
            age={Number(state.age)}
            gender={state.gender === "male" ? "boy" : "girl"}
          />
        </div>
      </div>
    </div>
  );
}

export default BMIApp;

function calculateAge(id: string): number | "" {
  let year = Number(id.slice(1, 3));
  const month = Number(id.slice(3, 5));

  if (id.startsWith("3")) {
    year += 2000;
  } else {
    year += 1900;
  }

  const birthDate = new Date(year, month, 1);

  const currentDate = new Date();

  if (birthDate.getTime() > currentDate.getTime()) {
    return "";
  }

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  age += (currentDate.getMonth() - birthDate.getMonth()) / 12;

  return Number(age.toFixed(1));
}
