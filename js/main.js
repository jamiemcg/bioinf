function clearInput() {
    $("#sequence").val("");
    $("#sequence").focus();
}


function clearInputGC() {
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
}

function gc() {
    var sequence = $("#sequence").val().toUpperCase();
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

    $("#a_per").html(a_per);
    $("#c_per").html(c_per);
    $("#g_per").html(g_per);
    $("#t_per").html(t_per);
    $("#error_per").html(error_per);
}
