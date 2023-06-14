import React, { ChangeEvent, useCallback, useState } from 'react';

import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export interface NumberBoxProps {
  name: string;
  label: string;
  placeholder: string;
  defaultValue: number;
  onChange?: (value: number) => void;
}

export const NumberBox: React.VFC<NumberBoxProps> = ({
  placeholder,
  defaultValue,
  name,
  label,
  onChange,
}) => {
  const [error, setError] = useState<string | undefined>();
  const hasError = typeof error === 'string';

  const className = hasError
    ? 'block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
    : 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';

  const describedBy = hasError ? `${name}-error` : undefined;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      if (Number.isNaN(value)) {
        setError('Value must be a number');
      } else {
        setError(undefined);
        onChange?.(value);
      }
    },
    [onChange],
  );

  return (
    <>
      <label
        htmlFor={name}
        className="mt-3 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="number"
          name={name}
          id={name}
          className={className}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          onChange={handleChange}
        />
        {hasError && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {hasError && (
        <p className="mt-2 text-sm text-red-600" id={describedBy}>
          {error}
        </p>
      )}
    </>
  );
};
