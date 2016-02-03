var secquestion = prompt("Can your eyes handle ugly websites?").toUpperCase();
if (secquestion == "YES") {
	alert("WARNING: Gabe Pages is NOT responsible for any injuries to your optics. Proceed with EXTREME CAUTION!");
}else {
	alert("What follows is very ugly, if your eyes cant handle ugly websites, you SHOULD NOT proceed.");
};

var $ = {};
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function(callback){
               setInterval(callback, 60);
           };
})();

$.sprite = function (options) {
    this.canvas = options.canvas;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;

    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 1;
    this.numberOfFrames = options.numberOfFrames || 1;
};

$.sprite.prototype.update = function() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.frameIndex < this.numberOfFrames - 1) {
            this.frameIndex += 1;
        }
        else {
            this.frameIndex = 0;
        }

    }
}

$.sprite.prototype.render = function () {
    this.canvas.drawImage(
        this.image,
        this.frameIndex*this.width / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        10,
        10,
        this.width / this.numberOfFrames,
        this.height);


};
    


$.setup = function() {
    $.main = document.getElementById('main');

    $.mainctx = $.main.getContext('2d');
    $.main.width = window.innerWidth;
    $.main.height = window.innerHeight;
    
    $.W = window.innerWidth;
    $.H = window.innerHeight;

    $.playerImg = new Image();
    $.playerImg.src = 'https://13ecbc5bb4f0b774b899dd280ceec7915d690041.googledrive.com/host/0BzjYB_Ch9pbscTBZX3l3eGdfS1k/SkateBoardGwtrans.png';
    $.playerImg.onload = function () {
        $.skateboardG = new $.sprite({ canvas: $.mainctx, width: 300, height: 100, image: $.playerImg, numberOfFrames:6, ticksPerFrame:7 });

        $.loop();
    };
   

}

$.updateDelta = function(){
    var now = Date.now();
    $.dt = (now - $.lt) / (1000 / 60);
    $.dt = ($.dt < 0) ? 0.001 : $.dt;
    $.dt = ($.dt > 10) ? 10 : $.dt;
    $.lt = now;
    $.elapsed += $.dt;
}

$.loop = function () {
    requestAnimFrame($.loop);
    $.mainctx.clearRect(0, 0, $.W, $.H);
    $.skateboardG.update();
    $.skateboardG.render();
    $.updateDelta();
}

window.addEventListener('load', function () {
    $.setup();
});