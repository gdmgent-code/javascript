function App() {

    let _parkingStatesService,
        _previousParkingStatesData,
        _currentParkingStatesData,
        _parkingStatesElement,
        _isCheckParkingStatesRealtimeActive = false;;

    // Initialize Application
    function init() {
        console.log('1. Initialize the app');
        console.log('1.1 Create a ParkingStatesService object');
        _parkingStatesService = new ParkingStatesService();
        console.log('1.2 Cache active DOM-elements');
        _parkingStatesElement = document.querySelector('.parking-states');
        console.log('1.3 Load parking states via ParkingStatesService');
        loadParkingStatesData();
        console.log('1.4 Check the parking states in realtime');
        checkParkingStatesRealtime();
    };

    function checkParkingStatesRealtime() {
        _isCheckParkingStatesRealtimeActive = true;
        window.setTimeout(function(ev) {
            loadParkingStatesData();
        }, 30000);
    }

    function loadParkingStatesData() {
        _parkingStatesService.loadParkingStates()
            .then(function(data) {
                if(data != null && data != undefined && data.length > 0) {
                    console.log('2.1 Sort the data on the name property of each object');
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                    data.sort(function (a, b) {
                        if (a.name < b.name) {
                            return -1;
                        } else if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    });
                    console.log('2.2 Save the loaded data into the variable _currentParkingStatesData');
                    _currentParkingStatesData = data;
                    console.log('2.3 Update parking states ui via function: updateParkingStatesUI');
                    updateParkingStatesUI();
                    if(_isCheckParkingStatesRealtimeActive === true) {
                        console.log('2.4 Realtime check of parking states');
                        window.setTimeout(function(ev) {
                            loadParkingStatesData();
                        }, 60000);
                    }
                }
            })
            .catch(function(reject) {
                console.log(reject);
            });
    }

    function updateParkingStatesUI() {
        if(_parkingStatesElement != null && _currentParkingStatesData != null) {
            if(_previousParkingStatesData == null) {
                let tempStr = '';
                console.log('3.1 Loop to the parking states');
                _currentParkingStatesData.forEach(function(parkingState, index) {
                    tempStr += ` 
    <li class="mdl-list__item mdl-list__item--three-line parking-state" data-id="${ parkingState.id }" data-lat="${ parkingState.latitude }" data-lng="${ parkingState.longitude }">
        <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-avatar parking-state__indicator ${ convertStateToClassName(parkingState.parkingStatus.availableCapacity, parkingState.totalCapacity) }">fiber_manual_record</i>
            <span>${ parkingState.name }</span>
            <span class="mdl-list__item-text-body">
                ${ parkingState.address }
            </span>
        </span>
        <span class="mdl-list__item-secondary-content parking-state__capacity">
            <span class="parking-state__availablecapacity">${ parkingState.parkingStatus.availableCapacity }</span><span class="parking-state__totalcapacity">${ parkingState.totalCapacity }</span><i class="material-icons parking-state__evolution">compare_arrows</i>
        </span>
    </li>               
                    `;
                });
                console.log('3.2 Assign temporary string to the dom-element _parkingStatesElement');
                _parkingStatesElement.innerHTML = tempStr;

            } else {
                console.log('3.1 Update parking states elements (indicator, evolution)');
                _currentParkingStatesData.forEach(function(parkingState, index) {
                    const parkingStateElement = _parkingStatesElement.querySelector(`.parking-state[data-id="${ parkingState.id }"]`);
                    if(parkingStateElement != null && parkingStateElement != undefined) {
                        const parkingStateIndicatorElement = parkingStateElement.querySelector('.parking-state__indicator');
                        if(parkingStateIndicatorElement != null && parkingStateIndicatorElement != undefined) {
                            parkingStateIndicatorElement.classList.remove('ps--free');
                            parkingStateIndicatorElement.classList.remove('ps--middle');
                            parkingStateIndicatorElement.classList.remove('ps--full');
                            parkingStateIndicatorElement.classList.add(`${ convertStateToClassName(parkingState.parkingStatus.availableCapacity, parkingState.totalCapacity) }`);
                        }
                        const parkingStateEvolutionElement = parkingStateElement.querySelector('.parking-state__evolution');
                        if(parkingStateEvolutionElement != null && parkingStateEvolutionElement != undefined) {
                            parkingStateEvolutionElement.innerHTML = convertComparisonCurrentPreviousAvailabilityToMaterialIconsName(_previousParkingStatesData.find(function(e) { return e.id == parkingState.id }).parkingStatus.availableCapacity, parkingState.parkingStatus.availableCapacity);
                        }
                    }
                });
            }
            console.log('3.3 Set _currentParkingStatesData to _previousParkingStatesData');
            _previousParkingStatesData = _currentParkingStatesData;
        }
    }

    function convertStateToClassName(available, total) {
        const percAvailable = Math.round(available / total * 100);
        if(percAvailable > 50) {
            return 'ps--free';
        } else if (percAvailable > 20 && percAvailable <= 50) {
            return 'ps--middle';
        }
        return 'ps--full';
    }

    function convertComparisonCurrentPreviousAvailabilityToMaterialIconsName(previousAvailability, currentAvailability) {
        if(previousAvailability < currentAvailability) {
            return 'arrow_upward';
        } else if (previousAvailability > currentAvailability) {
            return 'arrow_downward';
        }
        return 'compare_arrows';
    }

    // Closure: public accessible properties and functions
    return {
        init: init
    };
}

// Event Listener for load event of the window --> all resources loaded
window.addEventListener('load', function() {
    const app = new App();
    app.init();
});