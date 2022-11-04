import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import { Country } from "../types/payload";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export interface ListboxProps {
  options: Map<string, string | null>;
  onChangeValue: (value: Country | null) => void;
}

export const generateOptionsMap = (
  options: string[],
  canUseAllOption?: boolean,
  noFilterLabel?: string
): Map<string, string | null> => {
  let optionMap = new Map<string, string | null>();
  options.forEach((option) => {
    optionMap.set(option, option);
  });
  if (canUseAllOption) {
    const filterName = noFilterLabel ? noFilterLabel : "All";
    optionMap.set(filterName, null);
  }
  return optionMap;
};

export const CyleraListbox: React.FC<ListboxProps> = ({
  options,
  onChangeValue,
}: ListboxProps) => {
  const optionsKeys = Array.from(options?.keys()).sort();
  const [selected, setSelected] = useState(optionsKeys[0]);

  return (
    <>
      <Listbox
        value={selected}
        onChange={(selectTarget) => {
          const filterValue = selectTarget
            ? (options.get(selectTarget) as Country)
            : null;
          setSelected(selectTarget);
          onChangeValue(filterValue);
        }}
      >
        <Listbox.Button className="cursor-default flex justify-between justify-self-end text-multioptions font-helveticaFamily rounded-lg bg-white py-2.5 px-5 text-start h-10 w-37 shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="truncate text-multioptions ">{selected}</span>
          <ChevronDownIcon
            className="h-5 w-5  text-multioptions  inline"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-blue-500 z-10">
            {optionsKeys.map((optionKey) => (
              <Listbox.Option
                key={optionKey}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
                value={optionKey}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {optionKey}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </>
  );
};
