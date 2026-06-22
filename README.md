# Sentinel — Landing Page Mission

Sentinel은 인시던트 대응을 구조화된 반복 가능한 워크플로우로 전환하는 **Incident Intelligence** 도구입니다.  
이 프로젝트는 스프린트 미션 제출용 순수 HTML/CSS/JavaScript 정적 랜딩 페이지입니다.

---

## 미션 정보

```
버셀 호스팅 랜딩 페이지 : https://sentinel-sprint-aaa5a9.vercel.app 
깃허브 링크 : https://github.com/8848man/pure_js_landing.git
```

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **반응형 레이아웃** | Flexbox + CSS Grid, 모바일 / 태블릿 / 데스크탑 완전 대응 |
| **스크롤 애니메이션** | `IntersectionObserver` 기반 fade-up 진입 효과 |
| **CTA 모달** | 얼리 액세스 신청 버튼 클릭 시 Modal 표시, 이메일 유효성 검사 포함 |
| **모바일 햄버거 메뉴** | 768px 미만에서 hamburger 버튼으로 nav 토글 |
| **접근성** | `aria-*`, `role`, `alt`, 키보드 탐색, focus trap, sr-only 레이블 적용 |
| **CSS 디자인 토큰** | CSS Variables로 색상 / 간격 / 타이포그래피 일관성 유지 |

---

## 폴더 구조

```
landing-page-mission/
├── index.html          # 시맨틱 HTML (header/main/sections/footer)
├── css/
│   └── style.css       # 디자인 토큰, 컴포넌트, 반응형
├── js/
│   └── main.js         # 스크롤 애니메이션, 모달, 햄버거 메뉴
├── assets/
│   └── images/
│       ├── sentinel_main_logo_v2.png
│       ├── sentinel_favicon_v2.png
│       └── sentinel_incident.png
└── README.md
```

### 페이지 섹션 구조

```
header  — 고정 내비게이션 (스크롤 시 blur 효과, 모바일 햄버거)
main
  ├── #hero     — 헤드라인, CTA 버튼, 대시보드 목업
  ├── #problem  — 3가지 문제 카드 (Signal Overload / Knowledge Loss / Process Failure)
  ├── #solution — 솔루션 설명 + 인시던트 워크플로우 시각화
  ├── #features — 3가지 가치 제안 카드 (통계 포함)
  └── #cta      — 데모 CTA + 웨이트리스트 이메일 입력
footer  — 로고, 링크, 저작권
```

---

## 실행 방법

### 로컬 파일로 바로 열기

```bash
# 방법 1: 브라우저에서 직접 열기
open landing-page-mission/index.html

# 방법 2: VS Code Live Server 확장 사용
# index.html을 열고 우클릭 → "Open with Live Server"
```

### Python 간이 서버 사용

```bash
cd landing-page-mission
python -m http.server 3000
# 브라우저에서 http://localhost:3000 접속
```

### Node.js `serve` 패키지 사용

```bash
npx serve landing-page-mission
```

---

## Vercel 배포 방법

이 프로젝트는 순수 정적 파일이므로 Vercel에서 별도 빌드 설정 없이 배포 가능합니다.

### 방법 1: Vercel CLI

```bash
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# landing-page-mission 폴더에서 배포
cd landing-page-mission
vercel

# 배포 설정
# - Framework Preset: Other
# - Build Command: (빈칸)
# - Output Directory: . (현재 폴더)
# - Development Command: (빈칸)
```

### 방법 2: Vercel 대시보드

1. [vercel.com](https://vercel.com) 로그인
2. **New Project** → GitHub 저장소 연결
3. **Root Directory** 를 `landing-page-mission` 으로 설정
4. Framework Preset: **Other**
5. Build & Output Settings 모두 비워두기
6. **Deploy** 클릭

### 방법 3: 폴더 드래그앤드롭

1. [vercel.com/new](https://vercel.com/new) 방문
2. `landing-page-mission` 폴더를 드래그앤드롭

---

## 기술 스택

- **HTML5** — 시맨틱 태그, WAI-ARIA 접근성
- **CSS3** — CSS Variables, Flexbox, Grid, Media Query, Animations
- **JavaScript (ES6+)** — IntersectionObserver, DOM API, 순수 JS (외부 라이브러리 없음)

---

## 참고

- 기존 Next.js 랜딩 페이지 (`/src`)와 완전히 독립된 프로젝트입니다.
- 배포 환경을 공유하지 않으며, 기존 Vercel 배포에 영향을 주지 않습니다.
- 백엔드 없이 정적으로 동작하며, 웨이트리스트 폼은 시뮬레이션 모드입니다.
