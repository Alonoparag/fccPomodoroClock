const canvas = document.querySelector('#timer-circle');
const context = canvas.getContext('2d');
const CLOCK = {
	timerInit: function() {
		context.beginPath();
		context.strokeStyle = "#00A676";
		context.lineWidth = 2;
		context.arc(120, 120, 118, 0, 2 * Math.PI);
		context.stroke();
	},
	drawStep: function() {
		context.beginPath();
		context.lineWidth = 4;
		context.fillStyle = CLOCK.whichSession().sessionColor;
		context.arc(120, 120, 110, Math.PI / 2 - Math.PI * CLOCK.whichSession().timeStep, Math.PI / 2 + Math.PI * CLOCK.whichSession().timeStep);
		context.stroke();
		context.fill();
		document.querySelector('#countdown').innerText = Math.floor(CLOCK.whichSession().timeZero / 60).toString() + ':' + (CLOCK.whichSession().timeZero % 60).toString();
	},
	initCount: function(total) {
		total *= 60
		if(CLOCK.sessionSwitch) {
			CLOCK.session.timeZero = total;
			let localTimeZero = total;
			CLOCK.session.timeStep = (total - localTimeZero) / total;
		}
		else if(!CLOCK.sessionSwitch) {
			CLOCK.breakProp.timeZero = total;
			let localTimeZero = total;
			CLOCK.breakProp.timeStep = (total - localTimeZero) / total;
		}
	},
	clockDisplay: function(total, zero) {
		document.querySelector('#countdown').innerText = total.toString() + ':00';
	},
	timerReset: function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		//INITIALIZING FUNCTIONS AND BUTTONS
	},
	whichSession: function() {
		return CLOCK.sessionSwitch ? CLOCK.session : CLOCK.breakProp;
	},
	timerCount: function() {
		if(CLOCK.whichSession().timeStep <= 1) {
			CLOCK.drawStep();
			CLOCK.whichSession().timeZero--;
			CLOCK.whichSession().timeStep = (60 * CLOCK.whichSession().timeTotal - CLOCK.whichSession().timeZero) / (60 * CLOCK.whichSession().timeTotal);
		}
		else if(CLOCK.whichSession().timeStep >= 1) {
			if(CLOCK.sessionSwitch) {
				// INITIALIZING BREAK COUNT
				CLOCK.sessionSwitch = false;
				document.querySelector('#label').innerText = 'Break!';
				CLOCK.timerReset();
				CLOCK.timerInit();
				CLOCK.initCount(CLOCK.breakProp.timeTotal);
			}
			else if(!CLOCK.sessionSwitch) {
				// INITIALIZING SESSION COUNT
				CLOCK.sessionSwitch = true;
				document.querySelector('#label').innerText = 'Session';
				CLOCK.timerReset();
				CLOCK.timerInit();
				CLOCK.initCount(CLOCK.session.timeTotal);
			}
			//reset the circle
			//switch the countdown to the correct time
			CLOCK.drawStep();
			CLOCK.whichSession().timeZero--;
			CLOCK.whichSession().timeStep = (60 * CLOCK.whichSession().timeTotal - CLOCK.whichSession().timeZero) / (60 * CLOCK.whichSession().timeTotal);
		}
	},
	timerSwitch: false,
	sessionSwitch: true,
	session: {
		sessionColor: '#8DCE6A',
		timeTotal: undefined,
		timeZero: undefined,
		timeStep: undefined
	},
	breakProp: {
		sessionColor: '#A52727',
		timeTotal: undefined,
		timeZero: undefined,
		timeStep: undefined
	},
	timerInterval: undefined,
};
$(document).ready(function() {
	CLOCK.timerInit()
	CLOCK.clockDisplay(document.querySelector('#session-length input').value);
	CLOCK.session.timeTotal = Number(document.querySelector('#session-length input').value)
	CLOCK.breakProp.timeTotal = Number(document.querySelector('#break-length input').value)
	$('button.increase').click(function() {
		if($(this)['0'].nextElementSibling.value >= 1 && $(this)['0'].nextElementSibling.value < 99) {
			if($(this)['0'].parentNode.parentNode.id == 'session-length') {
				$(this)['0'].nextElementSibling.value++;
				CLOCK.session.timeTotal++;
				CLOCK.clockDisplay($(this)[0].nextElementSibling.value);
			}
			else if($(this)['0'].parentNode.parentNode.id = 'break-length') {
				$(this)['0'].nextElementSibling.value++;
				CLOCK.breakProp.timeTotal++;
			}
		}
	});
	$('button.decrease').click(function() {
		if($(this)['0'].previousElementSibling.value > 1 && $(this)['0'].previousElementSibling.value <= 99) {
			console.log($(this)['0'].parentNode.parentNode.id)
			$(this)['0'].previousElementSibling.value--;
			if($(this)['0'].parentNode.parentNode.id == 'session-length') {
				CLOCK.session.timeTotal--;
				CLOCK.clockDisplay($(this)[0].previousElementSibling.value);
			}
			else if($(this)['0'].parentNode.parentNode.id = 'break-length') {
				CLOCK.breakProp.timeTotal--;
			}
		}
	});
	$('input').on('keyup', function() {
		if(this.parentNode.id = 'session-length') {
			CLOCK.session.timeTotal = Number(this.value);
			CLOCK.clockDisplay(this.value);
		}
		else if(this.parentNode.id = 'break-length') {
			CLOCK.breakProp.timeTotal = Number(this.value);
		}
	});
	$('#timer-count').on('click', function() {
		if(!CLOCK.timerSwitch) {
			CLOCK.initCount(CLOCK.session.timeTotal);
			CLOCK.timerInterval = setInterval(CLOCK.timerCount, 1000);
			CLOCK.timerSwitch = true;
			$('button, input').prop('disabled', true);
		}
		else if(CLOCK.timerSwitch) {
			clearInterval(CLOCK.timerInterval);
			CLOCK.timerSwitch = false;
			CLOCK.sessionSwitch = true;
			CLOCK.clockDisplay(CLOCK.session.timeTotal, )
			CLOCK.timerReset();
			CLOCK.timerInit();
			$('button, input').prop('disabled', false);
		}
	});
});
