import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SellerOnboarding() {
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
            <Link href="/seller/login">
              <Button variant="ghost">लॉग इन</Button>
            </Link>
            <Link href="/seller/register">
              <Button>रजिस्टर</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Digital Market पर बेचना शुरू करें</h1>
            <p className="text-xl text-muted-foreground">भारत का सबसे बड़ा ऑनलाइन मार्केटप्लेस</p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">2 लाख+ सेलर्स</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">पूरे भारत से जुड़े हुए विक्रेता</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">40 करोड़+ ग्राहक</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">देशभर में फैला हुआ ग्राहक नेटवर्क</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">28000+ पिनकोड</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">पूरे भारत में डिलीवरी सर्विस</CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl text-center">कैसे शुरू करें?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-medium">रजिस्टर करें</h3>
                  <p className="text-sm text-muted-foreground">अपना बिज़नेस रजिस्टर करें</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-medium">लिस्टिंग करें</h3>
                  <p className="text-sm text-muted-foreground">अपने प्रोडक्ट्स लिस्ट करें</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-medium">ऑर्डर्स</h3>
                  <p className="text-sm text-muted-foreground">ऑर्डर्स प्राप्त करें और प्रोसेस करें</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    4
                  </div>
                  <h3 className="font-medium">पेमेंट</h3>
                  <p className="text-sm text-muted-foreground">सीधा बैंक में पेमेंट पाएं</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fees & Commission */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">फीस और कमीशन</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="category1">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="category1">इलेक्ट्रॉनिक्स</TabsTrigger>
                  <TabsTrigger value="category2">फैशन</TabsTrigger>
                  <TabsTrigger value="category3">होम</TabsTrigger>
                </TabsList>
                <TabsContent value="category1" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">मोबाइल</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-blue-600">4-5%</p>
                        <p className="text-sm text-muted-foreground">कमीशन दर</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">लैपटॉप</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-blue-600">3-4%</p>
                        <p className="text-sm text-muted-foreground">कमीशन दर</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="category2">{/* Similar structure for Fashion category */}</TabsContent>
                <TabsContent value="category3">{/* Similar structure for Home category */}</TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">आज ही बेचना शुरू करें</h2>
            <p className="text-muted-foreground">रजिस्ट्रेशन प्रक्रिया में सिर्फ 10 मिनट लगेंगे</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              अभी रजिस्टर करें
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

