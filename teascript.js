/*

+ - plus !
- - minus !
> - right !
< - left !
{ } - function	
[ ] - while
@ - go to index !
?number( ) - if...
! - output !
: - input
*/


var OpenBrainfuck = function() {
	this.code = '',
	this.step = 0,
	this.flag = true,
	this.memory = new Array(30000),
	this.index = 0,
	this.symbol = '',

	this.$plus = function() {
		this.memory[this.index] ++;
		console.log('$plus ' + this.step);
	},

	this.$minus = function() {
		this.memory[this.index] --;
		console.log('$minus ' + this.step);
	},

	this.$left = function() {
		this.index ++;
		console.log('$left ' + this.step);
	},

	this.$right = function() {
		this.index --;
		console.log('$right ' + this.step);
	},

	this.$println = function() {
		document.write(this.symbol);
		console.log('$printl ' + this.step);
	},

	this.$gotoin = function() {
		this.index = this.code.substring(this.step).match(/@(\d+)/)[1]|0;
		console.log('$gotoin ' + this.step);
	},
	this.$if = function() {
		if (this.memory[this.index] == this.memory[this.code.substring(this.step).match(/\?(\d+)/)[1]|0]) {
			this.step = this.code.indexOf('(', this.step);
		} else {
			this.step = this.code.indexOf(')', this.step);
		}
	},

	this.$exe = function(char) {
		switch (char) {
			case '+': this.$plus();
				break;
			case '-': this.$minus();
				break;
			case '>': this.$left();
				break;
			case '<': this.$right();
				break;
			case '!': this.$println();
				break;
			case '@': this.$gotoin();
				break;
			case '?': this.$if();
				break;
		}
	},

	this.init = function() {
		for (var i = 0; i < this.memory.length; i ++) {
			this.memory[i] = 0;
		}
		this.index = 0;
		this.symbol = '';
		this.flag = true;
		this.step = 0;

		console.log('#initialization completed');
	},

	this.run = function() {
		this.init();
		while (this.step < this.code.length) {
			this.symbol = String.fromCharCode(this.memory[this.index]);
			this.$exe(this.code[this.step]);
			this.step ++;
		}
	}
}


var bfcode = new OpenBrainfuck();
bfcode.code = '+++++++++++++++++++++++++++++++++++>>+++++++++++++++++++++++++++++++++++?0(@0!)';
bfcode.run();
