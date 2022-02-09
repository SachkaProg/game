let gameWrap = document.querySelector('.game-wrap'),
	fps = 1000 / 60,
	deadline = 5,
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
		x: 4800,
		y: 80
	},
	plat = {
		x: 2400,
		y: 120,
		w: 500,
		h: 200
	},
	plat2 = {
		x: 5800,
		y: 120,
		w: 500,
		h: 200
	},
	lava ={
		x: 2300,
		y: 0,
		w: 1000,
		h: 80
	},
	ice ={
		x: 5100,
		y: 0,
		w: 2500,
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
			// zel.el.style.opacity = 0;	
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
					plat2.x += back.speed;
					lava.x += back.speed;
					ice.x += back.speed;


					pers.el.style.left = pers.x + 'px';
					back.el.style.left = back.x + 'px';
					zel.el.style.left = zel.x + 'px';
					plat.el.style.left = plat.x + 'px';
					plat2.el.style.left = plat2.x + 'px';
					lava.el.style.left = lava.x + 'px';
					ice.el.style.left = ice.x + 'px';

					break;
				case 3:
					console.log(pers.x, gameWrap.offsetWidth - 400)
					if (pers.x > (gameWrap.offsetWidth - 400)) {
						nextLevel();
						return;
					}
					pers.x += pers.step;
					back.x -= back.speed;
					zel.x -= back.speed;
					plat.x -= back.speed;
					plat2.x -= back.speed;
					lava.x -= back.speed;
					ice.x -= back.speed;

					pers.el.style.left = pers.x + 'px';
					back.el.style.left = back.x  + 'px';
					zel.el.style.left = zel.x + 'px';
					plat.el.style.left = plat.x + 'px';
					plat2.el.style.left = plat2.x + 'px';
					lava.el.style.left = lava.x + 'px';
					ice.el.style.left = ice.x + 'px';

					break;
			}
		}
		if (pers.jump) {
			pers.y += pers.jump_step;
			pers.el.style.bottom = pers.y + 'px';	
			setTimeout(() => {
				// pers.jump = false;
				var some_y = 80;
				if (pers.x > plat.x && pers.x < (plat.x + plat.w)  && Math.abs(pers.y - (plat.y + plat.h)) < 100) {
					some_y = 320;
				} 
				if (pers.x > plat2.x && pers.x < (plat2.x + plat2.w)  && Math.abs(pers.y - (plat2.y + plat2.h)) < 100) {
					some_y = 320;
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
				}, 10)	
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
	ints.ice = setInterval(()=> {
		if (pers.x > ice.x && pers.x < (ice.x + ice.w) && Math.abs(pers.y - (ice.y + ice.h)) < 20) {
			console.log('ice')
			pers.step = 2;
			back.speed = 6;
		} else {
			pers.step = 10;
			back.speed = 35;
		}
	}, fps);
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
			var some_y = 80;
			if (pers.x > plat.x && pers.x < (plat.x + plat.w) && Math.abs(pers.y - (plat.y + plat.h)) < 100) {
				some_y = 320;
			} 
			if (pers.x > plat2.x && pers.x < (plat2.x + plat2.w) && Math.abs(pers.y - (plat2.y + plat2.h)) < 100) {
				some_y = 320;
			}
			
			pers.y = some_y 
			
			pers.el.style.bottom = pers.y + 'px';	
		}
	}, fps)

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
function nextLevel() {
	// alert('След. уровень');
	location.href = '/';
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
	gameWrap.innerHTML += '<div class="ice" style="left: ' + ice.x + 'px; bottom: ' + ice.y + 'px"></div>';
	gameWrap.innerHTML += '<div class="timer"></div>';
	gameWrap.innerHTML += '<div class="zel" style="left: ' + zel.x + 'px; bottom: ' + zel.y + 'px"><img src="img/zel.png" width="80px"></div>';
	gameWrap.innerHTML += '<div class="plat" style="left: ' + plat.x + 'px; bottom: ' + plat.y + 'px"></div>';
	gameWrap.innerHTML += '<div class="plat plat2" style="left: ' + plat.x + 'px; bottom: ' + plat.y + 'px"></div>';
	pers.el = document.querySelector('.pers');
	back.el = document.querySelector('.backg')
	timer.el = document.querySelector('.timer')
	hp = document.querySelector('.hp-line')
	zel.el = document.querySelector('.zel')
	plat.el = document.querySelector('.plat')
	plat2.el = document.querySelector('.plat2')
	lava.el = document.querySelector('.lava')
	ice.el = document.querySelector('.ice')
}

function game() {
	init();
	controllers();
	intervals();
}


game();

