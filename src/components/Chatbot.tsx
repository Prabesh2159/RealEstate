import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minus, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm here to help you with your real estate needs. Please fill out our contact form and we'll get back to you as soon as possible!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (location.pathname === '/admin') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, isMinimized]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        text: "Thank you for your message! We will contact you later. Please fill out our contact form for a detailed response, and our team will get back to you within 24 hours.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleContactFormRedirect = () => {
    setIsOpen(false);
    setIsMinimized(false);
    navigate('/contact');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  const closeChatbot = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const openChatbot = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={openChatbot}
            className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isScrolled
                ? 'bg-[#006d4e] hover:bg-[#CFCB11]'
                : 'bg-[#CFCB11] hover:bg-brand-green/90'
            }`}
            size="icon"
          >
            <MessageCircle className="h-6 w-6 text-white animate-bounce" />
          </Button>
        </div>
      )}

      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out
          ${isMinimized ? 'w-80 h-16' : 'w-80 sm:w-96 h-[400px]'}`}>
          <Card className="shadow-xl border border-gray-200 h-full flex flex-col">
            <CardHeader className="bg-[#006d4e] text-white rounded-t-lg flex-shrink-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Real Estate Assistant</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleMinimize}
                    className="text-black hover:bg-black/20 h-8 w-8"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={closeChatbot}
                    className="text-black hover:bg-[#DC143C] h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="p-0 flex-grow flex flex-col">
                <div ref={messagesEndRef} className="h-64 overflow-y-auto p-4 space-y-3 flex-grow">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                          message.isBot
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-[#006d4e] text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 pt-0 border-t flex-shrink-0">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1
                        border              // Ensure a border is present
                        border-[#006d4e]    // Set the border color to your green
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#006d4e]
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-background
                      "
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-[#006d4e] hover:bg-[#006d4e]/90 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;