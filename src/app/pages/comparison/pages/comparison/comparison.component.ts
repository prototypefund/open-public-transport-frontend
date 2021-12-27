import {Component} from '@angular/core';
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";
import {PlaceService} from "../../services/place.service";
import {PlaceMetrics} from "../../model/place-metrics";

/**
 * Displays comparison page
 */
@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent {

  /** Selected geocoder result left */
  geocoderResultLeft: GeocoderResult;
  /** Selected geocoder result right */
  geocoderResultRight: GeocoderResult;

  /** Place metrics of left geocoder result */
  placeMetricsLeft: PlaceMetrics;
  /** Place metrics of right geocoder result */
  placeMetricsRight: PlaceMetrics;

  /** Background color for left geocoder result */
  backgroundColorLeft = "hsl(92, 44%, 66%)";
  /** Border color for left geocoder result */
  borderColorLeft = "hsl(92, 44%, 46%)";

  /** Background color for right geocoder result */
  backgroundColorRight = "hsl(172, 38%, 65%)";
  /** Border color for right geocoder result */
  borderColorRight = "hsl(172, 38%, 45%)";

  /**
   * Constructor
   * @param placeService metrics service
   */
  constructor(private placeService: PlaceService) {
  }

  //
  // Actions
  //

  /**
   * Handles left geocoder results
   * @param geocoderResult geocoder result
   */
  onGeocodingResultLeftChanged(geocoderResult: GeocoderResult) {
    this.geocoderResultLeft = geocoderResult;

    if (geocoderResult != null) {
      const lat = geocoderResult.center[0];
      const lon = geocoderResult.center[1];

      this.placeService.getPlace(lat, lon).subscribe((place: PlaceMetrics) => {
        this.placeMetricsLeft = place;
      }, () => {
        this.placeMetricsLeft = null;
      });
    }
  }

  /**
   * Handles right geocoder results
   * @param geocoderResult geocoder result
   */
  onGeocodingResultRightChanged(geocoderResult: GeocoderResult) {
    this.geocoderResultRight = geocoderResult;

    if (geocoderResult != null) {
      const lat = geocoderResult.center[0];
      const lon = geocoderResult.center[1];

      this.placeService.getPlace(lat, lon).subscribe((place: PlaceMetrics) => {
        this.placeMetricsRight = place;
      }, () => {
        this.placeMetricsRight = null;
      });
    }
  }
}
