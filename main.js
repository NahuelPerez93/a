var gastos = {};
var cuentas = {
    "nahuel": 0,
    "carolina": 0
};

function agregarGasto() {
    var tipoGasto = document.getElementById("gastos").value;
    var monto = parseFloat(document.getElementById("amount").value);
    var quienPago = document.getElementById("pago").value;
    
    if (!isNaN(monto)) {
        if (tipoGasto in gastos) {
            gastos[tipoGasto] += monto;
        } else {
            gastos[tipoGasto] = monto;
        }
        cuentas[quienPago] += monto; // Añadir el monto al que pagó
        actualizarListaGastos();
    } else {
        alert("Por favor, ingrese un monto válido.");
    }
}

function actualizarListaGastos() {
    var gastosListDiv = document.getElementById("gastos-list");
    gastosListDiv.innerHTML = "<h3>Gastos:</h3>";
    for (var tipoGasto in gastos) {
        gastosListDiv.innerHTML += "<p>" + tipoGasto + ": $" + gastos[tipoGasto].toFixed(2) + "</p>";
    }
}

function calcularGastos() {
    var sueldoNahuel = parseFloat(document.getElementById("nahuel-salary").value);
    var sueldoCarolina = parseFloat(document.getElementById("carolina-salary").value);

    var totalGastos = 0;
    for (var tipoGasto in gastos) {
        totalGastos += gastos[tipoGasto];
    }

    var porcentajeNahuel, porcentajeCarolina;
    if (sueldoNahuel > sueldoCarolina) {
        porcentajeNahuel = totalGastos * 0.6;
        porcentajeCarolina = totalGastos * 0.4;
    } else {
        porcentajeNahuel = totalGastos * 0.4;
        porcentajeCarolina = totalGastos * 0.6;
    }

    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Resultados</h2>";
    resultsDiv.innerHTML += "<p>Porcentaje de gastos de Nahuel: $" + porcentajeNahuel.toFixed(2) + "</p>";
    resultsDiv.innerHTML += "<p>Porcentaje de gastos de Carolina: $" + porcentajeCarolina.toFixed(2) + "</p>";

    // Calcular las deudas y pagos
    var deudaNahuel = porcentajeCarolina - porcentajeNahuel;
    var deudaCarolina = porcentajeNahuel - porcentajeCarolina;

    // Restar los pagos acumulados
    deudaNahuel -= cuentas.nahuel;
    deudaCarolina -= cuentas.carolina;

    resultsDiv.innerHTML += "<p>Carolina le debe a Nahuel: $" + deudaNahuel.toFixed(2) + "</p>";
    resultsDiv.innerHTML += "<p>Nahuel le debe a Carolina: $" + deudaCarolina.toFixed(2) + "</p>";
}
