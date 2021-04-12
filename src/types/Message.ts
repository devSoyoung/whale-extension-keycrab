export interface KeywordPayload {
  keyword: string;
}

export interface LinkPayload {
  keyword: string;
  link: string;
}

export const KeywordEvents = {
  FOLLOW_KEYWORD: 'FOLLOW_KEYWORD',
  UNFOLLOW_KEYWORD: 'UNFOLLOW_KEYWORD',
  REMOVE_KEYWORD: 'REMOVE_KEYWORD',
} as const;

export const LinkEvents = {
  ADD_LINK_TO_KEYWORD: 'ADD_LINK_TO_KEYWORD',
  REMOVE_LINK: 'REMOVE_LINK',
};

export interface KeywordMessage {
  type: keyof typeof KeywordEvents;
  payload: KeywordPayload;
}

export interface LinkMessage {
  type: keyof typeof LinkEvents;
  payload: LinkPayload;
}

export type Message = KeywordMessage | LinkMessage;
