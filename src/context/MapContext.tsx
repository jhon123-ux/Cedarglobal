import { createContext, useState, useContext, ReactNode } from 'react';
import { LocationData, MapContextType } from '../types';

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isPanelOpen, setPanelOpen] = useState(false);

  return (
    <MapContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        isPanelOpen,
        setPanelOpen
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = (): MapContextType => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};