import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProblemCard from '../components/ProblemCard';
import { Search } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;

export default function AllProblems() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/problems`).then(res => setProblems(res.data));
  }, []);

  const filtered = problems.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-4xl font-black text-slate-900">Archive</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search titles..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-8">
        {filtered.length > 0 ? (
          filtered.map(p => <ProblemCard key={p._id} problem={p} />)
        ) : (
          <p className="text-center text-slate-400 py-20">No matching problems found.</p>
        )}
      </div>
    </div>
  );
}