import Link from "next/link"
import { FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-bold">पेज नहीं मिला</h1>
      <p className="mt-2 text-muted-foreground">माफ़ कीजिए, आपका खोजा हुआ पेज नहीं मिल सका।</p>
      <Button asChild className="mt-4">
        <Link href="/">होम पेज पर जाएं</Link>
      </Button>
    </div>
  )
}

