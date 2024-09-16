"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Send } from "lucide-react";
import Header from "@/components/sections/header";

export default function LanguageLearningInterface() {
  const [language, setLanguage] = useState("kannada");
  const [contentType, setContentType] = useState("story");
  const [file, setFile] = useState<File|null>(null);
  const [fileURL, setFileURL] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [chatLog, setChatLog] = useState<string[]>([]);

  // New state for Read Along questions and answers
  const [readAlongQA, setReadAlongQA] = useState([
    { question: "Who is Abhimanyu?", answer: "Abhimanyu is the son of Arjuna and Subhadra in the Mahabharata." },
    { question: "What is Abhimanyu known for?", answer: "Abhimanyu is known for his bravery and skill in warfare, particularly his entry into the Chakravyuha formation." },
    { question: "What is the Chakravyuha?", answer: "The Chakravyuha is a complex military formation mentioned in the Mahabharata." },
  ]);

  const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
      setIsVideo(selectedFile.type.startsWith("video/"));
    }
  };

  const handleSendMessage = () => {
    if (userQuestion.trim()) {
      setChatLog((prev) => [
        ...prev,
        `You: ${userQuestion}`,
        "Bot: Thanks for asking the question!",
      ]);
      
      if (contentType === "readAlong") {
        setReadAlongQA((prev) => [
          ...prev,
          { question: userQuestion, answer: "This is a default reply to your question. For more accurate information, please consult additional resources." }
        ]);
      }
      
      setUserQuestion(""); 
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex h-full">
        {/* Left Side: Upload and Options */}
        <div className="w-1/4 bg-white p-4 shadow-md h-screen sticky top-0">
          <h2 className="text-xl font-bold mb-4 text-black">
            Choose your language
          </h2>
          <div className="flex space-x-2 mb-6">
            <Button
              variant={language === "kannada" ? "default" : "secondary"}
              onClick={() => setLanguage("kannada")}
              className="w-full"
            >
              Kannada
            </Button>
            <Button
              variant={language === "hindi" ? "default" : "secondary"}
              onClick={() => setLanguage("hindi")}
              className="w-full"
            >
              Hindi
            </Button>
          </div>

          <h2 className="text-xl font-bold mb-4 text-black">Choose a File</h2>
          <Card className="p-4 mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Drag and drop any file here
            </p>
            <p className="text-xs text-gray-400 mb-4">Limit 200MB per file</p>
            <Input type="file" onChange={handleFileChange} className="mb-2" />
            <label htmlFor="file-upload">
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Browse files
              </Button>
            </label>
          </Card>

          {file && (
            <div className="text-sm text-gray-500">
              <p>{file.name}</p>
              <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              <p className="text-sm text-green-500 mt-2">
                File uploaded successfully
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Video Playback or File Link */}
        <div className="flex-1 bg-white p-4 overflow-auto">
          <Card className="mb-4 p-4">
            <h1 className="text-3xl font-bold mb-4">notes!</h1>
            <div className="flex space-x-4 mb-4">
              <Button
                variant={contentType === "story" ? "default" : "outline"}
                onClick={() => setContentType("story")}
              >
                🎭 Story
              </Button>
              <Button
                variant={contentType === "readAlong" ? "default" : "outline"}
                onClick={() => setContentType("readAlong")}
              >
                📖 Read Along
              </Button>
            </div>

            <p className="mb-4">
              Awesome! So today's topic is - veeraabhimanyu
            </p>

            {/* Video Player or Download Link */}
            {contentType === "story" && (
              isVideo ? (
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 mb-4">
                  <video
                    src={fileURL}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 mb-4 flex items-center justify-center aspect-auto">
                  {file ? (
                    <a
                      href={fileURL}
                      download
                      className="text-blue-500 underline"
                    >
                      Download {file.name}
                    </a>
                  ) : (
                    <p className="text-gray-500">Upload a file to see it here</p>
                  )}
                </div>
              )
            )}

            {/* Read Along Questions and Answers */}
            {contentType === "readAlong" && (
              <div className="space-y-4">
                {readAlongQA.map((qa, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-bold text-lg mb-2">{qa.question}</h3>
                    <p>{qa.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Chatbox */}
          <Card className="p-4">
            <ScrollArea className="h-[200px] mb-4 rounded-md border">
              <div className="p-4 space-y-2">
                {chatLog.length === 0 ? (
                  <p className="text-gray-500">
                    Please ask your questions
                  </p>
                ) : (
                  chatLog.map((message, index) => (
                    <p key={index} className="text-gray-700">
                      {message}
                    </p>
                  ))
                )}
              </div>
            </ScrollArea>
            <div className="flex space-x-2">
              <Input
                placeholder="Ask your question..."
                className="flex-grow"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}