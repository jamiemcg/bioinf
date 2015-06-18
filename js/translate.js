function trans() {
	var sequence = $("#sequence").val().toUpperCase(); //get sequence
	if(sequence.length > 3) { 
		sequence = sequence.split("T").join("U"); //Replace T's with U's
		sequence = sequence.replace(/(\r\n|\n|\r)/gm,""); //Remove new lines \n
		var reverse_complement = reverseComplement(sequence);

		var checked = $('.checkbox-inline:checked') //get checked boxes

		var html = ""
		if($("#for1").is(":checked")) {
			var prot = translator(sequence, 0);
			html += "<p><strong>Forward Frame 1:</strong></p><p>";
			html += genHTML(prot);
			html += "</p>";
			
		}
		if($("#for2").is(":checked")) {
			var prot = translator(sequence, 1);
			html += "<p><strong>Forward Frame 2:</strong></p><p>";
			html += genHTML(prot);
			html += "</p>";
				
		}
		if($("#for3").is(":checked")) {
			var prot = translator(sequence, 2);
			html += "<p><strong>Forward Frame 3:</strong></p><p>";
			html += genHTML(prot);
			html += "</p>";
			
		}
		if($("#rev1").is(":checked")) {
			var prot = translator(reverse_complement, 0);
			html += "<p><strong>Reverse Frame 1:</strong></p><p>";
			html += genHTML(prot);
			html += "</p>";
			
		}
		if($("#rev2").is(":checked")) {
			var prot = translator(reverse_complement, 1);
			html += "<p><strong>Reverse Frame 2:</strong></p><p>";
			html += genHTML(prot);
			html += "</p>";
			
		}
		if($("#rev3").is(":checked")) {
			var prot = translator(reverse_complement, 2);
			html += "<p><strong>Reverse Frame 3:</strong></p><p>";
			html += genHTML(prot);
			html += "</p>";
			
		}
		$("#result").html(html); //Set html for results
		$("#results_container").show(500); //show the results
	}
}

function translator(sequence, frame) {
	prot = "";
	for(var i = frame; i < sequence.length; i += 3)
	{
		curr = sequence.substring(i, i + 3);
		if(dict[curr] == "STOP")
		{
			prot += "*"
		}
		else {
			if(typeof dict[curr] === 'undefined'){
			   
			}
			else {
				prot += dict[curr];
			}
		}
	}
	return prot;
}

function reverseComplement(sequence) {
    reverse_complement = ""
    sequence = sequence.split("").reverse().join("");
    for (var i = 0; i < sequence.length; i++)
    {
        if (sequence.charAt(i) == "A")
        {
            reverse_complement += "U";
        }
        else if (sequence.charAt(i) == "C")
        {
            reverse_complement += "G";
        }
        else if (sequence.charAt(i) == "G")
        {
            reverse_complement += "C";
        }
        else if (sequence.charAt(i) == "T" || sequence.charAt(i) == "U")
        {
            reverse_complement += "A";
        }
        else
        {
            reverse_complement += "X";
        }
    }
    return reverse_complement;
}

function genHTML(prot) {
	html = "";
	for(var j = 0; j < prot.length; j++) {
			if(prot.charAt(j) == "M") {//Start codon
				html += "<span class='start'>M</span>"
			}
			else if(prot.charAt(j) == "*") {
				html += "<span class='stop'>*</span>";
			}
			else {
				html += prot.charAt(j);
			}
		}
		return html;
}

var dict = {};
dict["UUU"]= "F";
dict["CUU"]= "L";
dict["AUU"]= "I";
dict["GUU"]= "V";
dict["UUC"]= "F";
dict["CUC"]= "L";
dict["AUC"]= "I";
dict["GUC"]= "V";
dict["UUA"]= "L";
dict["CUA"]= "L";
dict["AUA"]= "I";
dict["GUA"]= "V";
dict["UUG"]= "L";
dict["CUG"]= "L";
dict["AUG"]= "M";
dict["GUG"]= "V";
dict["UCU"]= "S";
dict["CCU"]= "P";
dict["ACU"]= "T";
dict["GCU"]= "A";
dict["UCC"]= "S";
dict["CCC"]= "P";
dict["ACC"]= "T";
dict["GCC"]= "A";
dict["UCA"]= "S";
dict["CCA"]= "P";
dict["ACA"]= "T";
dict["GCA"]= "A";
dict["UCG"]= "S";
dict["CCG"]= "P";
dict["ACG"]= "T";
dict["GCG"]= "A";
dict["UAU"]= "Y";
dict["CAU"]= "H";
dict["AAU"]= "N";
dict["GAU"]= "D";
dict["UAC"]= "Y";
dict["CAC"]= "H";
dict["AAC"]= "N";
dict["GAC"]= "D";
dict["UAA"]= "STOP";
dict["CAA"]= "Q";
dict["AAA"]= "K";
dict["GAA"]= "E";
dict["UAG"]= "STOP";
dict["CAG"]= "Q";
dict["AAG"]= "K";
dict["GAG"]= "E";
dict["UGU"]= "C";
dict["CGU"]= "R";
dict["AGU"]= "S";
dict["GGU"]= "G";
dict["UGC"]= "C";
dict["CGC"]= "R";
dict["AGC"]= "S";
dict["GGC"]= "G";
dict["UGA"]= "STOP";
dict["CGA"]= "R";
dict["AGA"]= "R";
dict["GGA"]= "G";
dict["UGG"]= "W";
dict["CGG"]= "R";
dict["AGG"]= "R";
dict["GGG"]= "G";