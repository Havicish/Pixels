/** @type {HTMLCanvasElement} */
let Canvas;
/** @type {CanvasRenderingContext2D} */
let Ctx;

/** @type {HTMLCanvasElement} */
let Canvas2;
/** @type {CanvasRenderingContext2D} */
let Ctx2;

let LocalPlayer;
document.addEventListener("DOMContentLoaded", function () {
    Canvas = document.getElementById("Canvas");
    Ctx = Canvas.getContext("2d");
    Canvas2 = document.getElementById("BackCanvas");
    Ctx2 = Canvas2.getContext("2d");

    Canvas.width = 80;
    Canvas.height = 60;

    Ctx.imageSmoothingEnabled = false;

    Canvas2.width = 80;
    Canvas2.height = 60;

    Ctx2.imageSmoothingEnabled = false;

    LocalPlayer = new Player(Ctx);
    LocalPlayer.Rotation += Math.PI / 4;

    Frame();
});

let Camera = {
    X: 0,
    Y: 0,
    Z: 0
};

class Animation {
    constructor() {
        this.Frames = [];
        this.CurrentFrame = 0;
        this.FrameTime = 0;
    }

    Update() {
        this.FrameTime++;

        if (this.FrameTime >= 10) {
            this.FrameTime = 0;
            this.CurrentFrame = (this.CurrentFrame + 1) % this.Frames.length;
        }
    }

    Draw(X, Y, W, H) {
        Ctx.drawImage(this.Frames[this.CurrentFrame], X, Y, W, H);
    }
}

class Player {
    constructor(Ctx) {
        this.X = 0;
        this.Y = 0;
        this.Size = 1;
        this.Rotation = 0;
        
        this.Animations = {};
        this.CurrentAnimation = null;
        this.CurrentImage = new Image();
        this.CurrentImage.src = "Sword-1.png";
        this.Ctx = Ctx;

        this.Velocity = {X: 0, Y: 0};
    }

    Update() {
        this.X += this.Velocity.X;
        this.Y += this.Velocity.Y;

        this.Velocity.X *= 0.9;
        this.Velocity.Y *= 0.9;

        //this.CurrentAnimation.Update();

        this.Ctx.translate(this.X + this.CurrentImage.width / 2, this.Y + this.CurrentImage.height / 2);
        this.Ctx.rotate(this.Rotation);
        this.Ctx.drawImage(this.CurrentImage, -this.X + 1, -this.Y + 1);
        this.Ctx.resetTransform();
    }
}

function Frame() {
    Canvas.style.left = `${window.innerWidth / 2 - Canvas.width / 2}px`;
    Canvas.style.top = `${window.innerHeight / 2 - Canvas.height / 2}px`;

    Canvas2.style.transform = `scale(${Math.max(window.innerWidth / 80, window.innerHeight / 60)})`;
    Canvas2.style.left = `${window.innerWidth / 2 - Canvas2.width / 2}px`;
    Canvas2.style.top = `${window.innerHeight / 2 - Canvas2.height / 2}px`;

    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    Ctx.fillStyle = "gray";
    Ctx.fillRect(0, 0, Canvas.width, Canvas.height);

    LocalPlayer.X = 10;
    LocalPlayer.Y = 10;
    LocalPlayer.Update();
    LocalPlayer.Rotation += Math.PI / 2.5;

    Ctx2.drawImage(Canvas, 0, 0, Canvas.width, Canvas.height, 0, 0, Canvas2.width, Canvas2.height);
    Ctx2.fillStyle = "#000000cc";
    Ctx2.fillRect(0, 0, Canvas2.width, Canvas2.height);

    requestAnimationFrame(Frame);
}