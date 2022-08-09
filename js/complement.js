$("#button-convert").click(function() {
    var lines = $("#sequence").val().toUpperCase().replaceAll("U", "T").split("\n")
    var opt = $('input[name=convert-option]:checked').val();

    var preprocessed_sequence = "";

    for (var i = 0; i < lines.length; i++) {
		if (lines[i].trim()[0] != ">") {
			var sequence = lines[i].trim();
            preprocessed_sequence += sequence;
        }
    }

    if (preprocessed_sequence.length > 0) {

        var processed_sequence = "";

        if (opt == "reverse") {
            processed_sequence = preprocessed_sequence.split("").reverse().join("");
            $("#result-type").html("Reverse sequence:")
        }
        else {
            if (opt == "reverse_complement") {
                preprocessed_sequence = preprocessed_sequence.split("").reverse().join("");
                $("#result-type").html("Reverse complement sequence:")
            }
            else if(opt == "complement") {
                $("#result-type").html("Complement sequence:")
            }

            for (var i = 0; i < preprocessed_sequence.length; i+= 1) {
                if (preprocessed_sequence.charAt(i) === "A") {
                    processed_sequence += "T";
                }
                else if (preprocessed_sequence.charAt(i) === "C") {
                    processed_sequence += "G";
                }
                else if (preprocessed_sequence.charAt(i) === "G") {
                    processed_sequence += "C";
                }
                else if (preprocessed_sequence.charAt(i) === "T") {
                    processed_sequence += "A";
                }
                else {
                    processed_sequence += "X";
                }
            }
        }

        $("#result-sequence").html(processed_sequence);
        $("#results-card").show(500)
    }   
});

$("#button-clear").click(function() {
    $("#sequence").val("");
    $("#results-card").hide(500)
});


// function generateComplement() {
// 	"use strict";
// 	var sequence = $("#sequence").val().toUpperCase(), result = "", opt, i;
// 	sequence = sequence.replace(/(\r\n|\n|\r)/gm, ""); //Remove new lines \n
// 	if (sequence.length !== 0) {
// 		opt = $('input[name="complement_options"]:checked').val(); //Get user specified option

// 		if (opt === "reverse") {
// 			result = sequence.split("").reverse().join("");
// 		} else if (opt === "complement") {
// 			for (i = 0; i < sequence.length; i += 1) {
// 				if (sequence.charAt(i) === "A") {
// 					result += "T";
// 				} else if (sequence.charAt(i) === "C") {
// 					result += "G";
// 				} else if (sequence.charAt(i) === "G") {
// 					result += "C";
// 				} else if (sequence.charAt(i) === "T") {
// 					result += "A";
// 				} else {
// 					result += "X";
// 				}
// 			}
// 		} else if (opt === "reverse_complement") {
// 			sequence = sequence.split("").reverse().join("");
// 			for (i = 0; i < sequence.length; i += 1) {
// 				if (sequence.charAt(i) === "A") {
// 					result += "T";
// 				} else if (sequence.charAt(i) === "C") {
// 					result += "G";
// 				} else if (sequence.charAt(i) === "G") {
// 					result += "C";
// 				} else if (sequence.charAt(i) === "T") {
// 					result += "A";
// 				} else {
// 					result += "X";
// 				}
// 			}
// 		} else {
// 			alert("An error has occurred!");
// 		}


// 		$("#result").html(result);
// 		$("#results_container").show(500); //show the element
// 	}
// }
