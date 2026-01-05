import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center mb-12 shadow-xl border border-slate-800">
      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
        Mastering <span className="text-blue-500">Algorithms.</span>
      </h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 font-medium">
        My personal vault of optimized solutions for LeetCode and Codeforces challenges.
      </p>
      <Link to="/problems" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all inline-block shadow-lg shadow-blue-500/20">
        Browse Library
      </Link>
    </div>
  );
}