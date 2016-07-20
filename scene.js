import alight from 'alight';
import scene from './controllers/scene';

// angular light setup
alight.ctrl.scene = scene;
alight.bootstrap();

let scope = new scene();

alight.bootstrap(document.body, scope);

window.__onData = function (data) {
    let scores = data.scores;
    let maxScore = parseInt(data.settings.maxScore, 10);
    scope.$setValue('settings', data.settings);
    scope.$setValue('teams', data.teams);
    scope.$setValue('scores', data.scores);
    scope.$scan();
    let teamsScores = [];
    for (let i=0,ln=data.settings.teamsNum; i<ln; i++) {
        let teamScores = 0;
        for (let k in scores) {
            let matches = k.match(/(\d+)\-(\d+)/);
            let teamNum = parseInt(matches[1], 10);
            let gameNum = parseInt(matches[2], 10);
            let score = parseInt(scores[k], 10) || 0;
            if (i === teamNum) {
                teamScores = teamScores + score;
            }
        }
        teamsScores[i] = teamScores;
    }
    teamsScores.forEach((score, i) => {
        $('.graph-col').eq(i).height( (score*100/maxScore) + '%' );
    });
};
