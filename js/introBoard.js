
var UIObject = function() {
    //console.log("in UIObject");
}

UIObject.prototype.intersects =  function(obj, mouse) {
        // console.log("in intersects");
        var t = 5; // this is the tolerance limit.
        var xIntersect = (mouse.x + t) > obj.x && (mouse.x - t) < obj.x + obj.width; // is the mouse's x value between the objects x + width value (given a tollerance)
        var yIntersect = (mouse.y + t) > obj.y && (mouse.y - t) < obj.y + obj.height; // is the mouse's y value between the objects y + height value (given a tollerance)
        
        if (xIntersect && yIntersect) {
        console.log("xIntersect = " + xIntersect);
        console.log("yIntersect = " + yIntersect);
        }
        return xIntersect && yIntersect;
    }

UIObject.prototype.updateStats = function() {
        // console.log("in updateStats"); 
        // console.log("this: " + this );
        // console.log("canvas.mouse: " + ctx.mouse);
        if (this.intersects(this, ctx.mouse)) {
            this.hovered = true;
            if (ctx.mouse.clicked) {
                this.clicked = true;
            }
        } else { 
            this.hovered = false;
        }

        if (!ctx.mouse.down) {
            this.clicked = false;
        }
    }


var PlayerButton = function(text, x, y, spriteImage ) {
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 170;
    this.clicked = false;
    this.hovered = false;
    this.text = text;
    this.sprite = spriteImage;
}

PlayerButton.prototype = Object.create(UIObject.prototype);
PlayerButton.prototype.constructor = PlayerButton;

PlayerButton.prototype.render = function() {    
    //set color
    if (this.hovered) {
        ctx.fillStyle = "blue";
    } else {
        ctx.fillStyle = "red";
    }

    //render button
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // text options
    var fontSize = 20;
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.font = fontSize + "pt Impact";     

    // text position
    var textSize = ctx.measureText(this.text);
    var textX = this.x + (this.width / 2) /*+ (textSize.width / 2)*/;
    var textY = this.y + (this.height / 4) + (fontSize / 2);

    // render the sprite
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // render the text
    ctx.fillText(this.text, textX, textY);
}

PlayerButton.prototype.update = function() {
    var wasNotClicked = !this.clicked;
    this.updateStats();

    if (this.clicked && wasNotClicked) {
        if(!_.isUndefined(this.handler)) {
            this.handler();
        }
    }
}