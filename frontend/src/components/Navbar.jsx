import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <Terminal className="text-blue-600" />
          <span>DevSolve<span className="text-blue-600"> MD</span></span>
        </Link>
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/problems" className="hover:text-blue-600 transition-colors">Problems</Link>
        </div>
      </div>
    </nav>
  );
}