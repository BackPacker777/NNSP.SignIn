//   @todo Nothing

"use strict";

export default class EventHandler {
    constructor() {}

    static changePatrollerDiv(teamNum, counter) {
        document.getElementById(`patrollerID.${teamNum}.${counter}`).addEventListener('blur', () => {
            console.log(`update page & handle changes/removes`);
        });
    }
}