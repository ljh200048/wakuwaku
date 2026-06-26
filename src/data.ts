/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review, Notice, Coupon } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // Classic Cookies
  {
    id: 'classic-1',
    name: '오리지널 초코칩 쿠키',
    engName: 'Choco Chip Cookie',
    price: 4500,
    category: 'classic',
    description: '벨기에산 다크 초콜릿 칩이 아낌없이 듬뿍 들어가 겉은 바삭하고 속은 촉촉한 정통 아메리칸 클래식 쿠키입니다.',
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    isBest: true,
    stock: 12,
    toppingsAllowed: true
  },
  {
    id: 'classic-2',
    name: '프랑스 고메 버터 쿠키',
    engName: 'Butter Cookie',
    price: 4200,
    category: 'classic',
    description: '엄선된 프랑스산 최고급 고메 버터만을 사용하여 첫 입부터 마지막 순간까지 입안 가득 고소함과 깊은 버터 풍미가 녹아내립니다.',
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=600&q=80',
    isBest: false,
    stock: 18,
    toppingsAllowed: true
  },
  {
    id: 'classic-3',
    name: '제주 유기농 말차 쿠키',
    engName: 'Matcha Cookie',
    price: 4800,
    category: 'classic',
    description: '제주 다원의 유기농 찻잎을 곱게 갈아내 진한 녹차 풍미를 담고, 달콤한 화이트 초콜릿 칩과 마시멜로를 곁들인 쫀득한 쿠키입니다.',
    rating: 4.9,
    reviewsCount: 105,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    isBest: true,
    stock: 5,
    toppingsAllowed: true
  },

  // Premium Cookies
  {
    id: 'premium-1',
    name: '설렘 가득 딸기 크럼블 쿠키',
    engName: 'Strawberry Cookie',
    price: 5200,
    category: 'premium',
    description: '상큼한 수제 생딸기 잼과 고소한 버터 소보로 크럼블이 황홀하게 씹히는 쫀득하고 달콤한 프리미엄 크럼블 쿠키입니다.',
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1619149600417-6e6cdfac2f8a?auto=format&fit=crop&w=600&q=80',
    isBest: true,
    stock: 9,
    toppingsAllowed: true
  },
  {
    id: 'premium-2',
    name: '다크 더블초코 러브 쿠키',
    engName: 'Double Choco Cookie',
    price: 5000,
    category: 'premium',
    description: '리얼 카카오 60% 다크 제누와즈 반죽에 덩어리째 썰어 넣은 밀크 초콜릿이 꽉 찬, 진득한 브라우니 질감의 더블 딥 초코 쿠키입니다.',
    rating: 4.8,
    reviewsCount: 93,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isBest: false,
    stock: 15,
    toppingsAllowed: true
  },
  {
    id: 'premium-3',
    name: '필라델피아 황치즈 스모어 쿠키',
    engName: 'Butter Cheese Cookie',
    price: 5200,
    category: 'premium',
    description: '진한 황치즈 가루를 아낌없이 넣고 안에는 쫀득한 스모어 마시멜로와 필라델피아 크림치즈를 가득 채워 마성의 단짠을 완성했습니다.',
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=600&q=80',
    isBest: true,
    stock: 8,
    toppingsAllowed: true
  },

  // Limited Cookies
  {
    id: 'limited-1',
    name: '봄날의 벚꽃 휘낭시에 쿠키',
    engName: 'Spring Cherry Blossom Cookie',
    price: 5500,
    category: 'limited',
    description: '[봄 한정판] 향긋한 수제 벚꽃 시럽 글레이즈에 앙증맞은 말린 벚꽃 잎을 올린 뒤, 속에 부드러운 화이트 가나슈를 담은 봄 한정 쿠키입니다.',
    rating: 4.8,
    reviewsCount: 47,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    isBest: false,
    stock: 3,
    toppingsAllowed: false
  },
  {
    id: 'limited-2',
    name: '스노우 트리 크리스마스 쿠키',
    engName: 'Christmas Tree Cookie',
    price: 5800,
    category: 'limited',
    description: '[겨울 한정판] 은은한 바닐라빈 향이 매력적인 솔잎 모양 쿠키에 알록달록 스프링클과 하얀 눈꽃 아이싱 장식을 수놓은 로맨틱 홀리데이 쿠키입니다.',
    rating: 4.9,
    reviewsCount: 71,
    image: 'https://images.unsplash.com/photo-1548980308-9557fc95457c?auto=format&fit=crop&w=600&q=80',
    isBest: false,
    stock: 7,
    toppingsAllowed: false
  },

  // Drinks
  {
    id: 'drink-1',
    name: '스팀 에스프레소 카페 라떼',
    engName: 'Cafe Latte',
    price: 5500,
    category: 'drink',
    description: '에티오피아 예가체프 블렌딩 원두의 고소함에 신선한 매일우유 스팀을 얹은 달콤 쌉싸름한 라떼입니다.',
    rating: 4.7,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    isBest: false,
    stock: 99
  },
  {
    id: 'drink-2',
    name: '와쿠와쿠 수제 크림 밀크',
    engName: 'Signature Cream Milk',
    price: 6000,
    category: 'drink',
    description: '매일 아침 바닐라빈을 직접 졸여 만든 특제 비법 크림을 차가운 우유 위에 두툼히 올린 와쿠와쿠의 넘버원 음료입니다.',
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=600&q=80',
    isBest: true,
    stock: 99
  },
  {
    id: 'drink-3',
    name: '향긋한 오가닉 세이지 허브티',
    engName: 'Organic Sage Herb Tea',
    price: 5000,
    category: 'drink',
    description: '마음을 차분하게 가라앉혀 주며 소화를 돕는 향긋한 천연 세이지 잎차를 우려내어 쿠키와 환상적인 조화를 이룹니다.',
    rating: 4.6,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    isBest: false,
    stock: 99
  },

  // Gift Sets
  {
    id: 'gift-1',
    name: '와쿠와쿠 실속 패키지 (4개입)',
    engName: 'Waku Waku Budget Set',
    price: 22000,
    category: 'gift',
    description: '와쿠와쿠 베스트셀러 클래식 쿠키 4종과 감성 엽서, 메시지 카드가 동봉된 따스하고 알찬 크래프트 선물 가방입니다.',
    rating: 4.9,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    isBest: true,
    stock: 10
  },
  {
    id: 'gift-2',
    name: '프리미엄 세이지 기프트 박스 (8개입)',
    engName: 'Waku Waku Premium Box',
    price: 38000,
    category: 'gift',
    description: '엄선된 클래식 & 프리미엄 쿠키 8종이 고급 철제 틴케이스에 하나씩 정성스레 개별 포장되어 품격을 선물하는 VIP 패키지 세트입니다.',
    rating: 5.0,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    isBest: false,
    stock: 6
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'review-1',
    author: '민지짱',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: '와 진짜 여기 쿠키 인생 쿠키예요!! 겉은 바삭한데 한 입 베어 물면 쫀득함이 살아있어요. 특히 말차 쿠키 안에 화이트 초콜릿이랑 스모어 마시멜로 조화가 대박입니다. 매주 수요일마다 당 충전하러 주문할 거예요 ❤️',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    likes: 235,
    isLikedByMe: false,
    date: '2026-06-23',
    productName: '제주 유기농 말차 쿠키'
  },
  {
    id: 'review-2',
    author: '초코러버',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: '오리지널 초코칩은 무조건 시키세요! 한 상자 샀는데 하루 만에 가족들이 다 먹었어요. 커피랑 마시면 완전 극락입니다. 선물 패키지도 너무 예쁘고 정성스러워서 조카 선물용으로 한 세트 더 결제하려구요 ㅎㅎ 적극 추천합니다.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    likes: 184,
    isLikedByMe: false,
    date: '2026-06-24',
    productName: '오리지널 초코칩 쿠키'
  },
  {
    id: 'review-3',
    author: '카페돌이',
    authorImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80',
    rating: 4,
    text: '인스타그램 리뷰 보고 주문해봤는데 황치즈 스모어 쿠키 완전 뽀또맛 상위 호환이네요!! 치즈 풍미가 엄청 깊어서 물리지 않고 끝까지 먹었어요. 수제 크림 밀크는 배달하면서 크림이 조금 섞이긴 했지만 여전히 환상적이네요.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=600&q=80',
    likes: 92,
    isLikedByMe: false,
    date: '2026-06-25',
    productName: '필라델피아 황치즈 스모어 쿠키'
  },
  {
    id: 'review-4',
    author: '감성수집가',
    authorImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: '스모어 커스텀 쿠키로 토핑을 마시멜로랑 견과류 추가해서 선물 카드까지 받았는데, 받는 친구가 진짜 감동받았어요. 포장이 세상 힙하고 따뜻해서 소품샵에서 산 것 같아요. 앞으로 주변 선물은 무조건 와쿠와쿠에서 할 생각입니다!',
    image: 'https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=600&q=80',
    likes: 147,
    isLikedByMe: false,
    date: '2026-06-25',
    productName: '쿠키 커스터마이징'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: '🎉 [와쿠와쿠 오픈 기념 이벤트] 신규 회원 10% 무제한 할인 쿠폰 증정!',
    content: '와쿠와쿠 쿠키 & 카페를 찾아주신 모든 분들께 감사의 마음을 담아 첫 가입 시 10% 즉시 할인 쿠폰을 발급해 드립니다. 로그인 후 마이페이지의 마이 쿠폰함에서 확인 및 즉시 적용이 가능합니다. 달콤한 하루의 시작을 함께하세요!',
    date: '2026-06-25',
    type: 'event'
  },
  {
    id: 'notice-2',
    title: '🎁 [상시] 네이버 블로그/인스타 포토 리뷰 작성 시 500포인트 적립!',
    content: '맛있게 드신 쿠키 사진과 함께 후기를 예쁘게 작성해주시면 매주 추첨을 통해 즉시 사용 가능한 와쿠와쿠 쿠키 적립 포인트 500P를 적립해 드립니다! 베스트 리뷰어에게는 기프트 세트 무료 쿠폰(38,000원 상당)도 보내드리니 많은 참여 부탁드려요!',
    date: '2026-06-20',
    type: 'event'
  },
  {
    id: 'notice-3',
    title: '🎂 [기념일] 당신의 가장 행복한 하루를 위해 생일 축하 3,000원 쿠폰!',
    content: '와쿠와쿠는 회원님들의 특별한 날을 항상 기억합니다. 마이페이지에 등록된 생일 월 첫날, 자동으로 3,000원 상당의 할인 쿠폰이 발급됩니다. 친구에게 선물할 수도 있는 따스함을 지금 받아보세요.',
    date: '2026-06-18',
    type: 'event'
  },
  {
    id: 'notice-4',
    title: '📢 무통장 입금 계좌 및 배송 일정 안내',
    content: '와쿠와쿠는 정성스럽게 매일 아침 구워 당일 신선하게 우체국 택배로 발송합니다. 무통장 입금 정보는 [국민은행 123-456-789012 (예금주: 와쿠와쿠)] 입니다. 주문 후 24시간 이내 입금 확인이 되지 않으면 주문이 자동으로 취소될 수 있으니 참고 부탁드립니다.',
    date: '2026-06-15',
    type: 'notice'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coupon-1',
    code: 'WAKU10',
    name: '신규 가입 10% 할인 쿠폰',
    discountType: 'percent',
    discountValue: 10,
    minOrderAmount: 10000,
    description: '10,000원 이상 주문 시 사용 가능한 10% 전 상품 무제한 할인',
    isUsed: false
  },
  {
    id: 'coupon-2',
    code: 'BDAY3000',
    name: '해피 해피 버스데이 3,000원 쿠폰',
    discountType: 'amount',
    discountValue: 3000,
    minOrderAmount: 20000,
    description: '20,000원 이상 결제 시 즉시 사용할 수 있는 생일 축하 전용 쿠폰',
    isUsed: false
  }
];

