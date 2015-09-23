var TeaScript = function() {
	this.js = 'var memory = [], cell = 30000, index = 0, color = ""; for(var _ = 30000; _--;) ' +
		'{memory[_] = 0}; setInterval(function() {document.onkeydown = function(e) {memory[cell] = e.which}}, 10);'
	this.code = '',
		this.step = 0,

	this.functions = {
		'+': function(q) {
			if (q.code[q.step + 1] == '`') {
				q.js += 'memory[index] += memory[' +
					(q.code.substring(q.step).match(/\`(\d+)/)[1]) + '];';
			} else {
				q.js += 'memory[index] +=' +
					(q.code.substring(q.step).match(/\+(\d+)/)[1]) + ';';
			}
		},
		'-': function(q) {
			if (q.code[q.step + 1] == '`') {
				q.js += 'memory[index] -= memory[' +
					(q.code.substring(q.step).match(/\`(\d+)/)[1]) + '];';
			} else {
				q.js += 'memory[index] -=' +
					(q.code.substring(q.step).match(/\-(\d+)/)[1]) + ';';
			}
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
			if (q.code[q.step + 1] == '`') {
				q.js += '}, memory[' +
					(q.code.substring(q.step).match(/\`(\d+)/)[1]) + ']);';
			} else {
				q.js += '},' +
					(q.code.substring(q.step).match(/\)(\d+)/)[1]) + ');';
			}
		},
		'{': function(q) {
			q.js += 'memory[index] = function() {';
		},
		'}': function(q) {
			q.js += '};';
		},
		'?': function(q) {
			if (q.code[q.step + 1] == '`') {
				q.js += 'if (memory[index] == memory[memory[' +
					(q.code.substring(q.step).match(/\`(\d+)/)[1]) + ']]){';
			} else {
				q.js += 'if (memory[index] == memory[' +
					(q.code.substring(q.step).match(/\?(\d+)/)[1]) + ']){';
			}
		},
		'^': function(q) {
			q.js += '} else {';
		},
		';': function(q) {
			q.js += '}';
		},
		'@': function(q) {
			if (q.code[q.step + 1] == '`') {
				q.js += ('index = memory[' +
					(q.code.substring(q.step).match(/\`(\d+)/)[1]) + '];');
			} else {
				q.js += ('index = ' +
					(q.code.substring(q.step).match(/@(\d+)/)[1]) + ';');
			}
		},
		'#': function(q) {
			if (q.code[q.step + 1] == '`') {
				q.js += ('color = memory[' +
					(q.code.substring(q.step).match(/\`(\d+)/)[1]) + '];');
			} else {
				//q.js += 'color = ' + "'" + (q.code.substring(q.step).match(/#([A-Z0-9]+)/)[1]) + "'" + ';';
				q.js += 'color = memory[index];';
			}
		},
		'!': function(q) {
			q.js += "document.write('<span style = \"color:hsl(' + color + ', 150%, 25%)\">' + String.fromCharCode(memory[index]) + \'</span>');"
		},
		':': function(q) {
			q.js += 'cell = ' + (q.code.substring(q.step).match(/:(\d+)/)[1] | 0) + ';';
		},
		'r': function(q) {
			if (q.code[q.step + 1] == '`') {
				q.js += 'memory[index] = Math.round(Math.random() * memory[' +
					(q.code.substring(q.step).match(/\`(\d+)/)[1] | 0) + ']);';
			} else {
				q.js += 'memory[index] = Math.round(Math.random() * ' +
					(q.code.substring(q.step).match(/r(\d+)/)[1] | 0) + ');';
			}
		},
		'c': function(q) {
			q.js += 'document.body.innerHTML = "";';
		},
		'b': function(q) {
			q.js += 'document.write("<br>");';
		},
		'f': function(q) {
			if (q.code[q.step + 1] == '`') {
				q.js += 'memory[memory[' + (q.code.substring(q.step).match(/\`(\d+)/)[1]) + ']]();';
			} else {
				q.js += 'memory[' + (q.code.substring(q.step).match(/f(\d+)/)[1]) + ']();';
			}
		},
	},

	this.translate = function() {
		while (this.step < this.code.length) {
			var func = this.functions[this.code[this.step]];
			if (func != undefined) func(this);
			this.step++;
		};
		return this.js;
	},
	this.run = function() {
		eval(this.js);
	}
};
