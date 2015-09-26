var TeaScript = function() {
	this.js = 'var memory = [], cell = 30000, index = 0, color = ""; for(var _ = 30000; _--;){memory[_] = 0}; setInterval(function() {document.onkeydown = function(e) {memory[cell] = e.which; console.log(memory[cell])}}, 10);'
	this.code = '',
	this.step = 0,
	this.functions = {
		'+': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += 'memory[index] += memory[' +
					(_.code.substring(_.step).match(/\`(\d+)/)[1]) + '];';
			} else {
				_.js += 'memory[index] +=' +
					(_.code.substring(_.step).match(/\+(\d+)/)[1]) + ';';
			}
		},
		'-': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += 'memory[index] -= memory[' +
					(_.code.substring(_.step).match(/\`(\d+)/)[1]) + '];';
			} else {
				_.js += 'memory[index] -=' +
					(_.code.substring(_.step).match(/\-(\d+)/)[1]) + ';';
			}
		},
		'>': function(_) {
			_.js += 'index ++;'
		},
		'<': function(_) {
			_.js += 'index --;'
		},
		'[': function(_) {
			_.js += 'while(memory[index]) {'
		},
		']': function(_) {
			_.js += '};'
		},
		'(': function(_) {
			_.js += 'setInterval(function() {'
		},
		')': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += '}, memory[' +
					(_.code.substring(_.step).match(/\`(\d+)/)[1]) + ']);';
			} else {
				_.js += '},' +
					(_.code.substring(_.step).match(/\)(\d+)/)[1]) + ');';
			}
		},
		'{': function(_) {
			_.js += 'memory[index] = function() {'
		},
		'}': function(_) {
			_.js += '};'
		},
		'?': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += 'if (memory[index] == memory[memory[' +
					(_.code.substring(_.step).match(/\`(\d+)/)[1]) + ']]){';
			} else {
				_.js += 'if (memory[index] == memory[' +
					(_.code.substring(_.step).match(/\?(\d+)/)[1]) + ']){';
			}
		},
		'^': function(_) {
			_.js += '} else {'
		},
		';': function(_) {
			_.js += '}'
		},
		'@': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += ('index = memory[' +
					(_.code.substring(_.step).match(/\`(\d+)/)[1]) + '];');
			} else {
				_.js += ('index = ' +
					(_.code.substring(_.step).match(/@(\d+)/)[1]) + ';');
			}
		},
		'#': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += ('color = memory[' +
					(_.code.substring(_.step).match(/\`(\d+)/)[1]) + '];');
			} else {
				//_.js += 'color = ' + "'" + (_.code.substring(_.step).match(/#([A-Z0-9]+)/)[1]) + "'" + ';';
				_.js += 'color = memory[index];';
			}
		},
		'!': function(_) {
			_.js += "document.write('<span style = \"color:hsl(' + color + ', 150%, 25%)\">' + String.fromCharCode(memory[index]) + \'</span>');"
		},
		':': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += 'cell = memory[' + (_.code.substring(_.step).match(/\`(\d+)/)[1]) + '];';
			} else {
				_.js += 'cell = ' + (_.code.substring(_.step).match(/:(\d+)/)[1]) + ';';
			}
		},
		'r': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += 'memory[index] = Math.round(Math.random() * memory[' +
					(_.code.substring(_.step).match(/\`(\d+)/)[1]) + ']);';
			} else {
				_.js += 'memory[index] = Math.round(Math.random() * ' +
					(_.code.substring(_.step).match(/r(\d+)/)[1]) + ');';
			}
		},
		'c': function(_) {
			_.js += 'document.body.innerHTML = "";'
		},
		'b': function(_) {
			_.js += 'document.write("<br>");'
		},
		'f': function(_) {
			if (_.code[_.step + 1] == '`') {
				_.js += 'memory[memory[' + (_.code.substring(_.step).match(/\`(\d+)/)[1]) + ']]();';
			} else {
				_.js += 'memory[' + (_.code.substring(_.step).match(/f(\d+)/)[1]) + ']();';
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
