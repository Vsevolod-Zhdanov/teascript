/*

+ N - plus !
- N- minus !
> - right !
< - left !
{ } - function	
[ ] - while
@ N- go to index !
? N ( ) - if...
! - output !
: N - input
c - clear console
b - break
r N - round(random*N)
() N - setInterval, N - interval
f N - cause function
# - color
		N - number
*/


var TeaScript = function() {
	this.js = 'var memory = [], cell = 30000, index = 0, color = ""; for(var _ = 30000; _--;) {memory[_] = 0}; setInterval(function() {document.onkeydown = function(e) {memory[cell] = e.which}}, 10);'
	this.ts = '+72!+29!+7!!+3!-79!+55!+24!+3!-6!-8!',
	this.step = 0,
	this.functions = {
		'+': function(q) {
			q.js += 'memory[index] +=' + (q.ts.substring(q.step).match(/\+(\d+)/)[1]) + ';';
		},
		'-': function(q) {
			q.js += 'memory[index] -=' + (q.ts.substring(q.step).match(/\-(\d+)/)[1]) + ';';
		},
		'>': function(q) {
			q.js += 'index ++;';
		},
		'<': function(q) {
			q.js += 'index --;';
		},
		'[': function(q) {
			q.js += 'while(memory[index]) {';
		},
		']': function(q) {
			q.js += '};';
		},
		'(': function(q) {
			q.js += 'setInterval(function() {';
		},
		')': function(q) {
			q.js += '},' + (q.ts.substring(q.step).match(/\)(\d+)/)[1]) + ');';
		},
		'{': function(q) {
			q.js += 'memory[index] = function() {';
		},
		'}': function(q) {
			q.js += '};';
		},
		'?': function(q) {
			q.js += 'if (memory[index] == memory[' + (q.ts.substring(q.step).match(/\?(\d+)/)[1] | 0) + ']){';
		},
		'^': function(q) {
			q.js += '} else {';
		},
		';': function(q) {
			q.js += '}';
		},
		'@': function(q) {
			q.js += ('index = ' + (q.ts.substring(q.step).match(/@(\d+)/)[1]) + ';');
		},
		'#': function(q) {
			q.js += 'color = ' + "'" + (q.ts.substring(q.step).match(/#([A-Z0-9]+)/)[1]) + "'" + ';';
		},
		'!': function(q) {
			q.js += "document.write('<span style = \"color: ' + color + '\">' + String.fromCharCode(memory[index]) + \'</span>');"
		},
		':': function(q) {
			q.js += 'cell = ' + (q.ts.substring(q.step).match(/:(\d+)/)[1] | 0) + ';';
		},
		'r': function(q) {
			q.js += 'memory[index] = Math.round(Math.random() * ' + (q.ts.substring(q.step).match(/r(\d+)/)[1] | 0) + ');';
		},
		'c': function(q) {
			q.js += 'document.body.innerHTML = "";';
		},
		'b': function(q) {
			q.js += 'document.write("<br>");';
		},
		'f': function(q) {
			q.js += 'memory[' + (q.ts.substring(q.step).match(/f(\d+)/)[1]) + ']();';
		},
	},

	this.translate = function() {
		while (this.step < this.ts.length) {
			var func = this.functions[this.ts[this.step]];
			if (func != undefined) func(this);
			this.step++;
		};
		return this.js;
	},
	this.run = function() {
		eval(this.js);
	}
};
var teascript = new TeaScript();
console.log(teascript.translate());
teascript.run();
