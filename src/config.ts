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
        url: "https://umami.einverne.info",
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
    }
]
