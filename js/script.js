let gameWrap = document.querySelector('.game-wrap'),
	fps = 1000 / 60,
	deadline = 90,
	seconds = 0,
	minutes = 0,
	pers = {
		el: false,
		x: 0,
		y: 80,
		step: 10,
		jump_high: 320,
		jump: false,
		run: false,
		moves: 1,
		jump_speed: 250,
		jump_step: 25,
		health: 100
	},
	back = {
		speed: 35,
		x: 0,
		y: 0,
	},
	ints = {
		run: false,
		jump: false
	},
	zel = {
		x: 2380,
		y: 320
	},
	plat = {
		x: 2300,
		y: 120,
		w: 500,
		h: 200
	},
	lava ={
		x: 2300,
		y: 0,
		w: 450,
		h: 80
	},
	timer = {
		seconds: 0,
		minutes: 0
	}
function intervals() {
	ints.run = setInterval(() => {
		// Конец игры
		if (pers.health == 0) {
			gameOver();
		}


		// Зелье 
		if (Math.abs(pers.x - zel.x) < 20 && Math.abs(pers.y - zel.y) < 20) {
			zel.el.style.opacity = 0;	
			timer.seconds = 0;
		}

		if (pers.run) {
			switch (pers.moves) {

				case 2:
					if (pers.x < 10) {
						return;
					}
					pers.x -= pers.step;
					back.x += back.speed;
					zel.x += back.speed;
					plat.x += back.speed;
					lava.x += back.speed;


					pers.el.style.left = pers.x + 'px';
					back.el.style.left = back.x + 'px';
					zel.el.style.left = zel.x + 'px';
					plat.el.style.left = plat.x + 'px';
					lava.el.style.left = lava.x + 'px';

					break;
				case 3:
					console.log(pers.x, gameWrap.offsetWidth - 400)
					if (pers.x > (gameWrap.offsetWidth - 400)) {
						return;
					}
					pers.x += pers.step;
					back.x -= back.speed;
					zel.x -= back.speed;
					plat.x -= back.speed;
					lava.x -= back.speed;

					pers.el.style.left = pers.x + 'px';
					back.el.style.left = back.x  + 'px';
					zel.el.style.left = zel.x + 'px';
					plat.el.style.left = plat.x + 'px';
					lava.el.style.left = lava.x + 'px';

					break;
			}
		}
		if (pers.jump) {
			pers.y += pers.jump_step;
			pers.el.style.bottom = pers.y + 'px';	
			setTimeout(() => {
				pers.jump = false;
				var some_y = 0;
				if (Math.abs(pers.x - plat.x) < plat.w && Math.abs(pers.y - (plat.y + plat.h)) < 100) {
					some_y = 320;
				} else {
					some_y = 80;
				}	
				const down_jump = setInterval(()=> {
					if (Math.abs(some_y - pers.y) <= 20) {
						pers.jump = false;
						pers.y = some_y;	
						pers.el.style.bottom = some_y + 'px';
						clearInterval(down_jump);
						return;
					}	
					if (pers.y < 80) {
						clearInterval(down_jump);
						return;
					}
					pers.y -= pers.jump_step;	
					pers.el.style.bottom = pers.y + 'px';
				})	
			}, pers.jump_speed)
		}
	}, fps)
	ints.lava = setInterval(()=> {
		// Лава 
		if (pers.x > lava.x && pers.x < (lava.x + lava.w) && Math.abs(pers.y - (lava.y + lava.h)) < 20) {
			pers.health -= 10;
			hp.style.width = pers.health + '%';
		}
	}, 500);
	ints.timer = setInterval(() => {
		timer.seconds++;
		if (timer.seconds == 60) {
			timer.seconds = 0;
			minutes++;
		}
		if (timer.seconds < 10) {
			seconds_string = '0' + timer.seconds
		} else {
			seconds_string =  timer.seconds;
		}
		if (minutes < 10) {
			minutes_string = '0' + timer.minutes
		} else {
			minutes_string =  timer.minutes;
		}
		if (timer.seconds > deadline) {
			pers.health -= 10;
			hp.style.width = pers.health + '%';
			
		}
		timer.el.innerHTML = minutes_string + ':' + seconds_string + ' / ' + deadline;
	}, 1000);
	ints.checkfloor = setInterval(()=> {
		if (pers.jump == false) {
			if (pers.x > plat.x && pers.x < (plat.x + plat.w) && Math.abs(pers.y - (plat.y + plat.h)) < 100) {
				some_y = 320;
			} else {
				some_y = 80;
			}	
			pers.y = some_y;
			pers.el.style.bottom = pers.y + 'px';
		}
	}, pers.jump_speed * 2)

	ints.run = setInterval(()=> {
		if (pers.run) {
			pers.el.classList.add("run");
			setTimeout(()=> {
				pers.el.classList.remove("run");
			}, 200);
		}
	},400)
}
function gameOver() {
	alert('Вы проиграли');
	location.href = '/'		;
}

function controllers() {
	document.addEventListener('keydown', (e) => {
		switch (e.keyCode) {
			case 38:
				pers.jump = true;
				break;
			case 37:
				pers.run = true;
				pers.moves = 2;
				break;
			case 39:
				pers.run = true;
				pers.moves = 3;
				break;
		}
	});
	document.addEventListener('keyup', (e) => {
		switch (e.keyCode) {
			case 38:
				pers.jump = false;
				break;
			case 37:
				pers.run = false;
				break;
			case 39:
				pers.run = false;
				break;
		}
	});
}

function init() {
	gameWrap.innerHTML += '<div class="pers" style="left: ' + pers.x + 'px; bottom: ' + pers.y + 'px" > ';
	gameWrap.innerHTML += '<div class="platform"></div> ';
	gameWrap.innerHTML += '<div class="lava" style="left: ' + lava.x + 'px; bottom: ' + lava.y + 'px"></div>';
	gameWrap.innerHTML += '<div class="timer"></div>';
	gameWrap.innerHTML += '<div class="zel" style="left: ' + zel.x + 'px; bottom: ' + zel.y + 'px"><img src="img/zel.png" width="80px"></div>';
	gameWrap.innerHTML += '<div class="plat" style="left: ' + plat.x + 'px; bottom: ' + plat.y + 'px"></div>';
	pers.el = document.querySelector('.pers');
	back.el = document.querySelector('.backg')
	timer.el = document.querySelector('.timer')
	hp = document.querySelector('.hp-line')
	zel.el = document.querySelector('.zel')
	plat.el = document.querySelector('.plat')
	lava.el = document.querySelector('.lava')
}

function game() {
	init();
	controllers();
	intervals();
}


game();

