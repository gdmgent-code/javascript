'use strict';

class DigitalClock {
    constructor({ location = null, timeZoneOffsetInHours = 0, tickInterval = 100, clockElement = null } = {}) {
        this.location = location;
        this.timeZoneOffsetInHours = timeZoneOffsetInHours;
        this.tickInterval = tickInterval;
        this.clockElement = clockElement;
        this.optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        this.optionsDate = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };

        if(this.clockElement !== null) {
            this.clockElement.innerHTML = `
    <div class="clock__location"></div>
    <div class="clock__time"></div>
    <div class="clock__date"></div>
    `;
        }

        this.tickClock();
    }

    tickClock() {
        window.setInterval(() => {
            this.updateDate();
            if(this.clockElement != null) {
                this.updateClockInDOM();
            }
            this.tickClock();
        }, this.tickInterval);
    }

    updateDate() {
        this.date = new Date();
        this.date.setHours(this.date.getHours() + (this.date.getTimezoneOffset() / 60) + this.timeZoneOffsetInHours);
    }

    updateClockInDOM() {
        if(this.location !== null) {
            this.clockElement.querySelector('.clock__location').innerHTML = this.location;
        }
        this.clockElement.querySelector('.clock__time').innerHTML = this.toTimeString();
        this.clockElement.querySelector('.clock__date').innerHTML = this.toDateString();
    }
    
    toTimeString() {
        return this.date.toLocaleTimeString(navigator.language, this.optionsTime);
    };

    toDateString() {
        return this.date.toLocaleDateString(navigator.language, this.optionsDate);
    };

    digitize(value, digits = 2) {
        let strValue = value.toString();
        while(strValue.length < digits) {
            strValue = '0' + strValue;
        }
        return strValue;
    };
}