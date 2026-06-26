/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem, Coupon, Order, UserProfile } from '../types';
import { Trash2, Plus, Minus, ShoppingBag, Gift, Ticket, Landmark, BadgeAlert, CheckCircle, ArrowRight } from 'lucide-react';

interface CartProps {
  cartItems: CartItem[];
  userProfile: UserProfile | null;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: (order: Order) => void;
  isLoggedIn: boolean;
  onNavigate: (tab: any) => void;
}

const BANK_PRESETS = [
  { bankName: '국민은행', account: '123-456-789012', holder: '와쿠와쿠' },
  { bankName: '신한은행', account: '110-222-333333', holder: '와쿠와쿠' },
  { bankName: '농협은행', account: '302-444-555555', holder: '와쿠와쿠' },
  { bankName: '카카오뱅크', account: '3333-55-777777', holder: '와쿠와쿠' },
];

export default function Cart({
  cartItems,
  userProfile,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  isLoggedIn,
  onNavigate
}: CartProps) {
  // Checkout Bank selection
  const [selectedBank, setSelectedBank] = useState(BANK_PRESETS[0]);
  const [depositorName, setDepositorName] = useState(userProfile?.nickname || '홍길동');
  const [appliedCouponId, setAppliedCouponId] = useState<string>('');

  // Post Checkout state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Calculates financial stats
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.customCookie ? item.customCookie.price : (item.product?.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };

  const getAppliedDiscount = () => {
    if (!appliedCouponId || !userProfile) return 0;
    const coupon = userProfile.coupons.find(c => c.id === appliedCouponId);
    if (!coupon) return 0;

    const subtotal = calculateSubtotal();
    if (subtotal < coupon.minOrderAmount) return 0;

    if (coupon.discountType === 'percent') {
      return Math.floor(subtotal * (coupon.discountValue / 100));
    } else {
      return coupon.discountValue;
    }
  };

  const subtotal = calculateSubtotal();
  const discount = getAppliedDiscount();
  const shippingFee = subtotal === 0 ? 0 : subtotal >= 30000 ? 0 : 3000;
  const finalTotal = subtotal - discount + shippingFee;

  // Checkout submit handler
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: `WAKU-${Math.floor(100000 + Math.random() * 900000)}`,
      depositorName: depositorName || '홍길동',
      bankName: selectedBank.bankName,
      amount: finalTotal,
      items: [...cartItems],
      status: '입금대기',
      createdAt: new Date().toISOString().split('T')[0],
      isGift: cartItems.some(i => i.isGift),
      recipientName: cartItems.find(i => i.isGift)?.recipientName,
      giftMessage: cartItems.find(i => i.isGift)?.giftMessage
    };

    onCheckout(newOrder);
    setCompletedOrder(newOrder);
    onClearCart();
  };

  return (
    <div className="py-4 text-left max-w-4xl mx-auto animate-fadeIn">
      
      {/* ----------------- SUB-VIEW: CHECKOUT COMPLETED PAGE ----------------- */}
      {completedOrder ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-6 shadow-md">
          <span className="text-5xl block animate-bounce">🎉</span>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-stone-800 font-sans">와쿠와쿠 주문 접수 완료!</h2>
            <p className="text-xs text-stone-500">정성 가득한 쿠키를 굽기 위한 준비를 시작합니다.</p>
          </div>

          {/* Transfer Info card */}
          <div className="bg-amber-50/50 border border-amber-200/50 p-6 rounded-2xl text-left space-y-3">
            <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <Landmark className="w-4 h-4 text-amber-800" />
              무통장 입금 안내 (24시간 이내 입금)
            </p>
            
            <div className="space-y-1.5 text-xs text-stone-700">
              <p>🏦 입금 은행: <span className="font-extrabold text-stone-800">{completedOrder.bankName}</span></p>
              <p>💳 입금 계좌: <span className="font-extrabold text-stone-800 font-mono">
                {BANK_PRESETS.find(b => b.bankName === completedOrder.bankName)?.account}
              </span></p>
              <p>👤 예금주: <span className="font-bold text-stone-800">와쿠와쿠</span></p>
              <p>👤 입금자명: <span className="font-extrabold text-stone-800">{completedOrder.depositorName}</span></p>
              <p className="pt-2 border-t border-amber-200/45 text-sm font-black text-stone-800 flex justify-between items-center">
                <span>실제 입금 금액:</span>
                <span className="text-amber-900 text-base">₩{completedOrder.amount.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="text-xs text-stone-400 leading-relaxed text-left p-3 border border-stone-100 rounded-xl bg-stone-50/40">
            🔔 <strong>안내 사항:</strong> 입금 확인 후 파티시에가 당일 즉시 구워 가장 맛있는 상태로 안전 패킹해 발송해 드립니다. 
            주문 현황은 상단 <strong>👤 LOGIN / MY PAGE</strong>에서 실시간 배송 조회가 가능합니다!
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setCompletedOrder(null);
                onNavigate('LOGIN');
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              마이페이지에서 배송상태 확인하기
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ----------------- CORE: ACTIVE SHOPPING CART LISTING ----------------- */
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="font-mono text-xs tracking-widest text-amber-700 uppercase font-bold">YOUR FRESH BASKET</p>
            <h2 className="text-3xl font-extrabold text-stone-800 font-sans">내 장바구니 🛒</h2>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-200/50 space-y-4">
              <p className="text-4xl text-stone-300">🛒</p>
              <p className="text-stone-600 font-bold text-sm">장바구니가 텅 비어있습니다.</p>
              <p className="text-xs text-stone-400 mt-1">와쿠와쿠만의 온기 있는 수제 쿠키들을 담아보세요.</p>
              <div className="pt-3">
                <button
                  onClick={() => onNavigate('COOKIE')}
                  className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs"
                >
                  쿠키 메뉴판 구경하러 가기
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: Cart Items List */}
              <div className="lg:col-span-7 space-y-4">
                {cartItems.map((item) => {
                  const isCustom = !!item.customCookie;
                  const itemTitle = isCustom ? `👩‍🍳 수제 커스텀 쿠키` : (item.product?.name || '');
                  const itemSubtitle = isCustom ? `베이스: ${item.customCookie?.baseName}` : (item.product?.engName || '');
                  const itemImage = isCustom 
                    ? 'https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=150&q=80'
                    : (item.product?.image || '');
                  const itemPrice = isCustom ? (item.customCookie?.price || 0) : (item.product?.price || 0);

                  return (
                    <div
                      key={item.id}
                      className="p-4 bg-white border border-stone-200/60 rounded-2xl flex gap-4 text-left relative items-center hover:border-stone-300 transition-colors"
                    >
                      <img
                        src={itemImage}
                        alt={itemTitle}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl border border-stone-100 shrink-0"
                      />

                      <div className="flex-1 space-y-1 pr-6 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-stone-800">{itemTitle}</h4>
                          {item.isGift && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                              <Gift className="w-2.5 h-2.5" />
                              선물
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-400 font-mono uppercase">{itemSubtitle}</p>
                        
                        {/* Custom Cookie Recipe disclosure */}
                        {isCustom && item.customCookie && (
                          <div className="text-[10px] text-stone-500 font-medium bg-stone-50 p-1.5 rounded-lg space-y-0.5 border border-stone-100">
                            <p>🧬 토핑: {item.customCookie.toppings.join(', ')}</p>
                            <p>📦 패키징: {item.customCookie.packaging}</p>
                          </div>
                        )}

                        {/* Gift notes disclosure */}
                        {item.isGift && (
                          <div className="text-[9px] text-amber-900 font-bold bg-amber-50/50 p-1.5 rounded-lg border border-amber-100">
                            🎁 받는 사람: {item.recipientName}님<br />
                            💌 메시지: "{item.giftMessage}"
                          </div>
                        )}

                        <p className="text-xs font-extrabold text-stone-800 pt-1">
                          ₩{itemPrice.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity & Delete Modifiers */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {/* Remove item button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="absolute top-4 right-4 text-stone-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2.5 border border-stone-200 rounded-full p-1 bg-stone-50 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 rounded-full bg-white hover:bg-stone-100 text-stone-600 transition-colors shadow-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-stone-700 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 rounded-full bg-white hover:bg-stone-100 text-stone-600 transition-colors shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Right Side: Order Summary & Checkout Checkout */}
              <div className="lg:col-span-5 bg-stone-50 border border-stone-200/50 rounded-3xl p-6 space-y-6">
                
                {/* 1. Wallet coupon apply panel */}
                {isLoggedIn && userProfile ? (
                  <div className="space-y-2 text-left">
                    <p className="text-xs font-bold text-stone-600 flex items-center gap-1">
                      <Ticket className="w-4 h-4 text-amber-800" />
                      사용 가능한 쿠폰 선택
                    </p>
                    <select
                      value={appliedCouponId}
                      onChange={(e) => setAppliedCouponId(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                    >
                      <option value="">적용 안 함 (쿠폰 선택하기)</option>
                      {userProfile.coupons
                        .filter(c => !c.isUsed)
                        .map(c => {
                          const disabled = subtotal < c.minOrderAmount;
                          return (
                            <option key={c.id} value={c.id} disabled={disabled}>
                              {c.name} {disabled ? `(최소주문 ₩${c.minOrderAmount.toLocaleString()}원 필요)` : ''}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                ) : (
                  <div className="bg-amber-50/40 p-3.5 border border-amber-100 rounded-xl text-[10px] text-amber-900 font-bold leading-relaxed">
                    💡 로그인 하시면 신규회원 10% 쿠폰 및 버스데이 쿠폰 등 푸짐한 할인 혜택을 다이렉트로 결제 시 적용할 수 있습니다.
                  </div>
                )}

                {/* 2. Order summary billing rows */}
                <div className="border-t border-b border-stone-200/60 py-4 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>총 쿠키/음료 합계</span>
                    <span className="font-mono font-bold text-stone-700">₩{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>쿠폰 할인 적용</span>
                      <span className="font-mono">-₩{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-500">
                    <span>우체국 신선 배송비</span>
                    <span className="font-mono font-bold text-stone-700">
                      {shippingFee === 0 ? '무료배송' : `₩${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  {subtotal > 0 && subtotal < 30000 && (
                    <p className="text-[10px] text-stone-400 text-right mt-1">
                      (₩{(30000 - subtotal).toLocaleString()}원 추가 주문 시 <strong>무료배송</strong>!)
                    </p>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-stone-800 border-t border-stone-200/40 pt-3 mt-3">
                    <span>최종 입금 합계</span>
                    <span className="font-mono text-amber-900 text-lg">₩{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* 3. Bank Transfer Selector Form */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="space-y-2 text-left">
                    <p className="text-xs font-bold text-stone-600 flex items-center gap-1">
                      <Landmark className="w-4 h-4 text-amber-800" />
                      입금 은행 선택
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {BANK_PRESETS.map((preset, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedBank(preset)}
                          className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                            selectedBank.bankName === preset.bankName
                              ? 'border-amber-800 bg-amber-50/40 text-amber-900 font-bold'
                              : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-600'
                          }`}
                        >
                          <p className="text-xs">{preset.bankName}</p>
                          <p className="text-[9px] text-stone-400 font-mono mt-0.5">{preset.account}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-stone-600 block">실제 입금자명 입력</label>
                    <input
                      type="text"
                      required
                      value={depositorName}
                      onChange={(e) => setDepositorName(e.target.value)}
                      placeholder="입금증 성함을 정확하게 적어주세요."
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                    />
                    <p className="text-[9px] text-stone-400">
                      * 입력하신 성함과 은행 이체증 상의 이름이 일치해야 관리자가 신속하게 입금을 승인해 드립니다.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-stone-800 hover:bg-stone-950 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    무통장 입금 주문 완료하기
                  </button>
                </form>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
