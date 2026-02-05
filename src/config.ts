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
        name: "Compound Interest Calculator",
        description: "复利计算器 - 见证时间与复利的力量",
        url: "/zh/tools/compound-interest",
        icon: "fa6-solid:calculator",
        color: "#10b981"
    },
    {
        name: "EV Hosting",
        description: "A hosting service for my projects",
        url: "https://client.einverne.info",
        icon: "fa6-solid:server",
        color: "#9fa1a1ff"
    },
    {
        name: "EV API",
        description: "A LLM API Proxy",
        url: "https://api.einverne.info",
        icon: "fa6-solid:robot",
        color: "#9fa1a1ff"
    },
    {
        name: "EV Invest",
        description: "Investment",
        url: "https://invest.einverne.info",
        icon: "fa6-solid:chart-line",
        color: "#0c8ef8ff"
    },
    {
        name: "Server",
        description: "A server monitor",
        url: "https://nz.einverne.info",
        icon: "fa6-solid:microchip",
        color: "#50b8e9ff"
    },
    {
        name: "Photo",
        description: "A photo album",
        url: "https://photo.einverne.info",
        icon: "fa6-solid:photo-film",
    },
    {
        name: "Kuma",
        description: "A website monitor",
        url: "https://kuma.einverne.info",
        icon: "fa6-solid:heart-pulse",
    },
    {
        name: "Umami",
        description: "A website analytics platform",
        url: "https://umami.einverne.info",
        icon: "simple-icons:umami",
        color: "#000000"
    },
    {
        name: "Wakapi",
        description: "Wakapi is a self-hosted productivity dashboard",
        url: "https://wakapi.einverne.info",
        icon: "fa6-solid:bookmark",
        color: "#72b6b3",
    },
    {
        name: "Invites",
        description: "A place for me to share invites",
        url: "https://invites.einverne.info",
        icon: "fa6-solid:envelope",
        color: "#43a4d1ff"
    },
    {
        name: "Brokers",
        description: "A place for me to share brokers",
        url: "https://brokers.einverne.info",
        icon: "fa6-solid:money-bill",
        color: "#eb16a7ff"
    },
    {
        name: "AI",
        description: "A place for me to share AI tools",
        url: "https://ai.einverne.info",
        icon: "fa6-solid:robot",
        color: "#3924dbff"
    },
    {
        name: "BiliNote",
        description: "Transcript and translate Bilibili/YouTube videos",
        url: "https://bilinote.einverne.info",
        icon: "fa6-solid:video",
        color: "#0c8ef8ff"
    },
    {
        name: "NomadInit",
        description: "Nomad life",
        url: "https://nomadinit.com",
        icon: "fa6-solid:plane",
        color: "#43a4d1ff"
    },
    {
        name: "EV Japan Life",
        description: "Japan life",
        url: "https://evjp.life",
        icon: "fa6-solid:house",
        color: "#43a4d1ff"
    }
]
