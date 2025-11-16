const n = 22;
const arr = [];
init();

let audioCtx = null;
function playNote(freq){
    if(audioCtx == null){
        audioCtx = new(
            AudioContext || webkitAudioContext || window.webkitAudioContext )();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start()
    osc.stop(audioCtx.currentTime+dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueActTime(0,audioCtx.currentTime+dur);
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function init(){
    for(let i=0;i<n;i++){
    arr[i] = Math.random();
    }
    showBars();
}



function BubbleSort(){
    const copy = [...arr];
    const moves = bubbleSort(copy);
    animate(moves);
}
function InsertionSort(){
    
    insertionSort(arr);
    showBars();
}

function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;

    if(move.type == "swap"){
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }

    
     
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },100);
}

//bubble sort
function bubbleSort(arr){ 
    const moves = [];
    do {
        var swapped = false;
        for(let i=0;i<arr.length;i++){
            moves.push({indices:[i-1,i],type:"comp"});
            if(arr[i-1]>arr[i]){
                swapped = true;
                moves.push({indices:[i-1,i],type:"swap"});
                [arr[i-1],arr[i]] = [arr[i],arr[i-1]];
            }
        }
    }while(swapped);
    return moves;
}
//insertion sort
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        // Shift larger elements to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Place key in its correct position
        arr[j + 1] = key;
    }
    return arr;
}


function showBars(move){
    container.innerHTML = "";
    for(let i=0;i<arr.length;i++){
        const bar = document.createElement("div");
        bar.style.height = arr[i]*100 + "%";
        // bar.style.width = "10px";
        // bar.style.backgroundColor = "black";
        bar.classList.add("bar");

        //for making color in bar
        if(move && move.indices.includes(i)){
            bar.style.background = move.type == "swap"?"linear-gradient(red,yellow)":"linear-gradient(blue,skyblue)";
        }
        container.appendChild(bar);
    }
}