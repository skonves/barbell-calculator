import React, { ChangeEvent, useCallback, useState } from 'react';

export interface PercentageSelectorProps {
  name: string;
  defaultValue: number;
  onChange?: (value: number) => void;
}

export const PercentageSelector: React.VFC<PercentageSelectorProps> = ({
  defaultValue,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(defaultValue);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      if (!Number.isNaN(value)) {
        setCurrentValue(value);
        onChange?.(value);
      }
    },
    [onChange],
  );

  return (
    <>
      <label
        htmlFor="default-range"
        className="mt-3 block text-sm font-medium text-gray-700"
      >
        Percentage: {Math.round(currentValue * 100)}%
      </label>
      <input
        id="default-range"
        type="range"
        min={0.5}
        max={1.1}
        step={0.01}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </>
  );
};
