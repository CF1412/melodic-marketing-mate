
import { useState, createContext, useContext, ReactNode } from "react";
import { type ArtistData } from "@/components/ArtistForm";

interface ArtistDataContextType {
  artistData: ArtistData | null;
  setArtistData: (data: ArtistData) => void;
  clearArtistData: () => void;
}

const ArtistDataContext = createContext<ArtistDataContextType | undefined>(undefined);

export function ArtistDataProvider({ children }: { children: ReactNode }) {
  const [artistData, setArtistData] = useState<ArtistData | null>(null);

  const clearArtistData = () => {
    setArtistData(null);
  };

  return (
    <ArtistDataContext.Provider value={{ artistData, setArtistData, clearArtistData }}>
      {children}
    </ArtistDataContext.Provider>
  );
}

export function useArtistData() {
  const context = useContext(ArtistDataContext);
  
  if (context === undefined) {
    throw new Error("useArtistData must be used within an ArtistDataProvider");
  }
  
  return context;
}
