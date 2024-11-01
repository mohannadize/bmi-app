import { useEffect, useState, type HTMLInputTypeAttribute } from 'react';

interface Props {
    label: string;
    type: HTMLInputTypeAttribute;
    pattern?: string;
    value?: string | number;
    onChange?: (value: string | number) => void;
}

export const Input: React.FC<Props> = ({ label, type, pattern, value, onChange }) => {
    const [inputValue, setInputValue] = useState<string | number | undefined>(value);

    useEffect(() => {
        onChange?.(inputValue ?? "");
    }, [inputValue]);

    useEffect(() => {
        setInputValue(value ?? "");
    }, [value]);

    return (
        <div className="relative mx-auto h-full">
            <input
                className="w-full h-full pb-0 pt-4 text-xl text-center peer placeholder-transparent focus:outline-none bg-gray-50 focus:bg-gray-100 transition-colors rounded-lg"
                placeholder={label}
                type={type}
                value={inputValue}
                pattern={pattern}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <label
                className="pointer-events-none absolute start-1/2 translate-y-1 translate-x-1/2 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-0 peer-focus:text-xs peer-focus:translate-x-1/2 text-gray-500"
            >
                {label}
            </label>
        </div>
    );
}; 