import type { SiteDictionary } from "./schema";

export const ja: SiteDictionary = {
  nav: {
    concept: "Concept",
    screens: "Screens",
    architecture: "Architecture",
    privacy: "Privacy",
    support: "Support",
    maintenanceLog: "Maintenance Log",
  },
  hero: {
    badge: "元航空整備士が設計したランニングアプリ",
    titleLine1: "Turn Every",
    titleLine2Prefix: "Run Into A",
    titleLine2Accent: "Flight.",
    description: [
      "A320Fの整備士出身の開発者が作ったiOSランニングトラッカー。",
      "GPS、心拍数、ケイデンスを計器のように読み取り、ペースのズレをGPWS警報でお知らせします。",
    ],
    badgeOs: "iOS 26+ · watchOS 11.5+",
    badgeStack: "SwiftUI · Actor · AsyncStream",
  },
  concept: {
    eyebrow: "Flight Operations",
    title: "2つの飛行モード",
    description: [
      "航空機の運航手順にヒントを得た状態機械が、ランニング全体を管理します。",
      "スタートボタンを押すと離陸シーケンスが始まり、走行中はリアルタイムの計器パネルが待っています。",
    ],
    modes: [
      {
        tag: "MODE A",
        title: "Mission Flight",
        desc: "目標ペースと距離を設定して運航します。許容誤差を外れるとGPWSが即座に警告します。",
        points: [
          "目標ペース ± 許容誤差の設定",
          "距離のクイック選択(3K / 5K / 10K / ハーフ / フル)",
          "目標距離の50m手前でMINIMUMS警報",
        ],
      },
      {
        tag: "MODE B",
        title: "Free Flight",
        desc: "目標を設定せず自由に走るVFR(有視界飛行方式)モード。手動でTouchdownして終了します。",
        points: ["目標設定なし", "GPWS無効", "自由なペース記録"],
      },
    ],
    gpwsEyebrow: "Ground Proximity Warning System",
    gpwsAlerts: [
      { label: "SINK RATE", desc: "目標ペースより遅い" },
      { label: "OVERSPEED", desc: "目標ペースより速い" },
      { label: "MINIMUMS", desc: "目標距離の50m手前" },
    ],
  },
  screens: {
    eyebrow: "iPhone & Apple Watch",
    title: "2つの画面、1つの飛行",
    description: [
      "WatchがリードしてもiPhoneがリードしても、両方の端末は同じFlightDataを共有します。",
      "離陸準備から着陸後の記録まで、実際の画面でご確認いただけます。",
    ],
    phoneLabel: "iPhone · 横にスクロール",
    watchLabel: "Apple Watch",
    phoneShots: [
      { key: "homeview", label: "HOME · ダッシュボード" },
      { key: "missionflight", label: "MISSION FLIGHT · 設定" },
      { key: "takeoff", label: "TAKEOFF · 事前点検" },
      { key: "missionrunning", label: "MISSION FLIGHT · CRUISE" },
      { key: "freerunning", label: "FREE FLIGHT · CRUISE" },
      { key: "touchdown", label: "TOUCHDOWN" },
      { key: "summary", label: "FLIGHT SUMMARY · マップルート" },
      { key: "logbook", label: "LOGBOOK" },
      { key: "alerts", label: "ALERTS · GPWS履歴" },
      { key: "chart", label: "FLIGHT CALENDAR" },
      { key: "dynamic-island", label: "DYNAMIC ISLAND" },
    ],
    watchShots: [
      { key: "home", label: "WATCH · モード選択" },
      { key: "running", label: "WATCH · PFD" },
      { key: "summary", label: "WATCH · サマリー" },
    ],
  },
  architecture: {
    eyebrow: "Under The Hood",
    title: "3つの設計判断",
    description: [
      "並行処理、状態管理、端末間の同期 - RunWayを作る上で",
      "最も悩んだ3つのポイントです。",
    ],
    quoteLabel: "なぜこの設計にしたのか",
    tabs: [
      { id: "actor", label: "RunningCenter Actor", eyebrow: "並行処理" },
      { id: "phase", label: "FlightPhase 状態機械", eyebrow: "状態管理" },
      { id: "mirroring", label: "Watch ミラーリング", eyebrow: "端末間同期" },
    ],
    actor: {
      quote:
        "GPS、心拍数、ケイデンスが同時に入ってくるため、状態の整合性を保証するためにRunningCenter Actorを設け、すべてのランニング計算を単一の隔離領域で処理しました。",
    },
    phase: {
      quote: [
        "各画面が独立して状態を判断すると、画面間で不整合が生じます。",
        "航空機の運航フェーズにヒントを得たFlightPhaseをアプリ全体が参照するようにし、Dynamic IslandとWatch、iPhoneのPFDが常に同じ状態を表示するようにしました。",
      ],
    },
    mirroring: {
      leadingLabel: "GPS + 計算担当",
      followingLabel: "受信 + 表示のみ",
      payloadLabel: "FlightData(elapsedTime含む、3秒throttle)",
      quote: [
        "最初はミラーリング中でもiPhoneとWatchがそれぞれ独自にGPSを取得していました。",
        "主導端末(startOrigin)のみが位置を追跡し、計算結果を相手に送る構造に変更したことで、重複した計算がなくなり、画面切り替えの遅延も解消されました。",
      ],
    },
    stack: [
      { label: "SwiftUI", role: "UI" },
      { label: "@MainActor + @Observable", role: "状態管理" },
      { label: "RunningCenter (Actor)", role: "並行処理" },
      { label: "AsyncStream", role: "センサー → ViewModel" },
      { label: "FlightPhase enum", role: "状態機械" },
      { label: "WatchConnectivity", role: "iPhone ↔ Watch" },
      { label: "SwiftData", role: "保存" },
      { label: "MapKit + MapPolyline", role: "ルート可視化" },
    ],
  },
  footer: {
    tagline: "CLEARED FOR TAKE-OFF",
    description: [
      "元航空整備士の哲学が息づく精密ランニングソリューション。",
      "Rotateとともに、飛行を始めましょう。",
    ],
    githubLabel: "GitHub",
    blogLabel: "Blog",
    bottomLine: "RunWay - Turn Every Run Into A Flight",
  },
  troubleshootingPage: {
    backLabel: "RunWayホームへ",
    eyebrow: "Maintenance Log",
    title: "整備記録",
    description: [
      "開発中に実際に直面した問題と原因追跡、解決までの過程を",
      "整備ログの形式でまとめました。すべてが解決したわけではなく、",
      "構造的な限界は限界として正直に残しています。",
    ],
    resolvedLabel: "Resolved",
    limitationLabel: "Known Limitation",
    verdictLabel: "FINAL VERDICT",
  },
  supportPage: {
    backLabel: "RunWayホームへ",
    eyebrow: "Support",
    title: "サポート・お問い合わせ",
    description: [
      "バグを発見された方、機能のご提案がある方は下記フォームからお知らせください。",
      "よくある質問はその下でも確認いただけます。",
    ],
    successTitle: "お問い合わせを送信しました",
    successBody: "確認後、ご入力いただいたメールアドレスへご返信いたします。",
    categoryLabel: "お問い合わせの種類",
    categories: [
      { id: "bug", label: "バグ報告" },
      { id: "feature", label: "機能の提案" },
      { id: "other", label: "その他のお問い合わせ" },
    ],
    nameLabel: "お名前(任意)",
    namePlaceholder: "山田太郎",
    emailLabel: "メールアドレス",
    emailPlaceholder: "you@example.com",
    messageLabel: "お問い合わせ内容",
    messagePlaceholder: "どのような状況でどんな問題が発生したか、詳しく教えていただけると助かります。",
    notConfiguredMsg: "お問い合わせフォームはまだ設定されていません。下記のメールアドレスへ直接ご連絡ください。",
    submitErrorMsg: "送信に失敗しました。しばらくしてから再度お試しください。",
    submitting: "送信中...",
    submitLabel: "送信する",
    directEmailPrefix: "直接メールで連絡したい方は",
    faqTitle: "よくある質問",
    faqFooterPrefix: "個人情報の取り扱いについての詳細は",
    faqFooterLinkLabel: "プライバシーポリシー",
    faqFooterSuffix: "ページをご参照ください。",
    subjectNewInquiry: "新しいお問い合わせ",
    subjectFromNameSuffix: "様からのお問い合わせ",
  },
  faq: [
    {
      q: "iPhoneかApple Watchのどちらか一方だけでも使えますか?",
      a: "はい。RunWayはiPhone単独、Watch単独、または両方をミラーリングして使う3つの方式すべてに対応しています。ミラーリング時は、ランニングを開始した端末がGPSと計算を主導し、もう一方の端末は結果をリアルタイムで受信して表示するだけです。",
    },
    {
      q: "ミラーリング中に片方の端末の電源が切れたりアプリが終了したりすると、記録は消えますか?",
      a: "主導端末(GPSを追跡している側)が終了すると、そのランニングは中断されます。ただし終了時点までのデータはローカルに保存されているため、Logbookで確認できます。",
    },
    {
      q: "ランニングデータはどこに保存されますか?",
      a: "すべてのランニング記録は、AppleのSwiftDataフレームワークを通じてお使いの端末内にのみ保存されます。外部サーバーへ送信されたり、同期されたりすることはありません。",
    },
    {
      q: "アプリを削除すると記録も一緒に消えますか?",
      a: "はい。ローカル保存方式のため、端末からアプリを削除すると保存されているすべてのランニングデータも一緒に削除されます。削除前の個別バックアップ機能は現在提供していません。",
    },
    {
      q: "位置情報や心拍数データが外部に送信されることはありますか?",
      a: "いいえ。RunWayはいかなるデータも外部サーバーへ送信・アップロードすることはなく、第三者の分析ツールや広告SDKも使用していません。詳細はプライバシーポリシーページをご確認ください。",
    },
    {
      q: "GPWS警告(SINK RATE、OVERSPEED)が想定と違うタイミングで鳴ります。",
      a: "Mission Flightモードで設定した目標ペースと許容誤差(Pace Deviation)を基準に警告が発生します。設定値を再度ご確認いただき、それでもおかしいと感じる場合は下記のお問い合わせフォームから状況をお知らせください。",
    },
  ],
  troubleshooting: [
    {
      id: "mirroring-redesign",
      number: "01",
      title: "ミラーリングアーキテクチャの再設計",
      status: "RESOLVED",
      squawk: "Watch主導のセッションなのに、iPhoneが独自にGPSを取得しようとして画面切り替えが遅延",
      steps: [
        {
          tag: "FINDING",
          title: "問題の認識",
          body: "ミラーリング中でもiPhoneとWatchがそれぞれ独自にLocationServiceとRunningCenterを動かしていた。Watchから開始しても、iPhoneが新たにGPSロックを取得する間に遅延が発生していた。",
        },
        {
          tag: "ACTION",
          title: "方向転換",
          body: "既存のstartOriginを位置追跡の要否を判断する基準にまで拡張。主導端末のみGPSをオンにして計算結果を相手に送信し、ミラーリング端末は受信後に表示するだけとした。",
        },
        {
          tag: "DISCOVERY",
          title: "双方向の実装",
          body: "sendFlightData()がiOS側にしか存在せず、iPhone → Watch方向にしか送れなかった。Watch主導のミラーリングでは、Watchが計算したデータをiPhoneに送る経路そのものが存在しないという隠れた盲点だった。",
        },
        {
          tag: "RESULT",
          title: "補完",
          body: "elapsedTimeをFlightDataのペイロードに乗せ、3秒スロットルで同期。iPhone単独 / Watch単独 / 双方向ミラーリングの4つのシナリオがstartOrigin一つで整理された。",
        },
      ],
    },
    {
      id: "nonisolated-crash",
      number: "02",
      title: "nonisolated漏れによる実機クラッシュ",
      status: "RESOLVED",
      squawk: "シミュレーターでは問題ないのに実機でのみクラッシュ",
      steps: [
        {
          tag: "FINDING",
          title: "発見",
          body: "スタックトレースを追跡した結果、session(_:activationDidCompleteWith:error:)内でクラッシュが発生していた。",
        },
        {
          tag: "ROOT CAUSE",
          title: "原因",
          body: "クラス自体はnonisolatedで宣言していたが、extension内のdelegateメソッド自体に明示しないと、Xcode 26のSWIFT_DEFAULT_ACTOR_ISOLATION = MainActorのデフォルト設定により再び@MainActorと推論されてしまう。",
        },
        {
          tag: "FINDING",
          title: "再発",
          body: "1次修正後もdidReceiveUserInfo内で同じパターンのクラッシュが実機でのみ再現した。",
        },
        {
          tag: "ACTION",
          title: "全数点検",
          body: "+iOS、+watchOS extensionのWCSessionDelegateコールバックを全て点検し、漏れていたnonisolatedをすべて追加した。",
        },
      ],
    },
    {
      id: "timer-restart",
      number: "03",
      title: "Timer再起動の問題",
      status: "RESOLVED",
      squawk: "停止後に再開してもelapsedTimeがリセットも再作動もしない",
      steps: [
        {
          tag: "APPROACH",
          title: "1次実装",
          body: "Timer.publish().connect()で開始タイミングを直接制御。一時停止の実装を見据えてautoconnect()の代わりに選択した。",
        },
        {
          tag: "FINDING",
          title: "再起動の失敗",
          body: "停止後に再開してもタイマーが動かない。connect()は一回限りの接続で、一度cancel()したPublisherは再接続できない。",
        },
        {
          tag: "ACTION",
          title: "autoconnectへの転換",
          body: "start()が呼ばれるたびにautoconnect() + sinkで毎回新しく購読。Set<AnyCancellable>に保存し、stop()時にremoveAll()で整理した。",
        },
        {
          tag: "RESULT",
          title: "重複購読の防止",
          body: "start()を連続で押すと購読が積み重なり、秒数が2、3ずつ飛ぶ問題も発見。start()の実行時点で既存の購読を先に整理するよう補完し、最終的に解決した。",
        },
      ],
    },
    {
      id: "asyncstream-continuation",
      number: "04",
      title: "AsyncStream continuationの管理",
      status: "RESOLVED",
      squawk: "位置情報が更新されるたびに新しいストリームと新しいTaskが繰り返し生成される",
      steps: [
        {
          tag: "FINDING",
          title: "発見",
          body: "InstrumentsのSwift Concurrencyプロファイラーで確認したところ、位置情報の更新のたびに新しいAsyncStreamと新しいTaskが繰り返し生成されていた。",
        },
        {
          tag: "ACTION",
          title: "プロパティへの昇格",
          body: "continuationをActorのプロパティに昇格。ストリームは一度だけ開いておき、processLocation()内部で保存されたcontinuationから直接yield()するように変更した。",
        },
        {
          tag: "FINDING",
          title: "Sendableの衝突",
          body: "onTerminationでcontinuation = nilを直接呼び出すと「Actor-isolated property can not be mutated from a Sendable closure」エラー。任意のスレッドで実行される@Sendableクロージャのため、Actor保護されたプロパティに直接アクセスできない。",
        },
        {
          tag: "RESULT",
          title: "init → taskの分離",
          body: "Actor-isolatedなメソッド(clearContinuation())を作り、Task { await ... }で包んで解決。その後startStream()として分離し、Viewの.taskから呼び出すよう再整理した。",
        },
      ],
    },
    {
      id: "state-reset",
      number: "05",
      title: "画面離脱時に状態が初期化されない",
      status: "RESOLVED",
      squawk: "タブバーで突然離脱するとresetState()が呼ばれず、次のランニングに前の状態が残る",
      steps: [
        {
          tag: "FINDING",
          title: "問題の認識",
          body: "正常なフロー(ボタンクリック)だけが状態整理を処理しており、異常な離脱(タブバーのクリック、Watchのクラウン操作)は全くカバーされていないことを実機テストで発見した。",
        },
        {
          tag: "FINDING",
          title: "判断基準",
          body: "isRunningフラグで判断しようとしたが、ミラーリング中のiPhoneはstart()を呼ばないため、セッションが生きていてもfalseになる場合があった。HealthKitService.shared.session != nilを基準に置き換えた。",
        },
        {
          tag: "ACTION",
          title: "フラグパターン",
          body: "ボタンアクションでdidNavigateToTouchdownのようなフラグを先にtrueに設定し、.onDisappearはそのフラグが立っていないことを「異常離脱」と解釈するパターンを5つのViewに同様に適用した。",
        },
        {
          tag: "RESULT",
          title: "例外処理",
          body: "FlightSummaryViewはLogbook閲覧時にも使われるViewのため、selectedFlight == nil条件で区別。Watchは WatchSummaryViewのみ例外的に無条件で整理するようにした。",
        },
      ],
    },
    {
      id: "zombie-session",
      number: "06",
      title: "ゾンビセッション - 原因究明後、保留",
      status: "KNOWN LIMITATION",
      squawk: "ミラーリング中に強制終了 → 再起動時にPFDがそのまま残っている",
      steps: [
        {
          tag: "FINDING",
          title: "1次試行",
          body: "startDate基準で5秒経過したらゾンビとみなす方式を試みたが検証不可 - デバッガーで強制終了した直後に接続が切れ、ログを確認できなかった。",
        },
        {
          tag: "DISCOVERY",
          title: "原因の特定",
          body: "os_log / Console.appに切り替えてprivacyマスキングの問題を解決した後、ようやく本当の原因を特定した。retrieveRemoteSessionが再起動時に既に生きているセッションを再検知する構造だった。",
        },
        {
          tag: "ACTION",
          title: "フラグベースの判別",
          body: "UserDefaultsフラグ(wasZombieSuspected)による判別は正確だったが、.end()呼び出し時にWatchセッションまで連鎖終了する副作用が発生した。",
        },
        {
          tag: "FINDING",
          title: "代替案の模索",
          body: "appLaunchTime比較方式へ転換。ゾンビと判断しても無視すると新しいミラーリングがブロックされ、end()を呼ぶと先の副作用が再発するというジレンマだった。",
        },
        {
          tag: "RESULT",
          title: "構造的限界の確定",
          body: "HKWorkoutSessionはhealthd(システムデーモン)レベルのリソースであり、アプリコードでは完全な制御が不可能だと結論。関連コードを全てロールバックし、ロギングインフラのみ維持した。",
        },
      ],
      verdict:
        "HKWorkoutSessionはhealthd(システムデーモン)レベルのリソースであり、アプリコードでは完全な制御が不可能だと結論。os_log/Console.appベースで原因を正確に特定したが、副作用なしでの解決が不可能だったためv1.0ではknown limitationとして明記した。",
    },
  ],
};
