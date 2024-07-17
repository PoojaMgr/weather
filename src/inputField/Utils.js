const getLocation = (showPosition) => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      } else { 
        alert("Geolocation is not supported by this browser.");
      }
}

export { getLocation };