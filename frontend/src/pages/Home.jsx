import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import SolutionForm from '../components/SolutionForm';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Sub-component for a clean, toggleable card
const ProblemCard = ({ p }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = p.explanation?.length > 120;

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-xl leading-tight">{p.title}</h3>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
          p.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
          p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        }`}>
          {p.difficulty}
        </span>
      </div>
      
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">{p.platform}</p>
      
      <div className="pt-4 border-t border-slate-100">
        <p className={`text-slate-600 text-lg italic leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
          "{p.explanation || "No explanation provided."}"
        </p>
        
        {isLongText && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-sm font-black text-blue-500 hover:text-blue-700 uppercase tracking-tighter cursor-pointer"
          >
            {isExpanded ? "↑ Show Less" : "↓ Read Full Explanation"}
          </button>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/problems`)
      .then(res => Array.isArray(res.data) && setRecent(res.data.slice(0, 3)))
      .catch(err => console.error("Connection Error:", err));
  }, []);

  return (
    <div className="space-y-8 md:space-y-16 pb-10">
      <Hero />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
        {/* Form: Below activity on mobile */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-black mb-8">Add New Entry</h2>
          <SolutionForm onAdd={() => window.location.reload()} />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-slate-900">Recent Activity</h2>
          <div className="grid grid-cols-1 gap-6">
            {recent.map(p => <ProblemCard key={p._id} p={p} />)}
            {recent.length === 0 && <p className="text-slate-400">No entries yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
