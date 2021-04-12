export interface KeywordPayload {
  keyword: string;
}

export interface LinkPayload {
  keyword: string;
  link: string;
}

interface FollowKeywordMessage {
  type: 'FOLLOW_KEYWORD';
  payload: KeywordPayload;
}

interface UnfollowKeywordMessage {
  type: 'UNFOLLOW_KEYWORD';
  payload: KeywordPayload;
}

interface RemoveKeywordMessage {
  type: 'REMOVE_KEYWORD';
  payload: KeywordPayload;
}

interface AddLinkMessage {
  type: 'ADD_LINK_TO_KEYWORD';
  payload: LinkPayload;
}

interface RemoveLinkMessage {
  type: 'REMOVE_LINK';
  payload: LinkPayload;
}

export type Message =
  | FollowKeywordMessage
  | UnfollowKeywordMessage
  | RemoveKeywordMessage
  | AddLinkMessage
  | RemoveLinkMessage;
