import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ArchiveCard = ({ p }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (p.code) {
      navigator.clipboard.writeText(p.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col h-full">
      {/* Status Badges */}
      <div className="flex justify-between items-start mb-6">
        <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
          p.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
          p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        }`}>
          {p.difficulty || 'Unrated'}
        </span>
        <span className="text-xs font-bold text-slate-300">
          {p.date ? new Date(p.date).toLocaleDateString() : 'No Date'}
        </span>
      </div>

      <h2 className="text-2xl font-black mb-2 text-slate-800 leading-tight">{p.title}</h2>
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">{p.platform}</p>
      
      {/* Explanation Section */}
      <div className="mb-6">
        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Explanation</h4>
        <p className="text-slate-600 text-lg leading-relaxed italic">
          {p.explanation || "No explanation recorded."}
        </p>
      </div>

      {/* THE FIX: Code Section Added Here */}
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-3">
           <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Solution Code</h4>
           <button 
             onClick={handleCopy} 
             className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded-lg transition-colors cursor-pointer"
           >
             {copied ? "✓ Copied!" : "Copy Code"}
           </button>
        </div>
        
        {/* Large font and scrollable for mobile readability */}
        <pre className="bg-slate-900 text-slate-100 p-6 rounded-2xl text-base overflow-x-auto font-mono max-h-80 shadow-inner">
          <code className="whitespace-pre">{p.code || "// Error loading code snippet"}</code>
        </pre>
      </div>
    </div>
  );
};

export default function AllProblems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/problems`)
      .then(res => setProblems(res.data))
      .catch(err => console.error("Archive Error:", err));
  }, []);

  return (
    <div className="container-main py-10 px-4 md:px-10 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black text-slate-900 mb-12 tracking-tighter">Archive</h1>
      
      {/* 1 column on mobile, 2 on tablet, 3 on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {problems.map(p => <ArchiveCard key={p._id} p={p} />)}
      </div>
      
      {problems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-xl font-bold">No problems found in archive.</p>
        </div>
      )}
    </div>
  );
}
