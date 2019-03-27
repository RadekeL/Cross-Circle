// OBCZAJ ES LINTER

import './style.css';

class gameObjects {
    constructor(characteristicSymbol){
        this.characteristicSymbol = characteristicSymbol;
        this.character = [{
            class1: 'fas',
            class2: 'fa-times',
            color: '#2E94B5',
        },
        {
            class1: 'far',
            class2: 'fa-circle',
            color: '#FFF4E0',
        }
    ]
        this.objectData = [];   
        this.winData = [];
        this.counter = 0;
    }
}

class GameRules{
    constructor(gameRounds){
        this.round = 0;
        this.gameRounds = gameRounds;
        this.clickedAreaHistory = []; 
        this.putCross = true; 
    }

    winRule(object) { 
        let resultArr = '';
        for (let i = 0; i < object.objectData.length; i++) {
            if (object.objectData[i] == object.objectData[i + 1] && object.objectData[i] == object.objectData[i + 2]) {
                resultArr = 'Win';
            }
        }
        return resultArr;
    }

    insideConstruction(element, objectLine, object) {
        switch (element.classList[1][1]) {
            case '1':
                objectLine.push(1, 4, 7)
                break;
            case '2':
                objectLine.push(1, 5)
                break;
            case '3':
                objectLine.push(1, 6, 8)
                break;
            case '4':
                objectLine.push(2, 4);
                break;
            case '5':
                objectLine.push(2, 5, 7, 8);
                break;
            case '6':
                objectLine.push(2, 6);
                break;
            case '7':
                objectLine.push(3, 4, 8);
                break;
            case '8':
                objectLine.push(3, 5);
                break;
            case '9':
                objectLine.push(3, 6, 7);
                break;

        }

        objectLine.sort();
        this.winRule(object);
    }

    writeOnlyOneSign(objectLine, newObject, object) {
        if (event.target.childNodes.length < 1 &&event.target.className !== 'far fa-circle' && event.target.className !== 'fas fa-times') {
            this.clickedAreaHistory.push(event.target.className[8]);
            event.target.appendChild(newObject);
            this.insideConstruction(event.target, objectLine, object);
        } else {
            this.putCross = !this.putCross
        }
    }

    generateOorX(className1, className2, color, object) {
        const newSign = document.createElement('i');
        newSign.classList.add(`${className1}`, `${className2}`);
        newSign.style.color = `${color}`;
        this.writeOnlyOneSign(object.objectData, newSign, object);
    }
    putXorO(classXpart1,classXpart2,colorX,classOpart1,classOpart2,colorO,X,O,D){
        if (this.putCross) {
            this.generateOorX(classXpart1, classXpart2, colorX, X);
        } else {
            this.generateOorX(classOpart1, classOpart2, colorO, O);
        }
        this.putCross = !this.putCross;
    }
}

class Actualisation{
    constructor(){
    }

    showGamePanel(positionY,animationDelay){
        document.querySelector('.gameOptions').style.top = positionY     //'50%';
        document.querySelector('.gameOptions').style.transition = animationDelay    //'1.5s';
    }

    showPlayground(displayContainer,positionY,displayTable) {
        document.querySelector('.container').style.display = displayContainer    
        document.querySelector('.gameOptions').style.top =  positionY              
        document.querySelector('.tableResults').style.display =  displayTable      
    }

    updateResultStats(element, counter) { 
        element.textContent = counter;
    }

    addTableStatistics(index, winDataX, winDataO, drawCheck) {
        const lastChild = document.querySelector('.result');
        for (let i = 0; i < 4; i++) {
            const statisticObject = document.createElement('div');
            statisticObject.classList.add(`resultOfOneGame`);

            switch (i) {
                case 0:
                    statisticObject.classList.add(`game`);
                    statisticObject.textContent = `${index}`
                    break;
                case 1:
                    statisticObject.classList.add(`X`);
                    statisticObject.innerHTML = `${winDataX[winDataX.length-1] === "OK" && drawCheck === false ? '<i class="fas fa-check"></i>': "-"}`
                    break;
                case 2:
                    statisticObject.classList.add(`D`);
                    // statisticObject.textContent = `${index}`
                    statisticObject.innerHTML = `${drawCheck === true ? '<i class="fas fa-check"></i>': "-"}`
                    break;
                case 3:
                    statisticObject.classList.add(`O`);
                    statisticObject.innerHTML = `${winDataO[winDataO.length-1] === "OK" && drawCheck === false ? '<i class="fas fa-check"></i>': "-"}`
                    // statisticObject.textContent = `xD`
                    break;
            }
            document.querySelector('.tableResults').insertBefore(statisticObject, lastChild);
        }
    }
}


class RestartGame {
    constructor(){
    }
    restartAllWinData(X,O,D){ // WZORZEC ROZSZERZENIA FUNKCJI???? aby bylo mniejsza???
        X.winData = [];
        O.winData = [];
        X.counter = 0;
        O.counter = 0;
        D.counter = 0;
    }

    clerInnerObjectData(X,O){
        X.objectData = [];
        O.objectData = [];
    }
    scanWinStats(object) { 
        let winCounter = 0;
        for (const checkData of object.winData) {
            checkData === 'OK' ? winCounter++ : winCounter;
        }
        return winCounter;
    }

