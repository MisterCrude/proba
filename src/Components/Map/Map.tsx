import React, { useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";

import { GlMap } from "@src/config/Confing";
import { IStudio, ECoordinateName } from "@src/types/studio";
import { countCoordinateAverage, getCoordinates } from "@src/helpers/map";
import { Markers } from "./Markers";
import { MapContainer, NavigationControlWrapper } from "./elements";

type IMapComponent = React.FunctionComponent<{ studiosList: IStudio[] }>;

export const Map: IMapComponent = ({ studiosList }) => {
  const coordinates = getCoordinates(studiosList);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // TODO change this depend on chosen city in filters
    latitude: countCoordinateAverage(coordinates, ECoordinateName.latitude),
    longitude: countCoordinateAverage(coordinates, ECoordinateName.longitude),
    zoom: 10,
  });

  const handeleViewportChange = (changedViewport: any) => {
    setViewport(changedViewport);
  };

  return (
    <MapContainer>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={GlMap.accessToken}
        onViewportChange={handeleViewportChange}
      >
        <Markers dataList={studiosList} />
        <NavigationControlWrapper>
          <NavigationControl showCompass={false} />
        </NavigationControlWrapper>
      </ReactMapGL>
    </MapContainer>
  );
};