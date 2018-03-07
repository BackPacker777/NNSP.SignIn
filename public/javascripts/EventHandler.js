//   @todo Nothing!

"use strict";

import DivContents from "./DivContents.js";

export default class EventHandler {
    constructor(patrollers) {
        this.signedIn = [];
        this.patrollers = patrollers;
    }

    handleTeamButtons(teamNum) {
        let counter = 1;
        const TEAMS = {
            DAY: 4,
            CANDIDATES: 5,
            LEADERS: 6
        };
        const START_CHILDREN = 3;
        if (teamNum < TEAMS.LEADERS) {
            document.getElementById(`joinTeam${teamNum}`).addEventListener('click', () => {
                if (teamNum <= TEAMS.DAY) {
                    if (document.getElementById(`team${teamNum}`).childNodes.length === START_CHILDREN || document.getElementById(`patrollerID.${teamNum}.${counter - 1}`).value !== '') {
                        document.getElementById(`team${teamNum}`).insertAdjacentHTML('beforeend', DivContents.getDayDivs(teamNum, counter));
                        this.changePatrollerDiv(teamNum, counter);
                        this.handleHalfDay(teamNum, counter, 'regular');
                        counter++;
                    }
                } else if (teamNum <= TEAMS.CANDIDATES) {
                    if (document.getElementById(`team${teamNum}`).childNodes.length === START_CHILDREN || document.getElementById(`patrollerID.${teamNum}.${counter - 1}`).value !== '') {
                        document.getElementById(`team${teamNum}`).insertAdjacentHTML('beforeend', DivContents.getDayCandidateDivs(teamNum, counter));
                        this.changePatrollerDiv(teamNum, counter);
                        this.handleHalfDay(teamNum, counter, 'candidate');
                        counter++;
                    }
                }
            });
        } else {
            let leaderNum = 0;
            let t6counter = 1;
            while (leaderNum < TEAMS.LEADERS) {
                document.getElementById(`team${teamNum}`).insertAdjacentHTML('beforeend', DivContents.getDayLeaderDivs(teamNum, t6counter, leaderNum));
                this.changeLeaderDiv(t6counter);
                this.handleHalfDay(teamNum, t6counter, 'regular');
                leaderNum++;
                t6counter++;
            }
        }
    }

    changePatrollerDiv(teamNum, counter) {
        document.getElementById(`patrollerID.${teamNum}.${counter}`).addEventListener('blur', () => {
            let correctID = false;
            if (document.getElementById(`patrollerID.${teamNum}.${counter}`).value !== '') {
                if (this.signedIn.length > 0) {
                    for (let i = 0; i < this.patrollers.length; i++) {
                        if (this.signedIn[i] === Number(document.getElementById(`patrollerID.${teamNum}.${counter}`).value)) {
                            alert(`You are already logged in.`);
                            document.getElementById(`patrollerID.${teamNum}.${counter}`).value = '';
                            break;
                        } else if (Number(this.patrollers[i][0]) === Number(document.getElementById(`patrollerID.${teamNum}.${counter}`).value)) {
                            let time = new Date();
                            this.signedIn.push(Number(this.patrollers[i][0]));
                            document.getElementById(`name.${teamNum}.${counter}`).value = `${this.patrollers[i][2]} ${this.patrollers[i][1]}`;
                            document.getElementById(`rating.${teamNum}.${counter}`).value = this.patrollers[i][3];
                            document.getElementById(`time.${teamNum}.${counter}`).value = `${time.getHours()}:${time.getMinutes()}`;
                            document.getElementById(`days.${teamNum}.${counter}`).value = this.patrollers[i][4];
                            correctID = true;
                            break;
                        }
                    }
                    if (correctID !== true) {
                        alert(`Invalid ID number. Please try again... Or don't...`);
                        document.getElementById(`patrollerID.${teamNum}.${counter}`).value = '';
                    }
                } else {
                    for (let i = 0; i < this.patrollers.length; i++) {
                        if (Number(this.patrollers[i][0]) === Number(document.getElementById(`patrollerID.${teamNum}.${counter}`).value)) {
                            let time = new Date();
                            this.signedIn.push(Number(this.patrollers[i][0]));
                            document.getElementById(`name.${teamNum}.${counter}`).value = `${this.patrollers[i][2]} ${this.patrollers[i][1]}`;
                            document.getElementById(`rating.${teamNum}.${counter}`).value = this.patrollers[i][3];
                            document.getElementById(`time.${teamNum}.${counter}`).value = `${time.getHours()}:${time.getMinutes()}`;
                            document.getElementById(`days.${teamNum}.${counter}`).value = this.patrollers[i][4];
                            correctID = true;
                            break;
                        }
                    }
                    if (correctID !== true) {
                        alert(`Invalid ID number. Please try again... Or don't...`);
                        document.getElementById(`patrollerID.${teamNum}.${counter}`).value = '';
                    }
                }
            } else {
                let getIds = document.getElementsByName('patrollerID');
                let patrollerIDs = [];
                for (let i = 0; i < getIds.length; i++) {
                    patrollerIDs.push(Number(getIds[i].value));
                }
                let difference;  //https://stackoverflow.com/a/30288946/466246  Answer for difference between 2 arrays
                for (let i = 0; i < this.signedIn.length; i++) {
                    if (this.signedIn.indexOf(patrollerIDs[i]) === -1) {
                        difference = this.signedIn[i];
                    }
                }
                this.signedIn.splice(this.signedIn.indexOf(difference), 1);
                document.getElementById(`name.${teamNum}.${counter}`).value = ``;
                document.getElementById(`radioNum.${teamNum}.${counter}`).value = ``;
                document.getElementById(`rating.${teamNum}.${counter}`).value = ``;
                document.getElementById(`time.${teamNum}.${counter}`).value = ``;
                document.getElementById(`days.${teamNum}.${counter}`).value = ``;
                document.getElementById(`guest.${teamNum}.${counter}`).value = ``;
            }
        });
    }

    changeLeaderDiv(counter) {
        const LEADERS = {
            PD: 234567,
            APD1: 777777,
            APD2: 111111,
            APD3: 222222,
            TR1: 333333,
            TR2: 444444
        };
        document.getElementById(`patrollerID.6.${counter}`).addEventListener('blur', () => {
            if (document.getElementById(`position.6.${t6counter}`).value === 'PD') {
                if (! document.getElementById(`patrollerID.6.${t6counter}`).value === LEADERS.PD) {
                    alert(`Invalid ID number. Please try again... Or don't...`);
                    document.getElementById(`patrollerID.6.${t6counter}`).value = '';
                }
            }
        });
    }

    handleHalfDay(teamNum, counter, team) {
        let time = new Date();
        const DAY_CUTOFF = 9;
        if (time.getHours() > DAY_CUTOFF) {
            if (team === 'regular') {
                document.getElementById(`guest.${teamNum}.${counter}`).setAttribute('readonly', '');
            }
            document.getElementById(`halfDay.${teamNum}.${counter}`).setAttribute('disabled', 'disabled');
            document.getElementById(`halfDay.${teamNum}.${counter}`).setAttribute('checked', 'checked');
        } else {
            document.getElementById(`halfDay.${teamNum}.${counter}`).addEventListener('click', () => {
                if (team === 'regular') {
                    if (document.getElementById(`halfDay.${teamNum}.${counter}`).checked) {
                        document.getElementById(`guest.${teamNum}.${counter}`).setAttribute('readonly', '');
                    } else {
                        document.getElementById(`guest.${teamNum}.${counter}`).removeAttribute('readonly');
                    }
                }
            });
        }
    }
}