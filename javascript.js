// === === === === === DEFINING PROPERTIES
const CLOCK = {};
Object.defineProperties(CLOCK, {
	canvas: {
		value: document.getElementById("timer")
	}
});
Object.defineProperties(CLOCK, {
	session: {
		value: {
			input: document.querySelector('#session-length'),
			increase: document.querySelector('#session-increase'),
			decrease: document.querySelector('#session-decrease')
		},
		writable: true
	},
	break: {
		value: {
			input: document.querySelector('#break-length'),
			increase: document.querySelector('#break-increase'),
			decrease: document.querySelector('#break-decrease')
		},
		writable: true
	},
	context: {
		value: CLOCK.canvas.getContext('2d')
	}
});
//INITIATING INCREASE AND DECREASE FUNCTIONS TO BE CALLED TO EVENTS
function increase(section) {
	if(CLOCK[section].input.value > 1 && CLOCK[section].input.value < 99) {
		CLOCK[section].input.value = (Number(CLOCK[section].input.value) + 1).toString();
	}
}

function decrease(section) {
	if(CLOCK[section].input.value > 1 && CLOCK[section].input.value < 99) {
		CLOCK[section].input.value = (Number(CLOCK[section].input.value) - 1).toString();
	}
}
// ============== CREATE INITIAL CIRCLE============
$(document).ready(function() {
	CLOCK.context.strokeStyle = "#527A71";
	CLOCK.context.lineWidth = 5;
	CLOCK.context.beginPath();
	CLOCK.context.arc(120, 120, 118, 0, 2 * Math.PI);
	CLOCK.context.stroke();
	CLOCK.session.increase.addEventListener('click', function() {
		if($(this).parent()[0] > 1 && CLOCK['session'].input.value < 99) {
			CLOCK['session'].input.value = (Number(CLOCK['session'].input.value) - 1).toString();
		}
	});
});
