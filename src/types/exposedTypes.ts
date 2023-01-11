export enum ContentFilter {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
    OFF = 'off'
}
export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
    AUTO = 'dark'
}

export enum MediaFilter {
    BASIC = 'basic',
    MINIMAL = 'minimal',
}

export interface TenorImage {
	id: string;
    tenorUrl: string;
    shortTenorUrl: string;
    description: string;
    createdAt: Date;
    tags: string[];
    url: string;
    height: number;
    width: number;
}
