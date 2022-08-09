const canvas = document.getElementById("game");
const cnv = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;
let bigsize;
if (height > width) {
    bigsize = height
} else {
    bigsize = width
}
let scale = bigsize / 80

let bg = new Image();
bg.src = "img/bg.png"
let ship = new Image();
ship.src = "img/ship.png"
let bullet = new Image();
bullet.src = "img/bullet.png"
let pick = new Image();
pick.src = "img/pick.png"
let redship = new Image();
redship.src = "img/redship.png"
let blueship = new Image();
blueship.src = "img/blueship.png"
let redbullet = new Image();
redbullet.src = "img/redbullet.png"
let bluebullet = new Image();
bluebullet.src = "img/bluebullet.png"


let speedmax = width * height / (100000 * width / height);
let acceleration = width * height / (10000000 * width / height);
let timebulletlive = 1

let angle = 0;
let speed = 0;
let dir = ({
    x: -1,
    y: -1
})
let pos = ({
    x: width / 40 * 14,
    y: height / 40 * 19
})
let speedxy = ({
    x: dir.x * speed,
    y: dir.y * speed
})
let score = 0, score2 = 0
let bulletxy = [];
let bulletangle = [];
let bulletlive = [];

let brake = false;
let impulse = false;
let left = false;
let right = false;
let fire = false;
let canfire = 0;

document.addEventListener("keydown", calculate_angle_go)
function calculate_angle_go(event) {
    if (event.keyCode == 65) {
        left = true;
    }
    if (event.keyCode == 68) {
        right = true;
    }
    if (event.keyCode == 87) {
        impulse = true;
    }
    if (event.keyCode == 83) {
        brake = true;
    }
    if (event.keyCode == 81) {
        fire = true;
    }
}
document.addEventListener("keyup", calculate_angle_stop)
function calculate_angle_stop(event) {
    if (event.keyCode == 65) {
        left = false;
    }
    if (event.keyCode == 68) {
        right = false;
    }
    if (event.keyCode == 87) {
        impulse = false;
    }
    if (event.keyCode == 83) {
        brake = false;
    }
    if (event.keyCode == 81) {
        fire = false;
    }
}

/////

let angle2 = 0;
let speed2 = 0;
let dir2 = ({
    x: -1,
    y: -1
})
let pos2 = ({
    x: width / 40 * 24,
    y: height / 40 * 19
})
let speedxy2 = ({
    x: dir2.x * speed2,
    y: dir2.y * speed2
})
let bulletxy2 = [];
let bulletangle2 = [];
let bulletlive2 = [];

let brake2 = false;
let impulse2 = false;
let left2 = false;
let right2 = false;
let fire2 = false;
let canfire2 = 0;

document.addEventListener("keydown", calculate_angle2_go)
function calculate_angle2_go(event) {
    if (event.keyCode == 37) {
        left2 = true;
    }
    if (event.keyCode == 39) {
        right2 = true;
    }
    if (event.keyCode == 38) {
        impulse2 = true;
    }
    if (event.keyCode == 40) {
        brake2 = true;
    }
    if (event.keyCode == 190) {
        fire2 = true;
    }
}
document.addEventListener("keyup", calculate_angle2_stop)
function calculate_angle2_stop(event) {
    if (event.keyCode == 37) {
        left2 = false;
    }
    if (event.keyCode == 39) {
        right2 = false;
    }
    if (event.keyCode == 38) {
        impulse2 = false;
    }
    if (event.keyCode == 40) {
        brake2 = false;
    }
    if (event.keyCode == 190) {
        fire2 = false;
    }
}

/////


