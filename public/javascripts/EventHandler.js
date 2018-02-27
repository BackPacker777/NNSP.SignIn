//   @todo Nothing

"use strict";

import DivContents from "./DivContents.js";

export default class EventHandler {
    constructor() {
        this.signedIn = [];
    }

    handleTeamButtons(teamNum, counter, patrollers) {
        const DAY_TEAMS = 4;
        document.getElementById(`joinTeam${teamNum}`).addEventListener('click', () => {
            if (teamNum <= DAY_TEAMS) {
                document.getElementById(`team${teamNum}`).insertAdjacentHTML('beforeend', DivContents.getDayDivs(teamNum, counter));
                this.changePatrollerDiv(teamNum, counter, patrollers);
                this.handleHalfDay(teamNum, counter);
                counter++;
            } else {
                document.getElementById(`team${teamNum}`).insertAdjacentHTML('beforeend', DivContents.getDayCandidateDivs(teamNum, counter));
                this.changePatrollerDiv(teamNum, counter, patrollers);
                counter++;
            }
        });
    }

    changePatrollerDiv(teamNum, counter, patrollers) {
        document.getElementById(`patrollerID.${teamNum}.${counter}`).addEventListener('blur', () => {
            if (this.signedIn.length > 0) {
                for (let item of this.signedIn) {
                    if (item === Number(document.getElementById(`patrollerID.${teamNum}.${counter}`).value)) {
                        alert(`You are already logged in.`);
                        document.getElementById(`patrollerID.${teamNum}.${counter}`).value = '';
                    } else {
                        let time = new Date();
                        this.signedIn.push(Number(patrollers[i][0]));
                        document.getElementById(`name.${teamNum}.${counter}`).value = `${patrollers[i][2]} ${patrollers[i][1]}`;
                        document.getElementById(`rating.${teamNum}.${counter}`).value = patrollers[i][3];
                        document.getElementById(`time.${teamNum}.${counter}`).value = `${time.getHours()}:${time.getMinutes()}`;
                        document.getElementById(`days.${teamNum}.${counter}`).value = patrollers[i][4];
                        break;
                    }
                }
            } else {
                for (let i = 0; i < patrollers.length; i++) {
                    if (Number(patrollers[i][0]) === Number(document.getElementById(`patrollerID.${teamNum}.${counter}`).value)) {
                        let time = new Date();
                        this.signedIn.push(Number(patrollers[i][0]));
                        document.getElementById(`name.${teamNum}.${counter}`).value = `${patrollers[i][2]} ${patrollers[i][1]}`;
                        document.getElementById(`rating.${teamNum}.${counter}`).value = patrollers[i][3];
                        document.getElementById(`time.${teamNum}.${counter}`).value = `${time.getHours()}:${time.getMinutes()}`;
                        document.getElementById(`days.${teamNum}.${counter}`).value = patrollers[i][4];
                        break;
                    }
                }
            }
        });
    }

    handleHalfDay(teamNum, counter) {
        let time = new Date();
        const DAY_CUTOFF = 9;
        if (time.getHours() > DAY_CUTOFF) {
            document.getElementById(`guest.${teamNum}.${counter}`).setAttribute('readonly', '');
        } else {
            document.getElementById(`halfDay.${teamNum}.${counter}`).addEventListener('click', () => {
                if (document.getElementById(`halfDay.${teamNum}.${counter}`).checked) {
                    document.getElementById(`guest.${teamNum}.${counter}`).setAttribute('readonly', '');
                } else {
                    document.getElementById(`guest.${teamNum}.${counter}`).removeAttribute('readonly');
                }
            });
        }
    }
}