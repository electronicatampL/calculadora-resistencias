// Definición de colores y sus valores
const colores = [
    { nombre: "Negro", valor: 0, multiplicador: 1, tolerancia: null, ppm: null },
    { nombre: "Marrón", valor: 1, multiplicador: 10, tolerancia: 1, ppm: 100 },
    { nombre: "Rojo", valor: 2, multiplicador: 100, tolerancia: 2, ppm: 50 },
    { nombre: "Naranja", valor: 3, multiplicador: 1000, tolerancia: null, ppm: 15 },
    { nombre: "Amarillo", valor: 4, multiplicador: 10000, tolerancia: null, ppm: 25 },
    { nombre: "Verde", valor: 5, multiplicador: 100000, tolerancia: 0.5, ppm: null },
    { nombre: "Azul", valor: 6, multiplicador: 1000000, tolerancia: 0.25, ppm: 10 },
    { nombre: "Violeta", valor: 7, multiplicador: 10000000, tolerancia: 0.1, ppm: 5 },
    { nombre: "Gris", valor: 8, multiplicador: 100000000, tolerancia: 0.05, ppm: null },
    { nombre: "Blanco", valor: 9, multiplicador: 1000000000, tolerancia: null, ppm: null },
    { nombre: "Dorado", valor: null, multiplicador: 0.1, tolerancia: 5, ppm: null },
    { nombre: "Plateado", valor: null, multiplicador: 0.01, tolerancia: 10, ppm: null }
];

// Inicializa selectores de colores
document.addEventListener("DOMContentLoaded", function() {
    const selectores = document.querySelectorAll(".colorSelector");
    selectores.forEach(select => {
        colores.forEach(color => {
            if ((select.id === "multiplicador" || select.id === "tolerancia" || select.id === "ppm") || color.valor !== null) {
                let option = document.createElement("option");
                option.value = color.nombre;
                option.textContent = color.nombre;
                select.appendChild(option);
            }
        });
    });
    actualizarBandas();
});

// Actualiza la interfaz según el número de bandas seleccionadas
function actualizarBandas() {
    const numBandas = document.getElementById("numBandas").value;
    document.getElementById("banda3").style.display = numBandas >= 5 ? "block" : "none";
    document.getElementById("banda3Label").style.display = numBandas >= 5 ? "block" : "none";
    document.getElementById("ppm").style.display = numBandas == 6 ? "block" : "none";
    document.getElementById("ppmLabel").style.display = numBandas == 6 ? "block" : "none";
}

// Calcula el valor de la resistencia
function calcularResistencia() {
    const numBandas = document.getElementById("numBandas").value;
    const b1 = colores.find(c => c.nombre === document.getElementById("banda1").value).valor;
    const b2 = colores.find(c => c.nombre === document.getElementById("banda2").value).valor;
    const b3 = numBandas >= 5 ? colores.find(c => c.nombre === document.getElementById("banda3").value).valor : null;
    const multiplicador = colores.find(c => c.nombre === document.getElementById("multiplicador").value).multiplicador;
    const tolerancia = colores.find(c => c.nombre === document.getElementById("tolerancia").value).tolerancia;
    const ppm = numBandas == 6 ? colores.find(c => c.nombre === document.getElementById("ppm").value).ppm : null;

    let valorBase = b1 * 10 + b2;
    if (numBandas >= 5) {
        valorBase = valorBase * 10 + b3;
    }
    let resistencia = valorBase * multiplicador;

    // Formato amigable (Ω, kΩ, MΩ)
    let unidad = "Ω";
    if (resistencia >= 1e6) {
        resistencia /= 1e6;
        unidad = "MΩ";
    } else if (resistencia >= 1e3) {
        resistencia /= 1e3;
        unidad = "kΩ";
    }

    let resultadoTexto = `${resistencia} ${unidad} ± ${tolerancia || "N/A"}%`;
    if (ppm !== null) {
        resultadoTexto += ` | ${ppm} ppm/°C`;
    }

    document.getElementById("valorResistencia").textContent = resultadoTexto;
    actualizarVistaResistor();
}

// Actualiza los colores de la resistencia visualmente
function actualizarVistaResistor() {
    document.getElementById("resistorBanda1").style.backgroundColor = obtenerColor(document.getElementById("banda1").value);
    document.getElementById("resistorBanda2").style.backgroundColor = obtenerColor(document.getElementById("banda2").value);
    document.getElementById("resistorBanda3").style.backgroundColor = obtenerColor(document.getElementById("banda3").value);
    document.getElementById("resistorBanda3").style.display = document.getElementById("numBandas").value >= 5 ? "block" : "none";
    document.getElementById("resistorMultiplicador").style.backgroundColor = obtenerColor(document.getElementById("multiplicador").value);
    document.getElementById("resistorTolerancia").style.backgroundColor = obtenerColor(document.getElementById("tolerancia").value);
    document.getElementById("resistorPPM").style.backgroundColor = obtenerColor(document.getElementById("ppm").value);
    document.getElementById("resistorPPM").style.display = document.getElementById("numBandas").value == 6 ? "block" : "none";
}

// Convierte el nombre del color a su código CSS
function obtenerColor(nombre) {
    const mapaColores = {
        "Negro": "#000000",
        "Marrón": "#964B00",
        "Rojo": "#FF0000",
        "Naranja": "#FFA500",
        "Amarillo": "#FFFF00",
        "Verde": "#008000",
        "Azul": "#0000FF",
        "Violeta": "#8A2BE2",
        "Gris": "#808080",
        "Blanco": "#FFFFFF",
        "Dorado": "#FFD700",
        "Plateado": "#C0C0C0"
    };
    return mapaColores[nombre] || "transparent";
}
