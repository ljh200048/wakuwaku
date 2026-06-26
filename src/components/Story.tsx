/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BRAND_STORY_STEPS } from '../data';
import { Heart, Sparkles, Coffee } from 'lucide-react';

export default function Story() {
  return (
    <div className="space-y-16 py-4 animate-fadeIn text-left">
      
      {/* 1. Brand Story Intro Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <p className="font-mono text-xs tracking-widest text-amber-700 uppercase font-bold">OUR BEAUTIFUL COMMITTED PATH</p>
        <h2 className="text-4xl font-extrabold text-stone-800 font-sans tracking-tight">와쿠와쿠가 굽는 온기 이야기</h2>
        <p className="text-stone-600 leading-relaxed text-sm md:text-base">
          단순한 디저트를 만드는 것을 넘어, 한 입의 달콤함 속에 당신의 하루를 더 포근하게 녹여줄 설렘의 온도를 선물합니다.
          와쿠와쿠가 고집하는 세 가지 원칙과 정성을 들려드릴게요.
        </p>
      </section>

      {/* 2. Story Steps - Alternating Left/Right layout */}
      <section className="space-y-12">
        {BRAND_STORY_STEPS.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute inset-0 bg-amber-100 rounded-3xl rotate-1 scale-95 opacity-50 -z-10" />
                <img
                  src={step.image}
                  alt={step.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover rounded-3xl border border-stone-100 shadow-sm"
                />
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2 space-y-4">
                <span className="text-amber-700 font-mono text-xs font-bold uppercase tracking-widest">
                  {step.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-stone-800">{step.title}</h3>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
                <div className="flex gap-2 text-stone-400">
                  <Heart className="w-4 h-4 text-amber-700 fill-current" />
                  <span className="text-xs font-mono font-bold text-stone-400">WAKU WAKU AUTHENTIC BAKERY</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Cozy Vibe Quote Banner */}
      <section className="bg-stone-50 border border-stone-200/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-4 left-4 text-4xl text-amber-200 select-none opacity-40">“</div>
        <div className="absolute bottom-4 right-4 text-4xl text-amber-200 select-none opacity-40">”</div>
        
        <div className="max-w-xl mx-auto space-y-5 relative z-10">
          <p className="text-lg md:text-xl font-serif italic text-amber-900 leading-relaxed font-semibold">
            "쿠키 하나에 설렘을 담다.<br />
            당신의 매일이 오늘 구운 수제 쿠키처럼 언제나 따뜻하고 달콤하기를 바랄게요."
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-stone-300" />
            <span className="text-xs font-bold text-stone-400 font-mono flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5 text-stone-400" />
              WAKU WAKU COOKIE & COFFEE
            </span>
            <span className="w-8 h-px bg-stone-300" />
          </div>
        </div>
      </section>

      {/* 4. Ingredients details */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { icon: '🥛', title: '100% 무가공 신선우유', desc: '인공 첨가물과 트랜스지방이 전혀 첨가되지 않은 청정 국산 유제품을 그대로 사용합니다.' },
          { icon: '🌿', title: '비정제 유기농 원당', desc: '강한 설탕의 유해함을 줄이고 사탕수수의 영양이 그대로 보존된 비정제 천연 원당만을 고집합니다.' },
          { icon: '🍫', title: '카카오 버터 100% 리얼 초콜릿', desc: '팜유가 가미된 이미테이션 초콜릿이 아닌 벨기에산 고급 카카오 버터가 풍부히 녹아든 카카오만을 사용합니다.' }
        ].map((item, index) => (
          <div key={index} className="p-6 bg-amber-50/10 border border-amber-100/40 rounded-2xl space-y-2">
            <span className="text-3xl block mb-2">{item.icon}</span>
            <h4 className="font-bold text-stone-800 text-sm">{item.title}</h4>
            <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

    </div>
  );
}
