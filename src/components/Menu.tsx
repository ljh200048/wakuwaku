/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CustomCookie, CartItem } from '../types';
import { Star, Heart, ShoppingBag, Gift, Sparkles, Check, RefreshCw, AlertCircle, X, MessageSquareHeart } from 'lucide-react';

interface MenuProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number, giftInfo?: { recipientName: string; giftMessage: string }) => void;
  onAddCustomCookieToCart: (customCookie: CustomCookie) => void;
  onToggleFavorite: (productId: string) => void;
  favorites: string[];
  activeCategoryFilter: string;
}

const TOPPINGS_PRESETS = [
  { id: 'topping-1', name: '벨기에 초코칩', price: 500, icon: '🍫' },
  { id: 'topping-2', name: '쫀득 마시멜로', price: 800, icon: '🍥' },
  { id: 'topping-3', name: '고소한 아몬드 슬라이스', price: 600, icon: '🥜' },
  { id: 'topping-4', name: '상큼 건딸기 다이스', price: 800, icon: '🍓' },
  { id: 'topping-5', name: '고급 피칸 넛츠', price: 1000, icon: '🌰' },
];

const PACKAGING_PRESETS = [
  { id: 'pack-1', name: '친환경 크래프트 타이백 봉투', price: 0, desc: '무료 생분해 종이 봉투 패키지' },
  { id: 'pack-2', name: '시그니처 세이지 크라프트 박스', price: 2000, desc: '와쿠와쿠 감성의 선물 상자' },
  { id: 'pack-3', name: '로맨틱 틴케이스 세트', price: 4000, desc: '철제 틴케이스 + 실크 리본 장식' },
];

