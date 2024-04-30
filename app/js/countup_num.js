let valueDisplays = document.querySelectorAll(".countup_num");
let interval = 3000; // 'speed of animation'


const target = document.getElementById("countups")


function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      animateNumbers()
    }
  });
}


let observer = new IntersectionObserver(handleIntersection);
observer.observe(target);

function animateNumbers() {

  valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
      startValue += 1;
      valueDisplay.textContent = startValue + "+";
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }, duration);
  });


}