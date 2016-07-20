import * as browser from '../utils/browser';

function scene () {
    this.settings = {
        teamsNum: 9,
        maxScore: 0
    };
    this.teams = {};
    this.scores = {};
}

scene.prototype.goFullScreen = function () {
    browser.requestFullScreen();
};

scene.prototype.exitFullScreen = function () {
    browser.exitFullScreen();
};

export default scene;
