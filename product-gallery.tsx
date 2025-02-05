"use client"

import Image from "next/image"
import { Tab } from "@headlessui/react"

import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <Tab
              key={image}
              className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
            >
              {({ selected }) => (
                <div>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover object-center" />
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 rounded-md ring-2 ring-offset-2",
                      selected ? "ring-black" : "ring-transparent",
                    )}
                  />
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt="Product image"
                fill
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

