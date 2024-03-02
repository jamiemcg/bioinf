function gc_skew(sequence) {
	sequence = sequence.toUpperCase()
	sequence_length = sequence.length
	g_count = 0
	c_count = 0

	for (var i = 0; i < sequence_length; i++) {
		if (sequence[i] == "G") {
			g_count += 1;
		}
		else if(sequence[i] == "C") {
			c_count += 1;
		}
	}

	skew = (g_count - c_count) / (g_count + c_count);

	return skew;
}


$("#button-plot").click(function() {
	var lines = $("#sequence").val().toUpperCase().split("\n");
	var full_sequence = "";
	var full_sequence_length = 0;

    for (var i = 0; i < lines.length; i++) {
		if (lines[i].trim()[0] != ">") {
			var sequence = lines[i].trim();
			full_sequence += sequence;
			full_sequence_length += sequence.length;
        }
    }

	if (full_sequence_length == 0) {
		alert("Enter a nucleotide sequence");
		return;
	}

	window_size = Number($("#input-window-size").val());

	if (window_size > full_sequence_length || window_size < 1) {
		alert("Window size is larger than the sequence length. Choose an appropriate window size");
		return;
	}

	step_size = Number($("#input-step-size").val());
	
	if (step_size < 1 || step_size > full_sequence_length) {
		alert("Choose an appropriate step size!");
		return;
	}

	x_positions = new Array();
	skew_values = new Array();

	for (var i = 0; i < full_sequence_length - window_size + 1; i += step_size) {
		curr_sequence = full_sequence.substring(i, i + window_size);
		curr_gc = gc_skew(curr_sequence);

		x_positions.push(i)
		skew_values.push(curr_gc)

	}

	var gc_skew_plot = {
		x: x_positions,
		y: skew_values,
		type: "scatter"
	}


	var layout = {
		xaxis: {
			title: {
				text: 'Position (bp)',
				font: {
				family: 'Arial',
				size: 18,
				color: '#000000'
				}
			},
		},
		yaxis: {
			title: {
				text: 'GC Skew',
				font: {
				family: 'Arial',
				size: 18,
				color: '#000000'
				}
			}
		}
	};


	$("#plotting-div").show();
	 Plotly.newPlot("plotting-div", [gc_skew_plot], layout) 
});

$("#button-clear").click(function() {
    $("#sequence").val("");
	$("#plotting-div").hide(500);
});
