/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, Order, Review, Notice, SeasonalTheme } from '../types';
import { Settings, Shield, Plus, Edit2, Trash2, ArrowRight, Save, Landmark, MessageSquare, AlertTriangle, CalendarRange, Users, Megaphone } from 'lucide-react';

interface AdminProps {
  products: Product[];
  orders: Order[];
  reviews: Review[];
  notices: Notice[];
  seasonalTheme: SeasonalTheme;
  onUpdateSeasonalTheme: (theme: SeasonalTheme) => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onDeleteReview: (reviewId: string) => void;
  onAddNotice: (notice: Notice) => void;
}

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1619149600417-6e6cdfac2f8a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80'
];

export default function Admin({
  products,
  orders,
  reviews,
  notices,
  seasonalTheme,
  onUpdateSeasonalTheme,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onDeleteReview,
  onAddNotice
}: AdminProps) {
  // Navigation inside Admin
  const [activeSubTab, setActiveSubTab] = useState<'products' | 'orders' | 'reviews' | 'notices' | 'theme'>('products');

  // New Product state
  const [newProdName, setNewProdName] = useState('');
  const [newProdEngName, setNewProdEngName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(4800);
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('classic');
  const [newProdStock, setNewProdStock] = useState(15);
  const [newProdImage, setNewProdImage] = useState(DEFAULT_IMAGES[0]);
  const [newProdDesc, setNewProdDesc] = useState('');

  // Editing Product states
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);

  // New Announcement state
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeType, setNewNoticeType] = useState<'notice' | 'event'>('notice');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  // Order status progression chain helper
  const handleProgressOrderStatus = (orderId: string, currentStatus: Order['status']) => {
    let nextStatus: Order['status'] = '입금대기';
    if (currentStatus === '입금대기') nextStatus = '입금확인';
    else if (currentStatus === '입금확인') nextStatus = '배송준비';
    else if (currentStatus === '배송준비') nextStatus = '배송중';
    else if (currentStatus === '배송중') nextStatus = '배송완료';

    onUpdateOrderStatus(orderId, nextStatus);
  };

  // Submit New Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdDesc) return;

    const newProd: Product = {
      id: `product-${Date.now()}`,
      name: newProdName,
      engName: newProdEngName || 'Custom Dessert',
      price: Number(newProdPrice),
      category: newProdCategory,
      description: newProdDesc,
      rating: 5.0,
      reviewsCount: 0,
      image: newProdImage,
      isBest: false,
      stock: Number(newProdStock),
      toppingsAllowed: newProdCategory === 'classic' || newProdCategory === 'premium'
    };

    onAddProduct(newProd);

    // Reset input states
    setNewProdName('');
    setNewProdEngName('');
    setNewProdPrice(4800);
    setNewProdStock(15);
    setNewProdDesc('');
  };

  // Trigger Edit Save
  const handleSaveProductEdit = (product: Product) => {
    onUpdateProduct({
      ...product,
      price: editPrice,
      stock: editStock
    });
    setEditingProdId(null);
  };

  // Submit New Notice
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;

    const newNotice: Notice = {
      id: `notice-${Date.now()}`,
      title: newNoticeTitle,
      content: newNoticeContent,
      date: new Date().toISOString().split('T')[0],
      type: newNoticeType
    };

    onAddNotice(newNotice);

    setNewNoticeTitle('');
    setNewNoticeContent('');
  };

  return (
    <div className="space-y-8 py-4 text-left animate-fadeIn">
      
      {/* 1. Admin Header */}
      <section className="bg-red-50/50 border border-red-100 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="p-3 bg-red-100 text-red-800 rounded-2xl">
            <Shield className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-stone-800 font-sans">와쿠와쿠 관리자 대시보드 🛠️</h2>
            <p className="text-xs text-stone-500">상품 관리, 실시간 입금 확인, 배송 전송, 후기 모니터링을 실시간 제어합니다.</p>
          </div>
        </div>

        {/* Quick Tabs Selector */}
        <div className="flex flex-wrap gap-1 bg-stone-100 p-1.5 rounded-xl border border-stone-200/40 text-xs font-bold text-stone-600">
          {[
            { id: 'products', label: '상품관리 🍪' },
            { id: 'orders', label: '주문&배송 🚚' },
            { id: 'reviews', label: '리뷰삭제 💬' },
            { id: 'notices', label: '공지작성 📢' },
            { id: 'theme', label: '시즌배너 🌸' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeSubTab === tab.id ? 'bg-white text-stone-800 shadow-sm' : 'hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ----------------- SUBTAB: 1. PRODUCTS MANAGEMENT ----------------- */}
      {activeSubTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Add new product form */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-stone-800 flex items-center gap-1.5 border-b border-stone-200/50 pb-2">
              <Plus className="w-5 h-5 text-amber-800" />
              신규 상품 추가
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">상품 한글 명칭</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="예: 마카다미아 마들렌 쿠키"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">상품 영문 명칭</label>
                <input
                  type="text"
                  required
                  value={newProdEngName}
                  onChange={(e) => setNewProdEngName(e.target.value)}
                  placeholder="Macadamia Madeleine"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600">판매 가격 (원)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-600">초기 재고 (개)</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">카테고리 선택</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white"
                >
                  <option value="classic">클래식 쿠키</option>
                  <option value="premium">프리미엄 쿠키</option>
                  <option value="limited">시즌 한정</option>
                  <option value="drink">카페 드링크</option>
                  <option value="gift">기프트 선물세트</option>
                </select>
              </div>

              {/* Image Presets Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 block">이미지 프리셋 선택</label>
                <div className="grid grid-cols-4 gap-2">
                  {DEFAULT_IMAGES.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Preset option"
                      onClick={() => setNewProdImage(url)}
                      className={`h-11 object-cover rounded-lg cursor-pointer transition-all border ${
                        newProdImage === url ? 'border-amber-800 scale-105 shadow-sm' : 'border-stone-100 opacity-60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600">상품 상세 설명</label>
                <textarea
                  rows={2.5}
                  required
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="쿠키에 들어간 재료 풍미와 바삭 쫀득한 텍스처를 먹음직스럽게 묘사해주세요..."
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                상품 등록하기
              </button>
            </form>
          </div>

          {/* Right panel: Product catalog manager table */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-lg font-bold text-stone-800 border-b border-stone-200/50 pb-2">
              📋 등록 상품 총괄 리스트 ({products.length})
            </h3>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-stone-500 border-collapse">
                  <thead className="bg-stone-50 text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-200/60">
                    <tr>
                      <th className="px-5 py-3">상품 정보</th>
                      <th className="px-5 py-3">카테고리</th>
                      <th className="px-5 py-3">판매가</th>
                      <th className="px-5 py-3">실재고</th>
                      <th className="px-5 py-3 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium">
                    {products.map((product) => {
                      const isEditing = editingProdId === product.id;
                      return (
                        <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt={product.name} className="w-9 h-9 object-cover rounded-lg" />
                              <div>
                                <p className="font-bold text-stone-800 text-xs">{product.name}</p>
                                <p className="text-[10px] text-stone-400 font-mono mt-0.5">{product.engName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 font-semibold uppercase font-mono text-amber-900 text-[10px]">
                            {product.category}
                          </td>
                          <td className="px-5 py-3 text-stone-800">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-20 p-1 border rounded bg-white text-xs font-mono font-bold"
                              />
                            ) : (
                              <span className="font-mono font-bold">₩{product.price.toLocaleString()}</span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editStock}
                                onChange={(e) => setEditStock(Number(e.target.value))}
                                className="w-16 p-1 border rounded bg-white text-xs font-mono font-bold"
                              />
                            ) : (
                              <span className={`font-mono font-bold ${product.stock <= 5 ? 'text-rose-600 animate-pulse' : 'text-stone-700'}`}>
                                {product.stock}개
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex gap-2 justify-end">
                              {isEditing ? (
                                <button
                                  onClick={() => handleSaveProductEdit(product)}
                                  className="p-1 rounded bg-amber-800 text-white hover:bg-amber-950 transition-colors cursor-pointer"
                                  title="저장"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingProdId(product.id);
                                    setEditPrice(product.price);
                                    setEditStock(product.stock);
                                  }}
                                  className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-700 cursor-pointer"
                                  title="수정"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => onDeleteProduct(product.id)}
                                className="p-1 rounded hover:bg-rose-50 text-stone-400 hover:text-rose-600 cursor-pointer"
                                title="삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ----------------- SUBTAB: 2. ORDERS & SHIPPING CONTROL ----------------- */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-stone-800 border-b border-stone-200/50 pb-2 flex items-center gap-1.5">
            <Landmark className="w-5 h-5 text-amber-800" />
            실시간 주문서 및 배송 추적 조율 ({orders.length})
          </h3>

          {orders.length === 0 ? (
            <div className="p-12 text-center bg-stone-50 rounded-2xl border text-stone-400 text-xs">
              접수된 주문서가 아직 비어있습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-stone-200/60 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:border-stone-300 transition-colors"
                >
                  <div className="space-y-2 text-xs flex-1 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-stone-800 uppercase bg-stone-100 px-2 py-0.5 rounded">
                        NO. {order.id}
                      </span>
                      <span className="font-semibold text-stone-400 font-mono">{order.createdAt}</span>
                      
                      {/* Active Status Ribbon */}
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                        order.status === '입금대기' ? 'bg-amber-100 text-amber-900 border-amber-200' :
                        order.status === '입금확인' ? 'bg-blue-100 text-blue-900 border-blue-200' :
                        order.status === '배송준비' ? 'bg-purple-100 text-purple-900 border-purple-200' :
                        order.status === '배송중' ? 'bg-orange-100 text-orange-900 border-orange-200' :
                        'bg-emerald-100 text-emerald-900 border-emerald-200'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-stone-700">
                        📦 상품: <span className="font-bold text-stone-800">
                          {order.items.map(i => i.customCookie ? `커스텀쿠키(${i.quantity}개)` : `${i.product?.name}(${i.quantity}개)`).join(', ')}
                        </span>
                      </p>
                      <p className="text-stone-500">
                        🏦 이체정보: <span className="font-bold text-stone-700">{order.bankName}</span> / 입금자명: <span className="font-bold text-stone-700">{order.depositorName}</span>
                      </p>
                      
                      {/* Gift Message Card Disclosure */}
                      {order.isGift && (
                        <p className="text-rose-700 font-bold bg-rose-50/50 p-2 rounded-lg border border-rose-100 text-[10px]">
                          💝 선물하기 접수 ➔ 수령자: {order.recipientName}님 / 카드: "{order.giftMessage}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="text-right shrink-0 space-y-2.5 w-full md:w-auto">
                    <p className="text-base font-black text-stone-800 font-mono">
                      ₩{order.amount.toLocaleString()}원
                    </p>

                    <div className="flex gap-2 justify-end">
                      {order.status !== '배송완료' ? (
                        <button
                          onClick={() => handleProgressOrderStatus(order.id, order.status)}
                          className="w-full md:w-auto inline-flex items-center gap-1 px-4.5 py-2 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-bold text-[10px] transition-all cursor-pointer"
                        >
                          {order.status === '입금대기' && '💳 입금 확인 (승인)'}
                          {order.status === '입금확인' && '📦 배송 준비 완료'}
                          {order.status === '배송준비' && '🚚 배송 출고 (배송중)'}
                          {order.status === '배송중' && '🏠 배송 완료 처리'}
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <p className="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                          ✓ 배송 완료 종료됨
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ----------------- SUBTAB: 3. REVIEW MODERATION ----------------- */}
      {activeSubTab === 'reviews' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-stone-800 border-b border-stone-200/50 pb-2 flex items-center gap-1.5">
            <MessageSquare className="w-5 h-5 text-amber-800" />
            유해 및 악성 리뷰 블라인드 / 삭제 관리 ({reviews.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-stone-200 p-4 rounded-2xl flex gap-4 text-xs items-start"
              >
                {review.image && (
                  <img src={review.image} alt="Review attachment" className="w-16 h-16 object-cover rounded-xl border" />
                )}
                <div className="flex-1 space-y-1 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-stone-800">@{review.author}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{review.date} / {review.productName}</p>
                    </div>
                    <button
                      onClick={() => onDeleteReview(review.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-stone-100 transition-colors cursor-pointer"
                      title="후기 영구 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-stone-600 font-medium line-clamp-3 leading-relaxed mt-1.5">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SUBTAB: 4. NOTICES & EVENTS BROADCASTER ----------------- */}
      {activeSubTab === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Create announcement Form */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200/50 rounded-2xl p-6 space-y-4 text-left">
            <h3 className="text-lg font-bold text-stone-800 flex items-center gap-1.5 border-b pb-2">
              <Megaphone className="w-5 h-5 text-amber-800" />
              신규 공지 / 이벤트 등록
            </h3>

            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600 block">공지 제목</label>
                <input
                  type="text"
                  required
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  placeholder="예: [안내] 크리스마스 시즌 임시 휴무 안내"
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600 block">유형</label>
                <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-600 text-center">
                  <div
                    onClick={() => setNewNoticeType('notice')}
                    className={`py-1.5 rounded-lg cursor-pointer transition-all ${newNoticeType === 'notice' ? 'bg-white text-stone-800 shadow-sm' : ''}`}
                  >
                    일반 공지
                  </div>
                  <div
                    onClick={() => setNewNoticeType('event')}
                    className={`py-1.5 rounded-lg cursor-pointer transition-all ${newNoticeType === 'event' ? 'bg-white text-stone-800 shadow-sm' : ''}`}
                  >
                    프로모션 이벤트
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600 block">공지 본문 내용</label>
                <textarea
                  rows={4}
                  required
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  placeholder="회원들이 읽게 될 세부 알림 내용을 자세하게 기술해주세요..."
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                공지사항 송출하기
              </button>
            </form>
          </div>

          {/* Existing bulletins */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-lg font-bold text-stone-800 border-b pb-2">
              📢 활성 공지사항 피드 ({notices.length})
            </h3>

            <div className="space-y-3.5">
              {notices.map((notice) => (
                <div key={notice.id} className="p-4 bg-white border border-stone-200/50 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      notice.type === 'event' ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {notice.type === 'event' ? '이벤트' : '공지'}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">{notice.date}</span>
                  </div>
                  <h4 className="font-extrabold text-stone-800 text-sm text-left">{notice.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed text-left line-clamp-2">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ----------------- SUBTAB: 5. SEASON THEME TOGGLER ----------------- */}
      {activeSubTab === 'theme' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 space-y-6 text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-stone-800 flex items-center gap-1.5">
              <CalendarRange className="w-5 h-5 text-amber-800" />
              시즌 전용 배너 & 컬러 테마 교체기
            </h3>
            <p className="text-xs text-stone-500">
              클릭 한 번으로 메인 배너 이미지 문구와 감성 무드 악센트를 계절에 따라 실시간 스위칭합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'SPRING', label: '🌸 화사한 봄 (SPRING)', desc: '벚꽃 가나슈 & 딸기 크럼블', color: 'border-rose-200 bg-rose-50/40 text-rose-900' },
              { id: 'SUMMER', label: '🌻 싱그러운 여름 (SUMMER)', desc: '아이스 원두 & 제주 녹차', color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900' },
              { id: 'AUTUMN', label: '🍂 그윽한 가을 (AUTUMN)', desc: '프랑스 버터 & 시나몬 피칸', color: 'border-amber-200 bg-amber-50/40 text-amber-900' },
              { id: 'WINTER', label: '🎄 로맨틱 겨울 (WINTER)', desc: '크리스마스 트리 & 브라우니', color: 'border-blue-200 bg-blue-50/40 text-sky-900' }
            ].map((season) => {
              const isActive = seasonalTheme === season.id;
              return (
                <div
                  key={season.id}
                  onClick={() => onUpdateSeasonalTheme(season.id as any)}
                  className={`cursor-pointer border-2 p-5.5 rounded-2xl text-center space-y-2 transition-all hover:scale-102 ${
                    isActive 
                      ? `${season.color} ring-4 ring-amber-100 shadow-sm font-bold`
                      : 'bg-stone-50/50 border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <p className="text-sm font-extrabold">{season.label}</p>
                  <p className="text-[10px] opacity-85">{season.desc}</p>
                  {isActive && (
                    <span className="inline-block mt-2 bg-stone-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      ACTIVE
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-amber-50 rounded-2xl text-xs text-amber-900 border border-amber-200/60 leading-relaxed flex gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <p>
              <strong>배너 동기화 알림:</strong> 여기서 테마를 교체하면 메인 홈화면의 <strong>SEASON EXCLUSIVE</strong> 배너의 레이아웃 분위기와 설명 텍스트가 실시간으로 완벽하게 연동되어 변경됩니다.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
