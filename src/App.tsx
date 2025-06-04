import React from 'react';
import { MapProvider } from './context/MapContext';
import MapContainer from './components/MapContainer';
import SidePanel from './components/SidePanel';

function App() {
  return (
    <MapProvider>
      <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
        <MapContainer />
        <SidePanel />
      </div>
    </MapProvider>
  );
}

export default App;