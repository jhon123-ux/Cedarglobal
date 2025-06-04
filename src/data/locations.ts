import { LocationData } from '../types';

// Helper function to create a basic global office location
const createGlobalOffice = (name: string): LocationData => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name,
  region: 'Global Network',
  // These are approximate center points for each country
  lat: 0,
  lng: 0,
  type: 'global',
  description: `Cedar Financial's global presence in ${name}, providing comprehensive financial and business solutions.`,
  services: [
    { name: 'Financial Services', description: 'Comprehensive financial solutions' },
    { name: 'Business Solutions', description: 'Custom business services' },
    { name: 'Compliance', description: 'Local regulatory compliance' }
  ]
});

// Main headquarters and specialized locations
const mainLocations: LocationData[] = [
  {
    id: 'us-financial',
    name: 'Cedar Financial',
    region: 'North America',
    lat: 34.1367,
    lng: -118.6614,
    type: 'hq',
    description: 'Global Headquarters - Financial Services Division based in Calabasas, California.',
    services: [
      { name: 'MEDCAH', description: 'Medical Collections and Healthcare Receivables', link: 'https://medcah.com' },
      { name: 'Cedar Business Solutions', description: 'Full-service debt collection and BPO solutions', link: 'https://www.cedarbusinesssolutions.co.uk' },
      { name: 'Last Demand', description: 'Pre-legal demand services for outstanding debts', link: 'https://lastdemand.com' },
      { name: 'Remote Scouts', description: 'Offshore staffing and remote team solutions', link: 'https://remotescouts.com' },
      { name: 'Landlord Collections', description: 'Specialized collections for property management', link: 'https://landlordcollections.net' }
    ],
    operatingHours: 'Monday to Friday: 9:00 AM – 6:00 PM (PST)',
    link: 'https://cedarfinancial.com'
  },
  {
    id: 'us-it',
    name: 'IT Path Headquarters',
    region: 'North America',
    lat: 37.7749,
    lng: -122.4194,
    type: 'it',
    description: 'Global Headquarters - Technology Division based in San Francisco, California.',
    services: [
      { name: 'IT Consulting', description: 'Strategic technology consulting and roadmap planning', link: 'https://itpath.com' },
      { name: 'Software Development', description: 'Custom software solutions and application development', link: 'https://itpath.com' },
      { name: 'Cloud Solutions', description: 'Secure cloud infrastructure and migration services', link: 'https://itpath.com' },
      { name: 'Cybersecurity', description: 'Advanced threat protection and security assessments', link: 'https://itpath.com' },
      { name: 'Data Analytics', description: 'Business intelligence and data visualization solutions', link: 'https://itpath.com' }
    ],
    operatingHours: 'Monday to Friday: 8:00 AM – 6:00 PM (PST)',
    link: 'https://itpath.com'
  }
];

// List of all countries
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo Democratic Republic", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland Republic", "Israel", "Italy", "Ivory Coast", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "Saint Vincent & the Grenadines", "Samoa",
  "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka",
  "St Kitts & Nevis", "St Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Create global office locations for all countries except the US (which has specialized offices)
const globalOffices = countries
  .filter(country => country !== 'United States')
  .map(country => createGlobalOffice(country));

// Combine main locations with global offices
export const locations: LocationData[] = [...mainLocations, ...globalOffices];