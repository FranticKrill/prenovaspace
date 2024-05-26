import { Fragment, useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Select({ items, selected, setSelected, placeholder }: any) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }: any) => (
        <>
          <div className="relative w-1/2 h-[48px]">
            <ListboxButton className="relative h-full w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900  bg-purple-white shadow focus:outline-none  sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {selected ? (
                <span className="ml-3 block truncate">{selected?.name}</span>
                ) : (
                <span className="ml-3 block truncate text-gray-500">
                  {placeholder ? placeholder : 'Kategoriye göre ara...'}</span>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item: any) => (
                  <ListboxOption
                    key={item.id}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-teal-500 text-white' : '',
                        !focus ? 'text-gray-900' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? 'text-white' : 'text-teal-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
