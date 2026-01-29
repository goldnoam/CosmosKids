
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChat } from '../services/geminiService';
import { ChatMessage } from '../types';

const SpaceChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'שלום חוקר חלל צעיר! 👨‍🚀 אני אסטרו-בוט, המדריך האישי שלך ליקום. מה תרצה לדעת היום? אפשר לשאול על חורים שחורים, כוכבי לכת, או איך זה להיות אסטרונאוט! 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = getGeminiChat();
      }

      const response = await chatRef.current.sendMessage({ message: input });
      const botMsg: ChatMessage = { role: 'model', text: response.text || 'אופס, משהו השתבש בקשר הרדיו שלי עם כדור הארץ. נסה שוב!' };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'מצטער, יש לי קצת הפרעות אלקטרומגנטיות. נסה לשאול שוב בעוד רגע! 🛰️' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[600px] bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-xl">🤖</div>
        <div>
          <h3 className="font-bold text-white">אסטרו-בוט</h3>
          <div className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> מחובר למרכז הבקרה
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-purple-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-700 flex gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="שאלו את אסטרו-בוט על החלל..."
            className="flex-grow bg-slate-800 border border-slate-700 rounded-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg shadow-cyan-900/30"
          >
            🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceChat;
