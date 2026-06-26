/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    setIsSent(true);
    setName('');
    setEmail('');
    setMsg('');
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="space-y-12 py-4 text-left animate-fadeIn">
      
      {/* 1. Introductory Title */}
      <section className="text-center max-w-xl mx-auto space-y-3">
        <p className="font-mono text-xs tracking-widest text-amber-700 uppercase font-bold">ONLINE SUPPORT & ATELIER</p>
        <h2 className="text-3xl font-extrabold text-stone-800 font-sans">와쿠와쿠 온라인 아틀리에 & 고객 센터</h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          와쿠와쿠는 온라인 전용 수제 쿠키 아틀리에입니다. 매일 아침 오븐에서 갓 구운 달콤한 쿠키를 
          철저한 위생 관리 속에서 정성스레 패킹하여 전국 각지의 고객님 댁 앞으로 안전하고 신속하게 배송해 드립니다.
        </p>
      </section>

      {/* 2. Map coordinates and Store Locations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Store details & channel info */}
        <div className="space-y-6">
          <div className="bg-amber-50/20 border border-amber-100 rounded-3xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-stone-800">📍 아틀리에 및 고객지원 안내</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3.5 items-start text-xs">
                <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-700">와쿠와쿠 온라인 쿠키 아틀리에 (배송/제조 센터)</p>
                  <p className="text-stone-500 mt-0.5">서울특별시 마포구 서교동 와쿠와쿠 센트럴 키친 (온라인 전용 제조시설)</p>
                  <p className="text-stone-400 mt-0.5 font-mono">Baking Hours: 07:00 - 15:00 (월~금)</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start text-xs border-t border-stone-200/45 pt-4">
                <Phone className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-700">고객지원센터 (CS Center)</p>
                  <p className="text-stone-500 mt-0.5">02-1234-5678</p>
                  <p className="text-stone-400 mt-0.5">평일 10:00 ~ 18:00 (점심시간 12:00 ~ 13:00 / 주말 및 공휴일 휴무)</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start text-xs border-t border-stone-200/45 pt-4">
                <Mail className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-700 font-sans">이메일 문의 및 비즈니스 제휴</p>
                  <p className="text-stone-500 mt-0.5 font-mono">hello@wakuwaku.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cozy brand graphic card instead of offline store photos */}
          <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-stone-200/40 rounded-2xl p-6 text-stone-700 space-y-3">
            <p className="text-base font-extrabold text-stone-800">🚚 안전하고 신선한 전국 택배 발송</p>
            <p className="text-xs text-stone-500 leading-relaxed">
              모든 쿠키는 수령 당일 최상의 식감을 즐기실 수 있도록, 굽자마자 개별 밀봉 처리 후 친환경 보냉/완충 패키징으로 발송됩니다. 단체 선물이나 답례품 주문 시에도 지정된 날짜에 정확히 도착하도록 예약을 지원합니다.
            </p>
            <div className="flex gap-2.5 pt-1.5">
              <span className="inline-block bg-white border border-stone-200 px-3 py-1 rounded-full text-[10px] font-bold text-stone-600">당일 발송 원칙</span>
              <span className="inline-block bg-white border border-stone-200 px-3 py-1 rounded-full text-[10px] font-bold text-stone-600">위생 패킹 완료</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Inquiry Form */}
        <div className="bg-stone-50 border border-stone-200/50 rounded-3xl p-6 md:p-8 space-y-5">
          <div>
            <h3 className="text-xl font-bold text-stone-800">✉️ 온라인 1:1 문의하기</h3>
            <p className="text-xs text-stone-400 mt-1">
              단체 쿠키 주문, 답례품 제작 문의, 제휴 제안 등 궁금하신 내용을 편안하게 남겨주시면 담당 파티시에가 신속히 회신해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 block">이름 / 기업명</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 홍길동, (주)와쿠"
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 block">이메일 주소</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="예: answer@domain.com"
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 block">문의 상세 내용</label>
              <textarea
                rows={4.5}
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="단체 주문 수량, 행사 날짜, 선호하는 포장 등 상세 내용을 자세히 적어주시면 더욱 정성스러운 안내가 가능합니다..."
                className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
              />
            </div>

            {isSent && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700" />
                문의 내용이 성공적으로 발송되었습니다. 신속히 답변해 드릴게요!
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-800 hover:bg-stone-950 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              문의사항 제출하기
            </button>
          </form>
        </div>

      </section>

    </div>
  );
}
