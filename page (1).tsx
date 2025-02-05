"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SellerRegister() {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder.svg" alt="Logo" width={40} height={40} />
            <span className="font-bold text-xl">Digital Market</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">पहले से अकाउंट है?</span>
            <Link href="/seller/login">
              <Button variant="ghost">लॉग इन करें</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                  </div>
                  <span className="text-sm mt-2 text-muted-foreground">
                    {stepNumber === 1 && "बिज़नेस जानकारी"}
                    {stepNumber === 2 && "बैंक जानकारी"}
                    {stepNumber === 3 && "पिक-अप जानकारी"}
                    {stepNumber === 4 && "वेरिफिकेशन"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full" />
              <div
                className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-500"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Business Information */}
          {step === 1 && (
            <div className="space-y-6 bg-white p-6 rounded-lg border">
              <div>
                <h2 className="text-xl font-bold">बिज़नेस जानकारी</h2>
                <p className="text-muted-foreground">अपने बिज़नेस की बुनियादी जानकारी भरें</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">बिज़नेस का नाम</Label>
                    <Input id="business-name" placeholder="आपके बिज़नेस का नाम" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">बिज़नेस का प्रकार</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="बिज़नेस का प्रकार चुनें" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proprietorship">प्रोप्राइटरशिप</SelectItem>
                        <SelectItem value="partnership">पार्टनरशिप</SelectItem>
                        <SelectItem value="pvt-ltd">प्राइवेट लिमिटेड</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>बिज़नेस का पता</Label>
                  <Input placeholder="पता लाइन 1" className="mb-2" />
                  <Input placeholder="पता लाइन 2" className="mb-2" />
                  <div className="grid gap-4 md:grid-cols-3">
                    <Input placeholder="शहर" />
                    <Input placeholder="राज्य" />
                    <Input placeholder="पिन कोड" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>जीएसटी नंबर</Label>
                    <Input placeholder="जीएसटी नंबर दर्ज करें" />
                  </div>
                  <div className="space-y-2">
                    <Label>पैन नंबर</Label>
                    <Input placeholder="पैन नंबर दर्ज करें" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>
                  अगला
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Bank Information */}
          {step === 2 && (
            <div className="space-y-6 bg-white p-6 rounded-lg border">
              <div>
                <h2 className="text-xl font-bold">बैंक जानकारी</h2>
                <p className="text-muted-foreground">अपने बैंक खाते की जानकारी भरें</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>खाताधारक का नाम</Label>
                  <Input placeholder="बैंक खाते में दर्ज नाम" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>बैंक खाता संख्या</Label>
                    <Input placeholder="बैंक खाता संख्या दर्ज करें" />
                  </div>
                  <div className="space-y-2">
                    <Label>IFSC कोड</Label>
                    <Input placeholder="IFSC कोड दर्ज करें" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>बैंक का नाम</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="बैंक चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">स्टेट बैंक ऑफ इंडिया</SelectItem>
                      <SelectItem value="hdfc">HDFC बैंक</SelectItem>
                      <SelectItem value="icici">ICICI बैंक</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>बैंक शाखा</Label>
                  <Input placeholder="बैंक शाखा का नाम" />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  पिछला
                </Button>
                <Button onClick={() => setStep(3)}>
                  अगला
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Pickup Information */}
          {step === 3 && (
            <div className="space-y-6 bg-white p-6 rounded-lg border">
              <div>
                <h2 className="text-xl font-bold">पिक-अप जानकारी</h2>
                <p className="text-muted-foreground">जहां से प्रोडक्ट्स पिक-अप किए जाएंगे</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>पिक-अप का पता</Label>
                  <Input placeholder="पता लाइन 1" className="mb-2" />
                  <Input placeholder="पता लाइन 2" className="mb-2" />
                  <div className="grid gap-4 md:grid-cols-3">
                    <Input placeholder="शहर" />
                    <Input placeholder="राज्य" />
                    <Input placeholder="पिन कोड" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>संपर्क व्यक्ति का नाम</Label>
                    <Input placeholder="नाम दर्ज करें" />
                  </div>
                  <div className="space-y-2">
                    <Label>मोबाइल नंबर</Label>
                    <Input placeholder="मोबाइल नंबर दर्ज करें" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>पिक-अप का समय</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="पिक-अप का समय चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-12">सुबह 9 से दोपहर 12 बजे</SelectItem>
                      <SelectItem value="12-3">दोपहर 12 से 3 बजे</SelectItem>
                      <SelectItem value="3-6">दोपहर 3 से शाम 6 बजे</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  पिछला
                </Button>
                <Button onClick={() => setStep(4)}>
                  अगला
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Verification */}
          {step === 4 && (
            <div className="space-y-6 bg-white p-6 rounded-lg border">
              <div>
                <h2 className="text-xl font-bold">वेरिफिकेशन</h2>
                <p className="text-muted-foreground">आवश्यक दस्तावेज़ अपलोड करें</p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>पहचान प्रमाण (कोई एक)</Label>
                  <Tabs defaultValue="aadhar">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="aadhar">आधार कार्ड</TabsTrigger>
                      <TabsTrigger value="pan">पैन कार्ड</TabsTrigger>
                      <TabsTrigger value="voter">वोटर ID</TabsTrigger>
                    </TabsList>
                    <TabsContent value="aadhar" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>आधार कार्ड (फ्रंट)</Label>
                          <Input type="file" className="mt-2" />
                        </div>
                        <div>
                          <Label>आधार कार्ड (बैक)</Label>
                          <Input type="file" className="mt-2" />
                        </div>
                      </div>
                    </TabsContent>
                    {/* Similar structure for other tabs */}
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <Label>बिज़नेस प्रमाण</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>जीएसटी सर्टिफिकेट</Label>
                      <Input type="file" className="mt-2" />
                    </div>
                    <div>
                      <Label>शॉप लाइसेंस</Label>
                      <Input type="file" className="mt-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>बैंक प्रमाण</Label>
                  <div>
                    <Label>कैंसल्ड चेक</Label>
                    <Input type="file" className="mt-2" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  पिछला
                </Button>
                <Button>
                  रजिस्टर करें
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

