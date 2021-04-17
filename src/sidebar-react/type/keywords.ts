export interface Link {
  favorite: boolean;
  origin: string;
  title: string;
  url: string;
}

export interface Keyword {
  link: Link[];
  tracking: boolean;
}

export interface Keywords {
  [K: string]: Keyword;
}
