import { Eraser } from "lucide-react";
import { createRef, useState } from "react";
import { GenderPicker } from "./GenderPicker";
import { Input } from "./Input";
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
  "--": "--",
};

export interface State {
  height: string;
  weight: string;
  age: string;
  ageMonths: string;
  gender: "male" | "female" | null;
  id: string;
}

const idRef = createRef<HTMLInputElement>();

function BMIApp() {
  const [state, setState] = useState<State>({
    height: "",
    weight: "",
    age: "",
    ageMonths: "",
    gender: null,
    id: "",
  });

  const onReset = () => {
    return setState({
      height: "",
      weight: "",
      age: "",
      ageMonths: "",
      gender: null,
      id: "",
    });
  };

  const onChange = (key: keyof State, value: string) => {
    if (key === "id") {
      return setState((prev) => {
        if (value.length >= 5) {
          const { age, ageMonths } = calculateAge(value);
          return { ...prev, age, ageMonths, id: value };
        }
        return {
          ...prev,
          id: value,
          age: "",
          ageMonths: "",
          height: "",
          gender: null,
          weight: "",
        };
      });
    }
    return setState((prev) => ({ ...prev, [key]: value }));
  };

  let bmi = 0;
  if (Number(state.weight) > 0 && Number(state.height) > 0) {
    bmi = Number(state.weight) / (Number(state.height) / 100) ** 2;
    if (Number(state.height) - 3 < 0) {
      bmi = Number(state.weight) / Number(state.height) ** 2;
    }
  }

  const stateDirty =
    state.height !== "" ||
    state.weight !== "" ||
    state.gender !== null ||
    state.age !== "" ||
    state.id !== "" ||
    state.ageMonths !== "";

  let age =
    state.age && state.ageMonths
      ? (Number(state.age) + Number(state.ageMonths) / 12).toFixed(2)
      : "";
  const errorMessage =
    age &&
    (Number(age) > 19 || Number(age) < 2) &&
    "هذا التطبيق غير مناسب للاعمار تحت عامين او اكثر من 19 عام.";

  age = Number(age) > 19 || Number(age) < 2 ? "" : age;

  return (
    <>
      <div className="flex items-center justify-between px-4 my-2">
        <div className="flex items-center">
          <img src="/favicon.png" alt="logo" className="h-10" />
          <h1 className="font-bold my-4 mx-4">حساب كتلة الجسم</h1>
        </div>
        <button
          onClick={() => {
            onReset();
            idRef.current?.focus();
          }}
          className={`${
            stateDirty ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity`}
        >
          <Eraser className="h-6 text-red-700" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center">
          <section className="grid grid-cols-12 w-[95%] mx-auto gap-2">
            <div className="col-span-12 relative h-[80px]">
              <Input
                inputref={idRef}
                label="اول 5 أرقام من الرقم القومي"
                type="tel"
                pattern="[0-9]*"
                noValidate
                autoFocus
                value={state.id}
                onChange={(value) => onChange("id", value.toString())}
              />
            </div>
            <div className="col-span-4 relative h-[80px]">
              <GenderPicker
                selectedGender={state.gender}
                onChange={(value) => onChange("gender", value)}
              />
            </div>
            <div className="col-span-4 relative h-[80px]">
              <Input
                label="العمر"
                type="tel"
                pattern="[0-9]*"
                noValidate
                value={state.age}
                onChange={(value) => onChange("age", value.toString())}
              />
            </div>
            <div className="col-span-4 relative h-[80px]">
              <Input
                label="الشهور"
                type="tel"
                pattern="[0-9]*"
                noValidate
                value={state.ageMonths}
                onChange={(value) => onChange("ageMonths", value.toString())}
              />
            </div>
            <div className="col-span-6 relative h-[80px]">
              <Input
                label="الوزن"
                type="tel"
                pattern="[0-9]*"
                noValidate
                value={state.weight}
                onChange={(value) => onChange("weight", value.toString())}
              />
            </div>
            <div className="col-span-6 relative h-[80px]">
              <Input
                label="الطول"
                type="tel"
                pattern="[0-9]*"
                noValidate
                value={state.height}
                onChange={(value) => onChange("height", value.toString())}
              />
            </div>
          </section>
          <span className="text-sm text-red-700 mx-4">{errorMessage}</span>
          <Results bmi={bmi} state={{ ...state, age }} />
        </div>
        <div>
          <div className="w-[95%] mx-auto bg-gray-50 rounded-lg shadow-sm px-4 pb-4 pt-2 border border-gray-200 mt-4">
            <RefrencesComponent age={Number(age)} gender={state.gender} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BMIApp;

function calculateAge(id: string): {
  age: string;
  ageMonths: string;
} {
  let year = Number(id.slice(1, 3));
  const month = Number(id.slice(3, 5));

  if (id.startsWith("3")) {
    year += 2000;
  } else if (id.startsWith("2")) {
    year += 1900;
  } else {
    return { age: "", ageMonths: "" };
  }

  if (month > 12) {
    return { age: "", ageMonths: "" };
  }

  const birthDate = new Date(year, month, 1);

  const currentDate = new Date();

  if (birthDate.getTime() > currentDate.getTime()) {
    return { age: "", ageMonths: "" };
  }

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths = currentDate.getMonth() - birthDate.getMonth() + 1;

  if (ageMonths < 0) {
    ageMonths += 12;
    age -= 1;
  }

  return {
    age: age.toFixed(0),
    ageMonths: ageMonths.toString(),
  };
}
