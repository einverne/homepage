export type SiteConfig = {
    title: string;
    subTitle: string;

    backgroundImage: {
        enabled: boolean;
        url: string;
    };

    mirrorSite?: {
        enabled: boolean;
        url: string;
        region?: string;
    }

    cache?: {
        ttlMs: number;
    };

    favicon: string;
}

export type ProfileConfig = {
    avatar: string;
    name: string;
    description: string;
    introPage?: string;
    links: {
        name: string;
        url: string;
        icon: string;
        color?: string;
    }[];
}

export type IconSpec =
    | string
    | { src: string }
    | { light: string; dark: string };

export type LabConfig = {
    name: string;
    description: string;
    url: string;
    icon: IconSpec;
    color?: string;
}[]
