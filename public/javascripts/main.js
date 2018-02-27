/**
 *   TODO:
 */

"use strict";
import DivContents from './DivContents.js';
import EventHandler from './EventHandler.js';

class Main {
    constructor(people) {
        this.date = new Date();
        this.patrollers = people;
        this.eventHandler = new EventHandler();
        document.getElementById("date").innerText = this.getWeekDay();
        document.getElementById("weekDay").innerText = `${this.date.getMonth() + 1}/${this.date.getDate()}/${this.date.getFullYear()}`;
        document.getElementById("dayNight").innerText = this.getDayNight();
        this.prepUX();
    }

    getWeekDay() {
        console.log(this.patrollers[6][1]);
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
        let t6counter = 1;
        if (this.getDayNight() === "Day") {
            const MAX_TEAM = 6;
            const CANDIDATE_TEAM = 5;
            while (teamNum <= MAX_TEAM) {
                if (teamNum <= CANDIDATE_TEAM) {
                    this.eventHandler.handleTeamButtons(teamNum, 1, this.patrollers);
                    teamNum++;
                } else {
                    let leaderNum = 0;
                    const MAX_LEADERS = 6;
                    while (leaderNum < MAX_LEADERS) {
                        document.getElementById(`team${teamNum}`).insertAdjacentHTML('beforeend', DivContents.getDayLeaderDivs(teamNum, t6counter, leaderNum));
                        leaderNum++;
                        t6counter++;
                    }
                    teamNum++;
                }
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

    /*
        displayAM(teamNum, patrollerNum) {
            /!** @type {number} *!/
            let hour = date.getHours();

            /!** @type {string} *!/
            let shiftNum = "shift." + teamNum + "." + patrollerNum;

            if (hour < 11 && hour > 1) {
                /!** @type {HTMLElement} *!/
                let div = document.getElementById(shiftNum),
                    amShiftLabel = document.createElement("label"),
                    amShiftCheckbox = document.createElement("input");

                amShiftLabel.setAttribute("class", "label left inline radius"); //https://stackoverflow.com/questions/3919291/when-to-use-setattribute-vs-attribute-in-javascript
                amShiftLabel.for = "amShiftCheckbox";
                amShiftLabel.textContent = "AM only?";
                amShiftCheckbox.type = "checkbox";
                amShiftCheckbox.id = "amShiftCheckbox." + teamNum + "." + patrollerNum;
                div.appendChild(amShiftLabel);
                div.appendChild(amShiftCheckbox);
                handleAM(teamNum, patrollerNum);
            }
        }

        handleAM(teamNum, patrollerNum) {
            /!** @type {HTMLElement} *!/
            let shiftNum = document.getElementById("amShiftCheckbox." + teamNum + "." + patrollerNum);

            /!** @constant *!/
            let HALF_SHIFT = 0.5;

            shiftNum.addEventListener('change', function () {
                //decrement days by .5 if checked, increment by .5 if checked
                if (this.checked) {
                    days = days - HALF_SHIFT;
                    document.getElementById("days." + teamNum + "." + patrollerNum).innerHTML = "<h4>" + days.toFixed(1) + "</h4>";
                } else {
                    days = days + HALF_SHIFT;
                    if (days < 1) {
                        document.getElementById("days." + teamNum + "." + patrollerNum).innerHTML = "<h4>" + 1 + "</h4>";
                    } else {
                        document.getElementById("days." + teamNum + "." + patrollerNum).innerHTML = "<h4>" + days.toFixed(1) + "</h4>";
                    }
                }
            });
        }

        prepPatroller(teamNum) {
            teamNum.addEventListener('change', populatePatroller);
        }

        populatePatroller() {
            patroller = event.target.id;

            let newDate = new Date();

            /!** @type {string} *!/
            let rating,
                element = document.getElementById(patroller);

            /!** @const *!/
            let LAST = 0,
                FIRST = 1,
                ID = 2,
                RATING = 3,
                DAYS = 4;

            /!** @type {number} *!/
            let exists = 0;

            /!** @type {Array.<string>} *!/
            let elementId = patroller.split('.');
            for (let i = 0; i < patrollers.length; i++) {
                if (element.value == patrollers[i][ID]) {
                    document.getElementById("patroller." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + patrollers[i][FIRST] + " " + patrollers[i][LAST] + "</h4>";
                    if (patrollers[i][RATING] == 1) {
                        rating = "Basic";
                    } else if (patrollers[i][RATING] == 2) {
                        rating = "Senior";
                    } else {
                        rating = "Certified";
                    }
                    document.getElementById("rating." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + rating + "</h4>";
                    let minutes = newDate.getMinutes();
                    if (minutes < 10) {
                        minutes = "0" + minutes;
                    }
                    document.getElementById("time." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + date.getHours() + ":" + minutes + "</h4>";

                    days = patrollers[i][DAYS];
                    days++;

                    document.getElementById("days." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + days.toFixed(1) + "</h4>";
                    patrollers.splice(patrollers[i]--, 1); //remove array element
                    displayAM(elementId[1], elementId[2]);

                    elementId[2]++;
                    patroller = "patrollerID." + elementId[1] + "." + elementId[2];

                    /!** @type {boolean} *!/
                    let addTeam = setCounter(elementId[1]);

                    if (addTeam === true) {
                        addPatrollerRow(elementId[1], elementId[2]);
                        prepPatroller(document.getElementById(patroller));
                    }

                    exists = 1;
                    break;
                }
            }
            if (exists == 0) {
                alert("PLEASE TRY AGAIN!"); //Do something here if number already in use.
                element.value = '';
            }
        }

        setCounter(teamNum) {
            /!** @const *!/
            let MAX_TEAM = 4;
            if (teamNum === 1) {
                if (typeof t1Counter === 'undefined') {
                    t1Counter = 1;
                }
                if (t1Counter < MAX_TEAM) {
                    t1Counter++;
                    return true;
                } else {
                    return false;
                }
            } else if (teamNum === 2) {
                if (typeof t2Counter === 'undefined') {
                    t2Counter = 1;
                }
                if (t2Counter < MAX_TEAM) {
                    t2Counter++;
                    return true;
                } else {
                    return false;
                }
            } else if (teamNum === 3) {
                if (typeof t3Counter === 'undefined') {
                    t3Counter = 1;
                }
                if (t3Counter < MAX_TEAM) {
                    t3Counter++;
                    return true;
                } else {
                    return false;
                }
            } else if (teamNum === 4) {
                if (typeof t4Counter === 'undefined') {
                    t4Counter = 1;
                }
                if (t4Counter < MAX_TEAM) {
                    t4Counter++;
                    return true;
                } else {
                    return false;
                }
            } else {
                if (typeof t5Counter === 'undefined') {
                    t5Counter = 1;
                }
                if (t5Counter < MAX_TEAM) {
                    t5Counter++;
                    return true;
                } else {
                    return false;
                }
            }
        }

        addPatrollerRow(teamNum, patrollerNum) {
            /!** @type {string} *!/
            let team = ('team' + teamNum),
                currentPatroller = teamNum + '.' + patrollerNum;

            let row = document.createElement("div"),
                radioDiv = document.createElement("div"),
                inputRadio = document.createElement("input"),
                patrollerDiv = document.createElement("div"),
                inputPatrollerID = document.createElement("input"),
                patrollerRating = document.createElement("div"),
                patrollerTime = document.createElement("div"),
                shiftDiv = document.createElement("div"),
                daysDivLabel = document.createElement("label"),
                daysDiv = document.createElement("div"),
                guestDiv = document.createElement("div"),
                inputGuest = document.createElement("input");

            row.setAttribute("class", "row fullWidth");
            row.id = "row." + currentPatroller;
            radioDiv.setAttribute("class", "small-1 column");
            radioDiv.id = "radioDiv." + currentPatroller;
            inputRadio.type = "number";
            inputRadio.id = "radioNum." + currentPatroller;
            inputRadio.placeholder = "Radio";
            patrollerDiv.setAttribute("class", "small-2 columns");
            patrollerDiv.id = "patroller." + currentPatroller;
            inputPatrollerID.type = "number";
            inputPatrollerID.id = "patrollerID." + currentPatroller;
            inputPatrollerID.placeholder = "ID Number";
            patrollerRating.setAttribute("class", "small-1 column");
            patrollerRating.id = "rating." + currentPatroller;
            patrollerTime.setAttribute("class", "small-1 column");
            patrollerTime.id = "time." + currentPatroller;
            shiftDiv.setAttribute("class", "small-1 column");
            shiftDiv.id = "shift." + currentPatroller;
            daysDivLabel.setAttribute("class", "label left inline radius");
            daysDivLabel.textContent = "Days: ";
            daysDiv.setAttribute("class", "small-1 column");
            daysDiv.id = "days." + currentPatroller;
            guestDiv.setAttribute("class", "small-2 columns");
            guestDiv.id = "guestDiv." + currentPatroller;
            inputGuest.type = "text";
            inputGuest.id = "guest." + currentPatroller;
            inputGuest.placeholder = "Guest";

            document.getElementById(team).appendChild(row);
            document.getElementById(row.id).appendChild(radioDiv);
            document.getElementById(radioDiv.id).appendChild(inputRadio);
            document.getElementById(row.id).appendChild(patrollerDiv);
            document.getElementById(patrollerDiv.id).appendChild(inputPatrollerID);
            document.getElementById(row.id).appendChild(patrollerRating);
            document.getElementById(row.id).appendChild(patrollerTime);
            document.getElementById(row.id).appendChild(shiftDiv);
            document.getElementById(row.id).appendChild(daysDivLabel);
            document.getElementById(row.id).appendChild(daysDiv);
            document.getElementById(row.id).appendChild(guestDiv);
            document.getElementById(guestDiv.id).appendChild(inputGuest);
        }

        setPatrollersArray() {

        }
    */
