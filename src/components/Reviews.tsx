/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Review, Product } from '../types';
import { Star, Heart, Camera, Check, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
  products: Product[];
  onAddReview: (review: Review) => void;
  onLikeReview: (reviewId: string) => void;
  isLoggedIn: boolean;
  currentUserNickname: string;
}

const REVIEW_PHOTO_PRESETS = [
  { id: 'photo-1', url: 'https://images.unsplash.com/photo-1548980308-9557fc95457c?auto=format&fit=crop&w=500&q=80', label: '수제 초코칩' },
  { id: 'photo-2', url: 'https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=500&q=80', label: '버터 쿠키' },
  { id: 'photo-3', url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80', label: '말차 스모어' },
  { id: 'photo-4', url: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=500&q=80', label: '시그니처 크림' }
];

export default function Reviews({
  reviews,
  products,
  onAddReview,
  onLikeReview,
  isLoggedIn,
  currentUserNickname
}: ReviewsProps) {
  // Star rating state
  const [rating, setRating] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || '오리지널 초코칩 쿠키');
  const [reviewText, setReviewText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);

  // Submit Review Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview: Review = {
      id: `review-${Date.now()}`,
      author: currentUserNickname || '달콤한 고객님',
      authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      rating,
      text: reviewText,
      image: selectedPhoto || undefined,
      likes: 0,
      isLikedByMe: false,
      date: new Date().toISOString().split('T')[0],
      productName: selectedProduct
    };

    onAddReview(newReview);
    
    // Clear states and show success toast
    setReviewText('');
    setSelectedPhoto(null);
    setRating(5);
    setIsSuccessMsg(true);
    setTimeout(() => setIsSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-12 py-4 text-left animate-fadeIn">
      
      {/* 1. Review Stat Dashboard */}
      <section className="bg-amber-50/40 border border-amber-100 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left items-center">
        <div className="space-y-1">
          <p className="font-mono text-xs tracking-widest text-amber-700 uppercase font-bold">WAKU WAKU SATISFACTION</p>
          <h2 className="text-3xl font-extrabold text-stone-800 font-sans">고객들의 리얼 후기</h2>
          <p className="text-xs text-stone-500">와쿠와쿠에 도착한 감동의 온도를 실시간으로 투명하게 공유합니다.</p>
        </div>
        
        {/* Rating score card */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-stone-200/40 shadow-sm">
          <span className="text-4xl font-extrabold text-stone-800 font-mono">4.9 / 5.0</span>
          <div className="flex text-amber-500 my-1">
            <Star className="w-4.5 h-4.5 fill-current" />
            <Star className="w-4.5 h-4.5 fill-current" />
            <Star className="w-4.5 h-4.5 fill-current" />
            <Star className="w-4.5 h-4.5 fill-current" />
            <Star className="w-4.5 h-4.5 fill-current" />
          </div>
          <span className="text-xs text-stone-400">전체 구매 고객 만족도 98.7%</span>
        </div>

        {/* Count card */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-stone-200/40 shadow-sm">
          <span className="text-4xl font-extrabold text-stone-800 font-mono">{reviews.length}개</span>
          <span className="text-sm font-semibold text-amber-800 flex items-center gap-1 my-1">
            <MessageSquare className="w-4 h-4" />
            누적 포토 및 텍스트 리뷰
          </span>
          <span className="text-[10px] text-stone-400">매주 베스트 리뷰어 포인트 지급중</span>
        </div>
      </section>

      {/* 2. Review Submission Form (Only if logged in) */}
      <section className="bg-stone-50/50 border border-stone-200/50 rounded-3xl p-6.5 md:p-8">
        <div className="space-y-1 mb-5">
          <h3 className="text-xl font-extrabold text-stone-800 flex items-center gap-1.5">
            <span className="text-xl">✏️</span>
            솔직하고 달콤한 후기 작성하기
          </h3>
          <p className="text-xs text-stone-500">
            {isLoggedIn 
              ? `반가워요, ${currentUserNickname}님! 드셨던 쿠키의 솔직한 온도를 동료 회원들과 함께 나눠주세요.`
              : '리뷰는 로그인한 회원만 정직하게 작성할 수 있습니다. 상단 로그인 탭에서 로그인 후 작성해 주세요!'}
          </p>
        </div>

        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row: Product Choice and Star Rating select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">리뷰 작성할 쿠키/음료 선택</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 font-medium"
                >
                  <option value="쿠키 커스터마이징">🍪 내 맘대로 쿠키 커스터마이징</option>
                  {products.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.category === 'drink' ? '☕' : '🍪'} {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600 block">달콤함 별점 부여</label>
                <div className="flex items-center gap-2 h-11 bg-white border border-stone-200 rounded-xl px-4">
                  <div className="flex text-amber-500 gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-600 font-mono ml-2">
                    {rating === 5 && '최고예요! 🌟'}
                    {rating === 4 && '맛있어요! 👍'}
                    {rating === 3 && '만족해요! 🙂'}
                    {rating === 2 && '보통이에요 😐'}
                    {rating === 1 && '아쉬워요 😢'}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Selection Preset */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-stone-600 block flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-stone-500" />
                후기 사진 첨부 (시뮬레이터 프리셋 중 선택)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {REVIEW_PHOTO_PRESETS.map(photo => {
                  const isSelected = selectedPhoto === photo.url;
                  return (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(isSelected ? null : photo.url)}
                      className={`relative overflow-hidden aspect-video rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected ? 'border-amber-800 scale-98 shadow-sm' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-stone-900/60 p-1 text-[10px] text-white text-center font-bold">
                        {photo.label}
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-amber-800 text-white rounded-full p-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review text input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600">리뷰 상세 내용</label>
              <textarea
                rows={3.5}
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="쿠키의 겉바속촉 질감이나 포장 퀄리티, 혹은 커피 맛에 대해 느꼈던 생생한 온도를 30자 이상 편안하게 적어주세요. 신중한 소감은 다른 이들에게 듬뿍 도움이 됩니다."
                className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 bg-white"
              />
            </div>

            {/* Success message or trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                {isSuccessMsg && (
                  <p className="text-emerald-700 text-xs font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 animate-pulse">
                    <Check className="w-4 h-4" />
                    후기가 성공적으로 등록되었습니다! 500P 포인트가 적립됩니다.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                리뷰 업로드하기
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-amber-50/50 border border-amber-200/50 rounded-2xl">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <p className="text-xs text-amber-900 font-medium">
              로그인을 하시면 소포인트(500P) 적립과 함께 직접 구운 맛있는 소감을 소통하실 수 있습니다.
            </p>
          </div>
        )}
      </section>

      {/* 3. Instagram-like review photo grid (3x3 / 4x2 style) */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
          <span>📸</span>
          인스타 감성 포토 피드
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {reviews
            .filter(r => r.image)
            .map((review) => (
              <div
                key={review.id}
                className="group relative bg-white border border-stone-200/60 rounded-2xl overflow-hidden aspect-square hover:shadow-sm transition-all text-left"
              >
                <img
                  src={review.image}
                  alt={review.productName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Visual Like Button & Info Overlay on hover */}
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4.5">
                  <div className="flex justify-between items-start text-white">
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      @{review.author}
                    </span>
                    <div className="flex items-center text-amber-400 text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      {review.rating}.0
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-amber-200 truncate">{review.productName}</p>
                    <p className="text-[10px] text-white/90 line-clamp-2 mt-1 font-medium">{review.text}</p>
                  </div>

                  <div className="flex justify-between items-center text-white">
                    <span className="text-[9px] text-white/60">{review.date}</span>
                    <button
                      onClick={() => onLikeReview(review.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm border transition-colors cursor-pointer ${
                        review.isLikedByMe 
                          ? 'bg-rose-500/80 border-rose-400 text-white' 
                          : 'bg-white/15 border-white/20 text-white hover:bg-white/25'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${review.isLikedByMe ? 'fill-current' : ''}`} />
                      ❤️ {review.likes}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 4. Complete Detailed Review List Feed */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
          <span>💬</span>
          모든 고객 생생 피드백
        </h3>
        
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 bg-white border border-stone-200/50 rounded-2xl flex flex-col sm:flex-row gap-5 hover:border-stone-300 transition-colors"
            >
              {/* Left Profile card */}
              <div className="sm:w-36 flex sm:flex-col items-center gap-3 text-center sm:text-center shrink-0 border-b sm:border-b-0 sm:border-r border-stone-100 pb-3 sm:pb-0 sm:pr-4">
                <img
                  src={review.authorImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <p className="font-bold text-xs text-stone-700">@{review.author}</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">{review.date}</p>
                </div>
              </div>

              {/* Middle Rating and Text */}
              <div className="flex-1 space-y-2.5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-stone-200'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/40 px-2 py-0.5 rounded-md">
                      {review.productName}
                    </span>
                  </div>
                  
                  {/* Likes inside list item */}
                  <button
                    onClick={() => onLikeReview(review.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                      review.isLikedByMe
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'bg-stone-50 border-stone-200/50 text-stone-400 hover:text-stone-600'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${review.isLikedByMe ? 'fill-current' : ''}`} />
                    공감 {review.likes}
                  </button>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {review.text}
                </p>
              </div>

              {/* Right Optional mini-image */}
              {review.image && (
                <div className="sm:w-24 sm:h-24 aspect-square rounded-xl overflow-hidden shrink-0 border border-stone-100">
                  <img src={review.image} alt="Customer cookie" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
