import {CreatePointMarkerOptions, PointMarker} from "peaks.js";
import Marker from './Marker';
import InvisibleMarker from "./InvisibleMarker";

const createPointMarker = (options: CreatePointMarkerOptions) => {
  if (options.view === 'zoomview') {
    return new Marker(options);
  } else {
    return new InvisibleMarker(options);
  }
};

export default createPointMarker;