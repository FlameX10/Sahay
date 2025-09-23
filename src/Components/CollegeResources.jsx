import React, { useState } from 'react';
import { BookOpen, FileText, Download, Eye } from 'lucide-react';
import InstitutionSidebar from './InstitutionSidebar';

const CollegeResources = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#eaf1f5]">
      <InstitutionSidebar
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-30" style={{borderColor:'#c8ced1'}}>
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 rounded-lg transition-colors"
                style={{background:'#c8ced1'}}
              >
                <BookOpen className="w-5 h-5 text-[#2e2f34]" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-[#2e2f34]">Institution Resources</h2>
                <p className="text-base text-[#767272]">Manage wellness resources for your students</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
            <h3 className="text-xl font-bold text-[#2e2f34] mb-6">Wellness Resources</h3>
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Resources Management Coming Soon</h3>
              <p className="text-gray-500">This feature will allow you to manage wellness resources specific to your institution.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollegeResources;
