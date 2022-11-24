console.log("dom is awesome");
const view = document.querySelector(".view");
const pass  = document.querySelector(".pass");

view.addEventListener("click", ()=>{
    pass.setAttribute("type", "text");
})