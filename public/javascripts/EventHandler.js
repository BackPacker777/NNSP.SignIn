//   @todo Nothing

"use strict";

import DivContents from "./DivContents";

export default class EventHandler {
    constructor() {}

    static changePatrollerDiv(teamNum, counter, patrollers) {
        document.getElementById(`patrollerID.${teamNum}.${counter}`).addEventListener('blur', () => {
            for (let i = 0; i < patrollers.length; i++) {
                console.log(patrollers[i][0]);
                if (Number(patrollers[i][0]) === Number(document.getElementById(`patrollerID.${teamNum}.${counter}`).value)) {
                    let time = new Date();
                    document.getElementById(`name.${teamNum}.${counter}`).value = `${patrollers[i][2]} ${patrollers[i][1]}`;
                    document.getElementById(`rating.${teamNum}.${counter}`).value = patrollers[i][3];
                    document.getElementById(`time.${teamNum}.${counter}`).value = `${time.getHours()}:${time.getMinutes()}`;
                    counter++;
                    document.getElementById(`team${teamNum}`).insertAdjacentHTML('beforeend', DivContents.getDayDivs(teamNum, counter));
                    break;
                }
            }
        });
    }
}