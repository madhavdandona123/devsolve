import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import SolutionForm from '../components/SolutionForm';

// Fallback for local development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Home() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/problems`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setRecent(res.data.slice(0, 3));
        }
      })
      .catch(err => console.log("Check backend connectivity"));
  }, []);

  return (
    <div className="space-y-8 md:space-y-16">
      <Hero />
      
      {/* Grid: 1 column on mobile, 5 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
        
        {/* Form Section: order-2 on mobile puts it below activity */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-black mb-8">Add New Entry</h2>
          <SolutionForm onAdd={() => window.location.reload()} />
        </div>

        {/* Recent Activity Section */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl font-black mb-8">Recent Activity</h2>
          <div className="grid grid-cols-1 gap-6">
            {recent.map((p) => (
              <div key={p._id} className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl leading-tight">{p.title}</h3>
                  {/* Difficulty Badge */}
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    p.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                    p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {p.difficulty}
                  </span>
                </div>
                
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">{p.platform}</p>
                
                {/* Explanation Text - Large and Readable */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-slate-600 text-base italic line-clamp-3">
                    "{p.explanation || "No explanation provided."}"
                  </p>
                </div>
              </div>
            ))}
            
            {recent.length === 0 && (
              <p className="text-slate-400 text-lg">No recent solutions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
