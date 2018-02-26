/**
 *   TODO:
 */

"use strict";

export default class DivContents {

    static getDayDivs(teamNum, counter) {
        return `<legend><strong>Team ${teamNum}:</strong></legend>
                    <div class="grid-x"">
                        <div class="small-2 cell" id="patroller.${teamNum}.${counter}">
                            <label>ID:
                                <input type="number" maxlength="5" id="patrollerID.${teamNum}.${counter}" required placeholder="ID #">
                            </label>
                        </div>
                        <div class="small-3 cell">
                            <label>Name:
                                <input type="text" readonly id="name.${teamNum}.${counter}">
                            </label>
                        </div>
                        <div class="small-1 cell" id="radioDiv.${teamNum}.${counter}">
                            <label>Radio:
                                <input type="number" maxlength="2" required id="radioNum.${teamNum}.${counter}" placeholder="#">
                            </label>
                        </div>
                        <div class="small-1 cell">
                            <label>Rating:
                                <input type="text" readonly id="rating.${teamNum}.${counter}">
                            </label>
                        </div>
                        <div class="small-1 cell">
                            <label>Time:
                                <input type="text" readonly id="time.${teamNum}.${counter}">
                            </label>
                        </div>
                        <div class="small-1 cell">
                            <label>1/2 day?:</label>
                            <div class="grid-x align-center vertical-center">
                                <div class="small-4 cell">
                                    <input type="checkbox" id="halfDay.${teamNum}.${counter}">
                                </div>
                            </div>
                        </div>
                        <div class="small-1 cell">
                            <label>Days:
                                <input type="text" readonly id="days.${teamNum}.${counter}">
                            </label>
                        </div>
                        <div class="small-2 cell" id="guestDiv.${teamNum}.${counter}">
                            <label>Guest:
                                <input type="text" id="guest.${teamNum}.${counter}" placeholder="Guest">
                            </label>
                        </div>
                    </div>`;
    }

    static getDayCandidateDivs(teamNum, counter) {
        return `<legend><strong>Candidates/Auxiliary:</strong></legend>
                    <div class="grid-x"">
                        <div class="small-3 cell" id="patroller.${teamNum}.${counter}">
                            <label>ID:
                                <input type="number" maxlength="5" id="patrollerID.${teamNum}.${counter}" required placeholder="ID #">
                            </label>
                        </div>
                        <div class="small-5 cell">
                            <label>Name:
                                <input type="text" readonly id="name.${teamNum}.${counter}">
                            </label>
                        </div>
                        <div class="small-1 cell" id="radioDiv.${teamNum}.${counter}">
                            <label>Radio:
                                <input type="number" maxlength="2" required id="radioNum.${teamNum}.${counter}" placeholder="#">
                            </label>
                        </div>
                        <div class="small-1 cell">
                            <label>Time:
                                <input type="text" readonly id="time.${teamNum}.${counter}">
                            </label>
                        </div>
                        <div class="small-1 cell">
                            <label>1/2 day?:</label>
                            <div class="grid-x align-center vertical-center">
                                <div class="small-4 cell">
                                    <input type="checkbox" id="halfDay.${teamNum}.${counter}">
                                </div>
                            </div>
                        </div>
                        <div class="small-1 cell">
                            <label>Days:
                                <input type="text" readonly id="days.${teamNum}.${counter}">
                            </label>
                        </div>
                    </div>`;
    }

    static getDayLeaderDivs(teamNum, counter, leaderNum) {
        const POSITIONS = ['PD', 'APD', 'APD', 'APD', 'Trainer', 'Trainer'];
        return `<div class="grid-x"">
                    <div class="small-1 cell" id="patroller.${teamNum}.${counter}">
                        <label>ID:
                            <input type="number" maxlength="5" id="patrollerID.${teamNum}.${counter}" required placeholder="ID #">
                        </label>
                    </div>
                    <div class="small-3 cell">
                        <label>Name:
                            <input type="text" readonly id="name.${teamNum}.${counter}">
                        </label>
                    </div>
                    <div class="small-1 cell" id="radioDiv.${teamNum}.${counter}">
                        <label>Radio:
                            <input type="number" maxlength="2" required id="radioNum.${teamNum}.${counter}" placeholder="#">
                        </label>
                    </div>
                    <div class="small-1 cell">
                        <label>Position:
                            <input type="text" readonly value="${POSITIONS[leaderNum]}">
                        </label>
                    </div>
                    <div class="small-1 cell">
                        <label>Rating:
                            <input type="text" readonly id="rating.${teamNum}.${counter}">
                        </label>
                    </div>
                    <div class="small-1 cell">
                        <label>Time:
                            <input type="text" readonly id="time.${teamNum}.${counter}">
                        </label>
                    </div>
                    <div class="small-1 cell">
                        <label>1/2 day?:</label>
                        <div class="grid-x align-center vertical-center">
                            <div class="small-4 cell">
                                <input type="checkbox" id="halfDay.${teamNum}.${counter}">
                            </div>
                        </div>
                    </div>
                    <div class="small-1 cell">
                        <label>Days:
                            <input type="text" readonly id="days.${teamNum}.${counter}">
                        </label>
                    </div>
                    <div class="small-2 cell" id="guestDiv.${teamNum}.${counter}">
                        <label>Guest:
                            <input type="text" id="guest.${teamNum}.${counter}" placeholder="Guest">
                        </label>
                    </div>
                </div>`;
    }

    static getNightRaceDivs(teamNum, counter, RACE_TIMES) {
        return `<div class="grid-x"">
                    <div class="small-2 cell" id="patroller.${teamNum}.${counter}">
                        <label>ID:
                            <input type="number" maxlength="5" id="patrollerID.${teamNum}.${counter}" required placeholder="ID #">
                        </label>
                    </div>
                    <div class="small-3 cell">
                        <label>Name:
                            <input type="text" readonly id="name.${teamNum}.${counter}">
                        </label>
                    </div>
                    <div class="small-1 cell" id="radioDiv.${teamNum}.${counter}">
                        <label>Radio:
                            <input type="number" maxlength="2" required id="radioNum.${teamNum}.${counter}" placeholder="#">
                        </label>
                    </div>
                    <div class="small-1 cell">
                        <label>Rating:
                            <input type="text" readonly id="rating.${teamNum}.${counter}">
                        </label>
                    </div>
                    <div class="small-1 cell">
                        <label>Time:
                            <input type="text" readonly id="time.${teamNum}.${counter}">
                        </label>
                    </div>
                    <div class="small-1 cell">
                        <label>Days:
                            <input type="text" readonly id="days.${teamNum}.${counter}">
                        </label>
                    </div>
                    <div class="small-2 cell" id="guestDiv.${teamNum}.${counter}">
                        <label>Guest:
                            <input type="text" id="guest.${teamNum}.${counter}" placeholder="Guest">
                        </label>
                    </div>
                    <div class="small-1 cell">
                        <label>Race Course:
                            <input type="text" readonly value="${RACE_TIMES[counter]}">
                        </label>
                    </div>
                </div>`;
    }

    static getNightDivs(teamNum, counter) {
        return `<div class="grid-x"">
                            <div class="small-2 cell" id="patroller.${teamNum}.${counter}">
                                <label>ID:
                                    <input type="number" maxlength="5" id="patrollerID.${teamNum}.${counter}" required placeholder="ID #">
                                </label>
                            </div>
                            <div class="small-3 cell">
                                <label>Name:
                                    <input type="text" readonly id="name.${teamNum}.${counter}">
                                </label>
                            </div>
                            <div class="small-1 cell" id="radioDiv.${teamNum}.${counter}">
                                <label>Radio:
                                    <input type="number" maxlength="2" required id="radioNum.${teamNum}.${counter}" placeholder="#">
                                </label>
                            </div>
                            <div class="small-1 cell">
                                <label>Rating:
                                    <input type="text" readonly id="rating.${teamNum}.${counter}">
                                </label>
                            </div>
                            <div class="small-1 cell">
                                <label>Time:
                                    <input type="text" readonly id="time.${teamNum}.${counter}">
                                </label>
                            </div>
                            <div class="small-1 cell">
                                <label>Days:
                                    <input type="text" readonly id="days.${teamNum}.${counter}">
                                </label>
                            </div>
                            <div class="small-3 cell" id="guestDiv.${teamNum}.${counter}">
                                <label>Guest:
                                    <input type="text" id="guest.${teamNum}.${counter}" placeholder="Guest">
                                </label>
                            </div>
                        </div>`;
    }
}