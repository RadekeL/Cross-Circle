// ZROB TAK ABY MOZNA BYLO REMIS ZOBACZYC W STATACH 
// PROBOWALEM STWORZYC METODY DRAW I JE POWIACAC
// W METODZIE ADD STATISTICS DODAŁEM OPCJE ZE JESLI BEDZIE 9 KLIKNIEC TO ZMIENI TEXT CONTENT
// ALE ADDSTATISTICS NIE DZIALA
// MUSZE ZROBIC JAKAS FLAGE ZE JAK ZROBI SIE 9 klikniec i nikt nie wygro to zrobi się nowa linijka






// POPRAW ABY PO REMISIE BYLO MOŻLIWE ZRESETOWANIE ABSOLUTNIE WSZYSTKICH STATYSTYK
// ABY JAK JEST REMIS TO ZEBY STATYSTYKA REMIS ROSLA 

class objectPlay {
    constructor() {
        this.objectData = [];
        this.winData = [];
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
        this.winnerTable = [];
        this.write = true;
        this.counter = 0;
    }

    // draw(drawCounter, removeStatistics){

    //     if(drawCounter === 9){
    //         removeStatistics;
    //     }
    // }

    rule(drawCounter) { // wygrywasz parię gdy jest ta metoda spełniona
        let resultArr = '';
        for (let i = 0; i < this.objectData.length; i++) {
            if (this.objectData[i] == this.objectData[i + 1] && this.objectData[i] == this.objectData[i + 2]) {

                    resultArr = 'Win';
                
            } else if(drawCounter === 9){
                resultArr = 'Win';
            }
            
        }



        return resultArr;
    }
    

   

    showWinner(){   
        if(this.winData[this.coounter] === "OK"){
            this.winnerTable.push("OK");
        }   
        this.counter++;
        return this.winnerTable;
    }

    

    updateResultStats(element,counter){ // aktualizacja wyników danej partii
        element.textContent = counter;
    }

    scanWinStats(){ //f poszukująca wygranej w danych gracza
        let winCounter = 0;

        for(const checkData of this.winData){
            checkData === 'OK' ? winCounter++ : winCounter;
        }

        return winCounter;
    }

    
    



}

