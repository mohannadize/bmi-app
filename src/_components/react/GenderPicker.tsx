import { useEffect, useState } from "react";
import { Female } from "./Female";
import { Male } from "./Male";

interface Props {
  selectedGender: "male" | "female";
  onChange?: (gender: "male" | "female") => void;
}

export const GenderPicker: React.FC<Props> = ({
  selectedGender = "male",
  onChange,
}) => {
  const [gender, setGender] = useState<Props["selectedGender"]>(selectedGender);

  useEffect(() => {
    onChange?.(gender);
  }, [gender]);

  return (
    <div className="flex gap-2 justify-center items-center h-full relative bg-gray-50 rounded-lg">
      <button
        onClick={() => setGender("male")}
        className={`rounded-lg transition-colors ${
          gender === "male" ? "text-blue-500" : "text-gray-300"
        }`}
      >
        <Male className="h-8" />
      </button>
      <button
        onClick={() => setGender("female")}
        className={`rounded-lg transition-colors ${
          gender === "female" ? "text-pink-500" : "text-gray-300"
        }`}
      >
        <Female className="h-8" />
      </button>
    </div>
  );
};
