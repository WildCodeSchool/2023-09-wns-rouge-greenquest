import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export interface QuestData {
  title?: string | null;
  description?: string | null;
  startDate?: Date | null;
  duration?: number | null;
  difficulty?: Difficulty | null;
  missions?: string[];
}

interface QuestContextProps {
  questInfo: QuestData | null;
  setQuestInfo: React.Dispatch<React.SetStateAction<QuestData | null>>;
}

interface QuestProviderProps {
  children: ReactNode;
}

const QuestContext = createContext<QuestContextProps | undefined>(undefined);

export const QuestProvider: React.FC<QuestProviderProps> = ({ children }) => {
  const [questInfo, setQuestInfo] = useState<QuestData | null>(null);

  useEffect(() => {
    console.log("Quest info updated:", questInfo);
  }, [questInfo]);

  return (
    <QuestContext.Provider value={{ questInfo, setQuestInfo }}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuestContext = () => {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error("useQuestContext must be used within a QuestProvider");
  }
  return context;
};
