/* =========================
   OPEN GIFT
========================= */

function openGift(){

    document.getElementById("opening").style.display="none";

    document.getElementById("notesPage")
    .classList.remove("hidden");

    createHearts(30);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}


/* =========================
   GO TO MINI GAMES
========================= */

function showGames(){

    document.getElementById("notesPage")
    .classList.add("hidden");

    document.getElementById("gamesPage")
    .classList.remove("hidden");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}


/* =========================
   FLOATING HEARTS
========================= */

function createHearts(amount){

    for(let i=0;i<amount;i++){

        setTimeout(()=>{

            const heart=document.createElement("div");

            heart.className="heart";

            const icons=[
                "💗",
                "💕",
                "💖",
                "🎀",
                "🌸",
                "✨"
            ];

            heart.innerHTML=
            icons[
                Math.floor(Math.random()*icons.length)
            ];

            heart.style.left=
            Math.random()*100+"vw";

            heart.style.fontSize=
            (18+Math.random()*22)+"px";

            document.body.appendChild(heart);

            setTimeout(()=>{
                heart.remove();
            },5000);

        },i*80);
    }
}


/* =========================
   MUSIC
========================= */

let musicTimer=null;

function toggleMusic(){

    const music=
    document.getElementById("birthdayMusic");

    const button=
    document.getElementById("musicButton");

    const status=
    document.getElementById("musicStatus");

    if(music.paused){

        music.play()
        .then(()=>{

            button.innerHTML="⏸️ Pause Our Song";

            status.innerHTML=
            "🎵 Playing...";

            clearTimeout(musicTimer);

            musicTimer=setTimeout(()=>{

                music.pause();

                music.currentTime=0;

                button.innerHTML=
                "🎵 Play Our Song";

                status.innerHTML=
                "Song finished 💗";

            },30000);

        })
        .catch(()=>{

            status.innerHTML=
            "⚠️ Please tap Play again.";

        });

    }else{

        music.pause();

        clearTimeout(musicTimer);

        button.innerHTML=
        "🎵 Play Our Song";

        status.innerHTML=
        "Song paused 💗";
    }
}


/* =========================
   CATCH THE HEARTS
========================= */

let heartScore=0;
let heartTime=15;
let heartRunning=false;

let heartGameTimer=null;
let heartMoveTimer=null;
let heartLifeTimer=null;
let currentHeart=null;


function startHeartGame(){

    if(heartRunning) return;

    heartScore=0;
    heartTime=15;
    heartRunning=true;

    document.getElementById("heartScore")
    .innerHTML="Score: 0";

    document.getElementById("timerText")
    .innerHTML="Time: 15s";

    document.getElementById("heartResult")
    .innerHTML="";

    document.getElementById("startHeartButton")
    .disabled=true;

    const area=
    document.getElementById("catchArea");

    const message=
    document.getElementById("catchMessage");

    if(message){
        message.style.display="none";
    }

    spawnHeart();

    heartGameTimer=setInterval(()=>{

        heartTime--;

        document.getElementById("timerText")
        .innerHTML=
        "Time: "+heartTime+"s";

        if(heartTime<=0){

            endHeartGame();

        }

    },1000);
}


