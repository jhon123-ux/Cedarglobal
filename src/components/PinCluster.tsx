import { useCallback } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { useMapContext } from '../context/MapContext';
import { locations } from '../data/locations';
import { MapPin, Building2, PanelTop } from 'lucide-react';

// Create custom icons for each type of location
const createCustomIcon = (type: string) => {
  const typeColors = {
    hq: '#EF4444', // red
    it: '#10B981', // green
    global: '#F59E0B', // yellow
  };
  
  const color = typeColors[type as keyof typeof typeColors] || '#3B82F6';
  
  const iconHtml = `
    <div class="relative flex items-center justify-center">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 3C12.6 3 8 7.6 8 13C8 18.4 12.6 27 18 33C23.4 27 28 18.4 28 13C28 7.6 23.4 3 18 3Z" fill="${color}" stroke="white" stroke-width="2"/>
      </svg>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        ${type === 'hq' 
          ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V9.33L2 12V6l10-4 10 4v6l-4-2.67V22"/></svg>' 
          : type === 'it' 
            ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 22V11H4v11"/><path d="M2 7v4h20V7l-10-5-10 5Z"/></svg>' 
            : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'}
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-pin-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
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
          <Tooltip>{location.name}</Tooltip>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default PinCluster;