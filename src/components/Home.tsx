/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, SeasonalTheme } from '../types';
import { Sparkles, ArrowRight, Heart, Star, ShoppingBag, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  products: Product[];
  recommendedProduct: Product | null;
  seasonalTheme: SeasonalTheme;
  onNavigate: (tab: any) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleFavorite: (productId: string) => void;
  favorites: string[];
}

export default function Home({
  products,
  recommendedProduct,
  seasonalTheme,
  onNavigate,
  onAddToCart,
  onToggleFavorite,
  favorites
}: HomeProps) {
  // Determine season details
  const getSeasonDetails = () => {
    switch (seasonalTheme) {
      case 'SPRING':
        return {
          title: '🌸 설레는 봄의 조각',
          subtitle: '상콤달콤 벚꽃 가나슈 & 딸기 크럼블',
          desc: '따스한 봄바람과 함께 퍼지는 벚꽃향 쿠키와 상큼한 딸기가 오늘의 기분을 더 화사하게 만듭니다.',
          bgClass: 'bg-amber-50/70 border-rose-100',
          textColor: 'text-rose-700',
          accentColor: 'rose'
        };
      case 'SUMMER':
        return {
          title: '🌻 싱그러운 여름 쉼표',
          subtitle: '아이스 콜드브루 & 쫀득한 녹차 말차 스모어',
          desc: '시원한 아이스 라떼 한 잔과 쌉싸름한 제주 말차의 만남. 나른한 오후를 채우는 싱그러운 재충전의 시간.',
          bgClass: 'bg-emerald-50/70 border-emerald-100',
          textColor: 'text-emerald-800',
          accentColor: 'emerald'
        };
      case 'AUTUMN':
        return {
          title: '🍂 깊어가는 가을 감성',
          subtitle: '프랑스 고메 버터 & 시나몬 피칸 쿠키',
          desc: '낙엽 밟는 소리만큼 고소한 고메 버터의 풍미. 은은한 시나몬과 달콤한 피칸이 만드는 부드러운 하모니.',
          bgClass: 'bg-orange-50/70 border-amber-200',
          textColor: 'text-amber-900',
          accentColor: 'amber'
        };
      case 'WINTER':
        return {
          title: '🎄 포근한 겨울 이야기',
          subtitle: '스노우 트리 쿠키 & 다크 더블초코 브라우니',
          desc: '하얀 눈꽃 아이싱 장식과 진한 다크 초콜릿이 건네는 로맨틱한 위로. 모닥불 앞 따뜻한 설렘을 쿠키에 담았습니다.',
          bgClass: 'bg-blue-50/70 border-blue-100',
          textColor: 'text-sky-900',
          accentColor: 'blue'
        };
    }
  };

  const season = getSeasonDetails();

  // Find the top-rated bestseller cookie
  const bestseller = products.find(p => p.isBest && p.category !== 'drink') || products[0];

  return (
    <div className="space-y-16 py-4 animate-fadeIn">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-amber-50/50 p-8 md:p-16 border border-amber-100/60 shadow-sm">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-100/30 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-emerald-50/40 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              오늘 구운 신선함
            </span>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-800 leading-[1.15]">
              오늘 구운<br />
              <span className="text-amber-700 font-serif italic">따뜻한 수제 쿠키</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-lg">
              와쿠와쿠는 프랑스산 고메 버터와 천연 비정제 원당을 사용하여 매일 아침 오븐에서 정성껏 직접 굽습니다. 
              설렘과 온기가 살아있는 달콤한 하루를 만나보세요.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('COOKIE')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                달콤한 쿠키 주문하기
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('STORY')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-700 font-semibold border border-stone-200/80 transition-all shadow-sm"
              >
                브랜드 스토리 보기
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-stone-200 rounded-3xl blur-md scale-95 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <img
                src="https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=700&q=80"
                alt="Waku Waku Warm Baked Cookies"
                referrerPolicy="no-referrer"
                className="relative rounded-3xl object-cover w-[400px] h-[340px] shadow-md border-4 border-white transform hover:rotate-1 transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-stone-100 shadow-md flex items-center gap-3">
                <span className="text-3xl">🍪</span>
                <div>
                  <p className="text-xs text-stone-400 font-mono">TODAY BAKED</p>
                  <p className="text-sm font-bold text-stone-700">오븐 온도 180°C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Value Category Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <p className="font-mono text-xs tracking-widest text-amber-700 uppercase">WAKU WAKU CATEGORY</p>
          <h2 className="text-3xl font-bold text-stone-800 font-sans">와쿠와쿠 시그니처 감성</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { id: 'COOKIE', title: '🥛 Milk Cookie', desc: '고소하고 부드러운 기본', emoji: '🥛' },
            { id: 'COOKIE', title: '🍫 Choco Cookie', desc: '진하고 쫀득한 카카오', emoji: '🍫' },
            { id: 'COOKIE', title: '🍓 Strawberry', desc: '상큼한 과일향 설렘', emoji: '🍓' },
            { id: 'COOKIE', title: 'COOKIE', desc: '진한 제주 말차의 깊음', emoji: '🍵' },
            { id: 'COOKIE', title: 'COOKIE', desc: '부드러운 프리미엄 고메', emoji: '🧈' }
          ].map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('COOKIE')}
              className="group cursor-pointer bg-stone-50/50 hover:bg-stone-50 border border-stone-200/50 hover:border-amber-200 p-6 rounded-2xl text-center transition-all hover:shadow-sm"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
              <p className="font-bold text-stone-700 text-sm group-hover:text-amber-800 transition-colors">{cat.title}</p>
              <p className="text-xs text-stone-400 mt-1 line-clamp-1">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Season Limited Special Banner */}
      <section className={`p-8 md:p-12 rounded-3xl border ${season.bgClass} transition-all duration-500`}>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-4 text-left max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-800 text-amber-50">
              SEASON EXCLUSIVE
            </span>
            <h3 className={`text-2xl md:text-3xl font-extrabold ${season.textColor}`}>
              {season.title}
            </h3>
            <p className="text-stone-700 font-medium text-lg">
              {season.subtitle}
            </p>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              {season.desc}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('COOKIE')}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-medium text-sm transition-all shadow-sm"
              >
                한정 시즌 쿠키 만나기
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 flex items-center justify-center">
            {/* Spinning background decor */}
            <div className="absolute inset-0 rounded-full bg-amber-100/40 animate-[spin_20s_linear_infinite]" />
            <span className="text-8xl select-none z-10 animate-bounce">
              {seasonalTheme === 'SPRING' && '🌸'}
              {seasonalTheme === 'SUMMER' && '🍵'}
              {seasonalTheme === 'AUTUMN' && '🍂'}
              {seasonalTheme === 'WINTER' && '🎄'}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Recommendation & Bestseller Bento Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        {/* Today's Special Random Recommendation */}
        {recommendedProduct && (
          <div className="bg-stone-50/50 border border-stone-200/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Clock className="w-3.5 h-3.5" />
                  오늘의 추천 디저트
                </span>
                {recommendedProduct.stock <= 5 && (
                  <span className="flex items-center gap-1 text-xs font-bold text-rose-600 animate-pulse">
                    ● 남은 수량 단 {recommendedProduct.stock}개!
                  </span>
                )}
              </div>
              
              <div className="flex gap-4 md:gap-6 items-start">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-sm border border-stone-200/60"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-stone-700">{recommendedProduct.rating}</span>
                  </div>
                  <h4 className="text-xl font-bold text-stone-800">{recommendedProduct.name}</h4>
                  <p className="text-xs text-stone-400 font-mono uppercase">{recommendedProduct.engName}</p>
                  <p className="text-sm text-stone-500 line-clamp-2 pt-1">{recommendedProduct.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-stone-200/60 pt-4 mt-4">
              <div>
                <p className="text-xs text-stone-400">판매가</p>
                <p className="text-lg font-extrabold text-stone-800">₩{recommendedProduct.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onToggleFavorite(recommendedProduct.id)}
                  className={`p-2.5 rounded-full border transition-all ${
                    favorites.includes(recommendedProduct.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'bg-white border-stone-200 text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(recommendedProduct.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onAddToCart(recommendedProduct, 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-950 text-white font-medium text-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  장바구니 담기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bestseller Spotlight Card */}
        {bestseller && (
          <div className="bg-amber-50/20 border border-amber-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                  🔥 실시간 인기 No.1 BEST
                </span>
                <span className="text-xs font-mono text-stone-400">후기 {bestseller.reviewsCount}개</span>
              </div>

              <div className="flex gap-4 md:gap-6 items-start">
                <img
                  src={bestseller.image}
                  alt={bestseller.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-sm border border-stone-200/60"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-stone-700 ml-1">5.0</span>
                  </div>
                  <h4 className="text-xl font-bold text-stone-800">{bestseller.name}</h4>
                  <p className="text-xs text-stone-400 font-mono uppercase">{bestseller.engName}</p>
                  <p className="text-sm text-stone-500 line-clamp-2 pt-1">{bestseller.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-amber-100 pt-4 mt-4">
              <div>
                <p className="text-xs text-stone-400">판매가</p>
                <p className="text-lg font-extrabold text-stone-800">₩{bestseller.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onToggleFavorite(bestseller.id)}
                  className={`p-2.5 rounded-full border transition-all ${
                    favorites.includes(bestseller.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'bg-white border-stone-200 text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(bestseller.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onAddToCart(bestseller, 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-950 text-white font-medium text-sm transition-all shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  담기
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. Instagram Style Dessert Gallery */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <p className="font-mono text-xs tracking-widest text-amber-700 uppercase">INSTAGRAM FEED</p>
          <h2 className="text-3xl font-bold text-stone-800 font-sans">📷 오늘의 디저트 갤러리</h2>
          <p className="text-sm text-stone-500">와쿠와쿠 쿠키 아틀리에에서 구워낸 달콤한 우리들의 이야기</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { url: 'https://images.unsplash.com/photo-1548980308-9557fc95457c?auto=format&fit=crop&w=500&q=80', tag: '따끈초코쿠키' },
            { url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=80', tag: '하트라떼아트' },
            { url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80', tag: '말차스모어' },
            { url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80', tag: '선물세트포장' }
          ].map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-square border border-stone-200/40 cursor-pointer"
              onClick={() => onNavigate('REVIEW')}
            >
              <img
                src={item.url}
                alt="Instagram Cookie Feed"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                  #{item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
