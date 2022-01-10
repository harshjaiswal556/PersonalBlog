let first = 'Web Developer';
let second = 'Student';
document.getElementById("type").style.fontWeight="900";
var typed = new Typed('#type', {
  // Waits 1000ms after typing "First"
  strings: ['', first.fontcolor("orange"), second.fontcolor("orange")],
  typeSpeed: 100,
  backSpeed: 100,
  loop:true
});

new WOW().init();