var genetic_code = [];

$("#button-translate").click(function() {
    // Read the genetic code everytime the user clicks translate
    genetic_code["AAA"] = $("#genetic-code-AAA").val();
    genetic_code["AAC"] = $("#genetic-code-AAC").val();
    genetic_code["AAG"] = $("#genetic-code-AAG").val();
    genetic_code["AAT"] = $("#genetic-code-AAT").val();
    genetic_code["ACA"] = $("#genetic-code-ACA").val();
    genetic_code["ACC"] = $("#genetic-code-ACC").val();
    genetic_code["ACG"] = $("#genetic-code-ACG").val();
    genetic_code["ACT"] = $("#genetic-code-ACT").val();
    genetic_code["AGA"] = $("#genetic-code-AGA").val();
    genetic_code["AGC"] = $("#genetic-code-AGC").val();
    genetic_code["AGG"] = $("#genetic-code-AGG").val();
    genetic_code["AGT"] = $("#genetic-code-AGT").val();
    genetic_code["ATA"] = $("#genetic-code-ATA").val();
    genetic_code["ATC"] = $("#genetic-code-ATC").val();
    genetic_code["ATG"] = $("#genetic-code-ATG").val();
    genetic_code["ATT"] = $("#genetic-code-ATT").val();
    genetic_code["CAA"] = $("#genetic-code-CAA").val();
    genetic_code["CAC"] = $("#genetic-code-CAC").val();
    genetic_code["CAG"] = $("#genetic-code-CAG").val();
    genetic_code["CAT"] = $("#genetic-code-CAT").val();
    genetic_code["CCA"] = $("#genetic-code-CCA").val();
    genetic_code["CCC"] = $("#genetic-code-CCC").val();
    genetic_code["CCG"] = $("#genetic-code-CCG").val();
    genetic_code["CCT"] = $("#genetic-code-CCT").val();
    genetic_code["CGA"] = $("#genetic-code-CGA").val();
    genetic_code["CGC"] = $("#genetic-code-CGC").val();
    genetic_code["CGG"] = $("#genetic-code-CGG").val();
    genetic_code["CGT"] = $("#genetic-code-CGT").val();
    genetic_code["CTA"] = $("#genetic-code-CTA").val();
    genetic_code["CTC"] = $("#genetic-code-CTC").val();
    genetic_code["CTG"] = $("#genetic-code-CTG").val();
    genetic_code["CTT"] = $("#genetic-code-CTT").val();
    genetic_code["GAA"] = $("#genetic-code-GAA").val();
    genetic_code["GAC"] = $("#genetic-code-GAC").val();
    genetic_code["GAG"] = $("#genetic-code-GAG").val();
    genetic_code["GAT"] = $("#genetic-code-GAT").val();
    genetic_code["GCA"] = $("#genetic-code-GCA").val();
    genetic_code["GCC"] = $("#genetic-code-GCC").val();
    genetic_code["GCG"] = $("#genetic-code-GCG").val();
    genetic_code["GCT"] = $("#genetic-code-GCT").val();
    genetic_code["GGA"] = $("#genetic-code-GGA").val();
    genetic_code["GGC"] = $("#genetic-code-GGC").val();
    genetic_code["GGG"] = $("#genetic-code-GGG").val();
    genetic_code["GGT"] = $("#genetic-code-GGT").val();
    genetic_code["GTA"] = $("#genetic-code-GTA").val();
    genetic_code["GTC"] = $("#genetic-code-GTC").val();
    genetic_code["GTG"] = $("#genetic-code-GTG").val();
    genetic_code["GTT"] = $("#genetic-code-GTT").val();
    genetic_code["TAA"] = $("#genetic-code-TAA").val();
    genetic_code["TAC"] = $("#genetic-code-TAC").val();
    genetic_code["TAG"] = $("#genetic-code-TAG").val();
    genetic_code["TAT"] = $("#genetic-code-TAT").val();
    genetic_code["TCA"] = $("#genetic-code-TCA").val();
    genetic_code["TCC"] = $("#genetic-code-TCC").val();
    genetic_code["TCG"] = $("#genetic-code-TCG").val();
    genetic_code["TCT"] = $("#genetic-code-TCT").val();
    genetic_code["TGA"] = $("#genetic-code-TGA").val();
    genetic_code["TGC"] = $("#genetic-code-TGC").val();
    genetic_code["TGG"] = $("#genetic-code-TGG").val();
    genetic_code["TGT"] = $("#genetic-code-TGT").val();
    genetic_code["TTA"] = $("#genetic-code-TTA").val();
    genetic_code["TTC"] = $("#genetic-code-TTC").val();
    genetic_code["TTG"] = $("#genetic-code-TTG").val();
    genetic_code["TTT"] = $("#genetic-code-TTT").val();

    console.log(genetic_code);
    main();
});