function spawnHeart(){

    if(!heartRunning) return;

    clearHeartTimers();

    if(currentHeart){
        currentHeart.remove();
        currentHeart=null;
    }

    const area=
    document.getElementById("catchArea");

    const heart=
    document.createElement("div");

    heart.className="catch-heart";

    heart.innerHTML="💗";

    const maxX=
    Math.max(5,area.clientWidth-75);

    const maxY=
    Math.max(5,area.clientHeight-75);

    heart.style.left=
    Math.random()*maxX+"px";

    heart.style.top=
    Math.random()*maxY+"px";

    heart.onclick=function(){

        if(!heartRunning) return;

        heartScore++;

        document.getElementById("heartScore")
        .innerHTML=
        "Score: "+heartScore;

        heart.remove();

        currentHeart=null;

        clearHeartTimers();

        spawnHeart();
    };

    area.appendChild(heart);

    currentHeart=heart;


    /* Heart moves */

    heartMoveTimer=setInterval(()=>{

        if(!heartRunning || !currentHeart){
            return;
        }

        const x=
        Math.random()*maxX;

        const y=
        Math.random()*maxY;

        heart.style.left=x+"px";
        heart.style.top=y+"px";

    },400);


    /* Heart disappears quickly */

    heartLifeTimer=setTimeout(()=>{

        if(!heartRunning) return;

        if(currentHeart===heart){

            heart.remove();

            currentHeart=null;

            spawnHeart();
        }

    },1200);
}


function clearHeartTimers(){

    clearInterval(heartMoveTimer);

    clearTimeout(heartLifeTimer);

    heartMoveTimer=null;
    heartLifeTimer=null;
}


function endHeartGame(){

    heartRunning=false;

    clearInterval(heartGameTimer);

    clearHeartTimers();

    if(currentHeart){

        currentHeart.remove();

        currentHeart=null;
    }

    document.getElementById("timerText")
    .innerHTML="Time: 0s";

    document.getElementById("startHeartButton")
    .disabled=false;

    document.getElementById("heartResult")
    .innerHTML=
    "🎉 Game Over! Kamu dapat "+
    heartScore+
    " hati! 💗";

    const message=
    document.getElementById("catchMessage");

    if(message){
        message.style.display="block";
    }
}


/* =========================
   GUESS THE GIFT
========================= */

let giftAttempts=0;


function chooseGift(box){

    if(giftAttempts>=3) return;

    giftAttempts++;


    /* First 2 choices are WRONG */

    if(giftAttempts<3){

        box.classList.add("wrong");
        box.innerHTML="❌";
        box.classList.add("disabled");

        document.getElementById("giftResult")
        .innerHTML=
        "❌ Salah bro 😭<br>"+
        "Coba kotak lain!";

        if(giftAttempts===2){

            document.getElementById("giftResult")
            .innerHTML=
            "😳 Tinggal satu kotak lagi...<br>"+
            "Coba yang terakhir!";

        }

        return;
    }


    /* Third choice = CORRECT */

    box.classList.add("disabled");

    box.innerHTML="🎉";

    document.getElementById("giftResult")
    .innerHTML=
    "🎉 YAY! Kamu menemukan hadiahnya! 💗";

    document.getElementById("giftImage")
    .classList.remove("hidden");

    const boxes=
    document.querySelectorAll(".gift-box");

    boxes.forEach(function(item){

        item.classList.add("disabled");

    });

    createHearts(25);
}


/* =========================
   SECRET PIN
========================= */

const SECRET_PIN="040910";


function checkPin(){

    const input=
    document.getElementById("pinInput");

    const result=
    document.getElementById("pinResult");

    const secret=
    document.getElementById("secretMessage");

    const value=
    input.value.trim();


    /* CORRECT PIN */

    if(value===SECRET_PIN){

        result.innerHTML=
        "🎉 PIN benar! Kamu berhasil membuka pesan rahasia! 💗";

        secret.classList.remove("hidden");

        input.disabled=true;

        createHearts(35);

        return;
    }


    /* WRONG PIN */

    result.innerHTML=
    "❌ Hmm... PIN salah 😭 Coba ingat lagi.";

    input.classList.remove("shake");

    void input.offsetWidth;

    input.classList.add("shake");

    input.value="";

    setTimeout(()=>{

        input.classList.remove("shake");

    },500);
}


/* =========================
   ENTER KEY FOR PIN
========================= */

document.addEventListener("DOMContentLoaded",function(){

    const input=
    document.getElementById("pinInput");

    if(input){

        input.addEventListener("keydown",function(event){

            if(event.key==="Enter"){

                checkPin();

            }

        });

    }

});
