# RunWay Portfolio

RunWay 앱 포트폴리오 웹사이트. Next.js 16 (App Router) + Tailwind v4.
한국어 / English / 日本語 3개 언어를 지원합니다 (URL 경로 기반: `/ko`, `/en`, `/ja`).

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000 접속 시 `/ko`로 자동 리다이렉트됩니다.
`/en`, `/ja`로 직접 접속하면 해당 언어로 바로 확인할 수 있습니다.

## Vercel 배포

```bash
npm i -g vercel
vercel
```

또는 GitHub에 push 후 vercel.com에서 저장소 import - 별도 설정 없이 바로 빌드됨.

> 참고: 이 빌드 환경에서는 `next/font/google`(Google Fonts API)에 네트워크
> 접근이 막혀 있어서, `next/font/local`로 폰트 파일(`public/fonts/`)을
> 직접 서빙하도록 구성했습니다. Vercel 배포 환경에서는 문제없이 동작합니다.
> Google Fonts CDN을 직접 쓰고 싶다면 `app/layout.tsx`의 `localFont` import를
> `next/font/google`의 `Orbitron`, `Inter`로 교체하면 됩니다.

## 다국어 구조

라우트는 Next.js의 `[lang]` 동적 세그먼트로 구성되어 있습니다.

```
app/
  page.tsx           → 루트(/). /ko 로 리다이렉트만 수행
  [lang]/
    layout.tsx        → lang 파라미터 유효성 검사, html lang 속성 동기화
    page.tsx           → 메인 페이지
    privacy/page.tsx   → 개인정보 처리방침
    support/           → 지원 및 문의
    troubleshooting/   → 정비 로그
lib/
  i18n/
    types.ts    → 지원 언어 타입(ko/en/ja), 기본 언어
    schema.ts   → 전체 사이트 텍스트의 타입 정의
    ko.ts       → 한국어 콘텐츠
    en.ts       → 영어 콘텐츠
    ja.ts       → 일본어 콘텐츠
    index.ts    → getDictionary(lang)로 언어별 콘텐츠 조회
  privacy.ts    → 개인정보 처리방침 콘텐츠 (기존 구조 유지, getPrivacyContent(lang)로 조회)
```

새 언어를 추가하려면:
1. `lib/i18n/types.ts`의 `SUPPORTED_LANGS`에 언어 코드 추가
2. `lib/i18n/{lang}.ts` 파일을 만들어 `SiteDictionary` 타입에 맞게 전체 텍스트 작성
3. `lib/i18n/index.ts`의 `dictionaries` 객체에 등록
4. `lib/privacy.ts`에도 해당 언어의 `PrivacyContent`를 추가하고 `getPrivacyContent()`에 분기 추가

## 컴포넌트 구조

```
components/
  Hero.tsx             → 랜딩 히어로 + PFDWidget (dict.hero 사용)
  PFDWidget.tsx         → 자동 재생되는 미니 계기판 시뮬레이션 (GPWS 사이클, 언어 무관)
  Concept.tsx           → Mission/Free Flight 모드 + GPWS 카드 (dict.concept 사용)
  Screens.tsx           → iPhone/Watch 스크린샷 캐러셀 (dict.screens 사용, key 기준 이미지 매핑)
  DeviceFrame.tsx       → 디바이스 베젤 프레임 컴포넌트 (언어 무관)
  Architecture.tsx      → 설계 결정 3가지 탭 + 인용문 (dict.architecture 사용)
  TroubleshootCard.tsx  → 정비 로그 아코디언 카드 (item, verdictLabel prop으로 받음)
  Nav.tsx               → 상단 네비게이션 + 언어 토글 (lang, dict prop 필요)
  Footer.tsx            → 하단 소셜 링크 (dict prop 필요)
  HtmlLangSync.tsx      → <html lang="..."> 속성을 클라이언트에서 동기화
```

`Nav`, `Footer`를 포함한 대부분의 컴포넌트는 `dict`(해당 언어의 `SiteDictionary`
또는 그 하위 필드)를 prop으로 받습니다. 텍스트를 직접 하드코딩하지 말고
반드시 `lib/i18n/{lang}.ts` 파일을 통해 전달하세요.

## 스크린샷 교체/추가하기

이미지는 `public/screenshots/phone/`, `public/screenshots/watch/`에 있고,
`lib/i18n/{lang}.ts`의 `screens.phoneShots` / `screens.watchShots` 배열의
`key` 값과 파일명이 매칭됩니다 (`key: "takeoff"` → `takeoff.png`).

새 스크린샷을 추가하려면:
1. 이미지를 해당 폴더에 넣기
2. `ko.ts`, `en.ts`, `ja.ts` 세 파일 모두의 `phoneShots`/`watchShots` 배열에
   같은 `key`로 항목 추가 (label만 언어별로 다르게)
3. 파일 확장자가 `.png`가 아니라면 `components/Screens.tsx`의 `phoneExt`
   매핑에 추가 (예: `dynamic-island.jpg`)

## 콘텐츠 수정

- 트러블슈팅 항목: `lib/i18n/{ko,en,ja}.ts`의 `troubleshooting` 배열 편집
  (세 언어 파일 모두 같은 `id`/`number` 순서를 유지해야 합니다)
- FAQ 항목: 각 언어 파일의 `faq` 배열 편집
- 개인정보 처리방침: `lib/privacy.ts`의 `privacyContentKo`/`En`/`Ja` 편집
- 색상 토큰: `app/globals.css`의 `:root` 안 `--rw-*` 변수 (앱 테마와 동일하게 유지 중)
- 카피/문구: 각 언어 파일(`lib/i18n/{lang}.ts`) 수정, 컴포넌트 파일은 직접 수정하지 않기

## 문의 폼 (Support 페이지) 설정

`/{lang}/support` 페이지의 문의 폼은 [Formspree](https://formspree.io)의
`@formspree/react` SDK를 사용합니다. 서버 없이 클라이언트에서 바로
제출하는 방식이라 별도 백엔드나 도메인 인증이 필요 없습니다.

1. [formspree.io](https://formspree.io)에서 가입 후 새 Form 생성
2. 생성된 Form의 ID(대시보드에서 확인 가능, 예: `mwvdwrng`) 확인
3. 로컬 개발: 프로젝트 루트에 `.env.local` 파일을 만들고 아래처럼 작성

   ```
   NEXT_PUBLIC_FORMSPREE_ID=mwvdwrng
   ```

4. Vercel 배포: 프로젝트 설정 → **Settings → Environment Variables**에서
   `NEXT_PUBLIC_FORMSPREE_ID`를 동일하게 등록 후 재배포

Formspree 무료 티어는 월 50건까지 제출 가능합니다. Form 대시보드에서
받는 이메일 주소를 지정할 수 있습니다(기본값은 가입 이메일).

환경변수가 설정되지 않은 상태에서는 제출 버튼이 비활성화되고
안내 메시지가 표시되며, 하단의 mailto 링크로 직접 연락할 수 있습니다.
