import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Users, MessageCircle, Search, Plus, Menu } from 'lucide-react';

const PeerSupport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

  const groups = [
    { id: 1, name: 'Exam Stress Circle', members: 128, desc: 'Share tips and support during exam season.' },
    { id: 2, name: 'Anxiety & Mindfulness', members: 203, desc: 'Practice grounding and mindfulness together.' },
    { id: 3, name: 'Freshers Transition', members: 76, desc: 'Adjusting to campus life and routines.' },
  ];

  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#eaf1f5]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:ml-72 min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#eaf1f5]/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{borderColor:'#c8ced1'}}>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[#f2f7eb]">
              <Menu className="w-6 h-6 text-[#2e2f34]" />
            </button>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#3d9098]" />
              <span className="font-semibold text-[#2e2f34]">Peer Support</span>
            </div>
            <div className="w-6" />
          </div>
        </div>

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-[#3d9098] p-3 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#2e2f34]">Peer Support Communities</h1>
                <p className="text-[#767272]">Connect, share, and grow together in safe spaces</p>
              </div>
            </div>
          </div>

          {/* Search and actions */}
          <div className="bg-white rounded-xl p-6 border" style={{borderColor:'#c8ced1'}}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d949d]" />
                <input
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  placeholder="Search groups..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent"
                  style={{borderColor:'#c8ced1'}}
                />
              </div>
              <button className="flex items-center space-x-2 bg-[#2dc8ca] text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90">
                <Plus className="w-4 h-4" />
                <span>Create Group</span>
              </button>
            </div>
          </div>

          {/* Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(group => (
              <div key={group.id} className="bg-white rounded-xl p-6 border hover:shadow-md transition" style={{borderColor:'#c8ced1'}}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#2e2f34]">{group.name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-[#eaf1f5] text-[#3d9098]">{group.members} members</span>
                </div>
                <p className="text-sm text-[#767272] mb-4">{group.desc}</p>
                <button className="w-full flex items-center justify-center space-x-2 bg-[#f2f7eb] hover:bg-[#eaf1f5] text-[#2e2f34] font-semibold py-2.5 rounded-lg">
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Discussion</span>
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PeerSupport;


