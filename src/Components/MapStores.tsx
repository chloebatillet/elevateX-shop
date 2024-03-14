import {
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import markerIcon from "../assets/marker-icon.png";

function MapStores({ geocode }: { geocode: number[] }) {
  //const animateRef = useRef(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Change la clé du composant pour forcer son rechargement
  }, [geocode]);

  const customIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
  });

  const latLng: LatLngExpression = [geocode[0], geocode[1]];

  return (
    <MapContainer
      key={key}
      center={latLng}
      zoom={14}
      scrollWheelZoom={true}
      className="w-full h-96 sm:h-auto"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer
        attribution="Stamen - Watercolor"
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      /> */}

      <Marker position={latLng} icon={customIcon}></Marker>
    </MapContainer>
  );
}

export default MapStores;
