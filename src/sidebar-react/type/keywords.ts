export interface Link {
  favorite: boolean;
  origin: string;
  title: string;
  url: string;
}

interface LinkMeta {
  ownKeyword: string;
}

export type LinkProps = Link & LinkMeta;

export interface Keyword {
  link: Link[];
  tracking: boolean;
  fold?: boolean;
}

export interface Keywords {
  [K: string]: Keyword;
}
