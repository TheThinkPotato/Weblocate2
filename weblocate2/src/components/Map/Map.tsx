import { MapContainer, Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";

interface MapProps {longitude: number, latitude: number}

const Map = ({longitude,latitude}:MapProps) => {
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
        <Marker position={[latitude, longitude]}>
          <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
