function clearInput() {
	"use strict";
	$("#results_container").hide(500); //show the element
	$("#sequence").val("");
	$("#sequence").focus();
	$("#result").html("");
}


function clearInputGC() {
	"use strict";
	$("#results").hide(500);

	$("#sequence").val("");
	$("#sequence").focus();
	$("#a_count").html("0");
	$("#c_count").html("0");
	$("#g_count").html("0");
	$("#t_count").html("0");
	$("#error_count").html("0");

	$("#a_per").html("00.00");
	$("#c_per").html("00.00");
	$("#g_per").html("00.00");
	$("#t_per").html("00.00");
	$("#error_per").html("00.00");
	$("#gc_content").html("00.00");
}

function gc() {
	"use strict";
	var error_per,
		gc_per,
		a_per,
		c_per,
		g_per,
		t_per,
		a = 0,
		c = 0,
		g = 0,
		t = 0,
		n = 0,
		i = 0,
		seq_length = 0;

	var lines = $("#sequence").val().toUpperCase().split("\n");
	
	for (var i = 0; i < lines.length; i++) {
		if (lines[i][0] != ">") {
			var sequence = lines[i].trim();
			
			seq_length += sequence.length;

			for (var j = 0; j < sequence.length; j++) {
				if (sequence[j] === "A") {
					a += 1;
				}
				else if (sequence[j] === "C") {
					c += 1;
				}
				else if (sequence[j] === "G") {
					g += 1;
				}
				else if (sequence[j] === "T" || sequence[j] === "U") {
					t += 1;
				}
				else {
					n += 1;
				}
			}
		}
		else {
			// Fasta header
		}

	}


	//Show results
	$("#a_count").html(a);
	$("#c_count").html(c);
	$("#g_count").html(g);
	$("#t_count").html(t);
	$("#error_count").html(n);

	if (a == 0) {
		a_per = "0";
	}
	else {
		a_per = (a / seq_length * 100).toFixed(2);
	}

	if (c == 0) {
		c_per = "0";
	}
	else {
		c_per = (c / seq_length * 100).toFixed(2);
	}
	
	if (g == 0) {
		g_per = "0";
	}
	else {
		g_per = (g / seq_length * 100).toFixed(2);
	}
	
	if (t == 0) {
		t_per = "0";
	}
	else {
		t_per = (t / seq_length * 100).toFixed(2);
	}

	if (n == 0) {
		error_per = "0";
	}
	else {
		error_per = (n / seq_length * 100).toFixed(2);
	}

	if (g == 0 && c == 0) {
		gc_per = "0";
	}
	else {
		gc_per = ((g + c) / seq_length * 100).toFixed(2);
	}

	$("#gc_content").html(gc_per);

	$("#a_per").html(a_per);
	$("#c_per").html(c_per);
	$("#g_per").html(g_per);
	$("#t_per").html(t_per);
	$("#error_per").html(error_per);

	$("#results").show(500);
}


function generateComplement() {
	"use strict";
	var sequence = $("#sequence").val().toUpperCase(), result = "", opt, i;
	sequence = sequence.replace(/(\r\n|\n|\r)/gm, ""); //Remove new lines \n
	if (sequence.length !== 0) {
		opt = $('input[name="complement_options"]:checked').val(); //Get user specified option

		if (opt === "reverse") {
			result = sequence.split("").reverse().join("");
		} else if (opt === "complement") {
			for (i = 0; i < sequence.length; i += 1) {
				if (sequence.charAt(i) === "A") {
					result += "T";
				} else if (sequence.charAt(i) === "C") {
					result += "G";
				} else if (sequence.charAt(i) === "G") {
					result += "C";
				} else if (sequence.charAt(i) === "T") {
					result += "A";
				} else {
					result += "X";
				}
			}
		} else if (opt === "reverse_complement") {
			sequence = sequence.split("").reverse().join("");
			for (i = 0; i < sequence.length; i += 1) {
				if (sequence.charAt(i) === "A") {
					result += "T";
				} else if (sequence.charAt(i) === "C") {
					result += "G";
				} else if (sequence.charAt(i) === "G") {
					result += "C";
				} else if (sequence.charAt(i) === "T") {
					result += "A";
				} else {
					result += "X";
				}
			}
		} else {
			alert("An error has occurred!");
		}


		$("#result").html(result);
		$("#results_container").show(500); //show the element
	}
}

function primerMP() {
	"use strict";
	var sequence = $("#sequence").val().toUpperCase(), i,
		cg = 0,
		at = 0,
		err = 0,
		sequenceLength,
		meltingPoint;
	sequence = sequence.replace(/(\r\n|\n|\r)/gm, ""); //Remove new lines \n
	if (sequence.length !== 0) {
		

		for (i = 0; i < sequence.length; i += 1) {
			if (sequence.charAt(i) === "A" || sequence.charAt(i) === "T" || sequence.charAt(i) === "U") {
				at += 1;
			} else if (sequence.charAt(i) === "C" || sequence.charAt(i) === "G") {
				cg += 1;
			} else {
				err += 1;
			}
		}

		sequenceLength = sequence.length - err;
		meltingPoint = 0.00;

		//If less than 14 nucs, use simple formula
		if (sequenceLength < 14) {
			meltingPoint = (2 * (at)) + (4 * (cg));
		} else {
			meltingPoint = 64.9 + 41 * (at - 16.4) / (at + cg);
		}
		meltingPoint = meltingPoint.toFixed(2);
		$("#result").html(meltingPoint);
		$("#results_container").show(500); //show the element
	}
}
