var billetter = [];
var idTeller = 1;
$(document).ready(function(){

    $("#submitBtn").click(function(){
        validerOgLagreBestilling()
        buildTable(billetter);
        console.log("Id" + id + "er lagret")
    });

});






function validerOgLagreBestilling(){
    const filmOK = validerFilm($("#film").val());
    const antallOK =  validerAntall($("#antall").val());
    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const telefonnrOK = validerTelefonnr($("#telefonnr").val());
    const emailOK = validerEmail($("#email").val());
    if (filmOK && antallOK && fornavnOK && etternavnOK && telefonnrOK && emailOK) {
        lagreBillett()
        buildTable(billetter);
    }
}

function lagreBillett() {
    var billett = {
        id: idTeller++,
        antall: $("#antall").val(),
        film: $("#film").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        email: $("#email").val()
    };

    billetter.push(billett);
    console.log("Bestilling lagt til:", billetter);


    $.post("/lagre", billett, function() {

        $("#antall").val("");
        $("#film").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#email").val("");

        hentAlle();
        buildTable(billetter);
    });
}

$("#slettBtn").click(function(){
    billetter = [];
    console.log("Alle bestillinger slettet");
    $.get( "/slettAlle", function() {
        hentAlle();
    });

    $("#bestillinger").empty();
});


function slettBillett(id) {
    console.log("Sletteknappen ble trykket for ID:", id);
    $.post("/slettBillett", { id: id }, function() {
        console.log("Billett slettet fra databasen!");
        billetter = billetter.filter(function(billett) {
            return billett.id !== id;
        });
        buildTable(billetter);
    });
}



function hentAlle() {
    $.get("/hentAlle", function(data) {
        buildTable(data);
    });
}
function buildTable(data) {
    var table = $("#bestillinger");
    table.empty();

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                <td>${data[i].film}</td>
                <td>${data[i].antall}</td>
                <td>${data[i].fornavn}</td>
                <td>${data[i].etternavn}</td>
                <td>${data[i].telefonnr}</td>
                <td>${data[i].email}</td>   
                <td><button onclick="slettBillett(${data[i].id})" class="btn btn-danger">Slett</button></td>                       
            </tr>`;

        table.append(row);
    }
}

function validerFilm(film) {
    if (film === "Velg film") {
        $("#feilFilm").html("Velg en film");
        return false;
    } else {
        const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;
        const ok = regexp.test(film);
        if (!ok) {
            $("#feilFilm").html("Velg film");
            return false;
        } else {
            $("#feilFilm").html("");
            return true;
        }
    }
}

function validerAntall(antall){
    const regexp = /^[0-9]{1,3}$/;

    const ok = regexp.test(antall);
    if(!ok){
        $("#feilAntall").html("Fyll ut antall billetter");
        return false;
    }
    else{
        $("#feilAntall").html("");
        return true;
    }
}
function validerFornavn(fornavn){
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;

    const ok = regexp.test(fornavn);
    if(!ok){
        $("#feilFornavn").html("Ugyldig fornavn");
        return false;
    }
    else{
        $("#feilFornavn").html("");
        return true;
    }
}

function validerEtternavn(etternavn){
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/;

    const ok = regexp.test(etternavn);
    if(!ok){
        $("#feilEtternavn").html("Ugyldig etternavn");
        return false;
    }
    else{
        $("#feilEtternavn").html("");
        return true;
    }
}

function validerTelefonnr(telefonnr){
    const regexp = /^[0-9]{8}$/;

    const ok = regexp.test(telefonnr);
    if(!ok){
        $("#feilTelefonnr").html("Skriv inn en gyldig telefonnr");
        return false;
    }
    else{
        $("#feilTelefonnr").html("");
        return true;
    }
}

function validerEmail(email) {
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ok = regexp.test(email);
    if (!ok) {
        $("#feilEmail").html("Skriv inn en gyldig e-postadresse");
        return false;
    } else {
        $("#feilEmail").html("");
        return true;
    }
}

