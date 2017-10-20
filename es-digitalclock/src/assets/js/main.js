'use strict';

// class: App
class App {
    constructor() {
        this.clocks = [];
        this.clocksElement = document.querySelector('.clocks');

        // Tests
        this.testClocks();
    }

    testClocks() {
        this.addDigitalClock({ location: 'Ghent', timeZoneOffsetInHours: 2, tickInterval: 100 }); // Clock location Brussels
        this.addDigitalClock({ location: 'Ankara', timeZoneOffsetInHours: 3, tickInterval: 100 }); // Clock location Ankara
    }

    addDigitalClock({ location = null, timeZoneOffsetInHours = 0, tickInterval = 100 } = {}) {
        // Create Clock Element
        const clockElement = document.createElement('div');
        clockElement.classList.add('digital-clock');
        this.clocksElement.appendChild(clockElement);
        const clock = new DigitalClock({ location: location, timeZoneOffsetInHours: timeZoneOffsetInHours, tickInterval: tickInterval, clockElement: clockElement });
    }
}

// Listen to load event of window object
// Launch the app when loaded
window.addEventListener('load', () => {
    const app = new App();
});