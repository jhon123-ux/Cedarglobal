import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { locations } from '../data/locations';
import { useMapContext } from '../context/MapContext';

const MapSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof locations>([]);
  const { setSelectedLocation, setPanelOpen } = useMapContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const results = locations.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleLocationSelect = (location: typeof locations[0]) => {
    setSelectedLocation(location);
    setPanelOpen(true);
    setSearchTerm('');
    setIsExpanded(false);
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  return (
    <div className="absolute top-4 left-4 z-[1000]">
      <div className={`flex items-center bg-white rounded-full shadow-md transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-10'
      }`}>
        <button
          onClick={toggleSearch}
          className="p-2 rounded-full"
          aria-label="Search countries"
        >
          {isExpanded ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Search className="w-5 h-5 text-gray-600" />
          )}
        </button>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-1 rounded-r-full py-2 pr-4 outline-none transition-all duration-300 ${
            isExpanded ? 'opacity-100 w-full' : 'opacity-0 w-0'
          }`}
        />
      </div>

      {searchResults.length > 0 && isExpanded && (
        <div className="mt-2 bg-white rounded-lg shadow-md max-h-60 overflow-y-auto">
          <ul>
            {searchResults.map(location => (
              <li key={location.id}>
                <button
                  onClick={() => handleLocationSelect(location)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="font-medium">{location.name}</span>
                    <span className="ml-2 text-xs text-gray-500">{location.region}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapSearch;