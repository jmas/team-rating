import * as store from '../utils/ls';
import * as browser from '../utils/browser';
import * as consts from '../utils/consts';

/**
 * Constructor
 */
function main() {
    let settings = store.get('settings').shift();
    let defaultSettings = {
        teamsNum: 9,
        gamesNum: 4,
        maxScore: 150
    };
    this.teams = store.get('teams').shift() || {};
    this.scores = store.get('scores').pop() || {};
    this.scoresHistory = store.get('scores');
    this.settings = settings || defaultSettings;
    this._sceneWin = null;
};

/**
 * Submit form.
 */
main.prototype.submit = function () {
    let prevScores = store.get('scores');
    let latestScores = prevScores.pop();
    let wasChanged = false;
    if (latestScores) {
        for (let i in this.scores) {
            if (this.scores[i] !== latestScores[i]) {
                wasChanged = true;
                break;
            }
        }
    }
    if (! latestScores || wasChanged) {
        store.add('scores', this.scores);
    }
    store.replace('teams', [this.teams]);
    store.replace('settings', [this.settings]);
    this.scoresHistory = store.get('scores');
    this._sendDataToScene();
};

main.prototype.openScene = function () {
    if (this._sceneWin && ! this._sceneWin.closed) {
        this._sceneWin.focus();
        return;
    }
    this._sceneWin = browser.openWindow(consts.SCENE_URL + '?'+Math.random(), () => {
        console.warn('Scene is closed.');
    });
    browser.requestFullScreen(this._sceneWin.document.documentElement);
};

main.prototype.sum = function (teamNum) {
    let scores = this.scores;
    let teamScores = 0;
    for (let k in scores) {
        let matches = k.match(/(\d+)\-(\d+)/);
        let _teamNum = parseInt(matches[1], 10);
        let gameNum = parseInt(matches[2], 10);
        let score = parseInt(scores[k], 10) || 0;
        if (teamNum === _teamNum) {
            teamScores = teamScores + score;
        }
    }
    return teamScores;
};

main.prototype.rollBackScores = function (scoresIndex) {
    let scores = store.get('scores');
    if (scores[scoresIndex]) {
        this.$setValue('scores', scores[scoresIndex]);
    }
};

main.prototype._sendDataToScene = function () {
    if (! this._sceneWin || this._sceneWin.closed) {
        console.warn('Scene is not opened yet.');
        return;
    }
    if (! this._sceneWin.window || ! this._sceneWin.window.__onData) {
        console.warn('Cant get access to scene window.');
        return;
    }
    this._sceneWin.window.__onData({
        teams: this.teams,
        scores: this.scores,
        settings: this.settings
    });
};

export default main;
