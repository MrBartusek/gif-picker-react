export enum ContentFilter {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
    OFF = 'off'
}
export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
    AUTO = 'auto'
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
    preview: TenorImagePreview;
}

export interface TenorImagePreview {
    url: string;
    height: number;
    width: number;
}
