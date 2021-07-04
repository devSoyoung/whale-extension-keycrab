import { Link } from '../sidebar-react/type/keywords';

export declare global {
  interface Window {
    isTracking: boolean;
    insertButton: (keywordName: string) => void;
    insertCrabIcon: (isTracking: boolean, isGoogle: boolean) => void;
    setButtonState: (isTracking: boolean) => void;
    sendMessageForAddLink: (keywordName: string, link: Link) => void;
  }
}
