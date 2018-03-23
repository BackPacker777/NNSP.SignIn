"use strict";

import DivContents from './DivContents.js';
import EventHandler from './EventHandler.js';

class Main {
    constructor(people) {
        this.date = new Date();
        this.eventHandler = new EventHandler(people);
        document.getElementById("date").innerText = this.getWeekDay(people);
        document.getElementById("weekDay").innerText = `${this.date.getMonth() + 1}/${this.date.getDate()}/${this.date.getFullYear()}`;
        document.getElementById("dayNight").innerText = this.getDayNight();
        document.getElementById("formSubmit").disabled = true;
        document.getElementById("formSubmit").classList.add('disabled');
        this.prepUX();
    }

    getWeekDay(patrollers) {
        console.log(patrollers[6][1]);
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[this.date.getDay()];
    }

    getDayNight() {
        const BEGIN_NIGHT = 14;
        const END_NIGHT = 23;
        let dayNight;
        if (this.date.getHours() > BEGIN_NIGHT && this.date.getHours() < END_NIGHT) {
            dayNight = "Night";
        } else {
            dayNight = "Day";
        }
        return dayNight;
    }

    prepUX() {
        let teamNum = 1;
        if (this.getDayNight() === "Day") {
            const MAX_TEAM = 6;
            while (teamNum <= MAX_TEAM) {
                this.eventHandler.handleTeamButtons(teamNum);
                teamNum++;
            }
        } else {
            const MAX_PATROLLERS = 10;
            const RACE_TIMES = ['', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45'];
            let counter = 1;
            document.getElementById(`team${teamNum}`).innerHTML = `<legend><strong>Night Team:</strong></legend>`;
            while (counter <= MAX_PATROLLERS) {
                if (counter < RACE_TIMES.length) {
                    document.getElementById(`team1`).insertAdjacentHTML('beforeend', DivContents.getNightRaceDivs(teamNum, counter, RACE_TIMES));
                } else {
                    document.getElementById(`team1`).insertAdjacentHTML('beforeend', DivContents.getNightDivs(teamNum, counter));
                }
                counter++;
            }
        }
    }

    static async populatePatrollers() {
        const response = await fetch(`/data/patrollers.csv`, {
            method: 'post',
            headers: {'x-requested-with': 'fetch.0'}
        });
        return response.text();
    }
}

window.addEventListener('load', () => {
    Main.populatePatrollers().then((patrollers) => {
        patrollers = JSON.parse(patrollers);
        new Main(patrollers);
    });
});