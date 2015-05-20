function clearInput() {
    $("#results_container").hide(500); //show the element
    $("#sequence").val("");
    $("#sequence").focus();
    $("#result").html("");
}


function clearInputGC() {
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
    var sequence = $("#sequence").val().toUpperCase();
    if(sequence.length != 0) {
        var a = 0, c = 0, g = 0, t = 0, n = 0;

        //Count the frequency of each base
        for(var i = 0; i < sequence.length; i++) {
            if(sequence.charAt(i) == "A") {
                a++;
            }
            else if(sequence.charAt(i) == "C") {
                c++;
            }
            else if(sequence.charAt(i) == "G") {
                g++;
            }
            else if(sequence.charAt(i) == "T") {
                t++;
            }
            else {
                n++; //Found a non base character
            }
        }
        //Show results
        $("#a_count").html(a);
        $("#c_count").html(c);
        $("#g_count").html(g);
        $("#t_count").html(t);
        $("#error_count").html(n);

        var a_per = (a/sequence.length * 100).toFixed(2);
        var c_per = (c/sequence.length * 100).toFixed(2);
        var g_per = (g/sequence.length * 100).toFixed(2);
        var t_per = (t/sequence.length * 100).toFixed(2);
        var error_per = (n/sequence.length * 100).toFixed(2);

        var gc_per = ((g+c)/sequence.length * 100).toFixed(2);

        $("#gc_content").html(gc_per);

        $("#a_per").html(a_per);
        $("#c_per").html(c_per);
        $("#g_per").html(g_per);
        $("#t_per").html(t_per);
        $("#error_per").html(error_per);

        $("#results").show(500);
    }
}

function generateComplement() {
    var sequence = $("#sequence").val().toUpperCase();
    if(sequence.length != 0) {
        var result = "";
        var opt = $('input[name="complement_options"]:checked').val() //Get user specified option

        if(opt == "reverse") {
            result = sequence.split("").reverse().join("");
        }
        else if (opt = "complement") {
            for(var i = 0; i < sequence.length; i++) {
                if(sequence.charAt(i) == "A") {
                    result += "T";
                }
                else if(sequence.charAt(i) == "C") {
                    result += "G";
                }
                else if(sequence.charAt(i) == "G") {
                    result += "C";
                }
                else if(sequence.charAt(i) == "T") {
                    result += "A";
                }
                else {
                    result += "X";
                }
            }
        }
        else if (opt = "reverse_complement") {
            sequence = sequence.split("").reverse().join("");
            for(var i = 0; i < sequence.length; i++) {
                if(sequence.charAt(i) == "A") {
                    result += "T";
                }
                else if(sequence.charAt(i) == "C") {
                    result += "G";
                }
                else if(sequence.charAt(i) == "G") {
                    result += "C";
                }
                else if(sequence.charAt(i) == "T") {
                    result += "A";
                }
                else {
                    result += "X";
                }
            }
        }
        else {
            alert("An error has occurred!");
        }


        $("#result").html(result);
        $("#results_container").show(500); //show the element
    }
}

function primerMP() {
    var sequence = $("#sequence").val().toUpperCase();
    if(sequence.length != 0) {
        var cg = 0;
        var at = 0;
        var err = 0;

        for(var i = 0; i < sequence.length; i++) {
            if(sequence.charAt(i) == "A" || sequence.charAt(i) == "T") {
                at++;
            }
            else if(sequence.charAt(i) == "C" || sequence.charAt(i) == "G") {
                cg++;
            }
            else {
                err++;
            }
        }

        var sequenceLength = sequence.length - err;
        var meltingPoint = 0.00;

        //I less than 14 nucs, use simple formula
        if(sequenceLength < 14) {
            meltingPoint = (2 * (at) ) + (4 * (cg));
        }
        else {
            meltingPoint = 64.9 + 41 * (at - 16.4)/(at + cg);
        }
        meltingPoint = meltingPoint.toFixed(2);
        $("#result").html(meltingPoint);
        $("#results_container").show(500); //show the element
    }
}
