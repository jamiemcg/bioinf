var iupac = [];

iupac["G"] = "G";
iupac["A"] = "A";
iupac["T"] = "T";
iupac["C"] = "C";
iupac["R"] = "[AG]";
iupac["Y"] = "[CT]";
iupac["M"] = "[AC]";
iupac["K"] = "[GT]";
iupac["S"] = "[CG]";
iupac["W"] = "[AT]";
iupac["H"] = "[ACT]";
iupac["B"] = "[CGT]";
iupac["V"] = "[ACG]";
iupac["D"] = "[AGT]";
iupac["N"] = "[ACGT]";

$("#button-convert").click(function() {
     
    var lines = $("#sequence").val().toUpperCase().split("\n");
    var sequence = "";

    for (var i = 0; i < lines.length; i++) {
		if (lines[i].trim()[0] != ">") {
			sequence += lines[i].trim();
        }
    }

    sequence = sequence.replaceAll("U", "T");   

    if (sequence.length < 1) {
        alert("Enter a sequence");
    }
    else {
        var converted_sequence = "";
        
        for (i = 0; i < sequence.length; i++) {
            if (typeof iupac[sequence[i]] !== "undefined") {
                converted_sequence += iupac[sequence[i]];
            }
            else {
                converted_sequence += "X";
            }
        }

        $("#original-sequence").html("Original sequence: &nbsp;" + sequence);
        $("#result-sequence").html("Converted sequence: " + converted_sequence);
        $("#results-card").show(500);
    }

});

$("#button-clear").click(function() {
    $("#sequence").val("");
    $("#results-card").hide(500);
});
