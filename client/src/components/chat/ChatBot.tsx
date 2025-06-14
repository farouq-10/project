import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  content: string;
}

const initialMessages: Message[] = [
  {
    type: 'bot',
    content: 'Hi! I\'m your EventEase assistant. How can I help you today?'
  }
];

const suggestions = [
  'How do I create an event?',
  'What services do you offer?',
  'How do I book a venue?',
  'What are your pricing plans?',
  'How can I contact support?'
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content }]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      let response = 'I understand you\'re asking about ';
      if (content.toLowerCase().includes('create')) {
        response = 'To create an event, click the "Create Event" button in the top navigation bar. You\'ll be guided through our easy event creation process.';
      } else if (content.toLowerCase().includes('service')) {
        response = 'We offer various services including venue booking, catering, photography, and more. You can explore all our services in the event creation flow.';
      } else if (content.toLowerCase().includes('book')) {
        response = 'You can book a venue by creating an event and selecting from our curated list of venues. Each venue comes with detailed information and pricing.';
      } else if (content.toLowerCase().includes('price') || content.toLowerCase().includes('cost')) {
        response = 'Our pricing varies based on the services you choose. You can see detailed pricing information during the booking process.';
      } else if (content.toLowerCase().includes('contact') || content.toLowerCase().includes('support')) {
        response = 'You can reach our support team through the Contact page or by emailing support@eventease.com.';
      } else {
        response = 'I\'m not sure about that. Would you like to speak with our support team?';
      }
      
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-500 hover:to-pink-400 transition-all z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-96 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-purple-800/50 transition-all duration-300 transform z-50 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-800/50">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-purple-400" />
            <h3 className="font-semibold text-white">EventEase Assistant</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                message.type === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' ? 'bg-pink-500' : 'bg-purple-500'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5 text-white" />
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/10 text-gray-200'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-sm bg-white/10 text-gray-300 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-purple-800/50">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full pl-4 pr-12 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => handleSend(inputValue)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}