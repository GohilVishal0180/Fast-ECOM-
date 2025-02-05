"use client"

import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Category } from "@prisma/client"

interface ProductFiltersProps {
  categories: Category[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const category = searchParams.get("category")
  const sort = searchParams.get("sort")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  const onCategoryChange = (value: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      category: value,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    )

    router.push(url)
  }

  const onSortChange = (value: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      sort: value,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    )

    router.push(url)
  }

  const onPriceChange = (type: "min" | "max", value: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      [type === "min" ? "minPrice" : "maxPrice"]: value,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    )

    router.push(url)
  }

  const onReset = () => {
    router.push(window.location.pathname)
  }

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4">
      <Select value={category || ""} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="श्रेणी" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(categories).map((category) => (
            <SelectItem key={category} value={category}>
              {category === "ELECTRONICS" && "इलेक्ट्रॉनिक्स"}
              {category === "FASHION" && "फैशन"}
              {category === "HOME" && "होम"}
              {category === "BEAUTY" && "ब्यूटी"}
              {category === "BOOKS" && "किताबें"}
              {category === "SPORTS" && "खेल"}
              {category === "TOYS" && "खिलौने"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sort || ""} onValueChange={onSortChange}>
        <SelectTrigger>
          <SelectValue placeholder="क्रमबद्ध करें" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price_asc">कम से ज्यादा कीमत</SelectItem>
          <SelectItem value="price_desc">ज्यादा से कम कीमत</SelectItem>
          <SelectItem value="latest">नवीनतम</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="न्यूनतम कीमत"
        value={minPrice || ""}
        onChange={(e) => onPriceChange("min", e.target.value)}
      />

      <Input
        type="number"
        placeholder="अधिकतम कीमत"
        value={maxPrice || ""}
        onChange={(e) => onPriceChange("max", e.target.value)}
      />

      <Button variant="outline" onClick={onReset} className="md:col-span-4">
        फ़िल्टर हटाएं
      </Button>
    </div>
  )
}

