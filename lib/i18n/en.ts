import type { SiteDictionary } from "./schema";

export const en: SiteDictionary = {
  nav: {
    concept: "Concept",
    screens: "Screens",
    architecture: "Architecture",
    privacy: "Privacy",
    support: "Support",
    maintenanceLog: "Maintenance Log",
  },
  hero: {
    badge: "A running app designed by an ex-aircraft mechanic",
    titleLine1: "Turn Every",
    titleLine2Prefix: "Run Into A",
    titleLine2Accent: "Flight.",
    description: [
      "An iOS running tracker built by a developer who used to maintain A320F aircraft.",
      "Read your GPS, heart rate, and cadence like a flight instrument, and get pace deviations as GPWS-style warnings.",
    ],
    badgeOs: "iOS 26+ · watchOS 11.5+",
    badgeStack: "SwiftUI · Actor · AsyncStream",
  },
  concept: {
    eyebrow: "Flight Operations",
    title: "Two Flight Modes",
    description: [
      "A state machine modeled after aircraft operating procedures runs the entire session.",
      "Press start for a takeoff sequence, then a live instrument panel takes over for the run.",
    ],
    modes: [
      {
        tag: "MODE A",
        title: "Mission Flight",
        desc: "Set a target pace and distance, then fly the mission. GPWS warns you the moment you drift outside the allowed deviation.",
        points: [
          "Target pace ± deviation setting",
          "Quick distance presets (3K / 5K / 10K / Half / Full)",
          "MINIMUMS alert 50m before the target distance",
        ],
      },
      {
        tag: "MODE B",
        title: "Free Flight",
        desc: "A VFR-style mode for running without a fixed goal. End the session manually with Touchdown.",
        points: ["No target set", "GPWS disabled", "Free-form pace logging"],
      },
    ],
    gpwsEyebrow: "Ground Proximity Warning System",
    gpwsAlerts: [
      { label: "SINK RATE", desc: "Slower than target pace" },
      { label: "OVERSPEED", desc: "Faster than target pace" },
      { label: "MINIMUMS", desc: "50m before target distance" },
    ],
  },
  screens: {
    eyebrow: "iPhone & Apple Watch",
    title: "Two Screens, One Flight",
    description: [
      "Whether the Watch or the iPhone leads, both devices share the same FlightData.",
      "Take a look at every real screen, from pre-flight checks to the post-landing log.",
    ],
    phoneLabel: "iPhone · scroll sideways",
    watchLabel: "Apple Watch",
    phoneShots: [
      { key: "homeview", label: "HOME · Dashboard" },
      { key: "missionflight", label: "MISSION FLIGHT · Setup" },
      { key: "takeoff", label: "TAKEOFF · Pre-flight check" },
      { key: "missionrunning", label: "MISSION FLIGHT · CRUISE" },
      { key: "freerunning", label: "FREE FLIGHT · CRUISE" },
      { key: "touchdown", label: "TOUCHDOWN" },
      { key: "summary", label: "FLIGHT SUMMARY · Map route" },
      { key: "logbook", label: "LOGBOOK" },
      { key: "alerts", label: "ALERTS · GPWS history" },
      { key: "chart", label: "FLIGHT CALENDAR" },
      { key: "dynamic-island", label: "DYNAMIC ISLAND" },
    ],
    watchShots: [
      { key: "home", label: "WATCH · Mode select" },
      { key: "running", label: "WATCH · PFD" },
      { key: "summary", label: "WATCH · Summary" },
    ],
  },
  architecture: {
    eyebrow: "Under The Hood",
    title: "Three Design Decisions",
    description: [
      "Concurrency, state management, and cross-device sync - the three areas",
      "I thought hardest about while building RunWay.",
    ],
    quoteLabel: "Why it's designed this way",
    tabs: [
      { id: "actor", label: "RunningCenter Actor", eyebrow: "Concurrency" },
      { id: "phase", label: "FlightPhase State Machine", eyebrow: "State management" },
      { id: "mirroring", label: "Watch Mirroring", eyebrow: "Cross-device sync" },
    ],
    actor: {
      quote:
        "GPS, heart rate, and cadence all arrive concurrently, so to guarantee state integrity I put a RunningCenter Actor in place and routed every running calculation through a single isolated region.",
    },
    phase: {
      quote: [
        "When every screen decides its own state independently, screens drift out of sync with each other.",
        "I introduced a single FlightPhase, modeled after aircraft flight phases, that the whole app references - so Dynamic Island, Watch, and iPhone PFD always show the same state.",
      ],
    },
    mirroring: {
      leadingLabel: "GPS + calculation",
      followingLabel: "Receive + display only",
      payloadLabel: "FlightData (includes elapsedTime, 3s throttle)",
      quote: [
        "At first, both the iPhone and the Watch were tracking GPS on their own even while mirroring.",
        "Switching to a structure where only the leading device (startOrigin) tracks location and sends the computed results to the other eliminated the duplicate computation and the lag when switching screens.",
      ],
    },
    stack: [
      { label: "SwiftUI", role: "UI" },
      { label: "@MainActor + @Observable", role: "State management" },
      { label: "RunningCenter (Actor)", role: "Concurrency" },
      { label: "AsyncStream", role: "Sensors → ViewModel" },
      { label: "FlightPhase enum", role: "State machine" },
      { label: "WatchConnectivity", role: "iPhone ↔ Watch" },
      { label: "SwiftData", role: "Storage" },
      { label: "MapKit + MapPolyline", role: "Route visualization" },
    ],
  },
  footer: {
    tagline: "CLEARED FOR TAKE-OFF",
    description: [
      "A precision running solution built on a former aircraft mechanic's philosophy.",
      "Rotate, and start your flight.",
    ],
    githubLabel: "GitHub",
    blogLabel: "Blog",
    bottomLine: "RunWay - Turn Every Run Into A Flight",
  },
  troubleshootingPage: {
    backLabel: "Back to RunWay",
    eyebrow: "Maintenance Log",
    title: "Maintenance Log",
    description: [
      "Real problems I ran into during development, how I traced the root cause,",
      "and how I resolved them - written up in a maintenance-log format.",
      "Not everything got fixed, and structural limitations are labeled honestly as limitations.",
    ],
    resolvedLabel: "Resolved",
    limitationLabel: "Known Limitation",
    verdictLabel: "FINAL VERDICT",
  },
  supportPage: {
    backLabel: "Back to RunWay",
    eyebrow: "Support",
    title: "Support & Contact",
    description: [
      "Found a bug or have a feature suggestion? Let me know using the form below.",
      "You can also check the FAQ section further down first.",
    ],
    successTitle: "Your message has been sent",
    successBody: "I'll get back to you at the email address you provided.",
    categoryLabel: "Inquiry type",
    categories: [
      { id: "bug", label: "Bug report" },
      { id: "feature", label: "Feature request" },
      { id: "other", label: "Other" },
    ],
    nameLabel: "Name (optional)",
    namePlaceholder: "Jane Doe",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Please describe the situation and what went wrong in as much detail as you can.",
    notConfiguredMsg: "The contact form isn't configured yet. Please reach out via the email below instead.",
    submitErrorMsg: "Failed to send. Please try again in a moment.",
    submitting: "Sending...",
    submitLabel: "Send message",
    directEmailPrefix: "Prefer to email directly?",
    faqTitle: "Frequently Asked Questions",
    faqFooterPrefix: "For details on data handling, see the",
    faqFooterLinkLabel: "Privacy Policy",
    faqFooterSuffix: "page.",
    subjectNewInquiry: "New inquiry",
    subjectFromNameSuffix: "'s inquiry",
  },
  faq: [
    {
      q: "Can I use just the iPhone or just the Apple Watch?",
      a: "Yes. RunWay supports iPhone-only, Watch-only, and mirrored use across both devices. When mirroring, whichever device starts the run leads GPS tracking and calculation, while the other device only receives and displays the results in real time.",
    },
    {
      q: "If one device turns off or the app quits during mirroring, does the record get lost?",
      a: "If the leading device (the one tracking GPS) quits, that run stops. However, everything recorded up to that point is saved locally, so you can still find it in the Logbook.",
    },
    {
      q: "Where is my running data stored?",
      a: "All running records are stored locally on your device only, using Apple's SwiftData framework. Nothing is transmitted or synced to external servers.",
    },
    {
      q: "If I delete the app, is my data deleted too?",
      a: "Yes. Since storage is local-only, deleting the app also deletes all saved running data. There's currently no separate backup feature.",
    },
    {
      q: "Is my location or heart rate data sent anywhere external?",
      a: "No. RunWay never transmits or uploads any data to external servers, and doesn't use any third-party analytics or advertising SDKs. See the Privacy Policy page for details.",
    },
    {
      q: "The GPWS alerts (SINK RATE, OVERSPEED) aren't behaving as expected.",
      a: "Alerts are triggered based on the target pace and allowed Pace Deviation you set in Mission Flight mode. Double-check those settings, and if something still seems off, let me know through the form below.",
    },
  ],
  troubleshooting: [
    {
      id: "mirroring-redesign",
      number: "01",
      title: "Redesigning the Mirroring Architecture",
      status: "RESOLVED",
      squawk: "Even in a Watch-led session, the iPhone tracked GPS on its own, causing a lag when switching screens",
      steps: [
        {
          tag: "FINDING",
          title: "Identifying the problem",
          body: "Even while mirroring, the iPhone and Watch were each running their own LocationService and RunningCenter independently. Starting from the Watch still caused a delay while the iPhone acquired its own GPS lock.",
        },
        {
          tag: "ACTION",
          title: "Changing direction",
          body: "Extended the existing startOrigin property to also govern whether a device tracks location. Only the leading device turns on GPS and sends the computed results to the other; the mirroring device just receives and displays.",
        },
        {
          tag: "DISCOVERY",
          title: "Implementing both directions",
          body: "sendFlightData() only existed on the iOS side, so data could only flow iPhone → Watch. In a Watch-led mirroring session, there was no path at all for the Watch's computed data to reach the iPhone - a hidden gap.",
        },
        {
          tag: "RESULT",
          title: "Closing the gap",
          body: "Added elapsedTime to the FlightData payload and synced it with a 3-second throttle. All four scenarios - iPhone-only, Watch-only, and bidirectional mirroring - now resolve to a single startOrigin-based flow.",
        },
      ],
    },
    {
      id: "nonisolated-crash",
      number: "02",
      title: "Real-Device Crash from a Missing nonisolated",
      status: "RESOLVED",
      squawk: "Worked fine in the simulator, crashed only on a real device",
      steps: [
        {
          tag: "FINDING",
          title: "Discovery",
          body: "Stack trace tracing pointed to a crash inside session(_:activationDidCompleteWith:error:).",
        },
        {
          tag: "ROOT CAUSE",
          title: "Root cause",
          body: "The class itself was declared nonisolated, but without marking the delegate methods inside the extension explicitly, Xcode 26's SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor default re-inferred them as @MainActor.",
        },
        {
          tag: "FINDING",
          title: "Recurrence",
          body: "Even after the first fix, the same crash pattern reappeared - only on real devices - inside didReceiveUserInfo.",
        },
        {
          tag: "ACTION",
          title: "Full audit",
          body: "Audited every WCSessionDelegate callback across both the +iOS and +watchOS extensions and added the missing nonisolated everywhere it was needed.",
        },
      ],
    },
    {
      id: "timer-restart",
      number: "03",
      title: "Timer Restart Issue",
      status: "RESOLVED",
      squawk: "After stopping, restarting wouldn't reset or resume elapsedTime",
      steps: [
        {
          tag: "APPROACH",
          title: "First implementation",
          body: "Used Timer.publish().connect() to control the start point directly, choosing it over autoconnect() with pause support in mind.",
        },
        {
          tag: "FINDING",
          title: "Restart failure",
          body: "The timer wouldn't run again after a restart. connect() is a one-time connection - once a Publisher is cancel()'d, it can't be reconnected.",
        },
        {
          tag: "ACTION",
          title: "Switching to autoconnect",
          body: "Switched to subscribing fresh with autoconnect() + sink every time start() is called, storing it in a Set<AnyCancellable> and clearing it with removeAll() on stop().",
        },
        {
          tag: "RESULT",
          title: "Preventing duplicate subscriptions",
          body: "Found that tapping start() repeatedly stacked up subscriptions, making seconds jump by 2 or 3 at once. Clearing any existing subscription right when start() runs fixed it for good.",
        },
      ],
    },
    {
      id: "asyncstream-continuation",
      number: "04",
      title: "Managing the AsyncStream continuation",
      status: "RESOLVED",
      squawk: "A new stream and a new Task were being created on every location update",
      steps: [
        {
          tag: "FINDING",
          title: "Discovery",
          body: "Instruments' Swift Concurrency profiler showed that a new AsyncStream and a new Task were being spun up on every single location update.",
        },
        {
          tag: "ACTION",
          title: "Promoting to a property",
          body: "Promoted the continuation to an Actor property. The stream is now opened only once, and processLocation() yields directly through the stored continuation.",
        },
        {
          tag: "FINDING",
          title: "Sendable conflict",
          body: "Setting continuation = nil directly inside onTermination threw 'Actor-isolated property can not be mutated from a Sendable closure' - the closure runs on an arbitrary thread, so it can't touch an Actor-protected property directly.",
        },
        {
          tag: "RESULT",
          title: "Splitting init from a task",
          body: "Created an Actor-isolated method (clearContinuation()) and wrapped it in Task { await ... }. Later split this out into startStream(), called from the View's .task, to clean up the flow further.",
        },
      ],
    },
    {
      id: "state-reset",
      number: "05",
      title: "State Not Resetting on Screen Exit",
      status: "RESOLVED",
      squawk: "Jumping to the tab bar abruptly meant resetState() never ran, leaving stale state for the next run",
      steps: [
        {
          tag: "FINDING",
          title: "Identifying the problem",
          body: "Only the normal flow (tapping a button) handled state cleanup - abnormal exits like tapping the tab bar or turning the Watch crown weren't covered at all, something I only caught through real-device testing.",
        },
        {
          tag: "FINDING",
          title: "Choosing the right signal",
          body: "Tried using an isRunning flag, but on the iPhone during mirroring, start() is never called, so the flag could read false even though a session was still alive. Switched the check to HealthKitService.shared.session != nil instead.",
        },
        {
          tag: "ACTION",
          title: "Flag pattern",
          body: "Button actions now set a flag like didNavigateToTouchdown to true first, and .onDisappear interprets the absence of that flag as an 'abnormal exit.' Applied the same pattern consistently across five Views.",
        },
        {
          tag: "RESULT",
          title: "Handling the exception",
          body: "FlightSummaryView is also reused for browsing the Logbook, so it's distinguished with a selectedFlight == nil condition. On Watch, only WatchSummaryView is set to always clean up unconditionally.",
        },
      ],
    },
    {
      id: "zombie-session",
      number: "06",
      title: "Zombie Session - Root Cause Found, Fix Deferred",
      status: "KNOWN LIMITATION",
      squawk: "Force-quitting during mirroring and relaunching leaves the old PFD state on screen",
      steps: [
        {
          tag: "FINDING",
          title: "First attempt",
          body: "Tried treating a session as a zombie if 5 seconds had passed since startDate, but couldn't verify it - force-quitting via the debugger immediately severed the connection, making it impossible to check the logs.",
        },
        {
          tag: "DISCOVERY",
          title: "Pinning down the cause",
          body: "Only after switching to os_log / Console.app and resolving a privacy-masking issue did the real cause come into focus: retrieveRemoteSession was re-detecting a session that was already alive on relaunch.",
        },
        {
          tag: "ACTION",
          title: "Flag-based detection",
          body: "A UserDefaults flag (wasZombieSuspected) detected the condition accurately, but calling .end() on it triggered a side effect - it cascaded into ending the Watch session too.",
        },
        {
          tag: "FINDING",
          title: "Exploring alternatives",
          body: "Tried comparing appLaunchTime instead. Ignoring a detected zombie blocked new mirroring sessions, while calling end() reintroduced the earlier side effect - a genuine dilemma.",
        },
        {
          tag: "RESULT",
          title: "Confirming the structural limit",
          body: "Concluded that HKWorkoutSession is a healthd (system daemon) level resource that app code simply can't fully control. Rolled back all related code and kept only the logging infrastructure.",
        },
      ],
      verdict:
        "Concluded that HKWorkoutSession is a healthd (system daemon) level resource that app code can't fully control. os_log/Console.app tracing pinpointed the exact cause, but with no fix possible without side effects, this was documented as a known limitation for v1.0.",
    },
  ],
};
