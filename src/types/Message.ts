export interface KeywordPayload {
  keyword: string;
}

export interface LinkPayload {
  keyword: string;
  link: string;
}

export const KeywordEventNames = {
  FOLLOW_KEYWORD: 'FOLLOW_KEYWORD',
  UNFOLLOW_KEYWORD: 'UNFOLLOW_KEYWORD',
  REMOVE_KEYWORD: 'REMOVE_KEYWORD',
} as const;

export const LinkEventNames = {
  ADD_LINK_TO_KEYWORD: 'ADD_LINK_TO_KEYWORD',
  REMOVE_LINK: 'REMOVE_LINK',
} as const;

export interface KeywordMessage {
  type: keyof typeof KeywordEventNames;
  payload: KeywordPayload;
}

export interface LinkMessage {
  type: keyof typeof LinkEventNames;
  payload: LinkPayload;
}

export type Message = KeywordMessage | LinkMessage;
