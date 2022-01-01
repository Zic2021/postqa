let circle=document.getElementById("circle");
let ul = document.querySelector("ul");
let li = document.querySelectorAll("li");
let hamburger=document.getElementById("hamburger");

hamburger.addEventListener("click", ()=>{
   ul.classList.toggle("show-list");
});
li.forEach(list =>{
    list.addEventListener("click", ()=>{
        ul.classList.toggle("show-list");
    });
});
circle.addEventListener("click", ()=>{
    let height= circle.offsetHeight;
    let width=circle.offsetWidth;
    console.log(height ,width);
});
