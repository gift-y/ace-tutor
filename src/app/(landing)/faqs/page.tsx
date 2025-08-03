import React from 'react'
import UnifiedNavbar from '@/components/UnifiedNavbar'
import Logo from '@/components/Logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  const faqs = [
    {
      question: "How does Ace Tutor personalize my learning experience?",
      answer: "Ace Tutor uses advanced AI algorithms to analyze your learning patterns, preferences, and performance. It adapts content delivery, difficulty levels, and study schedules based on your unique learning style (visual, auditory, kinesthetic, or reading/writing) and progress."
    },
    {
      question: "What subjects and courses are available?",
      answer: "We offer a wide range of subjects including Mathematics, Science, Language Arts, History, Computer Science, and more. Our course library is constantly expanding with new content added regularly to meet diverse learning needs."
    },
    {
      question: "Is Ace Tutor suitable for all age groups?",
      answer: "Yes! Ace Tutor is designed for learners of all ages, from elementary school students to adult learners. Our AI adapts the content complexity and presentation style to match your educational level and goals."
    },
    {
      question: "How much does Ace Tutor cost?",
      answer: "We offer a free tier with basic features to get you started. Premium plans are available for advanced features, unlimited access to all courses, and priority support. Check our pricing page for detailed information."
    },
    {
      question: "Can I track my learning progress?",
      answer: "Absolutely! Ace Tutor provides comprehensive progress tracking including completion rates, quiz scores, time spent learning, and personalized insights. You can view detailed analytics to understand your strengths and areas for improvement."
    },
    {
      question: "What if I have technical issues or need help?",
      answer: "We provide multiple support channels including in-app help, email support, and a comprehensive knowledge base. Our support team is available to help you with any technical issues or questions about using the platform."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security and privacy very seriously. All personal information and learning data are encrypted and stored securely. We never share your personal information with third parties without your explicit consent."
    },
    {
      question: "Can I use Ace Tutor on mobile devices?",
      answer: "Yes! Ace Tutor is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can seamlessly switch between devices and continue your learning journey from anywhere."
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <UnifiedNavbar variant="landing" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Ace Tutor and how we can help you learn better
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader 
                  className="pb-3"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-left pr-4">
                      {faq.question}
                    </CardTitle>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:support@acetutor.com" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a 
                    href="/help" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Help Center
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Logo variant="footer" showText={true} />
          <p className="mt-4 text-gray-400">
            Empowering learners with AI-driven personalized education.
          </p>
          <p className="mt-8 text-gray-400">
            &copy; 2024 Ace Tutor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}