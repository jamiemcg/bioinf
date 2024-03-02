function gc_content(sequence) {
	sequence = sequence.toUpperCase()
	sequence_length = sequence.length
	gc_count = 0

	for (var i = 0; i < sequence_length; i++) {
		if (sequence[i] == "G" || sequence[i] == "C") {
			gc_count += 1;
		}
	}

	return ((gc_count / sequence_length) * 100)
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

	var full_gc = gc_content(full_sequence);

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

	// if ($("#input-sliding-window").is(":checked")) {

	// }
	// else {
	// 	// pass
	// }

	x_positions = new Array();
	gc_values = new Array();

	for (var i = 0; i < full_sequence_length - window_size + 1; i += step_size) {
		curr_sequence = full_sequence.substring(i, i + window_size);
		curr_gc = gc_content(curr_sequence);

		x_positions.push(i)
		gc_values.push(curr_gc)

	}

	var gc_content_plot = {
		x: x_positions,
		y: gc_values,
		type: "scatter"
	}

	if($("#input-show-mean").is(":checked")) {
		var layout = {
			shapes: [{
				type: "line",
				y0: full_gc,
				y1: full_gc,
				x0: 0,
				x1: x_positions[x_positions.length - 1],
				line: {
					color: 'rgb(0, 0, 0)',
					width: 4
				}
			}],
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
				text: '% GC Content',
				font: {
				family: 'Arial',
				size: 18,
				color: '#000000'
				}
			}
			}
		};
	}
	else {
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
				text: '% GC Content',
				font: {
				family: 'Arial',
				size: 18,
				color: '#000000'
				}
			}
			}
		};
	}

	$("#plotting-div").show();
	 Plotly.newPlot("plotting-div", [gc_content_plot], layout) 
});

$("#button-clear").click(function() {
    $("#sequence").val("");
	$("#plotting-div").hide(500);
});
