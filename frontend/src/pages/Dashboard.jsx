import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProjectTable from '../components/ProjectTable';

const initialPendingProjects = [
  { name: 'Amrita-Deepak', pkg: 'Gold', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Silver', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Platinum', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Gold', date: '22 May 2024', mobile: '9426588568' },
];

const initialCurrentProjects = [
  { name: 'Amrita-Deepak', pkg: 'Gold', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Silver', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Platinum', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Gold', date: '22 May 2024', mobile: '9426588568' },
];

const initialCompletedProjects = [
  { name: 'Amrita-Deepak', pkg: 'Gold', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Silver', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Platinum', date: '22 May 2024', mobile: '9426588568' },
  { name: 'Amrita-Deepak', pkg: 'Gold', date: '22 May 2024', mobile: '9426588568' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [pendingProjects, setPendingProjects] = useState(initialPendingProjects);
  const [currentProjects, setCurrentProjects] = useState(initialCurrentProjects);
  const [completedProjects, setCompletedProjects] = useState(initialCompletedProjects);
  const [searchQuery, setSearchQuery] = useState('');

  // Load pending projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('pendingProjects');
    if (savedProjects) {
      setPendingProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Save pending projects to localStorage whenever pendingProjects changes
  useEffect(() => {
    localStorage.setItem('pendingProjects', JSON.stringify(pendingProjects));
  }, [pendingProjects]);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setCurrentSection('dashboard');
    } else if (path === '/dashboard/pending') {
      setCurrentSection('pending');
    } else if (path === '/dashboard/current') {
      setCurrentSection('current');
    } else if (path === '/dashboard/completed') {
      setCurrentSection('completed');
    }
  }, [location.pathname]);

  const handleDelete = (type, index) => {
    switch (type) {
      case 'pending':
        setPendingProjects(prev => prev.filter((_, i) => i !== index));
        break;
      case 'current':
        setCurrentProjects(prev => prev.filter((_, i) => i !== index));
        break;
      case 'completed':
        setCompletedProjects(prev => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const stats = [
    { number: '120', label: 'Total projects' },
    { number: '64', label: 'Pending projects' },
    { number: '32', label: 'Current projects' },
    { number: '24', label: 'Completed projects' },
  ];

  const filterProjects = (projects) => {
    if (!searchQuery) return projects;
    return projects.filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.pkg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.mobile.includes(searchQuery)
    );
  };

  const StatCard = ({ number, label }) => (
    <div className="bg-white rounded-[20px] p-4 md:p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-black/5 p-2 rounded">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <span className="text-3xl md:text-4xl font-bold">{number}</span>
      </div>
      <p className="text-gray-500 text-sm md:text-base">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Top Sidebar */}
      <div className="lg:hidden">
        <Sidebar currentSection={currentSection} />
      </div>

      <div className="flex lg:min-h-screen">
        {/* Desktop Left Sidebar */}
        <div className="hidden lg:block">
          <Sidebar currentSection={currentSection} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <input 
                  type="text" 
                  placeholder="Search ..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-[300px] py-2 px-4 pr-10 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/20"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="flex gap-3">
                <button 
                  className="bg-white text-black py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors font-medium"
                  onClick={() => navigate('/add-project')}
                >
                  <span>+</span>
                  <span className="hidden sm:inline">Add project</span>
                </button>
                <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid - Only show on dashboard section */}
          {currentSection === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          )}

          {/* Project Tables */}
          <div className="space-y-6">
            {currentSection === 'dashboard' ? (
              <>
                <ProjectTable title="Pending" projects={filterProjects(pendingProjects)} onDelete={(index) => handleDelete('pending', index)} />
                <ProjectTable title="Current" projects={filterProjects(currentProjects)} onDelete={(index) => handleDelete('current', index)} />
                <ProjectTable title="Completed" projects={filterProjects(completedProjects)} onDelete={(index) => handleDelete('completed', index)} />
              </>
            ) : currentSection === 'pending' ? (
              <ProjectTable title="Pending" projects={filterProjects(pendingProjects)} onDelete={(index) => handleDelete('pending', index)} />
            ) : currentSection === 'current' ? (
              <ProjectTable title="Current" projects={filterProjects(currentProjects)} onDelete={(index) => handleDelete('current', index)} />
            ) : (
              <ProjectTable title="Completed" projects={filterProjects(completedProjects)} onDelete={(index) => handleDelete('completed', index)} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 
