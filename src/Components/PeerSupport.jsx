// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import { Users, MessageCircle, Search, Plus, Menu } from 'lucide-react';

// const PeerSupport = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [search, setSearch] = useState('');

//   const groups = [
//     { id: 1, name: 'Exam Stress Circle', members: 128, desc: 'Share tips and support during exam season.' },
//     { id: 2, name: 'Anxiety & Mindfulness', members: 203, desc: 'Practice grounding and mindfulness together.' },
//     { id: 3, name: 'Freshers Transition', members: 76, desc: 'Adjusting to campus life and routines.' },
//   ];

//   const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-[#eaf1f5]">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="lg:ml-72 min-h-screen">
//         {/* Mobile Header */}
//         <div className="lg:hidden sticky top-0 z-30 bg-[#eaf1f5]/80 backdrop-blur">
//           <div className="flex items-center justify-between px-4 py-3 border-b" style={{borderColor:'#c8ced1'}}>
//             <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[#f2f7eb]">
//               <Menu className="w-6 h-6 text-[#2e2f34]" />
//             </button>
//             <div className="flex items-center space-x-2">
//               <Users className="w-5 h-5 text-[#3d9098]" />
//               <span className="font-semibold text-[#2e2f34]">Peer Support</span>
//             </div>
//             <div className="w-6" />
//           </div>
//         </div>

//         <main className="p-6 space-y-6">
//           {/* Header */}
//           <div className="text-center">
//             <div className="flex items-center justify-center space-x-3 mb-4">
//               <div className="bg-[#3d9098] p-3 rounded-xl">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-[#2e2f34]">Peer Support Communities</h1>
//                 <p className="text-[#767272]">Connect, share, and grow together in safe spaces</p>
//               </div>
//             </div>
//           </div>

//           {/* Search and actions */}
//           <div className="bg-white rounded-xl p-6 border" style={{borderColor:'#c8ced1'}}>
//             <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//               <div className="w-full md:max-w-md relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d949d]" />
//                 <input
//                   value={search}
//                   onChange={(e)=>setSearch(e.target.value)}
//                   placeholder="Search groups..."
//                   className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent"
//                   style={{borderColor:'#c8ced1'}}
//                 />
//               </div>
//               <button className="flex items-center space-x-2 bg-[#2dc8ca] text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90">
//                 <Plus className="w-4 h-4" />
//                 <span>Create Group</span>
//               </button>
//             </div>
//           </div>

//           {/* Groups */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map(group => (
//               <div key={group.id} className="bg-white rounded-xl p-6 border hover:shadow-md transition" style={{borderColor:'#c8ced1'}}>
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="font-bold text-[#2e2f34]">{group.name}</h3>
//                   <span className="text-xs px-2 py-1 rounded bg-[#eaf1f5] text-[#3d9098]">{group.members} members</span>
//                 </div>
//                 <p className="text-sm text-[#767272] mb-4">{group.desc}</p>
//                 <button className="w-full flex items-center justify-center space-x-2 bg-[#f2f7eb] hover:bg-[#eaf1f5] text-[#2e2f34] font-semibold py-2.5 rounded-lg">
//                   <MessageCircle className="w-4 h-4" />
//                   <span>Join Discussion</span>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PeerSupport;

import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, User, MessageCircle, Loader2, Shield, Phone } from 'lucide-react';

const PeerSupport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Namaste! Main Sahayak Aditi bol rahi hoon. Aap kaise ho? Main yahan aapki baat sunne aur support dene ke liye hoon. 💙',
      sender: 'peer',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const selectedPeer = {
    name: 'Aditi (Sahayak)',
    status: 'Online',
    avatarColor: '#3d9098'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'you',
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated peer reply to keep logic self-contained (no external changes)
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text:
          'Main samajh sakti hoon, ye feel karna bilkul normal hai. Kya aap 4-7-8 breathing try karna chahoge? 4 sec inhale, 7 hold, 8 exhale. Main yahin hoon. 💫',
        sender: 'peer',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#eaf1f5]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white">
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#c8ced1' }}>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[#f2f7eb]">
              <Menu className="w-6 h-6 text-[#2e2f34]" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: selectedPeer.avatarColor }}>
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2e2f34]">{selectedPeer.name}</div>
                <div className="text-xs text-[#52c97a]">{selectedPeer.status}</div>
              </div>
            </div>
            <div className="w-6" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-6 py-4 bg-white border-b" style={{ borderColor: '#c8ced1' }}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: selectedPeer.avatarColor }}>
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#2e2f34]">{selectedPeer.name}</div>
              <div className="text-xs text-[#52c97a]">{selectedPeer.status}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm rounded-lg bg-[#f2f7eb] text-[#2e2f34] hover:bg-[#eaf1f5] flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-start space-x-3 max-w-[80%] ${msg.sender === 'you' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'you' ? 'bg-[#3d9098]' : 'bg-[#f2f7eb] border-2'
                    }`}
                    style={msg.sender !== 'you' ? { borderColor: '#3d9098' } : {}}
                  >
                    {msg.sender === 'you' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <MessageCircle className="w-4 h-4" style={{ color: '#3d9098' }} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`p-4 rounded-2xl ${msg.sender === 'you' ? 'bg-[#3d9098] text-white' : 'bg-white border'}`}
                    style={msg.sender !== 'you' ? { borderColor: '#c8ced1' } : {}}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-semibold">{msg.sender === 'you' ? 'You' : 'Sahayak'}</span>
                      <span className={`text-xs ${msg.sender === 'you' ? 'text-white/70' : 'text-[#767272]'}`}>{formatTime(msg.timestamp)}</span>
                    </div>
                    <div className={`text-sm leading-relaxed ${msg.sender === 'you' ? 'text-white' : 'text-[#2e2f34]'}`}>{msg.text}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-[#f2f7eb] border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: '#3d9098' }}>
                    <MessageCircle className="w-4 h-4" style={{ color: '#3d9098' }} />
                  </div>
                  <div className="bg-white border rounded-2xl p-4" style={{ borderColor: '#c8ced1' }}>
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#3d9098]" />
                      <span className="text-sm text-[#767272]">Sahayak is typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white border-t p-4 sm:p-6" style={{ borderColor: '#c8ced1' }}>
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSend} className="flex items-end space-x-3 sm:space-x-4">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message... aap yahan safe ho 💙"
                  className="w-full p-4 border rounded-xl focus:outline-none focus:border-[#3d9098] focus:ring-2 focus:ring-[#3d9098]/20 resize-none"
                  style={{ borderColor: '#c8ced1' }}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  disabled={isTyping}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2 text-xs text-[#767272]">
                    <Shield className="w-3 h-3" />
                    <span>Respectful, private, and supportive space</span>
                  </div>
                  <span className="text-xs text-[#767272]">Press Enter to send</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className={`px-5 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                  isTyping || !input.trim() ? 'opacity-50 cursor-not-allowed bg-[#c8ced1] text-white' : 'bg-[#3d9098] text-white hover:opacity-90'
                }`}
              >
                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageCircle className="w-5 h-5" />}
                <span className="hidden sm:inline">{isTyping ? 'Sending...' : 'Send'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerSupport;
