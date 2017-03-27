

function setWidth() {
    var i = 0;
    var children = document.getElementById("gallery").children;
    var totalWidth = 0;
    var stupidWidth = 0;


    for (i; i < children.length; i++) {
        totalWidth += children[i].offsetWidth + 2;
        stupidWidth = children[i].offsetWidth;
        console.log(i)
    }
    
    document.getElementById("gallery").style.width=totalWidth + 'px';
    console.log(totalWidth);
}
window.addEventListener("load", function() {
	setTimeout(setWidth, 250);
});
var windowHeight = window.innerHeight;

window.addEventListener("resize", function() {
  // start timing for event "completion"
  if(windowHeight != window.innerHeight){
  	setTimeout(setWidth, 250);
  }
});

function readDeviceOrientation() {
         		
    if (Math.abs(window.orientation) === 90) {
        // Landscape
        setTimeout(function() {
         document.body.scrollLeft = 0;
         document.body.scrollTop = 0;
     });
    } else {
    	// Portrait
    	setTimeout(function() {
         document.body.scrollLeft = 0;
         document.body.scrollTop = 0;
     });
    }
}

window.onorientationchange = readDeviceOrientation;
var xStart, yStart = 0;
 
document.addEventListener('touchstart',function(e) {
    xStart = e.touches[0].screenX;
    yStart = e.touches[0].screenY;
});
 
document.addEventListener('touchmove',function(e) {
    var xMovement = Math.abs(e.touches[0].screenX - xStart);
    var yMovement = Math.abs(e.touches[0].screenY - yStart);
    if((yMovement * 3) > xMovement) {
        e.preventDefault();
    }
});

