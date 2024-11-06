import { useEffect, useState } from "react";
import { Female } from "./Female";
import { Male } from "./Male";

interface Props {
  selectedGender: "male" | "female" | null;
  onChange?: (gender: "male" | "female") => void;
}

export const GenderPicker: React.FC<Props> = ({
  selectedGender = null,
  onChange,
}) => {
  const [gender, setGender] = useState<Props["selectedGender"]>(selectedGender);

  useEffect(() => {
    if (gender) onChange?.(gender);
  }, [gender]);

  useEffect(() => {
    setGender(selectedGender);
  }, [selectedGender]);

  return (
    <div className={`flex gap-2 justify-center items-center h-full relative bg-gray-50 rounded-lg ${selectedGender === null ? 'ring-2 ring-yellow-500' : ''}`}>
      <button
        onClick={() => setGender("male")}
        className={`rounded-lg transition-colors ${
          gender === "male" ? "text-blue-500" : "text-gray-300"
        }`}
      >
        <Male className="h-10" />
      </button>
      <button
        onClick={() => setGender("female")}
        className={`rounded-lg transition-colors ${
          gender === "female" ? "text-pink-500" : "text-gray-300"
        }`}
      >
        <Female className="h-10" />
      </button>
    </div>
  );
};
