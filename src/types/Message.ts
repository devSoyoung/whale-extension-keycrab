export interface MessagePayload {
  keyword: string;
  link?: string;
}

export interface Message {
  type: string;
  payload: MessagePayload;
}