    informationAboutWinner(playObjectX, playObjectO) { // metoda do wywołania kto wygral
        if (playObjectX > playObjectO) {
            document.querySelector('.win p').textContent = 'WYGRAL X';
        } else if (playObjectX < playObjectO) {
            document.querySelector('.win p').textContent = 'WYGRAL O'
        } else if (playObjectX === playObjectO) {
            document.querySelector('.win p').textContent = 'REMIS'
        }
    }
    clearPlayground() {
        setTimeout(() => {
            document.querySelectorAll('.container .window i').forEach((gameSigns) => { // CZYŚCI POLE GRY
                gameSigns.parentNode.removeChild(gameSigns);
            })
        }, 500)
    }

    restartAllBackData(gameRounds,objectRule,objectX, objectO, objectD) {
        if (objectRule.round % gameRounds !== 0 || objectRule.round === gameRounds) { // byl tutaj dodatkowy warunek drawCounter === 9 

            this.clearPlayground();
            this.clerInnerObjectData(objectX,objectO);
            objectRule.clickedAreaHistory = [];

         if (objectRule.round === gameRounds) { // JEŚLI BĘDZIE REMIS DRAW TO NIECH TA FUNKCJA ZAREAGUJE
            this.informationAboutWinner(this.scanWinStats(objectX), this.scanWinStats(objectO));
           
            this.restartAllWinData(objectX,objectO,objectD)
            objectRule.round = 0;
            document.querySelector('.win').style.top = '50%';
            }
        }
    }   
    restartAllFrontData() {
            document.querySelector('.win').style.top = '-50%';
            document.querySelector('.resultX').textContent = "0"; 
            document.querySelector('.resultO').textContent = "0"; 
            document.querySelector('.resultD').textContent = "0"; 
            document.querySelectorAll('.tableResults .resultOfOneGame').forEach((gameSigns) => { // clear Playground
                gameSigns.parentNode.removeChild(gameSigns);
            })
    }
}


class Mediator{
    constructor(){
        this.X = new gameObjects('X')
        this.D = new gameObjects('D')
        this.O = new gameObjects('O')
        this.rules = new GameRules(3);
        this.restart = new RestartGame();
        this.updateData = new Actualisation();
        this.singleGameArea = document.querySelectorAll('.window');
        this.mainMenu = document.querySelectorAll('button');
        this.startGame(this.mainMenu)
    }
        updateStats(objectRules,X,O,draw){
            const winnerBanner = document.querySelector('.win');
            objectRules.round++;
            

                this.updateData.addTableStatistics(objectRules.round, X.winData ,O.winData, draw); // ogolny
                this.restart.restartAllBackData(this.rules.gameRounds,this.rules,X,O,this.D); // ogollny
            if( winnerBanner.style.top === '50%'){  // MOZE TUTAJ ZAPODAC W JAKAS STALA??
                //winner banner has shown;
                document.querySelector('.win button').addEventListener('click',this.restart.restartAllFrontData);
            }
                
        }
        addStatData(objectWin,objectLose,objectDraw,draw){
            if(!draw){
                objectWin.winData.push('OK'); //win
                objectLose.winData.push('-');  //lose
            } else{
                objectWin = objectDraw;                
            }   
                objectWin.counter++;  // win
                this.updateData.updateResultStats(document.querySelector(`.result${objectWin.characteristicSymbol}`), objectWin.counter); // win
            }
        addData(X,O,D,draw){
            if(this.rules.winRule(X) == 'Win' || this.rules.winRule(O) == 'Win'){
                    draw = false;
                if(this.rules.winRule(X) == 'Win'){
                    this.addStatData(X,O,D,draw);
                } else if(this.rules.winRule(O) == 'Win'){
                    this.addStatData(O,X,D,draw);
                } 
                this.updateStats(this.rules ,X, O, draw);
                
            }
            else if(draw){
                this.addStatData(X,O,D,draw,this.rules)
                this.updateStats(this.rules,X, O, draw);
            }
            
        }
        nineAreasAreFull(){
            
            this.updateData.showPlayground('block','-20%','flex');
            this.singleGameArea.forEach(element=>{
                element.addEventListener('click',(e)=>{
                    console.log(event.target);
                    
                    this.rules.putXorO(this.X.character[0].class1,this.X.character[0].class2,this.X.character[0].color,this.O.character[1].class1, this.O.character[1].class2, this.O.character[1].color,this.X,this.O,this.D);
                    
                    if(this.rules.clickedAreaHistory.length === 9){
                         this.addData(this.X,this.O,this.D,true);
                    } else if(this.rules.clickedAreaHistory.length >= 3){
                        this.addData(this.X,this.O,this.D,false)
                    }
                })
            })
        }
        choseGame(){
            if(event.target.className == 'multi'){
                this.nineAreasAreFull(); //binduj
            }
        }
        startGame(menuButtons){
            window.addEventListener('load', this.updateData.showGamePanel('50%','1.5s')); 
            menuButtons.forEach(option=>{
                option.addEventListener('click',this.choseGame.bind(this));

            })
        }
}
const game = new Mediator();


