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
: - input
c - clear console
b - break
r N - round(random*N)
() N - setInterval, N - interval
# - color
*/


var TeaScript = function() {
	this.js = 'var memory = [], cell = 30000, index = 0, color = ""; for(var _ = 30000; _--;) {memory[_] = 0}; document.onkeydown = function(e){memory[cell] = e.charCode; console.log(e.charCode)};'
	this.ts = '',
		this.step = 0,

		this._plus = function() {
			this.js += 'memory[index] +=' + (this.ts.substring(this.step).match(/\+(\d+)/)[1]) + ';';
			this.step++;
		},

		this._minus = function() {
			this.js += 'memory[index] -=' + (this.ts.substring(this.step).match(/\-(\d+)/)[1]) + ';';
			this.step++;
		},

		this._left = function() {
			this.js += 'index ++;';
			this.step++;
		},

		this._right = function() {
			this.js += 'index --;';
			this.step++;
		},

		this._cycleOpen = function() {
			this.js += 'while(memory[index]) {';
			this.step++;
		},

		this._cycleClose = function() {
			this.js += '};';
			this.step++;
		},

		this._ifOpen = function() {
			this.js += 'if (memory[index] == memory[' + (this.ts.substring(this.step).match(/\?(\d+)/)[1] | 0) + ']){';
			this.step++;
		},

		this._elseOpen = function() {
			this.js += '} else {';
			this.step++;
		},

		this._ifClose = function() {
			this.js += '}';
			this.step++;
		},

		this._gotoIndex = function() {
			this.js += ('index = ' + (this.ts.substring(this.step).match(/@(\d+)/)[1]) + ';');
			this.step++;
		},

		this._color = function() {
			//this.js += 'color = ' + "'" + (this.ts.substring(this.step).match(/#(\d+)/)[1]) + "'" + ';';
			this.js += 'color = memory[index];';
			this.step++;
		},

		this._write = function() {
			//this.js += "document.write('<span style = 'color:' + color + ''>' + String.fromCharCode(memory[index]) + '</span>');";
			this.js += "document.write('<span style = \"color:hsl(' + color + ', 150%, 25%)\">' + String.fromCharCode(memory[index]) + \'</span>');"
			this.step++;
		},

		this._read = function() {
			this.js += ''; // !!!!!!!!!!!!!!!!!
			this.step++;
		},

		this._break = function() {
			this.js += 'document.write("<br>");';
			this.step++;
		},

		this._clear = function() {
			this.js += 'document.body.innerHTML = "";';
			this.step++;
		},

		this._rand = function() {
			this.js += 'memory[index] = Math.round(Math.random() * ' + (this.ts.substring(this.step).match(/r(\d+)/)[1] | 0) + ');';
			this.step++;
		}

	this._interOpen = function() {
			this.js += 'setInterval(function() {';
			this.step++;
		},
		this._interClose = function() {
			this.js += '},' + (this.ts.substring(this.step).match(/\)(\d+)/)[1]) + ');';
			this.step++;
		},

		this.translate = function() {
			while (this.step < this.ts.length) {
				switch (this.ts[this.step]) {
					case '+':
						this._plus();
						break;
					case '-':
						this._minus();
						break;
					case '>':
						this._left();
						break;
					case '<':
						this._right();
						break;
					case '[':
						this._cycleOpen();
						break;
					case ']':
						this._cycleClose();
						break;
					case '?':
						this._ifOpen();
						break;
					case '^':
						this._elseOpen();
						break;
					case ';':
						this._ifClose();
						break;
					case '@':
						this._gotoIndex();
						break;
					case '(':
						this._interOpen();
						break;
					case ')':
						this._interClose();
						break;
					case '!':
						this._write();
						break;
					case ':':
						this._read();
						break;
					case '#':
						this._color();
						break;
					case '{':
						this._func();
						break;
					case 'b':
						this._break();
						break;
					case 'c':
						this._clear();
						break;
					case 'r':
						this._rand();
						break;
					default:
						this.step++;
				};
			};

			return this.js;
		},
		this.run = function() {
			eval(this.js);
		}
};
var teascript = new TeaScript();

teascript.ts = '> +15 > +300 << (+1 @100 r1000 # ! @0 ?1 b> +15 <; ?2 c >> +300 <<;)1';

console.log(teascript.translate());
teascript.run();
