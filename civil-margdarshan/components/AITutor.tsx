import React, { useState, useRef, useEffect } from 'react';
import { generateStudyAdvice } from '../services/ai';
import { ChatMessage } from '../types';

const AITutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Namaste! I am Margdarshan AI. How can I help you prepare for your Rajasthan exams today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await generateStudyAdvice(userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-5 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105 border-2 border-saffron"
        >
          <i className="fas fa-robot text-xl text-saffron"></i>
          <span className="font-semibold">Ask AI Tutor</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col border border-gray-200 h-[500px] overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-navy p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <i className="fas fa-robot text-saffron"></i>
              <h3 className="font-bold">Margdarshan AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-saffron text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about syllabus, strategy..."
                className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-navy focus:border-transparent rounded-full px-4 py-2 text-sm outline-none transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-navy hover:bg-navy-light disabled:opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              AI can make mistakes. Verify important dates.
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default AITutor;