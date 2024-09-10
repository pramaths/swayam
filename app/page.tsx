'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Send } from 'lucide-react'

export default function LanguageLearningInterface() {
  const [language, setLanguage] = useState('kannada')
  const [contentType, setContentType] = useState('story')

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Choose your language</h2>
        <div className="flex space-x-2 mb-6">
          <Button 
            variant={language === 'kannada' ? 'default' : 'outline'}
            onClick={() => setLanguage('kannada')}
            className="w-full"
          >
            Kannada
          </Button>
          <Button 
            variant={language === 'hindi' ? 'default' : 'outline'}
            onClick={() => setLanguage('hindi')}
            className="w-full"
          >
            Hindi
          </Button>
        </div>

        <h2 className="text-xl font-bold mb-4">Choose an Image file</h2>
        <Card className="p-4 mb-4">
          <p className="text-sm text-gray-500 mb-2">Drag and drop file here</p>
          <p className="text-xs text-gray-400 mb-4">Limit 200MB per file • PNG, JPEG, PDF, JPG</p>
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" /> Browse files
          </Button>
        </Card>

        <div className="text-sm text-gray-500">
          <p>Kannada_class4_VeeraA...</p>
          <p>311.2KB</p>
        </div>
        <p className="text-sm text-green-500 mt-2">File uploaded successfully</p>
      </div>

      <div className="flex-1 p-4">
        <Card className="mb-4 p-4">
          <h1 className="text-3xl font-bold mb-4">notes!</h1>
          <div className="flex space-x-4 mb-4">
            <Button 
              variant={contentType === 'story' ? 'default' : 'outline'}
              onClick={() => setContentType('story')}
            >
              🎭 Story
            </Button>
            <Button 
              variant={contentType === 'readAlong' ? 'default' : 'outline'}
              onClick={() => setContentType('readAlong')}
            >
              📖 Read Along
            </Button>
          </div>
          <p className="mb-4">Awesome! So today's topic is - veeraabhimanyu</p>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 mb-4">
            <div className="flex items-center justify-center h-full text-gray-500">
              Video Player Placeholder
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <ScrollArea className="h-[100px] mb-4 rounded-md border">
            <div className="p-4">
              <p className="text-gray-500">Please upload a PDF or an Image file to start the chatbot</p>
            </div>
          </ScrollArea>
          <div className="flex space-x-2">
            <Input placeholder="You:" className="flex-grow" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}