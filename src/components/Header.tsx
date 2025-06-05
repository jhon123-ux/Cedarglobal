import { Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">Cedar Financial Global Network</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">About Us</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;