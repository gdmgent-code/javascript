'use strict';

// class: App
class App {
    constructor() {
        this.clocks = [];
        this.clocksElement = document.querySelector('.clocks');

        // Register directives
        document.registerElement('digital-clock', DigitalClockElement);

        // Tests
        this.testClocks();
    }

    testClocks() {
        this.addDigitalClock({ timeZoneOffsetInHours: 2, tickInterval: 100 }); // Clock location Brussels
        this.addDigitalClock({ timeZoneOffsetInHours: 3, tickInterval: 100 }); // Clock location Ankara
    }

    addDigitalClock({ location = null, timeZoneOffsetInHours = 0, tickInterval = 100 } = {}) {
        // Create Clock Element
        const clockElement = document.createElement('digital-clock');
        this.clocksElement.appendChild(clockElement);
        clockElement.setClock({ timeZoneOffsetInHours: timeZoneOffsetInHours, tickInterval: 100 });
    }
}

// Listen to load event of window object
// Launch the app when loaded
window.addEventListener('load', () => {
    const app = new App();
});