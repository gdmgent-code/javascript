function ParkingStatesService() {
    const URL = 'http://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json';

    function loadParkingStates() {
        return AJAX.loadJsonByPromise(URL);
    }

    return {
        loadParkingStates:loadParkingStates
    }
}