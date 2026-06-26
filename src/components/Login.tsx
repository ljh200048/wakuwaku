/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile, Order, Product } from '../types';
import { User, LogIn, Key, Sparkles, Receipt, Heart, Ticket, Eye, ShieldAlert, BadgeCheck, CheckCircle, Package } from 'lucide-react';

interface LoginProps {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  orders: Order[];
  products: Product[];
  onLogin: (email: string, nickname: string) => void;
  onLogout: () => void;
  onNavigate: (tab: any) => void;
  onToggleFavorite: (productId: string) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80'
];

export default function Login({
  isLoggedIn,
  userProfile,
  orders,
  products,
  onLogin,
  onLogout,
  onNavigate,
  onToggleFavorite
}: LoginProps) {
  // Authentication screen states
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0]);
  const [resetSent, setResetSent] = useState(false);

  // Form handlers
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    if (authMode === 'login') {
      const isTestAdmin = emailInput.trim().toLowerCase() === 'admin@wakuwaku.com';
      const nickname = isTestAdmin ? '최고관리자' : '달콤한와쿠';
      onLogin(emailInput, nickname);
    } else if (authMode === 'signup') {
      onLogin(emailInput, nicknameInput || '따뜻한신규회원');
    } else {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setAuthMode('login');
      }, 3000);
    }
  };

  // Quick Administrator Bypass trigger
  const triggerAdminLogin = () => {
    onLogin('admin@wakuwaku.com', '최고관리자');
  };

  // Quick Standard User Bypass trigger
  const triggerStandardLogin = () => {
    onLogin('user@wakuwaku.com', '쿠키바라기');
  };

  // Get status color coding
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case '입금대기':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case '입금확인':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case '배송준비':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case '배송중':
        return 'bg-orange-100 text-orange-900 border-orange-200 animate-pulse';
      case '배송완료':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
    }
  };

  return (
    <div className="py-4 text-left max-w-4xl mx-auto animate-fadeIn">
      
      {/* ----------------- LOGGED IN: MY PAGE USER DASHBOARD ----------------- */}
      {isLoggedIn && userProfile ? (
        <div className="space-y-8">
          
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-50/30 p-6 rounded-3xl border border-amber-100/50">
            <div className="flex items-center gap-4">
              <img
                src={userProfile.profileImage}
                alt={userProfile.nickname}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-800 shadow-sm"
              />
              <div className="space-y-1">
                <p className="text-xs text-stone-400 font-mono font-bold uppercase">{userProfile.email}</p>
                <h2 className="text-2xl font-extrabold text-stone-800">
                  {userProfile.nickname} <span className="text-stone-500 font-normal">님의 마이룸</span>
                </h2>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold bg-amber-800 text-amber-50 px-2.5 py-0.5 rounded-full">
                    🎖️ 골드 멤버십
                  </span>
                  {userProfile.email === 'admin@wakuwaku.com' && (
                    <span className="text-[10px] font-bold bg-red-800 text-red-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      👑 최고관리자 모드 활성
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {userProfile.email === 'admin@wakuwaku.com' && (
                <button
                  onClick={() => onNavigate('ADMIN')}
                  className="px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  🛠️ 관리자 대시보드
                </button>
              )}
              <button
                onClick={onLogout}
                className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-600 font-bold text-xs bg-white hover:bg-stone-50 transition-all cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          </div>

          {/* Core Wallet Stat Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Stat: Points */}
            <div className="bg-stone-50 border border-stone-200/50 p-6 rounded-2xl flex justify-between items-center text-left">
              <div className="space-y-1">
                <p className="text-xs text-stone-400 font-bold font-mono">MY WALLET POINTS</p>
                <p className="text-3xl font-extrabold text-stone-800">{userProfile.points.toLocaleString()}P</p>
                <p className="text-[10px] text-stone-500">포토후기 작성 시 500P 추가 즉시 자동 적립</p>
              </div>
              <span className="text-4xl bg-white p-3.5 rounded-xl border border-stone-100 shadow-sm">💰</span>
            </div>

            {/* Stat: Coupons */}
            <div className="bg-stone-50 border border-stone-200/50 p-6 rounded-2xl flex justify-between items-center text-left">
              <div className="space-y-1">
                <p className="text-xs text-stone-400 font-bold font-mono">MY AVAILABLE COUPONS</p>
                <p className="text-3xl font-extrabold text-stone-800">
                  {userProfile.coupons.filter(c => !c.isUsed).length}장
                </p>
                <p className="text-[10px] text-stone-500">주문서 결제 시 할인 혜택을 다이렉트로 적용</p>
              </div>
              <span className="text-4xl bg-white p-3.5 rounded-xl border border-stone-100 shadow-sm">🎫</span>
            </div>

          </div>

          {/* Section: Coupons Wallet List */}
          <section className="space-y-3.5">
            <h3 className="text-lg font-bold text-stone-800 flex items-center gap-1.5">
              <Ticket className="w-5 h-5 text-amber-800" />
              나의 사용 가능 쿠폰함
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userProfile.coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className={`border p-4.5 rounded-2xl relative overflow-hidden flex items-center justify-between transition-colors ${
                    coupon.isUsed
                      ? 'bg-stone-100/60 border-stone-200/60 opacity-60'
                      : 'bg-white border-amber-200/80 shadow-sm'
                  }`}
                >
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-stone-800 text-sm">{coupon.name}</span>
                      {coupon.isUsed && (
                        <span className="text-[9px] font-bold bg-stone-200 text-stone-500 px-1.5 py-0.5 rounded">
                          사용완료
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400">{coupon.description}</p>
                    <p className="text-[10px] font-mono text-amber-800 font-bold">CODE: {coupon.code}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-amber-900 font-mono">
                      {coupon.discountType === 'percent' ? `${coupon.discountValue}%` : `-${coupon.discountValue.toLocaleString()}원`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Favorites list */}
          <section className="space-y-3.5">
            <h3 className="text-lg font-bold text-stone-800 flex items-center gap-1.5">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              찜한 달콤 쿠키 목록 ({userProfile.favorites.length})
            </h3>
            {userProfile.favorites.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200/40 text-stone-400 text-xs">
                하트로 찜해둔 쿠키가 없습니다. 메뉴판에서 마음에 드는 디저트를 저장해보세요!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {products
                  .filter(p => userProfile.favorites.includes(p.id))
                  .map(favProduct => (
                    <div
                      key={favProduct.id}
                      className="bg-white rounded-2xl border border-stone-200/50 p-3.5 space-y-3 flex flex-col justify-between hover:shadow-sm"
                    >
                      <div className="space-y-2">
                        <img
                          src={favProduct.image}
                          alt={favProduct.name}
                          referrerPolicy="no-referrer"
                          className="w-full aspect-square object-cover rounded-xl"
                        />
                        <p className="font-bold text-xs text-stone-800 truncate">{favProduct.name}</p>
                        <p className="text-stone-400 text-[10px] font-mono uppercase">{favProduct.engName}</p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                        <span className="text-xs font-extrabold text-stone-700">₩{favProduct.price.toLocaleString()}</span>
                        <button
                          onClick={() => onToggleFavorite(favProduct.id)}
                          className="p-1 rounded-full text-rose-500 hover:text-stone-400 bg-rose-50 hover:bg-stone-50 transition-colors"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>

          {/* Section: Orders with live process timelines */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-stone-800 flex items-center gap-1.5">
              <Receipt className="w-5 h-5 text-amber-800" />
              나의 주문 및 실시간 배송 내역 ({orders.length})
            </h3>

            {orders.length === 0 ? (
              <div className="p-12 text-center bg-stone-50 rounded-2xl border border-stone-200/40 text-stone-400 text-xs">
                📦 주문 내역이 아직 존재하지 않습니다. 장바구니에 담아 첫 주문을 진행해보세요!
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-stone-200/60 rounded-2xl p-5 space-y-4 text-left shadow-sm"
                  >
                    {/* Top Row info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <p className="text-[10px] text-stone-400 font-mono font-bold uppercase">ORDER NO. {order.id}</p>
                        <p className="text-xs text-stone-500 font-semibold mt-0.5">{order.createdAt} 결제 접수</p>
                      </div>
                      
                      {/* Active Status Badge */}
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Order Items list */}
                    <div className="space-y-2.5">
                      {order.items.map((lineItem, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-3">
                            <span className="text-base">
                              {lineItem.customCookie ? '👩‍🍳' : lineItem.product?.category === 'drink' ? '☕' : '🍪'}
                            </span>
                            <div>
                              <p className="font-bold text-stone-800">
                                {lineItem.customCookie 
                                  ? `[커스텀 쿠키] 베이스: ${lineItem.customCookie.baseName}`
                                  : lineItem.product?.name}
                              </p>
                              {lineItem.customCookie && (
                                <p className="text-[10px] text-stone-400 mt-0.5">
                                  추가: {lineItem.customCookie.toppings.join(', ')} / 상자: {lineItem.customCookie.packaging}
                                </p>
                              )}
                              
                              {/* Gift notes if any */}
                              {lineItem.isGift && (
                                <div className="mt-1 bg-amber-50/50 border border-amber-100 p-1.5 rounded-lg text-[10px] text-amber-900 max-w-sm">
                                  💝 받는 사람: {lineItem.recipientName}님<br />
                                  💌 메시지: "{lineItem.giftMessage}"
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="font-mono text-stone-500 font-bold">{lineItem.quantity}개</span>
                        </div>
                      ))}
                    </div>

                    {/* Timeline Tracker */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/40">
                      <p className="text-[10px] text-stone-400 font-mono font-bold tracking-widest uppercase mb-3">SHIPPING TRACKER STAGE</p>
                      <div className="grid grid-cols-5 text-center items-center gap-1.5 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-2.5 left-6 right-6 h-0.5 bg-stone-200 -z-0" />
                        
                        {[
                          { status: '입금대기', label: '입금대기', icon: '🏦' },
                          { status: '입금확인', label: '입금확인', icon: '💳' },
                          { status: '배송준비', label: '배송준비', icon: '📦' },
                          { status: '배송중', label: '배송중', icon: '🚚' },
                          { status: '배송완료', label: '배송완료', icon: '🏠' }
                        ].map((node, nodeIdx) => {
                          const statusOrder = ['입금대기', '입금확인', '배송준비', '배송중', '배송완료'];
                          const currentActiveIdx = statusOrder.indexOf(order.status);
                          const thisNodeIdx = statusOrder.indexOf(node.status as any);
                          const isCompleted = thisNodeIdx <= currentActiveIdx;
                          const isActive = node.status === order.status;

                          return (
                            <div key={nodeIdx} className="flex flex-col items-center z-10">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm transition-all ${
                                isActive 
                                  ? 'bg-amber-800 text-white scale-110 font-bold ring-4 ring-amber-100'
                                  : isCompleted 
                                    ? 'bg-stone-700 text-white' 
                                    : 'bg-white text-stone-300 border border-stone-200'
                              }`}>
                                {isCompleted ? '✓' : ''}
                              </div>
                              <p className={`text-[9px] mt-1.5 font-bold truncate ${
                                isActive ? 'text-amber-800 font-extrabold' : isCompleted ? 'text-stone-700' : 'text-stone-300'
                              }`}>
                                {node.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom bank transfer reminder */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-2">
                      <p className="text-stone-500">
                        입금 정보: <span className="font-bold text-stone-700">{order.bankName} (예금주: 와쿠와쿠)</span> / 입금자명: <span className="font-bold text-stone-700">{order.depositorName}</span>
                      </p>
                      <p className="text-sm font-extrabold text-stone-800 mt-1 sm:mt-0">
                        총 입금액: ₩{order.amount.toLocaleString()}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      ) : (
        /* ----------------- ANONYMOUS: SIGN IN / SIGN UP SCREEN ----------------- */
        <div className="max-w-md mx-auto bg-white border border-stone-200/60 rounded-3xl overflow-hidden shadow-md">
          
          {/* Top graphics header banner */}
          <div className="bg-gradient-to-br from-amber-800 to-amber-700 p-8 text-center text-white relative">
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-white/10 rounded-full blur-xl" />
            <span className="text-4xl mb-2.5 block animate-bounce">🍪</span>
            <h2 className="text-2xl font-extrabold font-sans">와쿠와쿠에 어서오세요</h2>
            <p className="text-xs text-amber-200/80 mt-1">로그인하시면 회원 전용 혜택을 함께 누리실 수 있습니다.</p>
          </div>

          <div className="p-7 space-y-6">
            
            {/* Tab Swappers */}
            <div className="grid grid-cols-2 bg-stone-100 p-1 rounded-xl text-center text-xs font-bold text-stone-600">
              <button
                onClick={() => { setAuthMode('login'); setResetSent(false); }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${authMode === 'login' ? 'bg-white text-stone-800 shadow-sm' : ''}`}
              >
                이메일 로그인
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setResetSent(false); }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${authMode === 'signup' ? 'bg-white text-stone-800 shadow-sm' : ''}`}
              >
                신규 회원가입
              </button>
            </div>

            {/* Simulated Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {/* Field: Nickname (Signup only) */}
              {authMode === 'signup' && (
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-stone-600">이름 및 닉네임</label>
                  <input
                    type="text"
                    required
                    value={nicknameInput}
                    onChange={(e) => setNicknameInput(e.target.value)}
                    placeholder="예: 홍길동, 초코홀릭"
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                  />
                </div>
              )}

              {/* Field: Profile Avatar (Signup only) */}
              {authMode === 'signup' && (
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-stone-600 block">프로필 이미지 프리셋 선택</label>
                  <div className="flex gap-2.5">
                    {AVATAR_PRESETS.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="Profile avatar"
                        onClick={() => setSelectedAvatar(url)}
                        className={`w-11 h-11 rounded-full object-cover border-2 cursor-pointer transition-all ${
                          selectedAvatar === url ? 'border-amber-800 scale-105 shadow-sm' : 'border-stone-100 opacity-60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Field: Email */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-stone-600">이메일 주소</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@wakuwaku.com"
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                />
              </div>

              {/* Field: Password */}
              {authMode !== 'forgot' && (
                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-stone-600">비밀번호</label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[10px] text-stone-400 hover:text-stone-600"
                      >
                        비밀번호 찾기
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                  />
                </div>
              )}

              {/* Forgot password success badge */}
              {authMode === 'forgot' && resetSent && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center">
                  📨 임시 패스워드 이메일이 발송되었습니다!
                </div>
              )}

              {/* Submit Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                {authMode === 'login' && '로그인 하기'}
                {authMode === 'signup' && '신규 회원 가입하기'}
                {authMode === 'forgot' && '임시 비밀번호 발송'}
              </button>
            </form>

            {/* Back swap for Forgot password */}
            {authMode === 'forgot' && (
              <button
                onClick={() => { setAuthMode('login'); setResetSent(false); }}
                className="text-xs text-stone-500 hover:underline block text-center w-full"
              >
                이메일 로그인으로 돌아가기
              </button>
            )}

            {/* Direct Admin Bypass options for testing */}
            <div className="pt-4 border-t border-stone-100 text-center space-y-2">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">👩‍💻 Quick Test Shortcuts</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={triggerAdminLogin}
                  className="px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 text-[10px] font-bold transition-colors cursor-pointer"
                >
                  👑 관리자 로그인 (admin@wakuwaku.com)
                </button>
                <button
                  onClick={triggerStandardLogin}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-bold transition-colors cursor-pointer"
                >
                  🍪 일반 회원 로그인
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