export default function Menu({
  products,
  onAddToCart,
  onAddCustomCookieToCart,
  onToggleFavorite,
  favorites,
  activeCategoryFilter
}: MenuProps) {
  // Navigation categories
  const [activeTab, setActiveTab] = useState<'all' | 'classic' | 'premium' | 'limited' | 'drink' | 'gift'>(
    activeCategoryFilter === 'GIFT SET' ? 'gift' : activeCategoryFilter === 'DRINK' ? 'drink' : 'all'
  );

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Product for Gifting
  const [giftingProduct, setGiftingProduct] = useState<Product | null>(null);
  const [giftRecipient, setGiftRecipient] = useState('');
  const [giftCardMessage, setGiftCardMessage] = useState('');

  // Custom Cookie Builder State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customBase, setCustomBase] = useState<Product>(
    products.find(p => p.id === 'classic-1') || products[0]
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState<string>('pack-1');
  const [customGiftMessage, setCustomGiftMessage] = useState('');
  const [hasBite, setHasBite] = useState(false);

  // Filter products based on Category + Search
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeTab === 'all' ? true : product.category === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.engName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate customized cookie price
  const calculateCustomCookiePrice = () => {
    const basePrice = customBase.price;
    const toppingsPrice = selectedToppings.reduce((total, id) => {
      const topping = TOPPINGS_PRESETS.find(t => t.id === id);
      return total + (topping ? topping.price : 0);
    }, 0);
    const packaging = PACKAGING_PRESETS.find(p => p.id === selectedPackaging);
    const packagingPrice = packaging ? packaging.price : 0;
    return basePrice + toppingsPrice + packagingPrice;
  };

  // Topping Toggle
  const handleToppingToggle = (toppingId: string) => {
    setSelectedToppings(prev =>
      prev.includes(toppingId) ? prev.filter(id => id !== toppingId) : [...prev, toppingId]
    );
  };

  // Submit Custom Cookie
  const handleAddCustomCookie = () => {
    const toppingsNames = selectedToppings.map(id => {
      const t = TOPPINGS_PRESETS.find(item => item.id === id);
      return t ? `${t.icon} ${t.name}` : '';
    }).filter(Boolean);

    const pack = PACKAGING_PRESETS.find(p => p.id === selectedPackaging);
    const packagingName = pack ? pack.name : '';

    const customCookie: CustomCookie = {
      id: `custom-${Date.now()}`,
      baseId: customBase.id,
      baseName: customBase.name,
      toppings: toppingsNames,
      packaging: packagingName,
      giftMessage: customGiftMessage,
      price: calculateCustomCookiePrice()
    };

    onAddCustomCookieToCart(customCookie);
    
    // Reset state & show feedback
    setIsCustomizing(false);
    setSelectedToppings([]);
    setSelectedPackaging('pack-1');
    setCustomGiftMessage('');
  };

  // Open Gifting Dialog
  const openGifting = (product: Product) => {
    setGiftingProduct(product);
    setGiftRecipient('');
    setGiftCardMessage('');
  };

  // Submit Catalog Gift
  const handleAddGiftToCart = () => {
    if (giftingProduct) {
      onAddToCart(giftingProduct, 1, {
        recipientName: giftRecipient || '소중한 분',
        giftMessage: giftCardMessage || '달콤하고 따뜻한 하루를 선물합니다.'
      });
      setGiftingProduct(null);
    }
  };

  return (
    <div className="space-y-10 py-4 text-left">
      
      {/* 1. Header & Search Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="font-mono text-xs tracking-widest text-amber-700 uppercase font-bold">WAKU WAKU CAFE SHOP</p>
          <h2 className="text-3xl font-extrabold text-stone-800 font-sans">와쿠와쿠 메뉴판</h2>
        </div>
        
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="원하시는 쿠키나 음료를 검색해보세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-full border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-amber-200/60 focus:border-amber-400 text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              초기화
            </button>
          )}
        </div>
      </div>

      {/* 2. Menu Navigation & Cookie Customizer Button */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center border-b border-stone-200 pb-2">
        {/* Navigation Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: '전체보기' },
            { id: 'classic', label: '클래식 쿠키' },
            { id: 'premium', label: '프리미엄 쿠키' },
            { id: 'limited', label: '시즌 한정' },
            { id: 'drink', label: '카페 드링크' },
            { id: 'gift', label: '선물 세트 🎁' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-100/80 text-amber-900 border border-amber-200/80 shadow-sm'
                  : 'bg-stone-50 text-stone-600 border border-stone-200/40 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Customizer Entry Button */}
        <button
          onClick={() => {
            setIsCustomizing(true);
            setCustomBase(products.find(p => p.id === 'classic-1') || products[0]);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-800 text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          ⭐ 내 맘대로 쿠키 커스터마이징
        </button>
      </div>

      {/* 3. Products Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-3xl border border-stone-200/40">
          <p className="text-stone-400 text-3xl mb-3">🔍</p>
          <p className="text-stone-600 font-semibold">검색 조건에 맞는 상품을 찾을 수 없습니다.</p>
          <p className="text-xs text-stone-400 mt-1">다른 상품 이름으로 검색해 보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-stone-200/50 hover:border-amber-200/70 p-5 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                {/* Product Image and Badges */}
                <div className="relative overflow-hidden rounded-2xl aspect-video bg-stone-100 mb-4 border border-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isBest && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-800 text-amber-50 shadow-sm flex items-center gap-0.5 z-10">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      BEST
                    </span>
                  )}
                  {product.category === 'limited' && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-rose-50 border border-rose-200 text-rose-600 shadow-sm z-10">
                      LIMITED
                    </span>
                  )}

                  {/* Stock Warning Overlay */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md border shadow-sm z-10 bg-white/90">
                    {product.stock <= 5 ? (
                      <span className="text-rose-600 flex items-center gap-0.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                        품절임박 {product.stock}개!
                      </span>
                    ) : (
                      <span className="text-stone-600 font-mono">남은 수량: {product.stock}개</span>
                    )}
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-1 text-amber-500 text-xs mb-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-stone-700">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount})</span>
                </div>

                {/* Title & Eng Title */}
                <h3 className="text-lg font-bold text-stone-800 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-stone-400 font-mono uppercase tracking-wide mt-0.5">{product.engName}</p>
                <p className="text-xs text-stone-500 mt-2.5 line-clamp-2 h-8 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action pricing and Buttons row */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-stone-400">판매가</p>
                  <p className="text-base font-extrabold text-stone-800">₩{product.price.toLocaleString()}</p>
                </div>

                <div className="flex gap-1.5">
                  {/* Favorite Toggle Button */}
                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    className={`p-2 rounded-full border transition-all cursor-pointer ${
                      favorites.includes(product.id)
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'bg-stone-50 border-stone-200/60 text-stone-400 hover:text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Gift Item Button */}
                  {product.category !== 'drink' && (
                    <button
                      onClick={() => openGifting(product)}
                      className="p-2 rounded-full border border-stone-200/60 text-stone-500 hover:text-stone-700 bg-stone-50 hover:bg-stone-100 transition-all cursor-pointer"
                      title="선물하기"
                    >
                      <Gift className="w-4 h-4" />
                    </button>
                  )}

                  {/* Direct Add to Cart */}
                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-stone-800 hover:bg-stone-950 text-white font-medium text-xs transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    담기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Cookie Customizer Modal Backdrop/Container --- */}
      {isCustomizing && (() => {
        const visuals = (() => {
          switch (customBase.id) {
            case 'classic-1':
              return {
                image: 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&w=400&q=80',
                color: '#5c3e21',
                crumbs: '#5c3e21'
              };
            case 'classic-2':
              return {
                image: 'https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=400&q=80',
                color: '#d0a65c',
                crumbs: '#d0a65c'
              };
            case 'classic-3':
              return {
                image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=400&q=80',
                color: '#5d8650',
                crumbs: '#5d8650'
              };
            case 'premium-1':
              return {
                image: 'https://images.unsplash.com/photo-1619149600417-6e6cdfac2f8a?auto=format&fit=crop&w=400&q=80',
                color: '#cf6b7d',
                crumbs: '#cf6b7d'
              };
            case 'premium-2':
              return {
                image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
                color: '#3a2211',
                crumbs: '#3a2211'
              };
            default:
              return {
                image: 'https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=400&q=80',
                color: '#d0a65c',
                crumbs: '#d0a65c'
              };
          }
        })();

        return (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl border border-stone-100 overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 p-6 border-b border-stone-200/60 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👩‍🍳</span>
                  <div>
                    <h3 className="text-xl font-extrabold text-stone-800">수제 감성 쿠키 커스터마이징</h3>
                    <p className="text-xs text-amber-700">원하는 도우와 토핑, 선물 포장을 골라 나만의 온기를 담아보세요</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsCustomizing(false);
                    setHasBite(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-stone-200/50 text-stone-400 hover:text-stone-600 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable & 2-Column on Desktop) */}
              <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
                
                {/* Left Column: Live Visualizer Plate (Sticky-Style) */}
                <div className="w-full lg:w-[42%] bg-gradient-to-b from-stone-50 via-stone-50/40 to-stone-100/50 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-stone-100 relative overflow-hidden min-h-[360px] lg:min-h-0">
                  
                  {/* Whisk & Tea Jar Aesthetic background lines (paying homage to the photo) */}
                  <div className="absolute top-4 right-4 text-stone-300/40 select-none flex flex-col items-center gap-1 pointer-events-none">
                    <div className="w-8 h-8 opacity-20 border-2 border-stone-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">🍵</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-wider font-semibold">EST. WAKU</span>
                  </div>

                  <div className="absolute top-1/2 left-4 -translate-y-1/2 text-stone-300/15 pointer-events-none select-none text-9xl">
                    🍪
                  </div>

                  {/* Title */}
                  <div className="text-center mb-5 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-amber-100 text-amber-900 border border-amber-200/40 uppercase">
                      Live Plate Preview
                    </span>
                    <h4 className="text-sm font-extrabold text-stone-700 mt-1">🍽️ 실시간 플레이팅 프리뷰</h4>
                  </div>

                  {/* Interactive Plate Canvas */}
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.02)] border border-stone-100/80 flex items-center justify-center transition-all duration-500 z-10">
                    
                    {/* Shadow of Plate */}
                    <div className="absolute inset-0 rounded-full bg-stone-200/5 blur-xl scale-105 pointer-events-none" />

                    {/* Cookie base image */}
                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full transition-all duration-300 overflow-hidden shadow-md">
                      <img
                        src={visuals.image}
                        alt={customBase.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none"
                      />

                      {/* Bite Taken Out White Circles */}
                      {hasBite && (
                        <>
                          <div className="absolute bottom-[-10px] right-[-10px] w-14 h-14 rounded-full bg-white z-20 border-4 border-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />
                          <div className="absolute bottom-[18px] right-[-14px] w-11 h-11 rounded-full bg-white z-20 border-2 border-white" />
                          <div className="absolute bottom-[-14px] right-[18px] w-11 h-11 rounded-full bg-white z-20 border-2 border-white" />
                        </>
                      )}
                    </div>

                    {/* Interactive Topping Layers on top of cookie */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                      
                      {/* Topping 1: Chocolate Chips */}
                      {selectedToppings.includes('topping-1') && (
                        <>
                          <span className="absolute top-[28%] left-[28%] text-sm select-none animate-bounce" style={{ animationDelay: '0.1s' }}>🍫</span>
                          <span className="absolute top-[22%] right-[32%] text-sm select-none animate-bounce" style={{ animationDelay: '0.3s' }}>🍫</span>
                          <span className="absolute top-[48%] left-[45%] text-xs select-none animate-pulse">🍫</span>
                          <span className="absolute bottom-[28%] left-[26%] text-sm select-none">🍫</span>
                          {!hasBite && <span className="absolute bottom-[32%] right-[28%] text-xs select-none">🍫</span>}
                        </>
                      )}

                      {/* Topping 2: Marshmallow */}
                      {selectedToppings.includes('topping-2') && (
                        <>
                          <span className="absolute top-[20%] left-[44%] text-base select-none animate-pulse">🍥</span>
                          <span className="absolute top-[52%] left-[24%] text-base select-none animate-pulse" style={{ animationDelay: '0.5s' }}>🍥</span>
                          {!hasBite && <span className="absolute bottom-[25%] right-[32%] text-base select-none">🍥</span>}
                        </>
                      )}

                      {/* Topping 3: Almond Slice */}
                      {selectedToppings.includes('topping-3') && (
                        <>
                          <span className="absolute top-[35%] left-[22%] text-sm select-none -rotate-12">🥜</span>
                          <span className="absolute top-[30%] right-[25%] text-sm select-none rotate-45">🥜</span>
                          <span className="absolute bottom-[38%] left-[54%] text-xs select-none rotate-12">🥜</span>
                          <span className="absolute bottom-[28%] left-[38%] text-sm select-none -rotate-45">🥜</span>
                        </>
                      )}

                      {/* Topping 4: Strawberry Dice */}
                      {selectedToppings.includes('topping-4') && (
                        <>
                          <span className="absolute top-[22%] left-[24%] text-sm select-none animate-bounce">🍓</span>
                          <span className="absolute top-[38%] right-[28%] text-sm select-none">🍓</span>
                          <span className="absolute bottom-[35%] left-[34%] text-xs select-none">🍓</span>
                          <span className="absolute bottom-[48%] left-[62%] text-sm select-none">🍓</span>
                        </>
                      )}

                      {/* Topping 5: Pecan */}
                      {selectedToppings.includes('topping-5') && (
                        <>
                          <span className="absolute top-[32%] left-[48%] text-sm select-none rotate-12">🌰</span>
                          <span className="absolute top-[52%] left-[32%] text-sm select-none -rotate-12">🌰</span>
                          {!hasBite && <span className="absolute bottom-[30%] right-[38%] text-xs select-none">🌰</span>}
                        </>
                      )}
                    </div>

                    {/* Crumbs falling on the plate when bite is taken */}
                    {hasBite && (
                      <div className="absolute inset-0 pointer-events-none z-25">
                        <div className="absolute bottom-[16%] right-[26%] w-2 h-2 rounded-full shadow-sm animate-ping" style={{ backgroundColor: visuals.crumbs }} />
                        <div className="absolute bottom-[18%] right-[18%] w-1.5 h-1.5 rounded-full" style={{ backgroundColor: visuals.crumbs }} />
                        <div className="absolute bottom-[28%] right-[12%] w-1 h-1 rounded-full opacity-60" style={{ backgroundColor: visuals.crumbs }} />
                        <div className="absolute bottom-[8%] right-[24%] w-2.5 h-1 rounded-full rotate-45" style={{ backgroundColor: visuals.crumbs }} />
                        <div className="absolute bottom-[10%] right-[14%] w-1 h-1 rounded-full" style={{ backgroundColor: visuals.crumbs }} />
                        <div className="absolute bottom-[20%] right-[6%] w-1 h-1 rounded-full opacity-40" style={{ backgroundColor: visuals.crumbs }} />
                      </div>
                    )}
                  </div>

                  {/* Interactivity Control - Bite Taken Out Button (References user's images) */}
                  <div className="mt-5.5 z-10 flex flex-col items-center gap-1">
                    <button
                      onClick={() => setHasBite(!hasBite)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
                        hasBite 
                          ? 'bg-amber-100/90 text-amber-900 border border-amber-300' 
                          : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50'
                      }`}
                    >
                      <span>{hasBite ? '🔄 쿠키 한 판 복원하기' : '😋 한 입 베어물기 (Bite taken out!)'}</span>
                    </button>
                    <p className="text-[10px] text-stone-400 mt-1">참고: 업로드하신 아름다운 쿠키 이미지들처럼 예쁜 한 입 자국을 냅니다</p>
                  </div>
                </div>

                {/* Right Column: Customizer Controls (Scrollable) */}
                <div className="w-full lg:w-[58%] p-6 space-y-6 overflow-y-auto">
                  
                  {/* Step 1: Base Dough Cookie */}
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-800 text-white text-[10px] font-bold">1</span>
                      쿠키 도우 베이스 선택
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {products
                        .filter(p => p.category === 'classic' || p.id === 'premium-1' || p.id === 'premium-2')
                        .map(dough => (
                          <div
                            key={dough.id}
                            onClick={() => setCustomBase(dough)}
                            className={`cursor-pointer p-3 rounded-2xl border-2 text-center transition-all relative overflow-hidden ${
                              customBase.id === dough.id
                                ? 'border-amber-800 bg-amber-50/40 shadow-sm'
                                : 'border-stone-200/60 hover:border-stone-300 hover:bg-stone-50'
                            }`}
                          >
                            <span className="text-xl mb-1 block">
                              {dough.id === 'classic-3' ? '🍵' : dough.id === 'premium-1' ? '🍓' : dough.id === 'premium-2' ? '🍫' : '🍪'}
                            </span>
                            <p className="font-extrabold text-stone-800 text-xs truncate">{dough.name.replace('[겨울 한정판] ', '').replace('설렘 가득 ', '')}</p>
                            <p className="text-[11px] text-stone-500 font-semibold mt-0.5">₩{dough.price.toLocaleString()}</p>
                            
                            {customBase.id === dough.id && (
                              <div className="absolute top-1 right-1">
                                <span className="inline-block w-2 h-2 rounded-full bg-amber-800" />
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Step 2: Extra Toppings */}
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-800 text-white text-[10px] font-bold">2</span>
                      나만의 추가 토핑 선택 (중복 선택 가능)
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {TOPPINGS_PRESETS.map(topping => {
                        const isSelected = selectedToppings.includes(topping.id);
                        return (
                          <div
                            key={topping.id}
                            onClick={() => handleToppingToggle(topping.id)}
                            className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-amber-100/50 border-amber-500 shadow-sm font-bold'
                                : 'bg-stone-50 border-stone-200/60 hover:bg-stone-100'
                            }`}
                          >
                            <span className="text-xl block mb-1">{topping.icon}</span>
                            <p className="text-xs text-stone-700 line-clamp-1">{topping.name}</p>
                            <p className="text-[10px] text-stone-500 font-semibold mt-0.5">+₩{topping.price.toLocaleString()}</p>
                            {isSelected && (
                              <div className="mt-1 flex justify-center text-amber-800">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Package Box Selection */}
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-800 text-white text-[10px] font-bold">3</span>
                      선물 상자 패키지 디자인
                    </p>
                    <div className="space-y-2">
                      {PACKAGING_PRESETS.map(pack => (
                        <div
                          key={pack.id}
                          onClick={() => setSelectedPackaging(pack.id)}
                          className={`cursor-pointer p-3.5 rounded-xl border flex justify-between items-center transition-all ${
                            selectedPackaging === pack.id
                              ? 'border-amber-800 bg-amber-50/30'
                              : 'border-stone-200/50 hover:bg-stone-50'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-bold text-stone-800">{pack.name}</p>
                            <p className="text-xs text-stone-400 mt-0.5">{pack.desc}</p>
                          </div>
                          <div className="text-right flex items-center gap-3">
                            <span className="text-xs font-bold text-stone-600">
                              {pack.price === 0 ? '무료' : `+₩${pack.price.toLocaleString()}`}
                            </span>
                            <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                              selectedPackaging === pack.id ? 'border-amber-800 bg-amber-800 text-white' : 'border-stone-300'
                            }`}>
                              {selectedPackaging === pack.id && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Gifting Custom Message Card */}
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-800 text-white text-[10px] font-bold">4</span>
                      손편지 메시지 카드 작성 (무료)
                    </p>
                    <textarea
                      rows={2}
                      value={customGiftMessage}
                      onChange={(e) => setCustomGiftMessage(e.target.value)}
                      placeholder="쿠키를 선물 받는 사람에게 전할 감동적인 메시지를 적어주세요. 상자 안에 소중히 동봉됩니다. (예: 생일 축하해! 이 세상 최고의 달콤함을 선물할게)"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-200/60 focus:border-amber-400"
                    />
                  </div>

                  {/* Dynamic Live visual summary */}
                  <div className="bg-stone-50 border border-stone-200 p-4.5 rounded-2xl space-y-2">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">My Custom Cookie Recipe</p>
                    <div className="flex flex-wrap gap-1.5 text-xs text-stone-700 font-medium">
                      <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200/50">Base: {customBase.name}</span>
                      {selectedToppings.map(id => {
                        const top = TOPPINGS_PRESETS.find(t => t.id === id);
                        return top && (
                          <span key={id} className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-100">
                            Topping: {top.icon} {top.name}
                          </span>
                        );
                      })}
                      <span className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full border border-blue-100">
                        Box: {PACKAGING_PRESETS.find(p => p.id === selectedPackaging)?.name}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-stone-50 p-5 border-t border-stone-200 flex items-center justify-between shrink-0">
                <div>
                  <p className="text-xs text-stone-400">나만의 커스텀 쿠키 합계</p>
                  <p className="text-xl font-extrabold text-amber-900">₩{calculateCustomCookiePrice().toLocaleString()}</p>
                </div>
                <button
                  onClick={handleAddCustomCookie}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-bold text-sm shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  커스텀 쿠키 담기
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* --- Catalog Gifting Dialog Modal --- */}
      {giftingProduct && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-stone-100 overflow-hidden flex flex-col">
            
            <div className="bg-amber-50 p-5.5 border-b border-stone-200/60 flex justify-between items-center">
              <div className="flex items-center gap-2 text-amber-900">
                <Gift className="w-5 h-5" />
                <h3 className="font-extrabold text-lg text-stone-800">소중한 분께 선물하기</h3>
              </div>
              <button onClick={() => setGiftingProduct(null)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-left">
              <div className="flex gap-4 items-center bg-stone-50 p-3 rounded-2xl border border-stone-200/40">
                <img
                  src={giftingProduct.image}
                  alt={giftingProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl border border-stone-200/60"
                />
                <div>
                  <h4 className="font-bold text-sm text-stone-800">{giftingProduct.name}</h4>
                  <p className="text-xs text-amber-700 font-extrabold mt-0.5">₩{giftingProduct.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600 block">받는 사람 닉네임 / 이름</label>
                <input
                  type="text"
                  value={giftRecipient}
                  onChange={(e) => setGiftRecipient(e.target.value)}
                  placeholder="예: 홍길동, 사랑하는 엄마"
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600 block">달콤한 축하 카드 메시지</label>
                <textarea
                  rows={3}
                  value={giftCardMessage}
                  onChange={(e) => setGiftCardMessage(e.target.value)}
                  placeholder="선물 상자에 들어갈 편지글을 마음을 다해 적어보세요..."
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                />
              </div>
            </div>

            <div className="bg-stone-50 p-4.5 border-t border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => setGiftingProduct(null)}
                className="px-5 py-2 rounded-full border border-stone-300 text-stone-600 font-bold text-xs"
              >
                취소
              </button>
              <button
                onClick={handleAddGiftToCart}
                className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                <MessageSquareHeart className="w-3.5 h-3.5" />
                선물로 장바구니 담기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
