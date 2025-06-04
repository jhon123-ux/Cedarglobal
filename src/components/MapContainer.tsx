import { useEffect, useRef } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapContext } from '../context/MapContext';
import PinCluster from './PinCluster';
import MapSearch from './MapSearch';
import MapLegend from './MapLegend';

// Fix for default icon issue in Leaflet with webpack/vite
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapContainer = () => {
  const mapRef = useRef<L.Map | null>(null);
  const { selectedLocation, isPanelOpen } = useMapContext();

  // Center the map on the selected location
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo(
        [selectedLocation.lat, selectedLocation.lng],
        mapRef.current.getZoom() < 4 ? 4 : mapRef.current.getZoom(),
        { duration: 1.5 }
      );
    }
  }, [selectedLocation]);

  return (
    <div className={`relative w-full h-screen transition-all duration-300 ${
      isPanelOpen ? 'md:w-2/3 lg:w-2/3' : 'w-full'
    }`}>
      <LeafletMapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={18}
        zoomControl={false}
        className="h-full w-full"
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomleft" />
        <PinCluster />
        <MapLegend />
      </LeafletMapContainer>
      <MapSearch />
    </div>
  );
};

export default MapContainer;