// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://einverne.info',
  i18n: {
    locales: [
      {
        path: 'zh',
        codes: ['zh', 'zh-CN', 'zh-Hans', 'zh-Hant', 'zh-TW', 'zh-HK'],
      },
      {
        path: 'en',
        codes: ['en', 'en-US', 'en-GB'],
      },
      {
        path: 'ja',
        codes: ['ja', 'ja-JP'],
      },
    ],
    defaultLocale: 'zh',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    icon({
      include: {
        "fa6-brands": ["*"],
        "fa6-solid": ["*"],
        "simple-icons": ["*"],
        "vscode-icons": ["*"]
      }
    })
  ]
});
