import React from 'react';
import { MapProvider } from './context/MapContext';
import MapContainer from './components/MapContainer';
import SidePanel from './components/SidePanel';
import Header from './components/Header';

function App() {
  return (
    <MapProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 flex-col md:flex-row w-full overflow-hidden">
          <MapContainer />
          <SidePanel />
        </div>
      </div>
    </MapProvider>
  );
}

export default App;