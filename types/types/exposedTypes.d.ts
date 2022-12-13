export declare enum ContentFilter {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
    OFF = "off"
}
export declare enum Theme {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "dark"
}
export interface TenorImage {
    id: string;
    tenorUrl: string;
    shortTenorUrl: string;
    description: string;
    createdAt: number;
    tags: string[];
    url: string;
    height: number;
    width: number;
}
