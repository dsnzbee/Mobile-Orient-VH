const debug = document.getElementById("debug");
const yoke = document.getElementById("yoke");
const blue = document.getElementById("blue");
const orange = document.getElementById("orange");
const ladder = document.getElementById("ladder");
const start = document.getElementById("start");

let currentRoll = 0;
let currentPitch = 0;

let rollVelocity = 0;
let pitchVelocity = 0;

const rollSensitivity = 0.4;
const pitchSensitivity = 0.5;

const springStrength = 0.08;
const damping = 0.85;

function handleOrientation(event){

  let gamma = event.gamma || 0;
  let beta = event.beta || 0;

  let targetRoll = gamma * rollSensitivity;
  let targetPitch = -beta * pitchSensitivity;

  rollVelocity += (targetRoll - currentRoll) * springStrength;
  pitchVelocity += (targetPitch - currentPitch) * springStrength;

  rollVelocity *= damping;
  pitchVelocity *= damping;

  currentRoll += rollVelocity;
  currentPitch += pitchVelocity;

  debug.innerHTML =
    "GAMMA: " + Math.round(gamma) + "<br>" +
    "BETA: " + Math.round(beta) + "<br>" +
    "ROLL: " + Math.round(currentRoll) + " DEG<br>" +
    "PITCH: " + Math.round(currentPitch);

  let move =
    "translateY(" + currentPitch + "px) rotate(" + currentRoll + "deg)";

  blue.style.transform = move;
  orange.style.transform = move;
  ladder.style.transform = move;
}

start.addEventListener("click", function(){

  if(typeof DeviceOrientationEvent.requestPermission === "function"){

    DeviceOrientationEvent.requestPermission()
      .then(function(permission){

        if(permission === "granted"){

          window.addEventListener(
            "deviceorientation",
            handleOrientation
          );

        }

      });

  } else {

    window.addEventListener(
      "deviceorientation",
      handleOrientation
    );

  }

});
