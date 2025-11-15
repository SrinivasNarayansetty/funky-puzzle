var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var hours = 0;
var minutes = 0;
var tens = 0;
var time = 0;
var running = 0;
var scores = [];
var avgScore = 0;
var bestScore = 0;
var maxScore = 0;

function startPause(){
    if(running == 0){
        running = 1;
        increment();
    }
    else{
        running = 0;
    }
}
function reset() {
    running = 0;
    time = 0;

    document.getElementById("output").innerHTML = "00 : 00: 00";
}

function increment() {
    if (running == 1) {
        setTimeout(function () {
            hours = Math.floor(time/60/60);
            minutes = Math.floor(time/60);
            tens = time % 60;
            document.getElementById("output").innerHTML = hours + ":"+minutes + ":" + tens;
            time++;
            increment();
        }, 1000);
    }
}
Array.prototype.memory_tile_shuffle = function() {
    var i = this.length,j,temp;
    while(--i > 0 ) {
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard() {
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for(var i = 0; i<memory_array.length;i++){
        output += '<div id="title_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){
    if(tile.innerHTML == "" && memory_values.length < 2){
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if(memory_values.length == 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if(memory_values.length == 1){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if(memory_values[0] == memory_values[1]){
                tiles_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];

                if(tiles_flipped ==  memory_array.length){
                    scores.push((hours * 360) + (minutes * 60) + (tens));
                    localStorage.setItem('scores',scores);
                    reset();
                    $('.wrapper').show();
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }

            } else {
                function flip2Back(){
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);

                    tile_1.style.background = 'url(assets/images/puzzle.png) no-repeat';
                    tile_1.style.backgroundSize = "contain";
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(assets/images/puzzle.png) no-repeat';
                    tile_2.style.backgroundSize = "contain";
                    tile_2.innerHTML = "";
                    // Clear both Arrays
                    memory_values = [];
                    memory_tile_ids = [];

                }
                setTimeout(flip2Back,700);
            }

        }
    }
}
function startGame() {
    $('.wrapper').hide();
    startPause();
    if(localStorage.getItem('scores')){
       scores = localStorage.getItem('scores').split(',');
       scores = scores.map(function(item){
           return parseInt(item,10);
       });
        calculateScoreSummary(scores);
        setScores(scores);
    }
}
function setScores(scores){
    if(scores.length > 0){
        $('.scores').show();
        var div = document.getElementById("scoreTable");
        div.innerHTML = '<hr>';
        scores.map(function(score,index){
            score = convertTime(score);
            div.innerHTML = div.innerHTML + ""+(index+1) + ". <b>" + score + "</b><br/>";
        });

        div.innerHTML = div.innerHTML + "<br/><hr>";
        div.innerHTML = div.innerHTML + "Avg:  <b>" + avgScore + "</b><br/>";
        div.innerHTML = div.innerHTML + "Best: <b>" + bestScore + "</b><br/>";
        div.innerHTML = div.innerHTML + "Worst: <b>" + maxScore + "</b><br/>";
        div.innerHTML = div.innerHTML + '<br/><br/><span>Clear scores  </span><i class="fa fa-trash-o" aria-hidden="true" onclick="clearScores()"></i><br/>';

    }
}

function calculateScoreSummary(list){
    if(list.length < 1){
        return;
    }
    this.totalScore = list.reduce(function(next,prev){
        return Number(next) + Number(prev);
    });


    var avg = Math.round(this.totalScore / scores.length);
    avgScore = convertTime(avg);
    var best = list.reduce(function(a,b) { return (a < b) ? a : b });
    bestScore = convertTime(best);
    var max = list.reduce(function(a,b) { return (a > b) ? a : b });
    maxScore = convertTime(max);
}

function convertTime(time){
    this.hours  = Math.floor(time/360);
    this.minutes = Math.floor((time - (this.hours*360))/60);
    this.seconds = time - ((this.minutes* 60)  + (this.hours*360));

    return this.hours +":"+this.minutes+":"+this.seconds;
}
function clearScores(){
    $('.scores').hide();
    localStorage.removeItem('scores');
}
