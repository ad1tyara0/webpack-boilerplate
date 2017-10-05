//  Make your HTML 'hot reload' using 'DefinePlugin' & 'html-loader'.
if (process.env.NODE_ENV !== 'production') {
// index.html is relative to main.js
  require('../index.html')
}

// Require|import the CSS file from styles folder to inject it into index.html automatically.
import "../styles/main.css";

var firstRick = document.getElementById('alien_rick_one');
var secondRick = document.getElementById('alien_rick_two');

firstRick.addEventListener('click',function(){
  secondRick.style.display = "block";
  firstRick.style.display = "none"; 
});

secondRick.addEventListener('click',function(){
  firstRick.style.display = "block"; 
  secondRick.style.display = "none";
});