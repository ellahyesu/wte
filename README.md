# wte

`wte (What To Eat)`는 오늘 먹을 메뉴 탐색, 식단 추천, 냉장고 기반 추천을 한 화면에서 다루기 위한 프로젝트입니다.

현재 구성은 다음과 같습니다.

- `backend`: Java 17, Spring Boot 3.x
- `frontend`: Vue 3, Vite, TypeScript
- 레시피 데이터: `10000recipe.com` 실데이터 스크래핑
- 식단 추천: TDEE 기반 규칙형 플래너

## 주요 기능

- `Recipe Cards`
  - 레시피 카드 목록 표시
  - 썸네일 클릭 시 팝업에서 재료와 조리 순서 확인
  - 총 20개 레시피 제공
  - 1~16번 레시피는 메인 목록에서 즉시 확인
  - 17번 이후 레시피는 `more...` 버튼으로 상세 목록 페이지 이동
- `AI Dietitian`
  - 신체 정보와 목표를 입력해 하루 식단 플랜 생성
  - TDEE 기반 목표 열량과 간단한 매크로 가이드 제공
- `My Pantry`
  - 보유 재료를 입력하면 재료 매칭 기반 레시피 추천
- `Language`
  - 기본 언어는 `KO`
  - `EN`으로 전환 가능

## 데이터 소스

백엔드는 `https://www.10000recipe.com/recipe/list.html`에서 최신 레시피 목록을 읽고, 각 상세 페이지를 추가로 스크래핑해 아래 정보를 구성합니다.

- 제목
- 요약
- 재료
- 조리 순서
- 썸네일

레시피 목록은 백엔드에서 일정 시간 캐시합니다.

## 실행 방법

### 1. 백엔드 실행

Java 17이 필요합니다.

```bash
cd backend
./gradlew.bat test
./gradlew.bat bootRun
```

기본 실행 주소:

- `http://localhost:8080`

### 2. 프런트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

기본 실행 주소:

- `http://localhost:5173`

## 환경 변수 및 설정

### 프런트엔드

- `VITE_API_BASE_URL`
  - 프런트엔드가 호출할 백엔드 API 주소
  - 지정하지 않으면 로컬 환경에서 기본값 `http://localhost:8080`을 사용

### 백엔드

- `wte.frontend-origin`
  - CORS 허용 프런트엔드 주소
- `wte.recipe-source-url`
  - 레시피 목록을 가져올 원본 주소
  - 기본값은 `https://www.10000recipe.com/recipe/list.html`

## 배포 시 주의사항

정적 프런트엔드만 단독 배포하면 `10000recipe.com` 스크래핑은 동작하지 않습니다.

이유는 다음과 같습니다.

- 레시피 수집은 브라우저가 아니라 백엔드 서버에서 수행해야 함
- CORS와 원본 사이트 구조 때문에 프런트에서 직접 스크래핑할 수 없음

따라서 실제 데이터로 운영하려면 아래 두 가지가 함께 필요합니다.

1. 백엔드 배포
2. 프런트엔드의 `VITE_API_BASE_URL`을 배포된 백엔드 주소로 연결

## 쇼핑 링크 관련 메모

현재 재료별 구매 링크는 쿠팡 일반 검색 URL 형식으로 생성합니다.

```text
https://www.coupang.com/np/search?q={재료명}
```

짧은 쿠팡 파트너스 링크 하나에 상품명 검색 파라미터를 붙여 검색 결과로 보내는 방식은 확인 기준 지원되지 않았습니다. `subid` 같은 추적 파라미터는 실리지만, 검색어 자체는 반영되지 않았습니다.

## 테스트

백엔드:

```bash
cd backend
./gradlew.bat test
```

프런트엔드:

```bash
cd frontend
npm run build
```

## 디렉터리 구조

```text
wte/
├─ backend/
├─ frontend/
├─ docker-compose.yml
└─ README.md
```
