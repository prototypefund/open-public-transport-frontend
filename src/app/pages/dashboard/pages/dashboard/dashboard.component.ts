import {Component} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../../../core/mapbox/model/place.model';
import {BoundingBox} from "../../../../ui/map/model/bounding-box.model";
import {City} from "../../model/city";
import {ColorRamp} from "../../../../ui/map/model/color-ramp.model";
import {environment} from "../../../../../environments/environment";

/**
 * Displays a dashboard
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  /** Height of the map */
  mapHeight = 'calc(100vh - 64px)';

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Enum representing color ramp */
  colorRampEnum = ColorRamp;

  flyToBoundingBox;

  /** Geocoder filter */
  geocoderFilter = [
    ["Deutschland", "Berlin"],
    ["Deutschland", "Cottbus"],
    ["Deutschland", "Frankfurt (Oder)"],
    ["Deutschland", "Hamburg"],
    ["Deutschland", "Potsdam"]
  ];

  /** Overlay results */
  results = [];

  /** Isochrone results */
  hexResults = ["berlin/geojson/isochrones-15"];
  /** Hexagon bounding box */
  hexBoundingBox = BoundingBox.BERLIN;

  /** Selected city */
  selectedCity = environment.dashboard.cities[0] as City;
  /** Selected transport */
  selectedTransport = new Map<string, boolean>();

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.selectedTransport.set("bus", false);
    this.selectedTransport.set("light_rail", false);
    this.selectedTransport.set("subway", false);
    this.selectedTransport.set("tram", false);
  }

  //
  // Actions
  //

  /**
   * Handles selection of city
   * @param city city
   */
  onCitySelected(city: City) {
    this.selectedCity = city;

    const transportLayers = [];
    city.publicTransport.forEach(publicTransport => {
      transportLayers.push(`${city.name.toLowerCase()}/geojson/lines-${publicTransport}`);
      transportLayers.push(`${city.name.toLowerCase()}/geojson/stations-${publicTransport}`);
    });

    this.results = transportLayers;
    this.hexResults = [`${city.name.toLowerCase()}/geojson/isochrones-15`]
    this.hexBoundingBox = city.boundingBox;
    this.flyToBoundingBox = city.boundingBox;
  }
}
