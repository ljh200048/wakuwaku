/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Notice as NoticeType } from '../types';
import { Megaphone, Calendar, ChevronDown, ChevronUp, Bell, Sparkles } from 'lucide-react';

interface NoticeProps {
  notices: NoticeType[];
}

export default function Notice({ notices }: NoticeProps) {
  const [filter, setFilter] = useState<'all' | 'notice' | 'event'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredNotices = notices.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8 py-4 text-left max-w-3xl mx-auto animate-fadeIn">
      
      {/* Header */}
      <section className="text-center max-w-xl mx-auto space-y-3">
        <p className="font-mono text-xs tracking-widest text-amber-700 uppercase font-bold">WAKU WAKU EVENTS & NEWS</p>
        <h2 className="text-3xl font-extrabold text-stone-800">소식 및 이벤트 📢</h2>
        <p className="text-xs text-stone-500">
          오늘을 조금 더 특별하게 만들어줄 와쿠와쿠의 새소식과 달콤한 이벤트 캘린더입니다.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="flex gap-2 justify-center border-b border-stone-200 pb-4">
        {[
          { id: 'all', label: '전체 보기' },
          { id: 'notice', label: '📢 일반 공지' },
          { id: 'event', label: '🎁 진행중 이벤트' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-stone-50 rounded-2xl border text-stone-400 text-xs">
            해당하는 소식이 아직 존재하지 않습니다.
          </div>
        ) : (
          filteredNotices.map((notice) => {
            const isExpanded = expandedId === notice.id;
            return (
              <div
                key={notice.id}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  isExpanded ? 'border-amber-400/80 bg-amber-50/10 shadow-sm' : 'border-stone-200 bg-white'
                }`}
              >
                {/* Accordion Trigger Header */}
                <div
                  onClick={() => toggleExpand(notice.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/40 select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                      notice.type === 'event' 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {notice.type === 'event' ? '🎁' : '📢'}
                    </span>
                    <div className="text-left">
                      <span className="text-[10px] text-stone-400 font-mono font-bold block mb-0.5">{notice.date}</span>
                      <h4 className="font-extrabold text-stone-800 text-sm md:text-base leading-snug">
                        {notice.title}
                      </h4>
                    </div>
                  </div>

                  <div className="shrink-0 text-stone-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Collapsible Details Body */}
                {isExpanded && (
                  <div className="p-6 bg-stone-50/40 border-t border-stone-150 text-xs md:text-sm text-stone-600 leading-relaxed text-left whitespace-pre-wrap font-medium">
                    {notice.content}
                    
                    {/* Visual Stamp Card for decorative completeness */}
                    <div className="mt-5 border-t border-dashed border-stone-200 pt-4 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 font-mono">POSTED BY WAKU WAKU CAFE MASTER</span>
                      <div className="flex items-center gap-1 text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-1 rounded">
                        <Sparkles className="w-3.5 h-3.5" />
                        달콤함 지수 UP!
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
