import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle, Send } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;

export default function SolutionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    platform: 'LeetCode',
    difficulty: 'Easy',
    link: '',
    tags: '',
    code: '',
    explanation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = { 
        ...formData, 
        tags: formData.tags.split(',').map(tag => tag.trim()) 
      };
      const res = await axios.post(`${API_URL}/problems`, formattedData);
      onAdd(res.data);
      setFormData({ title: '', platform: 'LeetCode', difficulty: 'Easy', link: '', tags: '', code: '', explanation: '' });
      alert("Solution Saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving solution. Check backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        placeholder="Problem Title"
        value={formData.title}
        onChange={e => setFormData({...formData, title: e.target.value})}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <select 
          className="p-3 rounded-xl border border-slate-200 bg-white"
          value={formData.platform}
          onChange={e => setFormData({...formData, platform: e.target.value})}
        >
          <option>LeetCode</option>
          <option>Codeforces</option>
        </select>
        <select 
          className="p-3 rounded-xl border border-slate-200 bg-white"
          value={formData.difficulty}
          onChange={e => setFormData({...formData, difficulty: e.target.value})}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <input 
        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Link to Problem"
        value={formData.link}
        onChange={e => setFormData({...formData, link: e.target.value})}
      />
      <input 
        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Tags (DP, Greedy, Math)"
        value={formData.tags}
        onChange={e => setFormData({...formData, tags: e.target.value})}
      />
      <textarea 
        className="w-full p-3 rounded-xl border border-slate-200 h-32 font-mono text-sm"
        placeholder="Paste Code Here..."
        value={formData.code}
        onChange={e => setFormData({...formData, code: e.target.value})}
        required
      />
      <textarea 
        className="w-full p-3 rounded-xl border border-slate-200 h-20"
        placeholder="Explanation (Optional)"
        value={formData.explanation}
        onChange={e => setFormData({...formData, explanation: e.target.value})}
      />
      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
      >
        <Send size={18} /> Save Solution
      </button>
    </form>
  );
}