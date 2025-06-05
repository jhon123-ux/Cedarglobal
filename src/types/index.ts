export interface ServiceInfo {
  name: string;
  description: string;
  link?: string;
}

export interface LocationData {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  type: 'hq' | 'it' | 'global';
  description: string;
  services?: ServiceInfo[];
  image?: string;
  link?: string;
  operatingHours?: string;
  capital?: string;
}