export const BRAND_STORY_STEPS = [
  {
    title: '01. 엄선된 최상급 재료의 선택',
    subtitle: '프랑스 고메 버터 & 벨기에 다크 카카오 블렌드',
    description: '와쿠와쿠는 아주 작은 맛의 차이도 쉽게 지나치지 않습니다. 프랑스 노르망디 청정 지역에서 자란 목초 우유로 만든 전통 고메 버터와 천연 카카오 버터가 풍부한 벨기에 리얼 초콜릿을 주재료로 사용하여 인위적이지 않은 깊고 그윽한 풍미를 구현해냅니다.',
    image: 'https://images.unsplash.com/photo-1558961309-db0ea660458e?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: '02. 매일 아침 7시, 오븐의 달콤한 노래',
    subtitle: '당일 베이킹, 당일 판매의 철칙',
    description: '새벽 안개가 걷히는 아침 7시, 와쿠와쿠의 오븐은 가장 행복한 온도로 예열을 시작합니다. 전문 파티시에가 밀가루를 섬세하게 체질하고, 최적의 배합 비율로 반죽한 뒤 정확한 타이밍과 습도를 조절해 구워냅니다. 오늘 구운 따스함은 오직 오늘 하루 동안만 소중히 진열됩니다.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: '03. 정성과 마음을 더한 감성 크라프트 패키징',
    subtitle: '쿠키 하나에 담긴 설렘을 선물하세요',
    description: '저희에게 쿠키는 단순한 디저트가 아닙니다. 사랑하는 이를 향한 설렘이자 나 자신을 위로하는 작은 쉼표입니다. 자연분해 가능한 무표백 친환경 크라프트 종이에 와쿠와쿠 시그니처 세이지 허브 로고를 장식하고, 당신이 직접 적은 메시지 카드를 고이 담아 온기가 온전히 전해지도록 꼼꼼히 패킹해 발송합니다.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80'
  }
];
