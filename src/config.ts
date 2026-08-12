import type {
    SiteConfig,
    ProfileConfig,
    LabConfig
} from "./types/config"

export const siteConfig: SiteConfig = {
    title: "EV",
    subTitle: "EV 的网络日志",

    backgroundImage: {
        enabled: false, // If backgroundImage is not enabled, this will be used as the background color
        url: "assets/background.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    },

    mirrorSite: {
        enabled: false, // If mirrorSite is enabled, this will alart the user to visit the mirror site if user is in region below
        url: "www.einverne.info",
        region: "CN" // Region of the mirror site, 
    },

    cache: {
        ttlMs: 24 * 60 * 60 * 1000, // 1 day cache by default
    },

    favicon: "/favicon/favicon.ico" // Path of the favicon, relative to the /public directory
}

export const profileConfig: ProfileConfig = {
    avatar: "assets/avatar.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    name: "Ein Verne",
    description: "Ein Verne 的网络日志",
    introPage: "https://einverne.info",
    links: [
        /* -------------------------------- Icon -------------------------------- */
        // Visit https://icones.js.org/ for icon codes
        // You will need to install the corresponding icon set if it's not already included
        // `pnpm add @iconify-json/<icon-set-name>`
        // Then add icon to defineConfig.integrationsin.icon in astro.config.mjs
        // You can also use local svg icons end with .svg, relative to the src directory
        // eg. `icon: "assets/icons/github.svg"`
        /* -------------------------------- Color -------------------------------- */
        // The colors a best to be clearly visible in both light and dark environments 
        // If color is not set, it will use the icon's default color
        {
            name: "技术笔记 Blog",
            url: "https://blog.einverne.info",
            icon: "fa6-solid:blog",
            color: "#0dbc79",
        },
        {
            name: "EV 杂谈",
            url: "https://www.einverne.info",
            icon: "fa6-solid:pen-to-square",
            color: "#000",
        },
        {
            name: "EV 的日本生活记录",
            url: "https://evjp.life",
            icon: "fa6-solid:house",
            color: "#000",
        },
        {
            name: "GitHub",
            url: "https://github.com/einverne",
            icon: "simple-icons:github",
            color: "#000",
        },
        {
            name: "X(Twitter)",
            url: "https://x.com/einverne",
            icon: "simple-icons:x",
            color: "#000",
        },
        {
            name: "YouTube",
            url: "https://www.youtube.com/@einverne",
            icon: "simple-icons:youtube",
            color: "#ff0000",
        },
        {
            name: "Bilibili",
            url: "https://space.bilibili.com/4849599/",
            icon: "simple-icons:bilibili",
            color: "#b4a992",
        },
        {
            name: "Douban",
            url: "https://www.douban.com/people/einverne",
            icon: "simple-icons:douban",
            color: "#2e963d",
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/einverne",
            icon: "simple-icons:linkedin",
            color: "#0077b5",
        },
        {
            name: "Instagram",
            url: "https://instagram.com/einverne",
            icon: "simple-icons:instagram",
            color: "#e1306c",
        },
        {
            name: "Homer",
            url: "https://homer.einverne.info/",
            icon: "fa6-solid:server",
            color: "#72b6b3",
        },
        {
            name: "About",
            url: "/about",
            icon: "fa6-solid:circle-user",
            color: "#72b6b3",
        },
        {
            name: "Lab",
            url: "/lab",
            icon: "fa6-solid:flask",
            color: "#72b6b3",
        },
        {
            name: "Mail",
            url: "mailto:admin@einverne.info",
            icon: "fa6-solid:envelope",
            color: "#43a4d1ff"
        },
    ]
}

export const labConfig: LabConfig = [
    // Icon and color rules are same as profileConfig
    {
        name: {
            zh: "复利计算器",
            en: "Compound Interest Calculator",
            ja: "複利計算機",
        },
        description: {
            zh: "复利计算器 - 见证时间与复利的力量",
            en: "Compound interest calculator - see the power of time and compounding",
            ja: "複利計算機 - 時間と複利の力を実感",
        },
        url: "/zh/tools/compound-interest",
        icon: "fa6-solid:calculator",
        color: "#10b981"
    },
    {
        name: {
            zh: "日本税负计算器",
            en: "Japan Tax Calculator",
            ja: "日本税負担シミュレーター",
        },
        description: {
            zh: "日本薪资所得税、住民税、社会保险扣除计算",
            en: "Calculate Japanese income tax, resident tax, and social insurance",
            ja: "所得税・住民税・社会保険料の控除額を計算",
        },
        url: "/zh/tools/japan-tax",
        icon: "fa6-solid:yen-sign",
        color: "#ef4444"
    },
    {
        name: {
            zh: "工具箱",
            en: "Tools",
            ja: "ツール",
        },
        description: {
            zh: "常用在线工具集合",
            en: "A collection of useful online tools",
            ja: "便利なオンラインツール集",
        },
        url: "https://tools.einverne.info/",
        icon: "fa6-solid:screwdriver-wrench",
        color: "#f59e0b"
    },
    {
        name: {
            zh: "OpenList",
            en: "OpenList",
            ja: "OpenList",
        },
        description: {
            zh: "OpenList 开源文件列表服务",
            en: "OpenList open-source file listing service",
            ja: "OpenList オープンソースのファイルリストサービス",
        },
        url: "https://openlist.einverne.info",
        icon: "fa6-solid:folder-open",
        color: "#f97316"
    },
    {
        name: {
            zh: "SearXNG",
            en: "SearXNG",
            ja: "SearXNG",
        },
        description: {
            zh: "SearXNG 开源元搜索引擎",
            en: "SearXNG open-source metasearch engine",
            ja: "SearXNG オープンソースのメタサーチエンジン",
        },
        url: "https://s.einverne.info",
        icon: "fa6-solid:magnifying-glass",
        color: "#0ea5e9"
    },
    {
        name: {
            zh: "旋律",
            en: "Melody",
            ja: "メロディー",
        },
        description: {
            zh: "音乐与旋律相关服务",
            en: "A service for music and melodies",
            ja: "音楽とメロディーに関するサービス",
        },
        url: "https://melody.einverne.info/",
        icon: "fa6-solid:music",
        color: "#06b6d4"
    },
    {
        name: {
            zh: "EV 托管",
            en: "EV Hosting",
            ja: "EV ホスティング",
        },
        description: {
            zh: "我的项目托管服务",
            en: "A hosting service for my projects",
            ja: "プロジェクト向けのホスティングサービス",
        },
        url: "https://client.einverne.info",
        icon: "fa6-solid:server",
        color: "#9fa1a1ff"
    },
    {
        name: {
            zh: "EV API",
            en: "EV API",
            ja: "EV API",
        },
        description: {
            zh: "LLM API 代理",
            en: "A LLM API Proxy",
            ja: "LLM API プロキシ",
        },
        url: "https://api.einverne.info",
        icon: "fa6-solid:robot",
        color: "#9fa1a1ff"
    },
    {
        name: {
            zh: "EV 投资",
            en: "EV Invest",
            ja: "EV 投資",
        },
        description: {
            zh: "投资",
            en: "Investment",
            ja: "投資",
        },
        url: "https://invest.einverne.info",
        icon: "fa6-solid:chart-line",
        color: "#0c8ef8ff"
    },
    {
        name: {
            zh: "服务器",
            en: "Server",
            ja: "サーバー",
        },
        description: {
            zh: "服务器监控",
            en: "A server monitor",
            ja: "サーバー監視",
        },
        url: "https://nz.einverne.info",
        icon: "fa6-solid:microchip",
        color: "#50b8e9ff"
    },
    {
        name: {
            zh: "监控",
            en: "Monitor",
            ja: "モニター",
        },
        description: {
            zh: "开源监控服务",
            en: "An open-source monitoring service",
            ja: "オープンソースの監視サービス",
        },
        url: "https://monitor.einverne.info/",
        icon: "fa6-solid:gauge-high",
        color: "#14b8a6"
    },
    {
        name: {
            zh: "相册",
            en: "Photo",
            ja: "写真",
        },
        description: {
            zh: "相册",
            en: "A photo album",
            ja: "写真アルバム",
        },
        url: "https://photo.einverne.info",
        icon: "fa6-solid:photo-film",
    },
    {
        name: {
            zh: "Kuma",
            en: "Kuma",
            ja: "Kuma",
        },
        description: {
            zh: "网站监控",
            en: "A website monitor",
            ja: "Webサイト監視",
        },
        url: "https://kuma.einverne.info",
        icon: {
            src: "/icons/uptime-kuma.svg",
        },
    },
    {
        name: {
            zh: "Umami",
            en: "Umami",
            ja: "Umami",
        },
        description: {
            zh: "网站分析平台",
            en: "A website analytics platform",
            ja: "Webサイト分析プラットフォーム",
        },
        url: "https://u.einverne.info",
        icon: {
            light: "/icons/umami.svg",
            dark: "/icons/umami-light.svg",
        },
        color: "#000000"
    },
    {
        name: {
            zh: "Wakapi",
            en: "Wakapi",
            ja: "Wakapi",
        },
        description: {
            zh: "自托管的效率仪表盘",
            en: "Wakapi is a self-hosted productivity dashboard",
            ja: "セルフホスト型の生産性ダッシュボード",
        },
        url: "https://wakapi.einverne.info",
        icon: {
            src: "/icons/wakapi.svg",
        },
        color: "#72b6b3",
    },
    {
        name: {
            zh: "Chatwoot",
            en: "Chatwoot",
            ja: "Chatwoot",
        },
        description: {
            zh: "Chatwoot 客服收件箱",
            en: "Chatwoot customer support inbox",
            ja: "Chatwoot サポート受信箱",
        },
        url: "https://chat.einverne.info",
        icon: {
            src: "/icons/chatwoot.svg",
        },
    },
    {
        name: {
            zh: "邀请",
            en: "Invites",
            ja: "招待",
        },
        description: {
            zh: "分享邀请码的地方",
            en: "A place for me to share invites",
            ja: "招待を共有する場所",
        },
        url: "https://invites.einverne.info",
        icon: "fa6-solid:envelope",
        color: "#43a4d1ff"
    },
    {
        name: {
            zh: "券商",
            en: "Brokers",
            ja: "ブローカー",
        },
        description: {
            zh: "分享券商的平台",
            en: "A place for me to share brokers",
            ja: "ブローカーを共有する場所",
        },
        url: "https://brokers.einverne.info",
        icon: "fa6-solid:money-bill",
        color: "#eb16a7ff"
    },
    {
        name: {
            zh: "AI",
            en: "AI",
            ja: "AI",
        },
        description: {
            zh: "分享 AI 工具的地方",
            en: "A place for me to share AI tools",
            ja: "AI ツールを共有する場所",
        },
        url: "https://ai.einverne.info",
        icon: "fa6-solid:robot",
        color: "#3924dbff"
    },
    {
        name: {
            zh: "BiliNote",
            en: "BiliNote",
            ja: "BiliNote",
        },
        description: {
            zh: "转录并翻译 Bilibili/YouTube 视频",
            en: "Transcript and translate Bilibili/YouTube videos",
            ja: "Bilibili/YouTube 動画の文字起こしと翻訳",
        },
        url: "https://bilinote.einverne.info",
        icon: "fa6-solid:video",
        color: "#0c8ef8ff"
    },
    {
        name: {
            zh: "NomadInit",
            en: "NomadInit",
            ja: "NomadInit",
        },
        description: {
            zh: "游牧生活",
            en: "Nomad life",
            ja: "ノマド生活",
        },
        url: "https://nomadinit.com",
        icon: "fa6-solid:plane",
        color: "#43a4d1ff"
    },
    {
        name: {
            zh: "EV 日本生活",
            en: "EV Japan Life",
            ja: "EV 日本生活",
        },
        description: {
            zh: "日本生活",
            en: "Japan life",
            ja: "日本での生活",
        },
        url: "https://evjp.life",
        icon: "fa6-solid:house",
        color: "#43a4d1ff"
    },
    {
        name: {
            zh: "Fast Note Sync",
            en: "Fast Note Sync",
            ja: "Fast Note Sync",
        },
        description: {
            zh: "快速笔记同步服务",
            en: "Fast note sync service",
            ja: "高速ノート同期サービス",
        },
        url: "https://ob.einverne.info",
        icon: "fa6-solid:bolt"
    },
    {
        name: {
            zh: "BookStack",
            en: "BookStack",
            ja: "BookStack",
        },
        description: {
            zh: "自托管的 Wiki 知识库",
            en: "Self-hosted wiki knowledge base",
            ja: "セルフホスト型 Wiki ナレッジベース",
        },
        url: "https://bs.einverne.info",
        icon: "fa6-solid:book",
        color: "#1b6ec2"
    },
    {
        name: {
            zh: "FreshRSS",
            en: "FreshRSS",
            ja: "FreshRSS",
        },
        description: {
            zh: "自托管的 RSS 阅读器",
            en: "Self-hosted RSS reader",
            ja: "セルフホスト型 RSS リーダー",
        },
        url: "https://freshrss.einverne.info",
        icon: "fa6-solid:rss",
        color: "#f36d25"
    },
    {
        name: {
            zh: "Gitea",
            en: "Gitea",
            ja: "Gitea",
        },
        description: {
            zh: "自托管的 Git 代码托管",
            en: "Self-hosted Git service",
            ja: "セルフホスト型 Git サービス",
        },
        url: "https://gitea.einverne.info",
        icon: "simple-icons:gitea",
        color: "#609926"
    },
    {
        name: {
            zh: "IT Tools",
            en: "IT Tools",
            ja: "IT Tools",
        },
        description: {
            zh: "开发者常用工具集",
            en: "Handy tools for developers",
            ja: "開発者向けの便利ツール集",
        },
        url: "https://tools.einverne.info",
        icon: "fa6-solid:toolbox",
        color: "#5468ff"
    },
    {
        name: {
            zh: "Memos",
            en: "Memos",
            ja: "Memos",
        },
        description: {
            zh: "轻量级自托管备忘录",
            en: "Lightweight self-hosted memo hub",
            ja: "軽量セルフホスト型メモ",
        },
        url: "https://memos.einverne.info",
        icon: "fa6-solid:note-sticky",
        color: "#f59e0b"
    },
    {
        name: {
            zh: "SearXNG",
            en: "SearXNG",
            ja: "SearXNG",
        },
        description: {
            zh: "隐私优先的元搜索引擎",
            en: "Privacy-respecting metasearch engine",
            ja: "プライバシー重視のメタ検索エンジン",
        },
        url: "https://s.einverne.info",
        icon: "fa6-solid:magnifying-glass",
        color: "#3050ff"
    },
    {
        name: {
            zh: "Shaarli",
            en: "Shaarli",
            ja: "Shaarli",
        },
        description: {
            zh: "自托管的书签管理",
            en: "Self-hosted bookmark manager",
            ja: "セルフホスト型ブックマーク管理",
        },
        url: "https://shaarli.einverne.info",
        icon: "fa6-solid:bookmark",
        color: "#7bc67e"
    },
    {
        name: {
            zh: "Melody",
            en: "Melody",
            ja: "Melody",
        },
        description: {
            zh: "自托管的音乐流媒体",
            en: "Self-hosted music streaming",
            ja: "セルフホスト型音楽ストリーミング",
        },
        url: "https://melody.einverne.info",
        icon: "fa6-solid:music",
        color: "#e91e63"
    },
    {
        name: {
            zh: "Owncast",
            en: "Owncast",
            ja: "Owncast",
        },
        description: {
            zh: "自托管的直播平台",
            en: "Self-hosted live streaming",
            ja: "セルフホスト型ライブ配信",
        },
        url: "https://owncast.einverne.info",
        icon: "fa6-solid:tower-broadcast",
        color: "#7c3aed"
    },
    {
        name: {
            zh: "Komari",
            en: "Komari",
            ja: "Komari",
        },
        description: {
            zh: "轻量服务器监控面板",
            en: "Lightweight server monitoring dashboard",
            ja: "軽量サーバー監視ダッシュボード",
        },
        url: "https://monitor.einverne.info",
        icon: "fa6-solid:chart-area",
        color: "#06b6d4"
    },
    {
        name: {
            zh: "OpenList",
            en: "OpenList",
            ja: "OpenList",
        },
        description: {
            zh: "文件列表与网盘管理",
            en: "File listing and cloud drive manager",
            ja: "ファイル一覧とクラウドドライブ管理",
        },
        url: "https://openlist.einverne.info",
        icon: "fa6-solid:folder-open",
        color: "#2196f3"
    },
    {
        name: {
            zh: "Vaultwarden",
            en: "Vaultwarden",
            ja: "Vaultwarden",
        },
        description: {
            zh: "自托管的密码管理器",
            en: "Self-hosted password manager",
            ja: "セルフホスト型パスワード管理",
        },
        url: "https://bw.einverne.info",
        icon: "fa6-solid:shield-halved",
        color: "#175ddc"
    },
    {
        name: {
            zh: "VoceChat",
            en: "VoceChat",
            ja: "VoceChat",
        },
        description: {
            zh: "轻量级团队聊天服务",
            en: "Lightweight team chat service",
            ja: "軽量チームチャットサービス",
        },
        url: "https://vc.einverne.info",
        icon: "fa6-solid:comments",
        color: "#6366f1"
    },
    {
        name: {
            zh: "ChatGPT Next Web",
            en: "ChatGPT Next Web",
            ja: "ChatGPT Next Web",
        },
        description: {
            zh: "AI 对话助手",
            en: "AI chat assistant",
            ja: "AIチャットアシスタント",
        },
        url: "https://chatgpt.einverne.info",
        icon: "fa6-solid:robot",
        color: "#10a37f"
    },
    {
        name: {
            zh: "Subconverter",
            en: "Subconverter",
            ja: "Subconverter",
        },
        description: {
            zh: "订阅转换工具",
            en: "Subscription converter",
            ja: "サブスクリプション変換ツール",
        },
        url: "https://sub.einverne.info",
        icon: "fa6-solid:arrows-rotate",
        color: "#f59e0b"
    },
    {
        name: {
            zh: "HeyForm",
            en: "HeyForm",
            ja: "HeyForm",
        },
        description: {
            zh: "开源表单构建工具",
            en: "Open source form builder",
            ja: "オープンソースフォームビルダー",
        },
        url: "https://form.einverne.info",
        icon: "fa6-solid:file-lines",
        color: "#8b5cf6"
    },
    {
        name: {
            zh: "NocoDB",
            en: "NocoDB",
            ja: "NocoDB",
        },
        description: {
            zh: "开源数据库管理平台",
            en: "Open source database platform",
            ja: "オープンソースデータベースプラットフォーム",
        },
        url: "https://noco.einverne.info",
        icon: "fa6-solid:table",
        color: "#1d4ed8"
    },
    {
        name: {
            zh: "Karakeep",
            en: "Karakeep",
            ja: "Karakeep",
        },
        description: {
            zh: "稍后阅读与书签管理",
            en: "Read-it-later and bookmark manager",
            ja: "あとで読むとブックマーク管理",
        },
        url: "https://reader.einverne.info",
        icon: "fa6-solid:book-bookmark",
        color: "#ef4444"
    }
]
