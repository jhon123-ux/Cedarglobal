import { useCallback } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { useMapContext } from '../context/MapContext';
import { locations } from '../data/locations';

// Create custom icons for each type of location
const createCustomIcon = (type: string) => {
  const typeColors = {
    hq: '#EF4444', // red
    it: '#10B981', // green
    global: '#3B82F6', // blue
  };
  
  const color = typeColors[type as keyof typeof typeColors];
  const isHQ = type === 'hq' || type === 'it';
  
  const iconHtml = `
    <div class="relative flex items-center justify-center">
      ${isHQ ? `<div class="absolute w-12 h-12 bg-${type === 'hq' ? 'red' : 'green'}-500 rounded-full opacity-20 animate-ping"></div>` : ''}
      <div class="absolute w-8 h-8 bg-${type === 'hq' ? 'red' : type === 'it' ? 'green' : 'blue'}-500 rounded-full opacity-20 animate-ping"></div>
      <div class="relative ${isHQ ? 'w-8 h-8' : 'w-6 h-6'} bg-white rounded-full shadow-lg flex items-center justify-center border-2" style="border-color: ${color}">
        <div class="${isHQ ? 'w-4 h-4' : 'w-3 h-3'} rounded-full" style="background-color: ${color}"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-pin-icon',
    iconSize: isHQ ? [40, 40] : [32, 32],
    iconAnchor: isHQ ? [20, 20] : [16, 16],
  });
};

const PinCluster = () => {
  const { setSelectedLocation, setPanelOpen } = useMapContext();

  const handleMarkerClick = useCallback((location) => {
    setSelectedLocation(location);
    setPanelOpen(true);
  }, [setSelectedLocation, setPanelOpen]);

  return (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={50}
      spiderfyOnMaxZoom={true}
      iconCreateFunction={(cluster) => {
        const count = cluster.getChildCount();
        const hasHQ = cluster.getAllChildMarkers().some(marker => 
          marker.options.icon.options.className.includes('hq')
        );
        
        return L.divIcon({
          html: `
            <div class="bg-white rounded-full shadow-lg border-2 ${hasHQ ? 'border-red-500' : 'border-blue-500'} w-8 h-8 flex items-center justify-center">
              <span class="text-sm font-semibold ${hasHQ ? 'text-red-500' : 'text-blue-500'}">${count}</span>
            </div>
          `,
          className: 'custom-cluster-icon',
          iconSize: L.point(32, 32),
          iconAnchor: L.point(16, 16),
        });
      }}
    >
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={createCustomIcon(location.type)}
          eventHandlers={{
            click: () => handleMarkerClick(location),
            keypress: (e) => {
              if (e.originalEvent.key === 'Enter') {
                handleMarkerClick(location);
              }
            }
          }}
          keyboard={true}
        >
          <Tooltip direction="top" offset={[0, -20]} className="custom-tooltip">
            <div className="font-medium">{location.name}</div>
            <div className="text-sm text-gray-600">{location.region}</div>
          </Tooltip>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default PinCluster;