import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Dumbbell, Activity, Menu, Clock } from 'lucide-react';

const routines = [
  { id: 1, title: '5-min Desk Stretch', duration: '5:00', steps: ['Neck rolls', 'Shoulder shrugs', 'Wrist circles', 'Back stretch'] },
  { id: 2, title: '10-min Energizer', duration: '10:00', steps: ['Jumping jacks', 'Bodyweight squats', 'High knees', 'Lunges'] },
  { id: 3, title: 'Calm Body Reset', duration: '8:00', steps: ['Cat-cow', 'Child pose', 'Forward fold', 'Deep breathing'] },
];

const Exercise = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [current, setCurrent] = useState(routines[0]);

  return (
    <div className="min-h-screen bg-[#eaf1f5]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:ml-72 min-h-screen">
        <div className="lg:hidden sticky top-0 z-30 bg-[#eaf1f5]/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{borderColor:'#c8ced1'}}>
            <button onClick={()=>setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[#f2f7eb]"><Menu className="w-6 h-6 text-[#2e2f34]"/></button>
            <div className="flex items-center space-x-2"><Activity className="w-5 h-5 text-[#3d9098]"/><span className="font-semibold text-[#2e2f34]">Exercise</span></div>
            <div className="w-6"/>
          </div>
        </div>

        <main className="p-6 space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-[#3d9098] p-3 rounded-xl"><Dumbbell className="w-8 h-8 text-white"/></div>
              <div>
                <h1 className="text-3xl font-bold text-[#2e2f34]">Light Exercises</h1>
                <p className="text-[#767272]">Quick routines to refresh body and mind</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border" style={{borderColor:'#c8ced1'}}>
              <h3 className="text-lg font-bold text-[#2e2f34] mb-4">Current Routine</h3>
              <div className="rounded-lg bg-[#eaf1f5] p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-[#2e2f34]">{current.title}</p>
                  <div className="flex items-center space-x-2 text-[#767272]"><Clock className="w-4 h-4"/><span>{current.duration}</span></div>
                </div>
                <ul className="mt-4 list-disc list-inside text-[#2e2f34]">
                  {current.steps.map((s,i)=>(<li key={i} className="mb-1">{s}</li>))}
                </ul>
                <button className="mt-4 w-full bg-[#2dc8ca] text-white py-2.5 rounded-lg font-semibold hover:opacity-90">Start Session</button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border" style={{borderColor:'#c8ced1'}}>
              <h3 className="text-lg font-bold text-[#2e2f34] mb-4">Routines</h3>
              <div className="space-y-3">
                {routines.map(r => (
                  <button key={r.id} onClick={()=>setCurrent(r)} className={`w-full text-left p-3 rounded-lg border hover:bg-[#f2f7eb] ${current.id===r.id? 'bg-[#eaf1f5] border-[#c8ced1]' : ''}`} style={{borderColor:'#c8ced1'}}>
                    <p className="font-semibold text-[#2e2f34]">{r.title}</p>
                    <p className="text-xs text-[#767272]">{r.duration}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Exercise;


