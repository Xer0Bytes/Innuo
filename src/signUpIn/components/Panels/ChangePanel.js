// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");

// sign_up_btn.addEventListener("click", () => {
//   container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });


// export function signUpClick(){
//     container.classList.add("sign-up-mode");
// }

// export function signInClick(){
//     container.classList.remove("sign-up-mode");
// }

var currMode=1;

export function setMode(mode){
    currMode=mode;
    console.log("setMode values: ");
    console.log("mode: " + mode);
    console.log("currMode: " + currMode);     
};

export function getMode(){
    console.log("currMode: " + currMode);
    return currMode;
};

export function checkIfModeChanged(mode){
    if(mode=currMode){
        console.log(0);
        return 0;
    } else {
        console.log(1);
        return 1;
    }
}