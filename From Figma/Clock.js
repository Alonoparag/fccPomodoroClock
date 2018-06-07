const canvas = document.querySelector('#timer-circle');
const context = canvas.getContext('2d');
const CLOCK = {
	timerInit: function() {
		context.beginPath();
		context.strokeStyle = "#527A71";
		context.lineWidth = 2;
		context.arc(120, 120, 118, 0, 2 * Math.PI);
		context.stroke();
	},
	drawStep: function() {
		context.beginPath();
		context.lineWidth = 4;
		context.fillStyle = "#505000";
		context.arc(120, 120, 115, Math.PI / 2 - Math.PI * step, Math.PI / 2 + Math.PI * step);
		context.stroke();
		context.fill();
		document.querySelector('#countdown').innerText = '00:0' + (CLOCK.timerTotal - CLOCK.timerZero).toString();
	},
	initCount: function() {
		CLOCK.timeTotal = 5;
		CLOCK.timeZero = 0;
		CLOCK.timeStep = this.timeZero / this.timetotal;
	},
	timerReset: function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		//INITIALIZING FUNCTIONS AND BUTTONS
		initCount();
	},
	timerCount: function() {
		if(CLOCK.timeStep <= 1) {
			//switch the label between break and session
			drawStep();
			CLOCK.timeZero++;
			CLOCK.timeStep = CLOCK.timeZero / CLOCK.timeTotal;
			// 	setTimeout(function() {
			// 	}, 1000);
			//
		}
		else if(CLOCK.timeStep >= 1) {
			if(CLOCK.sessionSwitch) {
				CLOCK.sessionSwitch = false;
				document.querySelector('#label').innerText = 'Break!';
				timerInit();
				timerReset();
			}
			else if(!CLOCK.sessionSwitch) {
				CLOCK.sessionSwitch = true;
				document.querySelector('#label').innerText = 'Session';
				timerInit();
				timerReset();
			}
			//reset the circle
			//switch the countdown to the correct time
			drawStep();
			CLOCK.timeZero++;
			CLOCK.timeStep = CLOCK.timeZero / CLOCK.timeTotal;
		}
	},
	timerSwitch: false,
	sessionSwitch: true,
	timeTotal: undefined,
	timeZero: 0,
	timeStep: undefined,
	timerInterval: undefined,
}
$(document).ready(function() {
	CLOCK.initCount();
	$('button.increase').click(function() {
		if($(this)['0'].nextElementSibling.value >= 1 && $(this)['0'].nextElementSibling.value < 99) {
			$(this)['0'].nextElementSibling.value++;
		}
	});
	$('button.decrease').click(function() {
		if($(this)['0'].previousElementSibling.value > 1 && $(this)['0'].previousElementSibling.value <= 99) {
			$(this)['0'].previousElementSibling.value--;
		}
	});
	$('#timer-count').on('click', function() {
		if(!CLOCK.timerSwitch) {
			CLOCK.timerInterval = setInterval(CLOCK.timerCount, 1000);
			CLOCK.timerSwitch = true;
		}
		else if(CLOCK.timerSwitch) {
			clearInterval(CLOCK.timerInterval);
			CLOCK.timerSwitch = false;
		}
	});
});
