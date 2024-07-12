const apiBaseURL = "http://127.0.0.1:5000";

export const getGeocodeURL = (lat, lng, apiKey) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
};

export default apiBaseURL;
