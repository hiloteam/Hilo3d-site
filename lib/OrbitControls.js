(function (win) {
    var tempEuler = new Hilo3d.Euler();
    var tempQuat = new Hilo3d.Quaternion();
    var tempMatrix = new Hilo3d.Matrix4();

    function OrbitControls(stage) {
        this.stage = stage;
        this.canvas = stage.canvas;

        this.mouseInfo = {
            startX: 0,
            startY: 0,
            isDown: false
        };

        this.bindEvent();
    }

    OrbitControls.prototype.onMouseDown = function(evt) {
        if (evt.type === 'touchstart') {
            if (evt.touches.length >= 2) {
                var x = evt.touches[1].pageX - evt.touches[0].pageX;
                var y = evt.touches[1].pageY - evt.touches[0].pageY;
                this.mouseInfo.startPointerDistance = Math.sqrt(x * x + y * y);
            }
            evt = evt.touches[0];
        }
        this.mouseInfo.isDown = true;
        this.mouseInfo.startX = evt.pageX;
        this.mouseInfo.startY = evt.pageY;
    }

    OrbitControls.prototype.onMouseMove = function(evt) {
        if (!this.mouseInfo.isDown) {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();

        var scale = 1;
        if (evt.type === 'touchmove') {
            if (evt.touches.length >= 2) {
                var x = evt.touches[1].pageX - evt.touches[0].pageX;
                var y = evt.touches[1].pageY - evt.touches[0].pageY;
                var pointerDistance = Math.sqrt(x * x + y * y);
                scale = pointerDistance / this.mouseInfo.startPointerDistance;
                this.mouseInfo.startPointerDistance = pointerDistance;
            }
            evt = evt.touches[0];
        }

        var distanceX = evt.pageX - this.mouseInfo.startX;
        var distanceY = evt.pageY - this.mouseInfo.startY;
        this.mouseInfo.startX = evt.pageX;
        this.mouseInfo.startY = evt.pageY;

        tempEuler.set(distanceY / 200, distanceX / 200, 0);
        tempQuat.fromEuler(tempEuler);
        this.stage.quaternion.premultiply(tempQuat);
        if (scale !== 1) {
            this.stage.scaleX *= scale;
            this.stage.scaleY *= scale;
            this.stage.scaleZ *= scale;
        }
    }

    OrbitControls.prototype.onMouseUp = function(evt) {
        this.mouseInfo.isDown = false;
    }

    OrbitControls.prototype.onWheel = function(evt) {
        var deltaY = evt.deltaY;
        if (deltaY >= 100) {
            deltaY = 99;
        } else if (deltaY <= -100) {
            deltaY = -99;
        }
        var s = 1 + evt.deltaY * 0.01;
        this.stage.scaleX /= s;
        this.stage.scaleY /= s;
        this.stage.scaleZ /= s;
    }

    OrbitControls.prototype.bindEvent = function() {
        var canvas = this.canvas;

        canvas.addEventListener('wheel', this.onWheel.bind(this), false);

        if ('ontouchmove' in window) {
            canvas.addEventListener('touchstart', this.onMouseDown.bind(this), false);
            canvas.addEventListener('touchmove', this.onMouseMove.bind(this), false);
            canvas.addEventListener('touchend', this.onMouseUp.bind(this), false);
        } else {
            canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
            canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
            canvas.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        }
    }
    
    win.OrbitControls = OrbitControls;
})(this);