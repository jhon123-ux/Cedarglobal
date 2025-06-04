import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Building2, Globe, Server, Clock, MapPin } from 'lucide-react';
import { useMapContext } from '../context/MapContext';
import { ServiceInfo } from '../types';

const SidePanel = () => {
  const { selectedLocation, setSelectedLocation, isPanelOpen, setPanelOpen } = useMapContext();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        setPanelOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPanelOpen, setPanelOpen]);

  const handleClose = () => {
    setPanelOpen(false);
    setTimeout(() => setSelectedLocation(null), 300);
  };

  const getIconByType = () => {
    switch (selectedLocation?.type) {
      case 'hq':
        return <Building2 className="w-6 h-6 text-red-500" />;
      case 'it':
        return <Server className="w-6 h-6 text-green-500" />;
      case 'global':
        return <Globe className="w-6 h-6 text-amber-500" />;
      default:
        return <Globe className="w-6 h-6 text-blue-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (selectedLocation?.type) {
      case 'hq':
        return selectedLocation.name.includes('Financial') ? 'Global Headquarters - Financial Services Division' : 
               selectedLocation.name.includes('IT') ? 'Global Headquarters - Technology Division' : 'Headquarters';
      case 'it':
        return 'IT Center';
      case 'global':
        return 'Global Office';
      default:
        return 'Location';
    }
  };

  const ServiceCard = ({ service }: { service: ServiceInfo }) => (
    <a
      href={service.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-lg transition-all duration-200 ${
        service.link 
          ? 'bg-white hover:bg-gray-50 shadow-sm hover:shadow cursor-pointer' 
          : 'bg-gray-50'
      }`}
      aria-label={`Visit ${service.name} website`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900">{service.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
        </div>
        {service.link && (
          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </div>
    </a>
  );

  if (!isPanelOpen || !selectedLocation) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 right-0 h-full md:w-1/3 lg:w-1/3 w-full bg-white shadow-lg z-50 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="relative p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedLocation.name}</h2>
            <div className="flex items-center space-x-2 mt-2">
              {getIconByType()}
              <span className="text-sm font-medium text-gray-600">
                {getTypeLabel()}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Location</span>
              </div>
              <p className="text-gray-700">{selectedLocation.region}</p>
            </div>

            {selectedLocation.operatingHours && (
              <div>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Operating Hours</span>
                </div>
                <p className="text-gray-700">{selectedLocation.operatingHours}</p>
              </div>
            )}

            {selectedLocation.services && selectedLocation.services.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Services</h3>
                <div className="space-y-2">
                  {selectedLocation.services.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                  ))}
                </div>
              </div>
            )}

            {selectedLocation.link && (
              <a
                href={selectedLocation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SidePanel;