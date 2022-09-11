import {connect, styled} from "frontity";
import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Route = ({state}) => {
  
    mapboxgl.accessToken = state.env.mapbox_api_key;

    const data = state.source.get(state.router.link);

    const routesUrl =  "https://lge10j93qj.execute-api.us-east-1.amazonaws.com/test/route?routeId=" + data.id;

    const [route, setRoute] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);

    useEffect(async () => {
        setIsLoading(true);
        const response = await fetch(routesUrl, {
            method: "GET"
        });
        
        const routeJson = await response.json();

        const route = routeJson.Item;

        const geoJson = JSON.parse(routeJson.geoJson);
        
        setRoute(route);

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: zoom
        });
        map.current.on('load', () => {
            // Geographic coordinates of the LineString
            const coordinates = geoJson.features[0].geometry.coordinates;
            
            // Create a 'LngLatBounds' with both corners at the first coordinate.
            const bounds = new mapboxgl.LngLatBounds(
                coordinates[0],
                coordinates[0]
            );
            
            // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
            for (const coord of coordinates) {
                bounds.extend(coord);
            }
            
            map.current.fitBounds(bounds, {
                padding: 20
            });
            map.current.addSource("route", {
              type: "geojson",
              // a reference to the converted data
              // could come from a file, API, etc
              data: geoJson,
            });
            
            map.current.addLayer({
              id: "route-line",
              type: "line",
              source: "route",
              paint: {
                "line-color": "#15cc09",
                "line-width": 4,
              },
            })
        });
        setIsLoading(false);
    }, []);

    return(
        <>
            <RouteContainer>
                <h2>{route?.routeName}</h2>
                <div>Location: {route?.location}</div>
                <div>Submitted By: {route?.createdByName}</div>
                <div>Terrain Types: {route?.terrain}</div>
                <div>Distance: {route?.distance}</div>
                <div>Description: {route?.description}</div>
                <Map ref={mapContainer} className="map-container" />
            </RouteContainer>
            
        </>
    );
};

const Map = styled.div`
    height: 50%;
`;

const RouteContainer = styled.div`
    width: 50%;
    margin: auto;
    margin-left: 20%;
`;

export default connect(Route);