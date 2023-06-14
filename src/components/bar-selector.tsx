import React, { Fragment, useCallback, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export type BarType = {
  name: string;
  weight: number;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export interface BarSelectorProps {
  options: BarType[];
  defaultValue: BarType;
  onChange?: (bar: BarType) => void;
}

export const BarSelector: React.VFC<BarSelectorProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedBar, setSelectedBar] = useState(defaultValue);

  const handleChange = useCallback(
    (bar: BarType) => {
      setSelectedBar(bar);
      onChange?.(bar);
    },
    [onChange],
  );

  return (
    <Listbox value={selectedBar} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="mt-3 block text-sm font-medium text-gray-700">
            Bar type:
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="inline-flex w-full truncate">
                <span className="truncate">{selectedBar.name}</span>
                <span className="ml-2 truncate text-gray-500">
                  {selectedBar.weight} lbs
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((bar) => (
                  <Listbox.Option
                    key={bar.name}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={bar}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex">
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'truncate',
                            )}
                          >
                            {bar.name}
                          </span>
                          <span
                            className={classNames(
                              active ? 'text-indigo-200' : 'text-gray-500',
                              'ml-2 truncate',
                            )}
                          >
                            {bar.weight} lbs
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
