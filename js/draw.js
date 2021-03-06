var c = document.getElementById("myCanvas");
    //set up mouse events
    c.onmousedown = mouseDown;
    c.onmouseup = mouseUp;
    c.onmousemove = mouseMove;
    c.onmouseout = mouseLeftCanvas;

    c.width = 400;
    c.height = 400;
    
    //last known mouse position
    var mouse = {x:0, y:0};
    //is the left mouse button currently down?
    var isMouseDown = false;
    //the canvas context
    var ctx = c.getContext("2d");

    //create a white background to start off with
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);
    
    
    //line information
    var lineWidth = 10;
    var lineColor = "hsl(" + 0 + ", 100%, 50%)";
    //how far do we move the mouse before we place the line
    const distBetweenPoints = 10; 

    //run the mouse up command to set up the debug mouseDown box
    mouseUp();
    
    //test stuff relating to color, can delete later
    const maxColorVal = 360;
    var testColor = 0;

    //left mouse was pressed on canvas
    function mouseDown(e){
        isMouseDown = true;
        //update last known mouse pos
        mouse = updateMouse(e);
        //debug, can delete later
        drawTestMouseDownBox("blue");
        
        //mouse has been clicked, draw a circle at click position to give the line a nice rounded look
        drawCircle(mouse);
    }
    
    function mouseUp(){
        isMouseDown = false;
        //debug, can delete later
        drawTestMouseDownBox("red");
    }
    
    //mouse has left the canvas
    function mouseLeftCanvas(){
        //lets just pretend the user stopped their left click
        mouseUp();
        //end stroke?
        //we have the direction/speed(sorta), we could draw to where the mouse was going
    }
    
    //test func, draws colored box in top left corner
    function drawTestMouseDownBox(color){
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 20, 20);
    }
    
    //draws a line from from to to... probs best to change those names
    //from and to are objects that need x and y variables in them
    function drawLine(from, to){        
        ctx.beginPath();
        
        //just a test, changing the color to make it more interesting
        ctx.strokeStyle = lineColor;
        
        ctx.lineWidth = lineWidth;      
        
        //line drawing part
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);        
        ctx.stroke();
    }

    function drawCircle(at){
        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(at.x, at.y, lineWidth / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    //the mouse has been moved on the canvas
    function mouseMove(e){
        //dont run if the left mouse is not down
        if(!isMouseDown){
            return;
        }
        //get current mouse pos
        var currMouse = updateMouse(e);
        
        //could do a distance check here, if the distance is not greater then 1 then dont draw or update the last mouse pos
        //that would prevent the weird line when drawing slowly
        
        //draw line
        //Check if the line has moved a certain amount
        
        //Distance checking
        var a = mouse.x - currMouse.x;
        var b = mouse.y - currMouse.y;

        var distance = Math.sqrt( a*a + b*b );
        
        //Only draw if distance is above value
        if(distance > distBetweenPoints){
            
            //this basicly just goes from 0-maxColorVal-0
            //debug color changer, replace with UI buttons
            var hue = (testColor > maxColorVal) ? (testColor * -1 + (maxColorVal * 2)) : testColor;
            lineColor = "hsl(" + hue + ",100%,50%)";
            //update test color/hue code
            testColor = (testColor+1)%(maxColorVal*2);
            
            drawLine(mouse, currMouse);
            drawCircle(currMouse);

            //update old mouse pos to the new one
            mouse = currMouse;            
        }
        

    }
    
    //returns the current mouse pos relative to the canvas
    function updateMouse(e){
        var currMouse = {};
        currMouse.x = e.pageX - c.offsetLeft;//offsetLeft is the offset relative to the left side of the parent
        currMouse.y = e.pageY - c.offsetTop;
        return currMouse;
    }