class Game {
    constructor() {
        this.singleGameArea = document.querySelectorAll('.window');
        this.mainMenu = document.querySelectorAll('button');
        this.gameNumbers = 3;
        this.clickedAreaHistory = [];
        this.X = new objectPlay();
        this.O = new objectPlay();
        this.D = new objectPlay();
        this.check = true;
        this.restart(this.X)
        this.restart(this.O)
        this.restart(this.D)
        window.addEventListener('load',this.startGAME);

        this.mainMenu.forEach(option=>{
            option.addEventListener('click',(e)=>{
                let index = 0;
                let drawCounter = 0;
                let drawIsThere = false;
                if(e.target.className == 'multi'){
                   
                    this.gameON();
                    this.singleGameArea.forEach(element => {
                        element.addEventListener('click', (e) => {
                            
                            drawCounter++;
                          
                            if (this.check) {
                             
                                this.createOorX(this.X.character[0].class1,this.X.character[0].class2,this.X.character[0].color,this.X);
                            } else {
                           
                                this.createOorX(this.O.character[1].class1,this.O.character[1].class2,this.O.character[1].color,this.O);
                            }

                            if(this.clickedAreaHistory.length === 9){
                                if(this.X.rule() == 'Win' || this.O.rule() == 'Win'){
                                    index++
                           
                            
                                    if(this.X.rule()=='Win'){
                                        this.X.winData.push('OK');
                                        this.O.winData.push('-');
                                        this.X.showWinner();
                                        this.X.updateResultStats(document.querySelector('.resultX'),this.X.counter);
                                        
                                       
                                    } else if(this.O.rule()=='Win'){
                                        this.O.winData.push('OK');
                                        this.X.winData.push('-');
                                        this.O.showWinner();
                                        this.O.updateResultStats(document.querySelector('.resultO'),this.O.counter);
                                    }
                                    
                                        drawIsThere = false;
                                    
                                    
                              
                                    this.addStatistics(index,this.X.winData,this.O.winData,drawCounter,drawIsThere);
                                    this.restartGame(index,this.X,this.O);
    
                                    this.zeroResltStats(index,this.gameNumbers,0); // zeruje dane historyczne w tabelce
    
                                    drawCounter = 0;
                                } else {
                                    index++;
                                    this.D.counter++
                                    this.zeroResltStats(index,this.gameNumbers,0);

                                    this.restartGame(index,this.X,this.O);  // tutaj usunalem dodatkowy parametr drawCounter z konca, w razie problemow dodaj go
                                    drawIsThere = true;
                                    this.addStatistics(index,this.X.winData,this.O.winData,drawCounter,drawIsThere);
                                    this.X.updateResultStats(document.querySelector('.resultD'),this.D.counter)
                                    drawCounter = 0;
                                }

                            }else {  // przyadek kiedy ktos wygrywa a nie ma wszystkich pol zapelnionych
                               // kod nizej skopiowany stworz metode
                                if(this.X.rule() == 'Win' || this.O.rule() == 'Win'){
                                    index++

                                    if(this.X.rule()=='Win'){
                                    
                                        this.X.winData.push('OK');
                                        this.O.winData.push('-');
                                        this.X.showWinner();
                                        this.X.updateResultStats(document.querySelector('.resultX'),this.X.counter);
                                        
                                         
                                    } else if(this.O.rule()=='Win'){
                             
                                        this.O.winData.push('OK');
                                        this.X.winData.push('-');
                                        this.O.showWinner();
                                        this.O.updateResultStats(document.querySelector('.resultO'),this.O.counter);
                                        
                                    }
                                    
                                    drawIsThere = false;
                                    
                                    
                                    
                                    this.addStatistics(index,this.X.winData,this.O.winData,drawCounter,drawIsThere);
                                    this.restartGame(index,this.X,this.O);
    
                                    this.zeroResltStats(index,this.gameNumbers,0);
                            
                                    drawCounter = 0;
                                }
                            }


                         
                            this.check = !this.check
   
                            if(index >= this.gameNumbers){
                                index = 0;
                            }
                        })
                    })
                }
            })
        })




    }
    
    zeroResltStats(currentNumberOfGame,maxNumberOfGame,initialValue){
        if(currentNumberOfGame >= maxNumberOfGame){
            
            currentNumberOfGame = initialValue;
            this.D.counter = initialValue;
            this.X.counter = initialValue;
            this.O.counter = initialValue;
 
        }
    }

    
    writeOnlyOneSign(objectLine,newObject,object){ // TUTAJ SKONCZYLEM!!!!!!!!!!!!
        
          let addToArray = true;
        
             for(const el of this.clickedAreaHistory){
                if(event.target.className[8] === el){
                    addToArray = false;
                    
                }
             }
             if(addToArray && event.target.className !== 'far fa-circle' && event.target.className !== 'fas fa-times'){
   
                 this.clickedAreaHistory.push(event.target.className[8]);
                 event.target.appendChild(newObject);
                 this.insideConstruction(event.target,objectLine,object)
                 object.rule();
         
             
             }
    }

    gameON(){
        document.querySelector('.container').style.display = 'block';
        document.querySelector('.gameOptions').style.top = '-20%';
        document.querySelector('.tableResults').style.display = 'flex';

    }

    startGAME(){
        document.querySelector('.gameOptions').style.top = '50%';
        document.querySelector('.gameOptions').style.transition = '1.5s';

    }

