import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProblemCard({ problem }) {
    return (
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        {/* Header: Vertical on mobile, Horizontal on desktop */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                {problem.platform}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">{problem.title}</h2>
          </div>
          <a href={problem.link} target="_blank" className="text-blue-600 font-bold text-sm md:text-base">
            View Original →
          </a>
        </div>
  
        {/* Code Area: Horizontal scroll enabled for mobile */}
        <div className="bg-slate-900 overflow-x-auto">
          <SyntaxHighlighter language="cpp" style={atomDark} customStyle={{padding: '20px', fontSize: '1rem'}}>
            {problem.code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }