import type { SiteDictionary } from "./schema";

export const ko: SiteDictionary = {
  nav: {
    concept: "Concept",
    screens: "Screens",
    architecture: "Architecture",
    privacy: "Privacy",
    support: "Support",
    maintenanceLog: "Maintenance Log",
  },
  hero: {
    badge: "Ex-항공정비사가 설계한 러닝 앱",
    titleLine1: "Turn Every",
    titleLine2Prefix: "Run Into A",
    titleLine2Accent: "Flight.",
    description: [
      "A320F 정비사 출신 개발자가 만든 iOS 러닝 트래커.",
      "GPS, 심박수, 케이던스를 계기판처럼 읽고, 페이스 이탈을 GPWS 경보로 알려줍니다.",
    ],
    badgeOs: "iOS 26+ · watchOS 11.5+",
    badgeStack: "SwiftUI · Actor · AsyncStream",
  },
  concept: {
    eyebrow: "Flight Operations",
    title: "두 가지 비행 모드",
    description: [
      "항공기 운항 절차에서 착안한 상태 머신으로 러닝 전체를 관리합니다.",
      "시작 버튼을 누르면 이륙 시퀀스가, 러닝 중에는 실시간 계기판이 기다립니다.",
    ],
    modes: [
      {
        tag: "MODE A",
        title: "Mission Flight",
        desc: "목표 페이스와 거리를 설정하고 운항합니다. 허용 오차를 벗어나면 GPWS가 즉시 경고합니다.",
        points: [
          "목표 페이스 ± 오차 설정",
          "빠른 거리 선택 (3K / 5K / 10K / 하프 / 풀)",
          "목표 거리 50m 전 MINIMUMS 경보",
        ],
      },
      {
        tag: "MODE B",
        title: "Free Flight",
        desc: "목표 없이 자유롭게 달리는 VFR(시계비행) 모드. 수동으로 Touchdown하여 종료합니다.",
        points: ["목표 설정 없음", "GPWS 비활성", "자유로운 페이스 기록"],
      },
    ],
    gpwsEyebrow: "Ground Proximity Warning System",
    gpwsAlerts: [
      { label: "SINK RATE", desc: "목표 페이스보다 느려짐" },
      { label: "OVERSPEED", desc: "목표 페이스보다 빨라짐" },
      { label: "MINIMUMS", desc: "목표 거리 50m 전 진입" },
    ],
  },
  screens: {
    eyebrow: "iPhone & Apple Watch",
    title: "두 화면, 하나의 비행",
    description: [
      "Watch가 주도하든 iPhone이 주도하든, 두 기기는 같은 FlightData를 공유합니다.",
      "이륙 준비부터 착륙 후 기록까지, 실제 화면으로 확인해보세요.",
    ],
    phoneLabel: "iPhone · 좌우로 스크롤",
    watchLabel: "Apple Watch",
    phoneShots: [
      { key: "homeview", label: "HOME · 대시보드" },
      { key: "missionflight", label: "MISSION FLIGHT · 설정" },
      { key: "takeoff", label: "TAKEOFF · 사전 점검" },
      { key: "missionrunning", label: "MISSION FLIGHT · CRUISE" },
      { key: "freerunning", label: "FREE FLIGHT · CRUISE" },
      { key: "touchdown", label: "TOUCHDOWN" },
      { key: "summary", label: "FLIGHT SUMMARY · MAP ROUTE" },
      { key: "logbook", label: "LOGBOOK" },
      { key: "alerts", label: "ALERTS · GPWS 기록" },
      { key: "chart", label: "FLIGHT CALENDAR" },
      { key: "dynamic-island", label: "DYNAMIC ISLAND" },
    ],
    watchShots: [
      { key: "home", label: "WATCH · MODE SELECT" },
      { key: "running", label: "WATCH · PFD" },
      { key: "summary", label: "WATCH · SUMMARY" },
    ],
  },
  architecture: {
    eyebrow: "Under The Hood",
    title: "설계 결정 세 가지",
    description: [
      "동시성 처리, 상태 관리, 기기 간 동기화 - RunWay를 만들며 가장",
      "많이 고민한 세 가지 지점입니다.",
    ],
    quoteLabel: "왜 이렇게 설계했는가",
    tabs: [
      { id: "actor", label: "RunningCenter Actor", eyebrow: "동시성" },
      { id: "phase", label: "FlightPhase 상태 머신", eyebrow: "상태 관리" },
      { id: "mirroring", label: "Watch 미러링", eyebrow: "기기 간 동기화" },
    ],
    actor: {
      quote:
        "GPS, 심박수, 케이던스가 동시에 들어오므로 상태 무결성을 보장하기 위해 RunningCenter Actor를 두고 모든 러닝 계산을 단일 격리 영역에서 처리했습니다.",
    },
    phase: {
      quote: [
        "각 화면이 독립적으로 상태를 판단하면 화면 간 불일치가 생깁니다.",
        "항공기 운항 단계에서 착안한 FlightPhase 하나를 앱 전체가 참조하게 해서, Dynamic Island와 Watch, iPhone PFD가 항상 같은 상태를 보여주도록 했습니다.",
      ],
    },
    mirroring: {
      leadingLabel: "GPS + 계산 담당",
      followingLabel: "수신 + 표시만",
      payloadLabel: "FlightData (elapsedTime 포함, 3초 throttle)",
      quote: [
        "처음에는 iPhone과 Watch가 미러링 중에도 각자 GPS를 잡고 있었습니다.",
        "주도 기기(startOrigin) 하나만 위치를 추적하고 계산 결과를 상대에게 보내는 구조로 바꾸니, 중복 연산도 없어지고 화면 전환 지연도 사라졌습니다.",
      ],
    },
    stack: [
      { label: "SwiftUI", role: "UI" },
      { label: "@MainActor + @Observable", role: "상태관리" },
      { label: "RunningCenter (Actor)", role: "동시성" },
      { label: "AsyncStream", role: "센서 → ViewModel" },
      { label: "FlightPhase enum", role: "상태 머신" },
      { label: "WatchConnectivity", role: "iPhone ↔ Watch" },
      { label: "SwiftData", role: "저장" },
      { label: "MapKit + MapPolyline", role: "경로 시각화" },
    ],
  },
  footer: {
    tagline: "CLEARED FOR TAKE-OFF",
    description: [
      "전직 항공정비사의 철학이 담긴 정밀 러닝 솔루션.",
      "Rotate와 함께 비행을 시작하세요.",
    ],
    githubLabel: "GitHub",
    blogLabel: "Blog",
    bottomLine: "RunWay - Turn Every Run Into A Flight",
  },
  troubleshootingPage: {
    backLabel: "RunWay 홈으로",
    eyebrow: "Maintenance Log",
    title: "정비 기록",
    description: [
      "개발 중 실제로 마주친 문제와 원인 추적, 해결 과정을 정비 로그",
      "형식으로 정리했습니다. 모든 것이 해결되지는 않았고, 구조적",
      "한계는 한계라고 정직하게 남겨두었습니다.",
    ],
    resolvedLabel: "Resolved",
    limitationLabel: "Known Limitation",
    verdictLabel: "FINAL VERDICT",
  },
  supportPage: {
    backLabel: "RunWay 홈으로",
    eyebrow: "Support",
    title: "지원 및 문의",
    description: [
      "버그를 발견했거나 기능 제안이 있다면 아래 폼으로 알려주세요.",
      "자주 묻는 질문은 그 아래에서 먼저 확인해보실 수 있습니다.",
    ],
    successTitle: "문의가 전송되었습니다",
    successBody: "확인 후 입력하신 이메일로 답변드리겠습니다.",
    categoryLabel: "문의 유형",
    categories: [
      { id: "bug", label: "버그 제보" },
      { id: "feature", label: "기능 제안" },
      { id: "other", label: "기타 문의" },
    ],
    nameLabel: "이름 (선택)",
    namePlaceholder: "홍길동",
    emailLabel: "이메일",
    emailPlaceholder: "you@example.com",
    messageLabel: "문의 내용",
    messagePlaceholder: "어떤 상황에서 어떤 문제가 있었는지 자세히 알려주시면 도움이 됩니다.",
    notConfiguredMsg: "문의 폼이 아직 설정되지 않았습니다. 아래 이메일로 직접 연락해주세요.",
    submitErrorMsg: "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
    submitting: "전송 중...",
    submitLabel: "문의 보내기",
    directEmailPrefix: "직접 이메일을 보내고 싶다면",
    faqTitle: "자주 묻는 질문",
    faqFooterPrefix: "개인정보 처리 관련 세부 사항은",
    faqFooterLinkLabel: "개인정보 처리방침",
    faqFooterSuffix: "페이지를 참고해주세요.",
    subjectNewInquiry: "새 문의",
    subjectFromNameSuffix: "님의 문의",
  },
  faq: [
    {
      q: "iPhone과 Apple Watch 중 하나만 써도 되나요?",
      a: "네. RunWay는 iPhone 단독, Watch 단독, 또는 둘을 미러링해서 함께 사용하는 세 가지 방식을 모두 지원합니다. 미러링 시에는 러닝을 시작한 기기가 GPS와 계산을 주도하고, 다른 기기는 결과를 실시간으로 전달받아 표시만 합니다.",
    },
    {
      q: "미러링 중 한쪽 기기가 꺼지거나 앱이 종료되면 기록이 사라지나요?",
      a: "주도 기기(GPS를 추적하는 쪽)가 종료되면 해당 러닝은 중단됩니다. 다만 종료 시점까지 기록된 데이터는 로컬에 저장되어 있으니 Logbook에서 확인할 수 있습니다.",
    },
    {
      q: "러닝 데이터는 어디에 저장되나요?",
      a: "모든 러닝 기록은 Apple의 SwiftData 프레임워크를 통해 사용자 기기 내부에만 저장됩니다. 외부 서버로 전송되거나 동기화되지 않습니다.",
    },
    {
      q: "앱을 삭제하면 기록도 함께 사라지나요?",
      a: "네. 로컬 저장 방식이기 때문에 앱을 기기에서 삭제하면 저장된 모든 러닝 데이터도 함께 삭제됩니다. 삭제 전 별도 백업 기능은 현재 제공하지 않습니다.",
    },
    {
      q: "제 위치 정보나 심박수 데이터가 외부로 전송되나요?",
      a: "아니요. RunWay는 어떠한 데이터도 외부 서버로 전송, 업로드하지 않으며 제3자 분석 도구나 광고 SDK도 사용하지 않습니다. 자세한 내용은 개인정보 처리방침 페이지에서 확인하실 수 있습니다.",
    },
    {
      q: "GPWS 경고(SINK RATE, OVERSPEED)가 예상과 다르게 울려요.",
      a: "Mission Flight 모드에서 설정한 목표 페이스와 허용 오차(Pace Deviation) 기준으로 경고가 발생합니다. 설정값을 다시 확인해보시고, 그래도 이상하다면 아래 문의 폼으로 상황을 알려주세요.",
    },
  ],
  troubleshooting: [
    {
      id: "mirroring-redesign",
      number: "01",
      title: "미러링 아키텍처 재설계",
      status: "RESOLVED",
      squawk: "Watch 주도 세션인데 iPhone이 독자적으로 GPS를 잡느라 화면 전환 지연",
      steps: [
        {
          tag: "FINDING",
          title: "문제 인식",
          body: "iPhone과 Watch가 미러링 중에도 각자 LocationService와 RunningCenter를 독립적으로 돌리고 있었다. Watch에서 시작해도 iPhone이 GPS 락을 새로 잡는 동안 딜레이가 발생.",
        },
        {
          tag: "ACTION",
          title: "방향 전환",
          body: "이미 쓰이던 startOrigin을 위치 추적 여부의 기준으로 확장. 주도 기기만 GPS를 켜고 계산 결과를 상대에게 전송, 미러링 기기는 수신 후 표시만.",
        },
        {
          tag: "DISCOVERY",
          title: "양방향 구현",
          body: "sendFlightData()가 iOS 쪽에만 있어서 iPhone → Watch 방향만 가능했다. Watch 주도 미러링에서 Watch가 계산한 데이터를 iPhone에 보낼 경로 자체가 없던 숨은 허점이었다.",
        },
        {
          tag: "RESULT",
          title: "보완",
          body: "elapsedTime을 FlightData 페이로드에 얹어 3초 throttle로 동기화. iPhone 단독 / Watch 단독 / 양방향 미러링 4가지 시나리오가 startOrigin 하나로 정리됐다.",
        },
      ],
    },
    {
      id: "nonisolated-crash",
      number: "02",
      title: "nonisolated 누락 실기기 크래시",
      status: "RESOLVED",
      squawk: "시뮬레이터는 멀쩡한데 실기기에서만 크래시",
      steps: [
        {
          tag: "FINDING",
          title: "발견",
          body: "스택 트레이스 추적 결과 session(_:activationDidCompleteWith:error:)에서 크래시 발생.",
        },
        {
          tag: "ROOT CAUSE",
          title: "원인",
          body: "클래스는 nonisolated로 선언했지만, extension 안 delegate 메서드 자체에 명시 안 하면 Xcode 26의 SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor 기본값 때문에 다시 @MainActor로 추론된다.",
        },
        {
          tag: "FINDING",
          title: "재발",
          body: "1차 수정 후에도 didReceiveUserInfo에서 동일 패턴의 크래시가 실기기에서만 재현됐다.",
        },
        {
          tag: "ACTION",
          title: "전수 점검",
          body: "+iOS, +watchOS extension의 WCSessionDelegate 콜백 전체를 점검해 빠진 nonisolated를 모두 추가했다.",
        },
      ],
    },
    {
      id: "timer-restart",
      number: "03",
      title: "Timer 재시작 문제",
      status: "RESOLVED",
      squawk: "정지 후 재시작하면 elapsedTime이 리셋도 재작동도 안 됨",
      steps: [
        {
          tag: "APPROACH",
          title: "1차 구현",
          body: "Timer.publish().connect()로 시작 시점을 직접 제어. 일시정지 구현을 염두에 두고 autoconnect() 대신 선택했다.",
        },
        {
          tag: "FINDING",
          title: "재시작 실패",
          body: "정지 후 재시작 시 타이머가 안 돎. connect()는 1회성 연결이라 한 번 cancel()한 Publisher는 재연결이 불가능하다.",
        },
        {
          tag: "ACTION",
          title: "autoconnect 전환",
          body: "start()가 호출될 때마다 autoconnect() + sink로 매번 새로 구독. Set<AnyCancellable>에 저장하고 stop() 시 removeAll()로 정리했다.",
        },
        {
          tag: "RESULT",
          title: "중복 구독 방지",
          body: "start()를 연달아 누르면 구독이 누적돼 초가 2, 3씩 뛰는 문제도 발견. start() 진입 시점에 기존 구독을 먼저 정리하도록 보완해 최종 해결했다.",
        },
      ],
    },
    {
      id: "asyncstream-continuation",
      number: "04",
      title: "AsyncStream continuation 관리",
      status: "RESOLVED",
      squawk: "위치 업데이트마다 새 스트림과 새 Task가 반복 생성됨",
      steps: [
        {
          tag: "FINDING",
          title: "발견",
          body: "Instrument의 Swift Concurrency 프로파일러로 확인한 결과, 위치 업데이트마다 새 AsyncStream과 새 Task가 반복 생성되고 있었다.",
        },
        {
          tag: "ACTION",
          title: "프로퍼티 승격",
          body: "continuation을 Actor 프로퍼티로 승격. 스트림은 한 번만 열어두고, processLocation() 내부에서 저장된 continuation으로 직접 yield()하도록 변경했다.",
        },
        {
          tag: "FINDING",
          title: "Sendable 충돌",
          body: "onTermination에서 continuation = nil 직접 호출 시 'Actor-isolated property can not be mutated from a Sendable closure' 에러. 임의 스레드에서 실행되는 @Sendable 클로저라 Actor 보호 프로퍼티에 직접 접근할 수 없다.",
        },
        {
          tag: "RESULT",
          title: "init → task 분리",
          body: "Actor-isolated 메서드(clearContinuation())를 만들고 Task { await ... }로 감싸 해결. 이후 startStream()으로 분리해 View의 .task에서 호출하도록 재정리했다.",
        },
      ],
    },
    {
      id: "state-reset",
      number: "05",
      title: "화면 이탈 시 상태 미초기화",
      status: "RESOLVED",
      squawk: "탭바로 갑자기 이탈하면 resetState()가 호출되지 않아 다음 러닝에 이전 상태가 남음",
      steps: [
        {
          tag: "FINDING",
          title: "문제 인식",
          body: "정상 흐름(버튼 클릭)만 상태 정리를 처리하고 있었고, 비정상 이탈(탭바 클릭, Watch 크라운)은 전혀 커버되지 않았다는 걸 실기기 테스트로 발견했다.",
        },
        {
          tag: "FINDING",
          title: "판단 기준",
          body: "isRunning 플래그로 판단하려 했으나, 미러링 중인 iPhone은 start()를 안 불러 세션이 살아있는데도 false인 경우가 있었다. HealthKitService.shared.session != nil로 기준을 교체했다.",
        },
        {
          tag: "ACTION",
          title: "플래그 패턴",
          body: "버튼 액션에서 didNavigateToTouchdown 같은 플래그를 먼저 true로 세팅하고, .onDisappear는 그 플래그의 부재를 '비정상 이탈'로 해석하는 패턴을 5개 View에 동일 적용했다.",
        },
        {
          tag: "RESULT",
          title: "예외 처리",
          body: "FlightSummaryView는 Logbook 열람 시에도 쓰이는 View라 selectedFlight == nil 조건으로 구분. Watch는 WatchSummaryView만 예외적으로 무조건 정리하도록 했다.",
        },
      ],
    },
    {
      id: "zombie-session",
      number: "06",
      title: "좀비 세션 - 원인 규명 후 보류",
      status: "KNOWN LIMITATION",
      squawk: "미러링 중 강제종료 → 재실행 시 PFD가 그대로 남아있음",
      steps: [
        {
          tag: "FINDING",
          title: "1차 시도",
          body: "startDate 기준 5초 경과 시 좀비로 간주하는 방식을 시도했으나 검증 불가 - 디버거로 강제종료한 직후 연결이 끊겨 로그를 확인할 수 없었다.",
        },
        {
          tag: "DISCOVERY",
          title: "원인 확정",
          body: "os_log / Console.app로 전환해 privacy 마스킹 문제를 해결한 뒤에야 진짜 원인을 특정했다. retrieveRemoteSession이 재실행 시 이미 살아있는 세션을 다시 감지하는 구조였다.",
        },
        {
          tag: "ACTION",
          title: "플래그 기반 판별",
          body: "UserDefaults 플래그(wasZombieSuspected)로 판별은 정확했으나, .end() 호출 시 Watch 세션까지 연쇄 종료되는 부작용이 발생했다.",
        },
        {
          tag: "FINDING",
          title: "대안 탐색",
          body: "appLaunchTime 비교 방식으로 전환. 좀비로 판단해도 무시하면 새 미러링이 차단되고, end()를 호출하면 앞선 부작용이 재발하는 딜레마였다.",
        },
        {
          tag: "RESULT",
          title: "구조적 한계 확정",
          body: "HKWorkoutSession은 healthd(시스템 데몬) 레벨 자원이라 앱 코드로는 완전한 제어가 불가능하다고 결론. 관련 코드를 전체 롤백하고 로깅 인프라만 유지했다.",
        },
      ],
      verdict:
        "HKWorkoutSession이 healthd(시스템 데몬) 레벨 자원이라 앱 코드로는 완전한 제어가 불가능하다고 결론. os_log/Console.app 기반으로 원인을 정확히 특정했지만, 부작용 없이는 해결이 불가능해 v1.0에서는 known limitation으로 명시했다.",
    },
  ],
};
