import { useEffect, useState, type HTMLInputTypeAttribute } from 'react';

interface Props {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  inputref?: React.RefObject<HTMLInputElement>;
  [key: string]: string | boolean | ((value: string) => void) | React.RefObject<HTMLInputElement> | undefined;
}

export const Input: React.FC<Props> = ({ label, value, onChange, inputref, ...props }) => {
  const [inputValue, setInputValue] = useState<string | undefined>(value);

  useEffect(() => {
    onChange?.(fixNumbers(inputValue ?? ""));
  }, [inputValue]);

  useEffect(() => {
    setInputValue(fixNumbers(value ?? ""));
  }, [value]);

  return (
    <div className="relative mx-auto h-full">
      <input
        className={`w-full h-full pb-0 pt-4 text-xl text-center peer placeholder-transparent focus:outline-none bg-gray-50 focus:bg-gray-100 transition-colors rounded-lg ${!inputValue ? 'ring-2 ring-yellow-500' : ''}`}
        placeholder={label}
        ref={inputref}
        {...props}
        value={inputValue}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <label
        className="w-full text-center pointer-events-none absolute start-1/2 translate-y-1 translate-x-1/2 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-0 peer-focus:text-xs peer-focus:translate-x-1/2 text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

function fixNumbers(value: string) {
  const arNumbers: Record<string, string> = {
    "١": "1",
    "٢": "2", 
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
    "٠": "0"
  };

  return value.split("").map((char) => arNumbers[char] ?? char).join("");
}
