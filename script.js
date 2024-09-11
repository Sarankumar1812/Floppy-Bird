let speed = 3 , gravity =0.5;
let bird = document.querySelector('.bird')
let img = document.getElementById('bird-1')
let soundout= new Audio('sound effects/soundout.mp3');
let soundplay= new Audio('sound effects/soundplay.mp3');

let birdprops = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();

let scorevalue = document.querySelector(".value");
let message = document.querySelector(".message");
let scoretitle = document.querySelector(".title");

let gamestatus = 'Start';
img.style.display = 'none';
message.classList.add('msgstyle')

document.addEventListener('keydown',(e)=>{
    if(e.key=='Enter' && gamestatus !='Play'){
        document.querySelectorAll('.pipe').forEach((e)=>{
            e.remove();
        });
        img.style.display='block';
        bird.style.top='40vh';
        gamestatus='Play';
        message.innerHTML ='';
        scoretitle.innerHTML= "Score: ";
        scorevalue.innerHTML='0';
        message.classList.remove('msgstyle');
        play(); 

    }
});

function play(){
    function move(){
        // move function
        if(gamestatus !='Play') return;
        let pipe = document.querySelectorAll(".pipe");
        pipe.forEach((element)=>{
            let pipeprops = element.getBoundingClientRect();
            birdprops = bird.getBoundingClientRect();

            if(pipeprops.right <=0){
                element.remove()
            }
            else{
                //conditions for collision detection

                if(birdprops.left < pipeprops.left + pipeprops.width &&
                    birdprops.left + birdprops.width > pipeprops.left && birdprops.top < pipeprops.top
                    + pipeprops.height && birdprops.top + birdprops.height > pipeprops.top){
                         
                        gamestatus= 'End';
                        message.innerHTML = "Game Over"+'<br><b>Press Enter to restart the Game<b>';
                        message.classList.add("msgstyle");
                        img.style.display= "none";
                        soundout.play();
                        return;
                    }
                    else{
                        //condition for moving the bird and increasing the score value

                        if(pipeprops.right < birdprops.left && pipeprops.right + speed >= birdprops.left &&
                            element.increase_score == '1'){
                                scorevalue.innerHTML =+ scorevalue.innerHTML + 1;
                                soundplay.play();

                            }
                            element.style.left = pipeprops.left - speed + 'px';
                        
                    }
                
            }
        });
        requestAnimationFrame(move)
    }
    requestAnimationFrame(move);
 // Gravity function
    let bid = 0;
    function applyGravity(){
        if(gamestatus != 'Play')return;
        bid = bid + gravity;
        document.addEventListener("keydown", (e)=>{
           if(e.key == 'ArrowUp' || e.key==' '){
            img.src = "images/Bird-2.png";
            bid = -7.6;
           }
        });

        document.addEventListener("keyup",(e)=>{
            if(e.key == 'ArrowUp' || e.key==' '){
                img.src = "images/Bird.png";
               }
        })
        if(birdprops.top <=0 || birdprops.bottom >= background.bottom){
            gamestatus="End";
            message.style.left= "28vw";
            window.location.reload();
            message.classList.remove("msgstyle");
            return;
        }
        bird.style.top = birdprops.top + bid + "px";
        birdprops = bird.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);
  
    //pipe creation function
    let space = 0;
    let pipegap =35;

    function createPipe(){
        if(gamestatus != 'Play')return;
        if(space>115){
            space=0;
            let pipeposition = Math.floor(Math.random() * 43) +8;
            //from top to bottom of pipe
            let pipeinverse = document.createElement('div');
            pipeinverse.className = 'pipe';
            pipeinverse.style.top = pipeposition - 70 + "vh";
            pipeinverse.style.left = "100vw";
           document.body.appendChild(pipeinverse);
           //from bottom to top of pipe
            let pipe = document.createElement("div");
            pipe.className = "pipe";
            pipe.style.top = pipeposition + pipegap + "vh";
            pipe.style.left = "100vw";
            pipe.increase_score='1';
            document.body.appendChild(pipe);
        }
        space++;
        requestAnimationFrame(createPipe);
    }
    requestAnimationFrame(createPipe);
}