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
        
        {/* Form Section */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <h2 className="text-2xl md:text-3xl font-black mb-6">Add New Entry</h2>
          <SolutionForm onAdd={() => window.location.reload()} />
        </div>

        {/* Recent Activity Section */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <h2 className="text-2xl md:text-3xl font-black mb-6">Recent Activity</h2>
          <div className="grid grid-cols-1 gap-4">
            {recent.map((p) => (
              <div key={p._id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg leading-tight">{p.title}</h3>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{p.platform}</span>
              </div>
            ))}
            {recent.length === 0 && (
              <p className="text-slate-400">No recent solutions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}