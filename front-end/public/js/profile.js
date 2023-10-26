let content1 = document.getElementById("container-cards-istoric");
let content2 = document.getElementById("container-cards-organizatii");

let btn1 = document.getElementById("organizatii");
let btn2 = document.getElementById("istoric");

btn1.addEventListener("click", function onClick(event) {
  content1.style.display = "none";
  content2.style.display = "flex";
  console.log("a intrat aici");
});

btn2.addEventListener("click", function onClick(event) {
  content1.style.display = "flex";
  content2.style.display = "none";
  console.log("a intrat si aici");
});
