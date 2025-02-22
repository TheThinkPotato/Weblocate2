import { MapContainer, Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface MapProps {
  longitude: number;
  latitude: number;
  domain?: string;
  city?: string;
}

const Map = ({ longitude, latitude, domain,city }: MapProps) => {
  return (
    <div>
      <MapContainer
        center={[latitude, longitude]}
        zoom={10}
        scrollWheelZoom={window.innerWidth > 768}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}
          icon={defaultIcon}>
          {(domain || city)&& <Popup>{city} {domain &&<br/>}{domain}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
