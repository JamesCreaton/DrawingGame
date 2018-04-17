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
    ctx.fillRect(0,0,c.width,c.height);

    //run the mouse up command to set up the debug mouseDown box
    mouseUp();
    
    //test stuff relating to color, can delete later
    var maxColorVal = 360;
    var testColor = 0;

    //left mouse was pressed on canvas
    function mouseDown(e){
        isMouseDown = true;
        //update last known mouse pos
        mouse = updateMouse(e);
        //debug, can delete later
        drawTestMouseDownBox("blue");
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
        ctx.fillStyle=color;
        ctx.fillRect(0,0,20,20);
    }
    
    //draws a line from from to to... probs best to change those names
    //from and to are objects that need x and y variables in them
    function drawLine(from, to){        
        ctx.beginPath();
        
        //just a test, changing the color to make it more interesting
        var green = testColor>maxColorVal?testColor*-1 + (maxColorVal*2):testColor;
        //ctx.strokeStyle="rgb(255,"+green+",0)";
        ctx.strokeStyle="hsl("+green+",100%,50%)";
        
        ctx.lineWidth = 10;      
        
        //line drawing part
        ctx.moveTo(from.x,from.y);
        ctx.lineTo(to.x,to.y);        
        ctx.stroke();
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
        if(distance > 1){
            drawLine(mouse, currMouse);
        }
        else{
            
        }
        
        //update old mouse pos to the new one
        mouse = currMouse;
        //test color code
        testColor = (testColor+1)%(maxColorVal*2);
    }
    
    //returns the current mouse pos relative to the canvas
    function updateMouse(e){
        var currMouse = {};
        currMouse.x = e.pageX - c.offsetLeft;//offsetLeft is the offset relative to the left side of the parent
        currMouse.y = e.pageY - c.offsetTop;
        return currMouse;
    }
