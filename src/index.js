import Rectangle from "./rectangle";

const canvas = document.getElementById("cnvs");

const gameState = {rects:
        [new Rectangle(10,10,20,20, 1, 0),
            new Rectangle(500,10,20,20, -1, 0)]
};

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw
    gameState.rects.forEach(r=>{
        context.beginPath()
        context.rect(r.x, r.y, r.w, r.h)
        context.fill()
    })
}

function update(tick) {
    gameState.rects.forEach(r=>{
        r.x += r.vx
        r.y += r.vy
    })
}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

}

setup();
run();
