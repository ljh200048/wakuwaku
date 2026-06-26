/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, Product, Review, Notice, CartItem, Order, UserProfile, SeasonalTheme } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_NOTICES,
  INITIAL_COUPONS
} from './data';

// Import All Boutique Views
import Home from './components/Home';
import Menu from './components/Menu';
import Story from './components/Story';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import NoticeView from './components/Notice';
import Login from './components/Login';
import Cart from './components/Cart';
import Admin from './components/Admin';

import { 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Megaphone, 
  Settings, 
  ChefHat, 
  Coffee, 
  ChevronRight, 
  Gift, 
  Sparkles,
  MapPin,
  Clock,
  LogOut
} from 'lucide-react';

export default function App() {
  // Global States
  const [activeTab, setActiveTab] = useState<ActiveTab>('HOME');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [seasonalTheme, setSeasonalTheme] = useState<SeasonalTheme>('AUTUMN');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Orders logs
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'WAKU-748291',
      depositorName: '쿠키바라기',
      bankName: '카카오뱅크',
      amount: 14400,
      createdAt: '2026-06-25',
      status: '배송중',
      isGift: false,
      items: [
        {
          id: 'cart-pre-1',
          product: INITIAL_PRODUCTS[0], // Milk Cookie
          quantity: 2,
          isGift: false
        },
        {
          id: 'cart-pre-2',
          product: INITIAL_PRODUCTS[2], // Strawberry Cookie
          quantity: 1,
          isGift: false
        }
      ]
    },
    {
      id: 'WAKU-104928',
      depositorName: '최고관리자',
      bankName: '신한은행',
      amount: 24800,
      createdAt: '2026-06-24',
      status: '배송완료',
      isGift: true,
      recipientName: '귀여운친구',
      giftMessage: '늘 고맙고 설레는 마음을 담아 선물해!',
      items: [
        {
          id: 'cart-pre-3',
          product: INITIAL_PRODUCTS[5], // premium box
          quantity: 1,
          isGift: true,
          recipientName: '귀여운친구',
          giftMessage: '늘 고맙고 설레는 마음을 담아 선물해!'
        }
      ]
    }
  ]);

  // Notice Bulletin ticker state index
  const [tickerIndex, setTickerIndex] = useState(0);

  // LOGIN Action
  const handleLogin = (email: string, nickname: string) => {
    setIsLoggedIn(true);
    const profile: UserProfile = {
      email,
      nickname,
      profileImage: email === 'admin@wakuwaku.com' 
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      points: 5500,
      coupons: [...INITIAL_COUPONS],
      favorites: ['p-1', 'p-3'] // Pre-seed initial favorited cookies
    };
    setUserProfile(profile);
  };

  // LOGOUT Action
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setActiveTab('HOME');
  };

  // CART Interactions
  const handleAddToCart = (item: CartItem) => {
    // Determine uniqueness of the item (catalog vs custom cookie)
    setCartItems((prev) => {
      const matchIndex = prev.findIndex((prevItem) => {
        if (item.customCookie && prevItem.customCookie) {
          // Compare recipes
          return (
            prevItem.customCookie.baseName === item.customCookie.baseName &&
            JSON.stringify(prevItem.customCookie.toppings) === JSON.stringify(item.customCookie.toppings) &&
            prevItem.customCookie.packaging === item.customCookie.packaging
          );
        } else if (!item.customCookie && !prevItem.customCookie) {
          return prevItem.product?.id === item.product?.id && prevItem.isGift === item.isGift;
        }
        return false;
      });

      if (matchIndex > -1) {
        const copy = [...prev];
        copy[matchIndex].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Adapters for Menu and Home integrations
  const handleAddToCartFromMenu = (
    product: Product,
    quantity: number,
    giftInfo?: { recipientName: string; giftMessage: string }
  ) => {
    const item: CartItem = {
      id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      product,
      quantity,
      isGift: !!giftInfo,
      recipientName: giftInfo?.recipientName,
      giftMessage: giftInfo?.giftMessage
    };
    handleAddToCart(item);
  };

  const handleAddCustomCookieToCart = (customCookie: any) => {
    const item: CartItem = {
      id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      quantity: 1,
      isGift: false,
      customCookie
    };
    handleAddToCart(item);
  };

  // CHECKOUT Action
  const handleCheckout = (newOrder: Order) => {
    // Append order
    setOrders((prev) => [newOrder, ...prev]);

    // Subtract catalog stock and credit reward points
    setProducts((prevProds) =>
      prevProds.map((p) => {
        const orderedQty = newOrder.items
          .filter((item) => !item.customCookie && item.product?.id === p.id)
          .reduce((acc, curr) => acc + curr.quantity, 0);

        if (orderedQty > 0) {
          return { ...p, stock: Math.max(0, p.stock - orderedQty) };
        }
        return p;
      })
    );

    // Credit Points and consume coupon if applied
    if (userProfile) {
      setUserProfile((prevProfile) => {
        if (!prevProfile) return null;
        return {
          ...prevProfile,
          points: prevProfile.points + 1000, // Credit 1,000 loyalty points for ordering
        };
      });
    }
  };

  // FAVORITE Toggler
  const handleToggleFavorite = (productId: string) => {
    if (!isLoggedIn || !userProfile) {
      alert('찜하기 기능은 로그인 후 이용하실 수 있습니다!');
      setActiveTab('LOGIN');
      return;
    }

    setUserProfile((prev) => {
      if (!prev) return null;
      const isFav = prev.favorites.includes(productId);
      const nextFavs = isFav
        ? prev.favorites.filter((id) => id !== productId)
        : [...prev.favorites, productId];
      return { ...prev, favorites: nextFavs };
    });
  };

  // REVIEWS Interactions
  const handleAddReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);

    // Update product statistics
    setProducts((prevProds) =>
      prevProds.map((p) => {
        if (p.name === review.productName) {
          const nextCount = p.reviewsCount + 1;
          const nextRating = Number(((p.rating * p.reviewsCount + review.rating) / nextCount).toFixed(1));
          return { ...p, reviewsCount: nextCount, rating: nextRating };
        }
        return p;
      })
    );

    // Increase User loyalty points by 500P for uploading review
    if (userProfile) {
      setUserProfile((prevProfile) => {
        if (!prevProfile) return null;
        return { ...prevProfile, points: prevProfile.points + 500 };
      });
    }
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const isLiked = r.isLikedByMe;
          return {
            ...r,
            isLikedByMe: !isLiked,
            likes: isLiked ? r.likes - 1 : r.likes + 1,
          };
        }
        return r;
      })
    );
  };

  // ADMIN Actions
  const handleAddProduct = (p: Product) => {
    setProducts((prev) => [...prev, p]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddNotice = (notice: Notice) => {
    setNotices((prev) => [notice, ...prev]);
  };

  const currentNoticeTicker = notices[tickerIndex % notices.length] || notices[0];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans select-none antialiased text-stone-700">
      
      {/* ----------------- TOP TINY NOTICE ACCENT TICKER ----------------- */}
      <div className="bg-stone-900 text-white text-[11px] font-semibold py-2 px-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2 max-w-lg md:max-w-2xl truncate">
          <span className="bg-amber-700 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
            {currentNoticeTicker?.type === 'event' ? 'EVENT' : 'NOTICE'}
          </span>
          <p className="truncate cursor-pointer hover:underline" onClick={() => setActiveTab('NOTICE')}>
            {currentNoticeTicker?.title}: {currentNoticeTicker?.content}
          </p>
        </div>
        <div className="flex gap-2.5 shrink-0 ml-4">
          <button
            onClick={() => setTickerIndex((prev) => (prev > 0 ? prev - 1 : notices.length - 1))}
            className="hover:text-amber-400 font-mono"
          >
            ◀
          </button>
          <button
            onClick={() => setTickerIndex((prev) => prev + 1)}
            className="hover:text-amber-400 font-mono"
          >
            ▶
          </button>
        </div>
      </div>

      {/* ----------------- MAIN BRAND HEADER ----------------- */}
      <header className="bg-white border-b border-stone-200 py-6 px-4 md:px-8 text-center relative shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Offline coordinates */}
          <div className="hidden md:flex items-center gap-4.5 text-[10px] text-stone-400 font-bold font-mono text-left">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-300" />
              <span>서울 서교점 / 서울 도산점</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-300" />
              <span>AM 12:00 ~ PM 18:00</span>
            </div>
          </div>

          {/* Core Brand Logotype */}
          <div 
            onClick={() => setActiveTab('HOME')} 
            className="cursor-pointer group select-none text-center"
          >
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-amber-950 font-serif">
              WAKU WAKU
            </h1>
            <p className="text-[10px] font-bold tracking-widest text-amber-800 uppercase mt-0.5 flex items-center justify-center gap-1">
              <ChefHat className="w-3 h-3 text-amber-700" />
              오늘을 조금 더 달콤하게
            </p>
          </div>

          {/* Quick Mini User Icons Area */}
          <div className="flex items-center gap-3.5">
            {isLoggedIn && userProfile ? (
              <div 
                onClick={() => setActiveTab('LOGIN')}
                className="flex items-center gap-2 cursor-pointer bg-stone-50 hover:bg-stone-100 border border-stone-200/50 px-3 py-1.5 rounded-full"
              >
                <img 
                  src={userProfile.profileImage} 
                  alt={userProfile.nickname} 
                  className="w-5.5 h-5.5 rounded-full object-cover border"
                />
                <span className="text-[10px] font-bold text-stone-600">
                  {userProfile.nickname}님
                </span>
                <span className="text-[9px] font-bold bg-amber-800 text-amber-50 px-1.5 rounded">
                  {userProfile.points}P
                </span>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('LOGIN')}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-stone-800 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5" />
                로그인 / 가입
              </button>
            )}

            <button
              onClick={() => setActiveTab('CART')}
              className="relative p-2.5 rounded-full hover:bg-stone-100 border border-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-800 text-white font-mono font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ----------------- STICKY DESCENT NAVIGATION BAR ----------------- */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200/60 shadow-sm py-3 px-4 shrink-0">
        <div className="max-w-4xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex justify-center md:justify-around items-center gap-1 md:gap-2 text-[11px] md:text-xs font-black tracking-wider text-stone-500 min-w-max">
            {[
              { id: 'HOME', label: '🏠 HOME' },
              { id: 'COOKIE', label: '🍪 COOKIE' },
              { id: 'GIFT', label: '🎁 GIFT SET' },
              { id: 'DRINK', label: '☕ DRINK' },
              { id: 'STORY', label: '📰 STORY' },
              { id: 'REVIEW', label: '📷 REVIEW' },
              { id: 'NOTICE', label: '📢 NOTICE' },
              { id: 'CONTACT', label: '📞 CONTACT' },
              { id: 'LOGIN', label: '👤 LOGIN' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 md:px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-amber-950 text-amber-100 font-extrabold shadow-sm scale-98' 
                      : 'hover:text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ----------------- CORE PAGES RENDER ROUTER CONTAINER ----------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        
        {activeTab === 'HOME' && (
          <Home 
            products={products}
            recommendedProduct={products.find(p => p.isBest) || products[0]}
            seasonalTheme={seasonalTheme}
            onNavigate={(target) => setActiveTab(target as any)}
            onAddToCart={(product, quantity) => handleAddToCartFromMenu(product, quantity)}
            onToggleFavorite={handleToggleFavorite}
            favorites={userProfile?.favorites || []}
          />
        )}

        {activeTab === 'COOKIE' && (
          <Menu 
            products={products}
            activeCategoryFilter="cookie"
            onAddToCart={handleAddToCartFromMenu}
            onAddCustomCookieToCart={handleAddCustomCookieToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={userProfile?.favorites || []}
          />
        )}

        {activeTab === 'GIFT' && (
          <Menu 
            products={products}
            activeCategoryFilter="gift"
            onAddToCart={handleAddToCartFromMenu}
            onAddCustomCookieToCart={handleAddCustomCookieToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={userProfile?.favorites || []}
          />
        )}

        {activeTab === 'DRINK' && (
          <Menu 
            products={products}
            activeCategoryFilter="drink"
            onAddToCart={handleAddToCartFromMenu}
            onAddCustomCookieToCart={handleAddCustomCookieToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={userProfile?.favorites || []}
          />
        )}

        {activeTab === 'STORY' && <Story />}

        {activeTab === 'REVIEW' && (
          <Reviews 
            reviews={reviews}
            products={products}
            onAddReview={handleAddReview}
            onLikeReview={handleLikeReview}
            isLoggedIn={isLoggedIn}
            currentUserNickname={userProfile?.nickname || ''}
          />
        )}

        {activeTab === 'NOTICE' && <NoticeView notices={notices} />}

        {activeTab === 'CONTACT' && <Contact />}

        {activeTab === 'LOGIN' && (
          <Login 
            isLoggedIn={isLoggedIn}
            userProfile={userProfile}
            orders={orders}
            products={products}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavigate={(target) => setActiveTab(target as any)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'CART' && (
          <Cart 
            cartItems={cartItems}
            userProfile={userProfile}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onCheckout={handleCheckout}
            isLoggedIn={isLoggedIn}
            onNavigate={(target) => setActiveTab(target as any)}
          />
        )}

        {activeTab === 'ADMIN' && (
          <Admin 
            products={products}
            orders={orders}
            reviews={reviews}
            notices={notices}
            seasonalTheme={seasonalTheme}
            onUpdateSeasonalTheme={setSeasonalTheme}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onDeleteReview={handleDeleteReview}
            onAddNotice={handleAddNotice}
          />
        )}

      </main>

      {/* ----------------- BOUTIQUE COZY FOOTER ----------------- */}
      <footer className="bg-white border-t border-stone-200 mt-16 py-12 px-4 md:px-8 text-xs text-stone-500 shrink-0 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h4 className="font-extrabold text-stone-800 text-sm font-serif">WAKU WAKU CAFE</h4>
            <p className="leading-relaxed text-[11px] font-medium text-stone-400">
              오늘을 조금 더 달콤하게.<br />
              매일 아침 가장 깨끗하고 올바른 유기농 밀가루와 유제품으로 정성을 다해 고소함을 굽는 로컬 수제 구움과자 아틀리에입니다.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-stone-700">온라인 아틀리에</h4>
            <ul className="space-y-1.5 text-stone-400 font-medium">
              <li>• 본사 및 배송센터: 서울특별시 마포구 서교동 와쿠와쿠 센트럴 키친</li>
              <li>• 온라인 전용 수제 구움과자 아틀리에</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-stone-700 font-serif">CS CENTER</h4>
            <p className="font-mono text-sm font-black text-amber-900">02-1234-5678</p>
            <ul className="space-y-1 text-stone-400">
              <li>• 이메일: support@wakuwaku.com</li>
              <li>• 카카오채널: @와쿠와쿠_쿠키앤카페</li>
              <li>• 평일 오전 10시 ~ 오후 6시 (주말 휴무)</li>
            </ul>
          </div>

          <div className="space-y-3 md:text-right">
            <h4 className="font-bold text-stone-700">고객 보증 제도</h4>
            <p className="leading-relaxed text-[11px] text-stone-400">
              당일 구운 쿠키 당일 한정 판매 원칙.<br />
              품질 및 위생 안전에 이상이 있을 경우 100% 교환 및 안심 전액 환불을 보증해 드립니다.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-stone-100 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-400 gap-3">
          <p>© 2026 WAKU WAKU Authentic Bakery Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-stone-600 cursor-pointer">이용약관</span>
            <span className="hover:text-stone-600 cursor-pointer font-bold">개인정보처리방침</span>
            <span className="hover:text-stone-600 cursor-pointer">쇼핑 가이드</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
