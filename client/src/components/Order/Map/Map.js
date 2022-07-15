import React, { Component } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries = ["places"];

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true;
    const isBrowser = typeof document !== "undefined";
    const isAlreadyLoaded = window.google && window.google.maps;
    if (!isAlreadyLoaded && isBrowser) {
      // @ts-ignore
      if (window.google && !cleaningUp) {
        console.error("google api is already presented");
        return;
      }

      this.isCleaningUp().then(this.injectScript);
    }

    if (isAlreadyLoaded) {
      this.setState({ loaded: true });
    }
  }
}

class Map extends Component {
  state = {
    response: null,
    origin: this.props.origin,
    mapRef: null,
    searchBoxRef: null,
    center: null,
    requestDirection: false,
    requestDistance: false,
  };

  constructor(props) {
    super(props);

    this.directionsCallback = this.directionsCallback.bind(this);
    this.searchBoxLoaded = this.searchBoxLoaded.bind(this);
    this.searchBoxOnComplete = this.searchBoxOnComplete.bind(this);
    this.distanceCallback = this.distanceCallback.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd() {
    if (this.state.mapRef) {
      this.setState(() => ({
        center: {
          lat: this.state.mapRef.getCenter().lat(),
          lng: this.state.mapRef.getCenter().lng(),
        },
      }));
    }
  }

  directionsCallback(response) {
    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          response,
          requestDirection: false,
        }));
      } else {
        if (response.status === "ZERO_RESULTS") {
          toast.error("Looks like we won't be able to get to you :(");
        }
      }
    }
  }

  distanceCallback(response) {
    if (response !== null) {
      this.props.setDistance({
        duration: response.rows[0].elements[0].duration.text,
        distance: response.rows[0].elements[0].distance.text,
      });

      this.setState(() => ({
        requestDistance: false,
      }));
    }
  }

  searchBoxLoaded(searchBox) {
    this.setState(() => ({
      searchBoxRef: searchBox,
    }));
  }

  searchBoxOnComplete() {
    if (this.state.searchBoxRef) {
      const places = this.state.searchBoxRef.getPlaces();

      if (places && places.length !== 0) {
        this.props.setDestination(
          this.state.searchBoxRef.getPlaces()[0].formatted_address
        );
        this.setState(() => ({
          requestDirection: true,
          requestDistance: true,
        }));
      }
    }
  }

  handleOnLoad(map) {
    this.setState(() => ({
      mapRef: map,
    }));
  }

  render() {
    return (
      <LoadScriptOnlyIfNeeded
        libraries={libraries}
        googleMapsApiKey="AIzaSyAQp7Wd_KrRnOkY22oXGxcIwPjN3EsqsL8"
        id="script-loader"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.state.origin}
          onLoad={(e) => this.handleOnLoad(e)}
          onDragEnd={this.onDragEnd}
          zoom={16}
          options={{
            controlSize: 24,
          }}
        >
          {this.state.searchBoxRef &&
            this.state.searchBoxRef.getPlaces() &&
            this.state.origin &&
            this.state.requestDirection && (
              <DirectionsService
                options={{
                  destination:
                    this.state.searchBoxRef.getPlaces()[0].formatted_address,
                  origin: this.props.origin,
                  travelMode: "DRIVING",
                }}
                callback={(e) => this.directionsCallback(e)}
              />
            )}
          {this.state.response !== null && (
            <>
              <DirectionsRenderer
                options={{
                  directions: this.state.response,
                }}
              />
              {this.state.requestDistance && (
                <DistanceMatrixService
                  callback={(e) => this.distanceCallback(e)}
                  options={{
                    origins: [this.state.origin],
                    destinations: [
                      this.state.searchBoxRef.getPlaces()[0].formatted_address,
                    ],
                    travelMode: "DRIVING",
                  }}
                />
              )}
            </>
          )}
          <StandaloneSearchBox
            onLoad={(e) => this.searchBoxLoaded(e)}
            onPlacesChanged={this.searchBoxOnComplete}
          >
            <input
              type="text"
              placeholder="Where to deliver?"
              className="absolute bottom-5 left-1/2 w-1/2 -translate-x-1/2 text-ellipsis rounded-lg"
            />
          </StandaloneSearchBox>
          <Marker position={this.props.origin} label={this.props.markerLabel} />
        </GoogleMap>
      </LoadScriptOnlyIfNeeded>
    );
  }
}

Map.propTypes = {
  setDestination: PropTypes.func,
  setDistance: PropTypes.func,
  origin: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  markerLabel: PropTypes.object,
};

export default Map;
