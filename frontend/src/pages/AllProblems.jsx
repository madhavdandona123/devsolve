import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ArchiveCard = ({ p }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(p.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
          p.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
          p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        }`}>
          {p.difficulty}
        </span>
        <span className="text-xs font-bold text-slate-300">{new Date(p.date).toLocaleDateString()}</span>
      </div>

      <h2 className="text-2xl font-black mb-2 text-slate-800 leading-tight">{p.title}</h2>
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">{p.platform}</p>
      
      <div className="mb-6">
        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Explanation</h4>
        <p className="text-slate-600 text-lg leading-relaxed italic">{p.explanation}</p>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between items-center mb-3">
           <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Source Code</h4>
           <button onClick={handleCopy} className="text-xs font-bold text-blue-600 hover:underline">
             {copied ? "Copied!" : "Copy Code"}
           </button>
        </div>
        <pre className="bg-slate-50 border border-slate-200 text-slate-700 p-5 rounded-2xl text-base overflow-x-auto font-mono max-h-64">
          <code>{p.code}</code>
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
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="container-main py-10 px-4 md:px-10">
      <h1 className="text-5xl font-black text-slate-900 mb-12">Full Archive</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {problems.map(p => <ArchiveCard key={p._id} p={p} />)}
      </div>
    </div>
  );
}
