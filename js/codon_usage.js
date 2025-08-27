const codonDict = {
    'TTT': 'F', 'TTC': 'F', 'TTA': 'L', 'TTG': 'L',
    'CTT': 'L', 'CTC': 'L', 'CTA': 'L', 'CTG': 'L',
    'ATT': 'I', 'ATC': 'I', 'ATA': 'I', 'ATG': 'M',
    'GTT': 'V', 'GTC': 'V', 'GTA': 'V', 'GTG': 'V',
    'TCT': 'S', 'TCC': 'S', 'TCA': 'S', 'TCG': 'S',
    'CCT': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
    'ACT': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
    'GCT': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
    'TAT': 'Y', 'TAC': 'Y', 'TAA': '*', 'TAG': '*',
    'CAT': 'H', 'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q',
    'AAT': 'N', 'AAC': 'N', 'AAA': 'K', 'AAG': 'K',
    'GAT': 'D', 'GAC': 'D', 'GAA': 'E', 'GAG': 'E',
    'TGT': 'C', 'TGC': 'C', 'TGA': '*', 'TGG': 'W',
    'CGT': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R',
    'AGT': 'S', 'AGC': 'S', 'AGA': 'R', 'AGG': 'R',
    'GGT': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G',
};

function parseFasta(fastaText) {
  return fastaText
    .trim()
    .split(/^>|\n>/m)      // split on ">"
    .filter(Boolean)       // remove empties
    .map(entry => {
      const lines = entry.split(/\r?\n/);
      return lines.slice(1).join("").replace(/\s+/g, "");
    });
}

// Calculate codon usage from a DNA sequence
function calculateCodonUsage(sequences) {
    var codonCount = {};
    var aminoAcidCount = {};
    var totalCodons = 0;

    for (const codon in codonDict) {
        codonCount[codon] = 0;
        aminoAcidCount[codonDict[codon]] = 0;
    }

    for(const sequence of sequences) {
        for(let i = 0; i < sequence.length; i += 3) {
            const codon = sequence.slice(i, i + 3);
            if (codon in codonDict) {
                codonCount[codon] += 1;
                aminoAcidCount[codonDict[codon]] += 1;
                totalCodons += 1
            }
        }
    } 

    var results_table = document.getElementById("results-table")
    results_table.innerHTML = "";

    var thead = results_table.createTHead();
    thead.classList.add("table-dark");
    var row = thead.insertRow(0);

    for (const val of ["Codon", "Amino Acid", "Count", "Total Usage", "Relative Usage"]) {
        cell = row.insertCell();
        cell.innerHTML = val;
    }

    var tbody = results_table.createTBody();

    for (const codon in codonCount) {
        amino_acid = codonDict[codon];
        result_count = codonCount[codon];
        result_total_percent = ((result_count / totalCodons) * 100);
        result_relative_percent = ((result_count / aminoAcidCount[amino_acid]) * 100);

        if (isNaN(result_total_percent)) {
            result_total_percent = 0;
        }
        
        if (isNaN(result_relative_percent)) {
            result_relative_percent = 0;
        }

        var row = tbody.insertRow();

        for (const val of [codon, amino_acid, result_count, result_total_percent.toFixed(3), result_relative_percent.toFixed(3)]) {
            var cell = row.insertCell();
            cell.innerHTML = val;
        }   
    }

    $("#results-card").show(500)

    return codonCount;
}

$("#button-calculate").click(function() {
    var text = $("#sequence").val().toUpperCase().replaceAll("U", "T");
    var sequences = parseFasta(text)
    var n_seqs = sequences.length;
    var total_length = sequences.reduce((sum, str) => sum + str.length, 0);

    $("#alert-invalid-fasta").remove();
    $("#alert-multiple-seqs").remove();
    $("#alert-invalid-characters").remove();
    $("#alert-length-multiple").remove();

    if ((n_seqs == 0 || total_length == 0) && !$("#alert-invalid-fasta").length) {
        $("#alert-placeholder").append('<div id="alert-invalid-fasta" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Warning:</strong> Enter sequences in valid fasta format. Check your input.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    }

    if (n_seqs > 1 && !$("#alert-multiple-seqs").length) {
        $("#alert-placeholder").append('<div id="alert-multiple-seqs" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Note:</strong> You have entered multiple sequences. You should ensure all of your sequences are in the correct reading frame, etc...<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    }

    if(sequences.some(seq => /[^ACGT]/i.test(seq)) && !$("#alert-invalid-characters").length) {
        $("#alert-placeholder").append('<div id="alert-invalid-characters" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Warning:</strong> Your input text contains characters other than A, C, G, T, and U. Check your input<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    }

    if(sequences.some(seq => seq.length % 3 != 0) && !$("#alert-length-multiple").length) {
        $("#alert-placeholder").append('<div id="alert-length-multiple" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Warning:</strong> The length of some of your sequences are not a multiple of 3. Ensure they are in the correct reading frame. Check your input<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    }

    calculateCodonUsage(sequences);
})

$("#button-clear").click(function() {
    $("#sequence").val("");
    $("#results-card").hide(500)
    $("#results").text("");

    $("#alert-invalid-fasta").remove();
    $("#alert-multiple-seqs").remove();
    $("#alert-invalid-characters").remove();
    $("#alert-length-multiple").remove();
})