function draw() {
    cnv.drawImage(bg, 0, 0, width, height);

    if (left) {
        angle = (360 + angle - 3) % 360
    }
    if (right) {
        angle = (360 + angle + 3) % 360
    }
    if (brake) {
        speed = -acceleration / 2;
    }
    if (impulse) {
        speed = acceleration;
    }
    if (impulse == 0 & brake == 0) {
        speed = 0;
    }
    if (fire & canfire > 10) {
        canfire = 0;
        bulletxy.push({
            x: pos.x + scale / 2 + (Math.sin((angle) * Math.PI / 180) * scale / 2 - scale / 20),
            y: pos.y + scale / 2 + (Math.cos((angle + 180) * Math.PI / 180) * scale / 2)
        })
        bulletangle.push(angle)
        bulletlive.push(0)
    } else {
        canfire++;
    }

    let collisiona = ({
        x: pos2.x + scale / 2 + (Math.sin((angle2) * Math.PI / 180) * scale / 2),
        y: pos2.y + scale / 2 + (Math.cos((angle2 + 180) * Math.PI / 180) * scale / 2)
    })
    let collisionb = ({
        x: pos2.x + scale / 2 + (Math.sin((angle2 + 155) * Math.PI / 180) * scale / 1.8),
        y: pos2.y + scale / 2 + (Math.cos((angle2 - 25) * Math.PI / 180) * scale / 1.8)
    })
    let collisionc = ({
        x: pos2.x + scale / 2 + (Math.sin((angle2 + 205) * Math.PI / 180) * scale / 1.8),
        y: pos2.y + scale / 2 + (Math.cos((angle2 - 335) * Math.PI / 180) * scale / 1.8)
    })
    let Bigtriangle = Striangle(collisiona.x, collisiona.y, collisionb.x, collisionb.y, collisionc.x, collisionc.y)


    for (let i = 0; i < bulletxy.length; i++) {
        bulletxy[i] = ({
            x: bulletxy[i].x + (Math.sin((bulletangle[i]) * Math.PI / 180) * speedmax * 1.1),
            y: bulletxy[i].y + (Math.cos((bulletangle[i] + 180) * Math.PI / 180) * speedmax * 1.1)
        })

        if (bulletxy[i].x < 0) {
            bulletxy[i].x = width
        }
        if (bulletxy[i].x > width) {
            bulletxy[i].x = 0
        }
        if (bulletxy[i].y < 0) {
            bulletxy[i].y = height
        }
        if (bulletxy[i].y > height) {
            bulletxy[i].y = 0
        }

        let Atriangle = Striangle(collisiona.x, collisiona.y, collisionb.x, collisionb.y, bulletxy[i].x, bulletxy[i].y)
        let Btriangle = Striangle(collisiona.x, collisiona.y, collisionc.x, collisionc.y, bulletxy[i].x, bulletxy[i].y)
        let Ctriangle = Striangle(collisionb.x, collisionb.y, collisionc.x, collisionc.y, bulletxy[i].x, bulletxy[i].y)

        bulletlive[i] = bulletlive[i] + Math.sqrt((Math.sin((bulletangle[i]) * Math.PI / 180) * speedmax * 1.1) * (Math.sin((bulletangle[i]) * Math.PI / 180) * speedmax * 1.1) + (Math.cos((bulletangle[i] + 180) * Math.PI / 180) * speedmax * 1.1) * (Math.cos((bulletangle[i] + 180) * Math.PI / 180) * speedmax * 1.1))
        if (bulletlive[i] > bigsize / 2) {
            bulletxy.splice(i, 1)
            bulletangle.splice(i, 1)
            bulletlive.splice(i, 1)
        } else {
            rotate(bulletxy[i].x, bulletxy[i].y, angle, scale / 10, redbullet)
        }

        if (Bigtriangle > Atriangle & Bigtriangle > Btriangle & Bigtriangle > Ctriangle) {
            score++
            bulletxy.splice(i, 1)
            bulletangle.splice(i, 1)
            bulletlive.splice(i, 1)
        }

    }

    dir.x = Math.sin((angle) * Math.PI / 180);
    dir.y = Math.cos((angle + 180) * Math.PI / 180);

    speedxy = ({
        x: speedxy.x + dir.x * speed,
        y: speedxy.y + dir.y * speed
    })

    let fixspeedx, fixspeedy

    if (Math.sqrt(speedxy.x * speedxy.x + speedxy.y * speedxy.y) > speedmax) {
        fixspeedx = speedxy.x
        fixspeedy = speedxy.y
        speedxy.y = fixspeedy * (speedmax / Math.sqrt(fixspeedx * fixspeedx + fixspeedy * fixspeedy))
        speedxy.x = fixspeedx * (speedmax / Math.sqrt(fixspeedx * fixspeedx + fixspeedy * fixspeedy))
    }


    pos = ({
        x: pos.x + speedxy.x,
        y: pos.y + speedxy.y
    })

    if (pos.x > width) {
        pos.x = pos.x - width - scale;
    }
    if (pos.x < -scale) {
        pos.x = pos.x + width;
    }
    if (pos.y > height) {
        pos.y = pos.y - height - scale;
    }
    if (pos.y < -scale) {
        pos.y = pos.y + height;
    }

    rotate(pos.x, pos.y, angle, scale, redship)

    cnv.fillStyle = "#ffff"
    cnv.font = "30px arial"
    cnv.fillText(score, width / 4, 100)




    ////////


    if (left2) {
        angle2 = (360 + angle2 - 3) % 360
    }
    if (right2) {
        angle2 = (360 + angle2 + 3) % 360
    }
    if (brake2) {
        speed2 = -acceleration / 2;
    }
    if (impulse2) {
        speed2 = acceleration;
    }
    if (impulse2 == 0 & brake2 == 0) {
        speed2 = 0;
    }
    if (fire2 & canfire2 > 10) {
        canfire2 = 0;
        bulletxy2.push({
            x: pos2.x + scale / 2 + (Math.sin((angle2) * Math.PI / 180) * scale / 2 - scale / 20),
            y: pos2.y + scale / 2 + (Math.cos((angle2 + 180) * Math.PI / 180) * scale / 2)
        })
        bulletangle2.push(angle2)
        bulletlive2.push(0)
    } else {
        canfire2++;
    }

    let collisiona2 = ({
        x: pos.x + scale / 2 + (Math.sin((angle) * Math.PI / 180) * scale / 2),
        y: pos.y + scale / 2 + (Math.cos((angle + 180) * Math.PI / 180) * scale / 2)
    })
    let collisionb2 = ({
        x: pos.x + scale / 2 + (Math.sin((angle + 155) * Math.PI / 180) * scale / 1.8),
        y: pos.y + scale / 2 + (Math.cos((angle - 25) * Math.PI / 180) * scale / 1.8)
    })
    let collisionc2 = ({
        x: pos.x + scale / 2 + (Math.sin((angle + 205) * Math.PI / 180) * scale / 1.8),
        y: pos.y + scale / 2 + (Math.cos((angle - 335) * Math.PI / 180) * scale / 1.8)
    })
    let Bigtriangle2 = Striangle(collisiona2.x, collisiona2.y, collisionb2.x, collisionb2.y, collisionc2.x, collisionc2.y)


    for (let i = 0; i < bulletxy2.length; i++) {
        bulletxy2[i] = ({
            x: bulletxy2[i].x + (Math.sin((bulletangle2[i]) * Math.PI / 180) * speedmax * 1.1),
            y: bulletxy2[i].y + (Math.cos((bulletangle2[i] + 180) * Math.PI / 180) * speedmax * 1.1)
        })
        if (bulletxy2[i].x < 0) {
            bulletxy2[i].x = width
        }
        if (bulletxy2[i].x > width) {
            bulletxy2[i].x = 0
        }
        if (bulletxy2[i].y < 0) {
            bulletxy2[i].y = height
        }
        if (bulletxy2[i].y > height) {
            bulletxy2[i].y = 0
        }


        let Atriangle2 = Striangle(collisiona2.x, collisiona2.y, collisionb2.x, collisionb2.y, bulletxy2[i].x, bulletxy2[i].y)
        let Btriangle2 = Striangle(collisiona2.x, collisiona2.y, collisionc2.x, collisionc2.y, bulletxy2[i].x, bulletxy2[i].y)
        let Ctriangle2 = Striangle(collisionb2.x, collisionb2.y, collisionc2.x, collisionc2.y, bulletxy2[i].x, bulletxy2[i].y)
        bulletlive2[i] = bulletlive2[i] + Math.sqrt((Math.sin((bulletangle2[i]) * Math.PI / 180) * speedmax * 1.1) * (Math.sin((bulletangle2[i]) * Math.PI / 180) * speedmax * 1.1) + (Math.cos((bulletangle2[i] + 180) * Math.PI / 180) * speedmax * 1.1) * (Math.cos((bulletangle2[i] + 180) * Math.PI / 180) * speedmax * 1.1))
        if (bulletlive2[i] > bigsize / 2) {
            bulletxy2.splice(i, 1)
            bulletangle2.splice(i, 1)
            bulletlive2.splice(i, 1)
        } else {
            rotate(bulletxy2[i].x, bulletxy2[i].y, angle2, scale / 10, bluebullet)
        }

        if (Bigtriangle2 > Atriangle2 & Bigtriangle2 > Btriangle2 & Bigtriangle2 > Ctriangle2) {
            score2++
            bulletxy2.splice(i, 1)
            bulletangle2.splice(i, 1)
            bulletlive2.splice(i, 1)
        }


    }


    dir2.x = Math.sin((angle2) * Math.PI / 180);
    dir2.y = Math.cos((angle2 + 180) * Math.PI / 180);

    speedxy2 = ({
        x: speedxy2.x + dir2.x * speed2,
        y: speedxy2.y + dir2.y * speed2
    })

    let fixspeedx2, fixspeedy2

    if (Math.sqrt(speedxy2.x * speedxy2.x + speedxy2.y * speedxy2.y) > speedmax) {
        fixspeedx2 = speedxy2.x
        fixspeedy2 = speedxy2.y
        speedxy2.y = fixspeedy2 * (speedmax / Math.sqrt(fixspeedx2 * fixspeedx2 + fixspeedy2 * fixspeedy2))
        speedxy2.x = fixspeedx2 * (speedmax / Math.sqrt(fixspeedx2 * fixspeedx2 + fixspeedy2 * fixspeedy2))
    }

    pos2 = ({
        x: pos2.x + speedxy2.x,
        y: pos2.y + speedxy2.y
    })

    if (pos2.x > width) {
        pos2.x = pos2.x - width - scale;
    }
    if (pos2.x < -scale) {
        pos2.x = pos2.x + width;
    }
    if (pos2.y > height) {
        pos2.y = pos2.y - height - scale;
    }
    if (pos2.y < -scale) {
        pos2.y = pos2.y + height;
    }

    rotate(pos2.x, pos2.y, angle2, scale, blueship)

    cnv.fillStyle = "#ffff"
    cnv.font = "30px arial"
    cnv.fillText(score2, width / 4 * 3, 100)


}

let game = setInterval(draw, 20);

function rotate(positionx, positiony, angle, scale, draw) {
    cnv.save()
    cnv.translate(positionx + scale / 2, positiony + scale / 2)
    cnv.rotate((angle) * Math.PI / 180)
    cnv.translate(-positionx - scale / 2, -positiony - scale / 2)
    cnv.drawImage(draw, positionx, positiony, scale, scale)
    cnv.restore()
}

function Striangle(x1, y1, x2, y2, x3, y3) {
    a = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    b = Math.sqrt((x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3))
    c = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3))

    p = (a + b + c) / 2
    S = Math.sqrt(p * (p - a) * (p - b) * (p - c))
    return S
}