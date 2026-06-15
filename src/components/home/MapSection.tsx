import { useEffect, useRef, useState } from 'react';
import './MapSection.css';

const MAP_ID = 'sahajanand-map';

// Sahajanand Banquet & Lawn — exact coordinates from Google Maps
const VENUE_LAT = 22.2738137;
const VENUE_LNG = 73.1751209;

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error('Google Maps API key is not configured. Add VITE_GOOGLE_MAPS_API_KEY to your .env file.');
      setHasError(true);
      return;
    }

    // Prevent loading the script twice
    if (document.getElementById('google-maps-script')) {
      if ((window as any).google?.maps) {
        initMap();
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;

    // Global callback for the Maps API
    (window as any).initGoogleMap = () => {
      initMap();
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps API.');
      setHasError(true);
    };

    document.head.appendChild(script);

    return () => {
      delete (window as any).initGoogleMap;
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !(window as any).google?.maps) return;

    const google = (window as any).google;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: VENUE_LAT, lng: VENUE_LNG },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        // Clean light theme with warm premium tones
        { elementType: 'geometry', stylers: [{ color: '#f5f1eb' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#5a5a5a' }] },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#d4c5a9' }],
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#8a7e6b' }],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#ebe6db' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#7a7060' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#d4e8c8' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#5a7a4a' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#ffffff' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#e0d8c8' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6a6a6a' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#f0e6d2' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#d4c5a9' }],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#e8e0d0' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c8dce8' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6a8a9a' }],
        },
      ],
    });

    // Custom gold marker for the venue
    const marker = new google.maps.Marker({
      position: { lat: VENUE_LAT, lng: VENUE_LNG },
      map,
      title: 'Sahajanand Banquet & Lawn',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#771d3e',
        fillOpacity: 1,
        strokeColor: '#f272ab',
        strokeWeight: 3,
        scale: 10,
      },
      animation: google.maps.Animation.DROP,
    });

    // Premium info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="
          font-family: 'Outfit', sans-serif;
          padding: 12px 16px;
          max-width: 280px;
          color: #1c1c1c;
        ">
          <h3 style="
            font-family: 'Playfair Display', serif;
            font-size: 16px;
            color: #771d3e;
            margin: 0 0 8px 0;
          ">Sahajanand Banquet & Lawn</h3>
          <p style="
            font-size: 13px;
            line-height: 1.5;
            color: #4a4a4a;
            margin: 0 0 10px 0;
          ">Near Shree Siddheshwar Happy Life, Manjalpur-Atladra Overbridge, Manjalpur, Vadodara, Gujarat, India 390011</p>
          <a href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8" 
             target="_blank" 
             rel="noopener noreferrer"
             style="
               display: inline-flex;
               align-items: center;
               gap: 6px;
               background: #771d3e;
               color: #fff;
               padding: 6px 14px;
               border-radius: 4px;
               font-size: 12px;
               font-weight: 600;
               letter-spacing: 0.5px;
               text-decoration: none;
               text-transform: uppercase;
             ">
            Get Directions →
          </a>
        </div>
      `,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    // Add a pulsing ring around the marker
    new google.maps.Circle({
      strokeColor: '#771d3e',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: '#771d3e',
      fillOpacity: 0.08,
      map,
      center: { lat: VENUE_LAT, lng: VENUE_LNG },
      radius: 150,
    });

    setIsMapLoaded(true);
  };

  return (
    <div className="map-section" id="map-section">
      {/* Premium scroll teaser — invites user to scroll down to the map */}
      <div className="map-scroll-teaser">
        <div className="map-teaser-pin">
          <div className="map-teaser-pin-ring" />
          <div className="map-teaser-pin-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        </div>
        <p className="map-teaser-label">Find Us Here</p>
        <div className="map-teaser-chevron">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <div className="map-container">
        {/* Loading skeleton */}
        {!isMapLoaded && !hasError && (
          <div className="map-skeleton">
            <div className="map-skeleton-pulse" />
            <div className="map-skeleton-text">Loading map...</div>
            <p className="map-skeleton-hint">
              Taking too long? Open directions instantly on Google Maps
            </p>
            <a 
              href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="map-skeleton-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              Get Instant Directions
            </a>
          </div>
        )}

        {/* Error fallback */}
        {hasError && (
          <div className="map-fallback">
            <div className="map-fallback-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h4>Sahajanand Banquet & Lawn</h4>
            <p>Near Shree Siddheshwar Happy Life, Manjalpur-Atladra Overbridge, Manjalpur, Vadodara, Gujarat, India 390011</p>
            <a 
              href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="map-fallback-btn"
            >
              Open in Google Maps →
            </a>
          </div>
        )}

        {/* Map renders here */}
        <div 
          id={MAP_ID}
          ref={mapRef} 
          className={`map-canvas ${isMapLoaded ? 'loaded' : ''}`}
        />

        {/* Overlay gradient at the edges for blending into the dark background */}
        <div className="map-edge-fade map-edge-fade--top" />
        <div className="map-edge-fade map-edge-fade--bottom" />
      </div>

      {/* Quick action bar below the map */}
      <div className="map-actions-wrapper">
        <div className="map-actions">
          <a href="tel:+918849641922" className="map-action-btn map-action-btn--black-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
