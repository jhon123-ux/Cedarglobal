import { MapPin, Building2, PanelTop } from 'lucide-react';

const MapLegend = () => {
  const legends = [
    { type: 'hq', label: 'Headquarters', color: '#EF4444', icon: Building2 },
    { type: 'it', label: 'IT Path', color: '#10B981', icon: PanelTop },
    { type: 'global', label: 'Global Footprint', color: '#F59E0B', icon: MapPin }
  ];

  return (
    <div className="absolute bottom-5 right-5 bg-white bg-opacity-90 p-3 rounded-lg shadow-md z-[1000]">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">Cedar Presence</h3>
      <div className="space-y-2">
        {legends.map((legend) => (
          <div key={legend.type} className="flex items-center space-x-2">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: legend.color }}
            >
              <legend.icon className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-gray-700">{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;