
$("#button-calculate").click(function() {
    var other_percent,
        gc_percent,
        a_percent,
        c_percent,
        g_percent,
        t_percent,
        a_count = 0,
        c_count = 0,
        g_count = 0,
        t_count = 0,
        other_count = 0,
        seq_length = 0;
        
    var lines = $("#sequence").val().toUpperCase().split("\n");

    for (var i = 0; i < lines.length; i++) {
		if (lines[i].trim()[0] != ">") {
			var sequence = lines[i].trim();
			
			seq_length += sequence.length;

			for (var j = 0; j < sequence.length; j++) {
                if(sequence[j] == "A") {
                    a_count += 1;
                }
                else if(sequence[j] == "C") {
                    c_count += 1;
                }
                else if(sequence[j] == "G") {
                    g_count += 1;
                }
                else if(sequence[j] == "T" || sequence[j] == "U") {
                    t_count += 1;
                }
                else {
                    other_count += 1;
                }
            }
        }
    }

    //Show results
	$("#a-count").html(a_count);
	$("#c-count").html(c_count);
	$("#g-count").html(g_count);
	$("#t-count").html(t_count);
	$("#other-count").html(other_count);
    
    if (a_count == 0) {
		a_percent = "0";
	}
	else {
		a_percent = (a_count / seq_length * 100).toFixed(2);
	}

	if (c_count == 0) {
		c_percent = "0";
	}
	else {
		c_percent = (c_count / seq_length * 100).toFixed(2);
	}
	
	if (g_count == 0) {
		g_percent = "0";
	}
	else {
		g_percent = (g_count / seq_length * 100).toFixed(2);
	}
	
	if (t_count == 0) {
		t_percent = "0";
	}
	else {
		t_percent = (t_count / seq_length * 100).toFixed(2);
	}

	if (other_count == 0) {
		other_percent = "0";
	}
	else {
		other_percent = (other_count / seq_length * 100).toFixed(2);
	}

	if (g_count == 0 && c_count == 0) {
		gc_percent = "0";
	}
	else {
		gc_percent = ((g_count + c_count) / seq_length * 100).toFixed(2);
	}

    $("#gc-content").html(gc_percent);

	$("#a-percent").html(a_percent);
	$("#c-percent").html(c_percent);
	$("#g-percent").html(g_percent);
	$("#t-percent").html(t_percent);
	$("#other-percent").html(other_percent);

    $("#results-card").show(500)
});

$("#button-clear").click(function() {
    $("#sequence").val("");

    $("#results-card").hide(500)
});
