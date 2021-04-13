export interface KeywordInfo {
  link: string[];
  tracking: boolean;
}

export interface KeywordStorage {
  [key: string]: KeywordInfo;
}

export interface Storage {
  keywords?: KeywordStorage;
  keywordsOrder?: string[];
}
