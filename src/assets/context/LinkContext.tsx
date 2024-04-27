import { createContext, ReactNode, useState } from "react";

interface CardLink {
  id: number;
  nome: string;
  url: string;
  corFundo: string;
  corTexto: string;
}

interface LinkContextValue {
  cardsLink: CardLink[];
  addCardLink: (newCardLink: CardLink) => void;
  cardLinkId: number;
  incrementId: () => void;
  faceUrl?: string | null;
  instaUrl?: string | null;
  ytbUrl?: string | null;
  facebookUrl?: (url: string) => void;
  instagramUrl?: (url: string) => void;
  youtubeUrl?: (url: string) => void;
}

interface LinkContextProviderProps {
  children: ReactNode;
}

export const LinkContext = createContext<LinkContextValue>({
  cardsLink: [],
  addCardLink: () => {},
  cardLinkId: 0,
  incrementId: () => {},
  faceUrl: null,
  instaUrl: null,
  ytbUrl: null,
  facebookUrl: () => {},
  instagramUrl: () => {},
  youtubeUrl: () => {},
});

export function LinkContextProvider({ children }: LinkContextProviderProps) {
  const [cardsLink, setCardsLink] = useState<CardLink[]>([]);
  const [cardLinkId, setCardLinkId] = useState(0);
  const [faceUrl, setFaceUrl] = useState<null | string>(null);
  const [instaUrl, setInstaUrl] = useState<null | string>(null);
  const [ytbUrl, setYtbUrl] = useState<null | string>(null);

  const addCardLink = (newCardLink: CardLink) => {
    setCardsLink((currentState) => [newCardLink, ...currentState]);
  };

  const incrementId = () =>
    setCardLinkId((currentState) => (currentState += 1));

  const facebookUrl = (url: string) => {
    setFaceUrl(url);
  };
  const instagramUrl = (url: string) => {
    setInstaUrl(url);
  };
  const youtubeUrl = (url: string) => {
    setYtbUrl(url);
  };

  const contextValue: LinkContextValue = {
    cardsLink,
    addCardLink,
    cardLinkId,
    incrementId,
    faceUrl,
    instaUrl,
    ytbUrl,
    facebookUrl,
    instagramUrl,
    youtubeUrl,
  };

  return (
    <LinkContext.Provider value={contextValue}>{children}</LinkContext.Provider>
  );
}