    insideConstruction(element,objectLine,object) {
       switch (element.classList[1][1]) {
            case '1':
                objectLine.push(1, 4, 7) // zrob tutaj zamiast this lokalna zmienna tablice albo wykorzystaj nawias na poczatku funkcji aby moc wstawic funkcje
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
        object.rule();
    }
    createOorX(className1,className2,color,object){
        const newSign = document.createElement('i');
        newSign.classList.add(`${className1}`, `${className2}`);
        newSign.style.color = `${color}`;
        this.writeOnlyOneSign(object.objectData,newSign,object)
    }


    restart(object){
        document.querySelector('.win button p').addEventListener('click',(e)=>{  // ZMIEJSZA OKIENKO Z INFO O WYGRANEJ
            document.querySelector('.win').style.width = '0vw'
            document.querySelector('.win').style.height = '0vh'
            document.querySelector('.win').style.border = 'none'
            document.querySelector('.win p').style.fontSize = `0vw`;
            document.querySelector('.win button').style.display = 'none';
            object.objectData = []; // CZYSCI TABLICE
            
            document.querySelectorAll('.container .window i').forEach((gameSigns)=>{ // CZYŚCI POLE GRY
                gameSigns.parentNode.removeChild(gameSigns);
            })
            document.querySelectorAll('.tableResults .resultOfOneGame').forEach((gameSigns)=>{ // CZYŚCI POLE GRY
                gameSigns.parentNode.removeChild(gameSigns);
            })
        })
    }

    addStatistics(index,winDataX,winDataO,drawCounter,drawCheck){
        const lastChild = document.querySelector('.result');
        console.log(drawCounter);
 
        for(let i= 0;i<4;i++){
        const statisticObject = document.createElement('div');
        statisticObject.classList.add(`resultOfOneGame`);
         
                switch(i){
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
                document.querySelector('.tableResults').insertBefore(statisticObject,lastChild);  

        }
        
       
    }
    removeStatistics(object){


        setTimeout(()=>{
            object.objectData = []; // CZYSCI TABLICE
            
            document.querySelectorAll('.container .window i').forEach((gameSigns)=>{ // CZYŚCI POLE GRY
                gameSigns.parentNode.removeChild(gameSigns);
            })
},500)

    }

    restartGame(number,objectX,objectO,drawCounter){
        if(number%this.gameNumbers !== 0 ){  // byl tutaj dodatkowy warunek drawCounter === 9 
            
            this.removeStatistics(this.X);
            this.removeStatistics(this.O);
            this.clickedAreaHistory = [];
       
        }
        else if(number === this.gameNumbers){  // JEŚLI BĘDZIE REMIS DRAW TO NIECH TA FUNKCJA ZAREAGUJE
                   
                   
                    this.informationAboutWinner(this.X.scanWinStats(),this.O.scanWinStats());
                    this.clickedAreaHistory = [];
                    objectX.winData = [];
                    objectO.winData = [];
                    objectX.winnerTable = [];
                    objectO.winnerTable = [];
                    document.querySelector('.resultX').textContent = "0"
                    document.querySelector('.resultO').textContent = "0"
                    document.querySelector('.resultD').textContent = "0"
                    document.querySelector('.win').style.width = '70vw'
                    document.querySelector('.win').style.height = '40vh'
                    document.querySelector('.win').style.border = '10px solid #F8B500'
                    document.querySelector('.win p').style.fontSize = `5vw`;
                    document.querySelector('.win button').style.display = 'block'
                

                    
        }
    }
// nie wchodzi w tą funkcje
    informationAboutWinner(playObjectX,playObjectO){ // metoda do wywołania kto wygral
        if(playObjectX > playObjectO){
           
            document.querySelector('.win p').textContent = 'WYGRAL X';
        } else if (playObjectX < playObjectO){
         
            document.querySelector('.win p').textContent = 'WYGRAL O'
        } else if(playObjectX === playObjectO){
          
            document.querySelector('.win p').textContent = 'REMIS'
        }
    }
  


}
const game = new Game();

