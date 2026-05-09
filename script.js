const debug = document.getElementById("debug");
const yoke = document.getElementById("yoke");
const blue = document.getElementById("blue");
const orange = document.getElementById("orange");
const ladder = document.getElementById("ladder");

document.addEventListener("mousemove", function(event){
  let x = event.gamma / window.innerWidth;
  let y = event.beta / window.innerHeight;

  let roll = (x - 0.5) * 35;
  let pitch = (0.5 - y) * 100;

  debug.innerHTML =
    "X: " + Math.round(event.gamma) + "<br>" +
    "Y: " + Math.round(event.beta) + "<br>" +
    "ROLL: " + Math.round(roll) + " DEG<br>" +
    "PITCH: " + Math.round(pitch);

  yoke.style.left = event.gamma + "px";
  yoke.style.top = event.beta + "px";

  let move = "translateY(" + pitch + "px) rotate(" + roll + "deg)";
  blue.style.transform = move;
  orange.style.transform = move;
  ladder.style.transform = move;
});