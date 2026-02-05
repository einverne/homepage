export const supportedLocales = ['zh', 'en', 'ja'] as const;
export type SupportedLocale = typeof supportedLocales[number];

export const localeLabels: Record<SupportedLocale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
};

export const localeCodes: Record<SupportedLocale, string[]> = {
  zh: ['zh', 'zh-cn', 'zh-hans', 'zh-hant', 'zh-tw', 'zh-hk'],
  en: ['en', 'en-us', 'en-gb'],
  ja: ['ja', 'ja-jp'],
};

export const localeLangTags: Record<SupportedLocale, string> = {
  zh: 'zh-CN',
  en: 'en',
  ja: 'ja',
};

export const localeDateLocales: Record<SupportedLocale, string> = {
  zh: 'zh-CN',
  en: 'en-US',
  ja: 'ja-JP',
};

export const getLocaleStaticPaths = (paramName = 'lang') =>
  supportedLocales.map((locale) => ({
    params: { [paramName]: locale },
  }));

export const translations = {
  zh: {
    common: {
      homeTitle: '欢迎来到我的个人空间',
      latestPosts: '最新博客',
      more: '更多',
      emptyPosts: '暂无文章，请稍后再试。',
      latestVideos: '最新视频',
      channel: '频道',
      emptyVideos: '暂无视频，请稍后再试。',
      untitledPost: '未命名文章',
      untitledVideo: '最新视频',
      themeToggle: '切换明暗模式',
      backHome: '回到首页',
      labTitle: '实验室',
      siteNoticeTitle: '🌍 访问提示',
      siteNoticeBody: '检测到您在中国地区，建议前往国内镜像站点以获得更快的加载速度。',
      siteNoticeClose: '我知道了',
      sponsorButton: '赞助',
      sponsorTitle: '支持我',
      sponsorIntro: '如果这些内容对你有帮助，欢迎支持我：',
      sponsorLikePrefix: '在',
      sponsorLikeSuffix: '点赞、评论、订阅',
      sponsorGithub: '在 GitHub 赞助',
      sponsorCoffee: '请我喝一杯咖啡',
      sponsorUsdtTitle: 'USDT 赞助（TRC20）',
      sponsorUsdtHint: '在你的钱包中以 TRC20 网络发送 USDT 到此地址：',
      sponsorCopy: '复制地址',
      sponsorCopied: '已复制',
      sponsorClose: '关闭',
      sponsorXPrefix: '追踪我的',
      sponsorXSuffix: '',
    },
    profile: {
      description: 'Ein Verne 的网络日志',
    },
    projects: {
      title: '项目展示',
      akiName: 'Aki 日语辞书',
      akiDescription: 'iOS 日语学习应用',
      myaltboxName: 'MyAltBox',
      myaltboxDescription: '现代化 Web 应用',
      bookManagementName: '图书管理系统',
      bookManagementDescription: '个人图书馆管理',
      rancherName: 'Rancher',
      rancherDescription: 'Kubernetes 集群管理',
      honoName: 'Hono',
      honoDescription: '云存储服务',
    },
    techStack: {
      title: '技术栈',
      frontend: '前端开发',
      backend: '后端开发',
      database: '数据库',
      cloud: '云服务 & 部署',
      devops: 'DevOps & 工具',
      editors: '编辑器 & IDE',
    },
    footer: {
      madeWith: '由',
      madeWithSuffix: ' 用 ❤️ 制作',
      poweredBy: '基于',
      languageLabel: '语言',
    },
  },
  en: {
    common: {
      homeTitle: 'Welcome to my space',
      latestPosts: 'Latest Posts',
      more: 'More',
      emptyPosts: 'No posts yet. Please check back soon.',
      latestVideos: 'Latest Videos',
      channel: 'Channel',
      emptyVideos: 'No videos yet. Please check back soon.',
      untitledPost: 'Untitled Post',
      untitledVideo: 'Latest Video',
      themeToggle: 'Toggle theme',
      backHome: 'Back to home',
      labTitle: 'Lab',
      siteNoticeTitle: '🌍 Access Notice',
      siteNoticeBody: 'It looks like you are in China. For faster loading, please visit the domestic mirror site.',
      siteNoticeClose: 'Got it',
      sponsorButton: 'Sponsor',
      sponsorTitle: 'Support Me',
      sponsorIntro: 'If this site helps you, feel free to support me:',
      sponsorLikePrefix: 'Like, comment, and subscribe on',
      sponsorLikeSuffix: '',
      sponsorGithub: 'Sponsor on GitHub',
      sponsorCoffee: 'Buy me a coffee',
      sponsorUsdtTitle: 'USDT Support (TRC20)',
      sponsorUsdtHint: 'Send USDT via the TRC20 network to this address:',
      sponsorCopy: 'Copy address',
      sponsorCopied: 'Copied',
      sponsorClose: 'Close',
      sponsorXPrefix: 'Follow me on',
      sponsorXSuffix: '',
    },
    profile: {
      description: 'Ein Verne\'s Web Log',
    },
    projects: {
      title: 'Projects',
      akiName: 'Aki Japanese Dictionary',
      akiDescription: 'Japanese Dictionary iOS/Android App',
      myaltboxName: 'MyAltBox',
      myaltboxDescription: 'Modern Web Application',
      bookManagementName: 'Online Book Management',
      bookManagementDescription: 'Personal Library Manager',
      rancherName: 'Rancher',
      rancherDescription: 'Kubernetes Cluster',
      honoName: 'Hono Cloudflare R2',
      honoDescription: 'Cloud Storage Service',
    },
    techStack: {
      title: 'Tech Stack',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      cloud: 'Cloud & Deployment',
      devops: 'DevOps & Tools',
      editors: 'Editors & IDEs',
    },
    footer: {
      madeWith: 'Made with ❤️ by',
      madeWithSuffix: '',
      poweredBy: 'Powered by',
      languageLabel: 'Language',
    },
  },
  ja: {
    common: {
      homeTitle: '私のスペースへようこそ',
      latestPosts: '最新ブログ',
      more: 'もっと見る',
      emptyPosts: '記事はまだありません。しばらくしてから再度ご確認ください。',
      latestVideos: '最新動画',
      channel: 'チャンネル',
      emptyVideos: '動画はまだありません。しばらくしてから再度ご確認ください。',
      untitledPost: '無題の記事',
      untitledVideo: '最新動画',
      themeToggle: 'テーマ切替',
      backHome: 'ホームへ戻る',
      labTitle: 'ラボ',
      siteNoticeTitle: '🌍 アクセス案内',
      siteNoticeBody: '中国からのアクセスが検出されました。より速く表示するため、国内ミラーサイトの利用をおすすめします。',
      siteNoticeClose: '了解しました',
      sponsorButton: '支援',
      sponsorTitle: '応援する',
      sponsorIntro: '役に立ったら、ぜひ応援してください：',
      sponsorLikePrefix: '',
      sponsorLikeSuffix: 'チャンネル登録と高評価よろしくお願いします',
      sponsorGithub: 'GitHubでスポンサーになる',
      sponsorCoffee: 'コーヒーをごちそうする',
      sponsorUsdtTitle: 'USDT 支援（TRC20）',
      sponsorUsdtHint: 'TRC20 ネットワークでこのアドレスへUSDTを送ってください：',
      sponsorCopy: 'アドレスをコピー',
      sponsorCopied: 'コピーしました',
      sponsorClose: '閉じる',
      sponsorXPrefix: '',
      sponsorXSuffix: 'でフォロー',
    },
    profile: {
      description: 'Ein Verne のウェブログ',
    },
    projects: {
      title: 'プロジェクト',
      akiName: 'Aki 日語辞書',
      akiDescription: 'iOS日本語学習アプリ',
      myaltboxName: 'MyAltBox',
      myaltboxDescription: 'モダンWebアプリケーション',
      bookManagementName: '書籍管理システム',
      bookManagementDescription: '個人図書館管理',
      rancherName: 'Rancher',
      rancherDescription: 'Kubernetesクラスター管理',
      honoName: 'Hono Cloudflare R2',
      honoDescription: 'クラウドストレージサービス',
    },
    techStack: {
      title: '技術スタック',
      frontend: 'フロントエンド',
      backend: 'バックエンド',
      database: 'データベース',
      cloud: 'クラウド & デプロイ',
      devops: 'DevOps & ツール',
      editors: 'エディタ & IDE',
    },
    footer: {
      madeWith: '',
      madeWithSuffix: ' ❤️で作成',
      poweredBy: 'Powered by',
      languageLabel: '言語',
    },
  },
} as const;

export const getLocale = (locale?: string): SupportedLocale => {
  if (locale && supportedLocales.includes(locale as SupportedLocale)) {
    return locale as SupportedLocale;
  }
  return 'zh';
};

export const getTranslations = (locale?: string) => {
  return translations[getLocale(locale)];
};

export const getLocaleLangTag = (locale?: string) => {
  return localeLangTags[getLocale(locale)];
};

export const getLocaleDateLocale = (locale?: string) => {
  return localeDateLocales[getLocale(locale)];
};