$("#button-genetic-code").click(function() {

});

function reverseComplement(sequence) {
    var reverse_complement = "", i = 0;
    sequence = sequence.split("").reverse().join("");
    for (i = 0; i < sequence.length; i += 1) {
        if (sequence.charAt(i) === "A") {
            reverse_complement += "T";
        } else if (sequence.charAt(i) === "C") {
            reverse_complement += "G";
        } else if (sequence.charAt(i) === "G") {
            reverse_complement += "C";
        } else if (sequence.charAt(i) === "T" || sequence.charAt(i) === "U") {
            reverse_complement += "A";
        } else {
            reverse_complement += "X";
        }
    }
    return reverse_complement;
}

function genHTML(prot) {
	var html = "", j;
	for (j = 0; j < prot.length; j += 1) {
        if (prot.charAt(j) === "M") {//Start codon
            html += "<span class='start'>M</span>";
        } else if (prot.charAt(j) === "*") {
            html += "<span class='stop'>*</span>";
        } else {
            html += prot.charAt(j);
        }
    }
    return html;
}

function translate(sequence, frame) {
    var prot = "";

    for(var i = frame; i < sequence.length; i += 3) {
        codon = sequence.substring(i, i + 3);
        if(codon.length == 3)
        {
            if (typeof genetic_code[codon] !== 'undefined') {
                prot += genetic_code[codon];
            }
            else {
                prot += "X";
            }
        }
    }
        
    return prot;
}

function main() {
    var lines = $("#sequence").val().toUpperCase().replaceAll("U", "T").split("\n")
    var sequence = "";
    var html;

    for (var i = 0; i < lines.length; i++) {
		if (lines[i].trim()[0] != ">") {
			var line = lines[i].trim();
            sequence += line;
        }
    }
    

    if(sequence.length >= 3) {
        var reverse_complement = reverseComplement(sequence);
        html = "";

        if ($("#check-forward-frame-1").is(":checked")) {
            prot = translate(sequence, 0);
            html += "<p><strong>Forward Frame 1:</strong></p><p style='font-family: monospace;'>";
            html += genHTML(prot);
            html += "</p>"
        }

        if ($("#check-forward-frame-2").is(":checked")) {
            prot = translate(sequence, 1);
            html += "<p><strong>Forward Frame 2:</strong></p><p style='font-family: monospace;'>";
            html += genHTML(prot);
            html += "</p>"
        }

        if ($("#check-forward-frame-3").is(":checked")) {
            prot = translate(sequence, 2);
            html += "<p><strong>Forward Frame 3:</strong></p><p style='font-family: monospace;'>";
            html += genHTML(prot);
            html += "</p>"
        }

        if ($("#check-reverse-frame-1").is(":checked")) {
            prot = translate(reverse_complement, 0);
            html += "<p><strong>Reverse Frame 1:</strong></p><p style='font-family: monospace;'>";
            html += genHTML(prot);
            html += "</p>"
        }

        if ($("#check-reverse-frame-2").is(":checked")) {
            prot = translate(reverse_complement, 1);
            html += "<p><strong>Reverse Frame 2:</strong></p><p style='font-family: monospace;'>";
            html += genHTML(prot);
            html += "</p>"
        }

        if ($("#check-reverse-frame-3").is(":checked")) {
            prot = translate(reverse_complement, 2);
            html += "<p><strong>Reverse Frame 3:</strong></p><p style='font-family: monospace;'>";
            html += genHTML(prot);
            html += "</p>"
        }

        $("#result-sequence").html(html);
        $("#results-card").show(500)
    }
    else {
        alert("Enter a sequence at least 3bp in length")
    }
}

$("#button-clear").click(function() {
    $("#sequence").val("");
    $("#results-card").hide(500)
});


// function translator(sequence, frame) {
//     "use strict";
// 	var prot = "", i = 0, curr;
// 	for (i = frame; i < sequence.length; i += 3) {
// 		curr = sequence.substring(i, i + 3);
// 		if (dict[curr] === "STOP") {
// 			prot += "*";
// 		} else {
// 			if (typeof dict[curr] !== 'undefined') {
// 				prot += dict[curr];
// 			}
// 		}
// 	}
// 	return prot;
// }
