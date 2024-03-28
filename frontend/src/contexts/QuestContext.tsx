import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { MissionType } from "@/pages/questtunnel/missions";

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export interface QuestData {
  title?: string | null;
  description?: string | null;
  startDate?: string | null;
  duration?: number | null;
  difficulty?: Difficulty | null;
  missions?: MissionType[];
}

export interface QuestContextProps {
  questInfo: QuestData | null;
  setQuestInfo: React.Dispatch<React.SetStateAction<QuestData | null>>;
}

interface QuestProviderProps {
  children: ReactNode;
}

const QuestContext = createContext<QuestContextProps | undefined>(undefined);

export const QuestProvider: React.FC<QuestProviderProps> = ({ children }) => {
  const [questInfo, setQuestInfo] = useState<QuestData | null>(null);

  // Récupérer les données de la quête depuis sessionStorage lors du montage du composant
  useEffect(() => {
    const storedQuestData = sessionStorage.getItem("questData");
    if (storedQuestData) {
      setQuestInfo(JSON.parse(storedQuestData));
    }
  }, []);

  // Sauvegarder les données de la quête dans sessionStorage à chaque mise à jour
  useEffect(() => {
    if (questInfo) {
      sessionStorage.setItem("questData", JSON.stringify(questInfo));
    }
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
