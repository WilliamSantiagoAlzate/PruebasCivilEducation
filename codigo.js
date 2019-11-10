//Crear tablas dinamicas
document.getElementById("filas").addEventListener("input", dibujarTabla)
document.getElementById("fila_de_mas").addEventListener("click", filaDeMas)
var tr, td1, td2, td3, td4, input1, input2, input3, button;
const tabla = document.getElementById("tabla");
var menos = 1;

function dibujarTabla() {
  var f = parseInt(document.getElementById("filas").value);
  var titulo = `<tr>
    <th>Posición</th>
    <th>Momento negativo</th>
    <th>Momento positivo</th>
    <th>Eliminar fila</th>
  </tr>`;
  tabla.innerHTML = titulo;

  for (var i = 0; i < f; i++) {
    filaDeMas()
  }
}

function filaDeMas() {
  tr = document.createElement("tr");
  td1 = document.createElement("td");
  td2 = document.createElement("td");
  td3 = document.createElement("td");
  td4 = document.createElement("td");
  input1 = document.createElement("input");
  input2 = document.createElement("input");
  input2.addEventListener("input", graficar);
  input3 = document.createElement("input");
  input3.addEventListener("input", graficar);
  button = document.createElement("button");
  button.setAttribute("id", "fila_de_menos_" + menos)
  button.addEventListener("click", filaDeMenos);
  button.innerHTML = "-";
  td1.appendChild(input1);
  td2.appendChild(input2);
  td3.appendChild(input3);
  td4.appendChild(button);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tabla.appendChild(tr);
  menos++;
}


function filaDeMenos(ev) {
  var nodo = ev.target
  nodo.parentNode.parentNode.parentNode.removeChild(nodo.parentNode.parentNode);
}


//Manejo de ecuaciones
document.getElementById("a").addEventListener("input", mostrar)
document.getElementById("b").addEventListener("blur", mostrar)

function mostrar() {
  const resultado = document.getElementById("result")
  var valueA = parseInt(document.getElementById("a").value)
  var valueB = parseInt(document.getElementById("b").value)

  if (isNaN(valueA)) {
    valueA="A"
  }
  if (isNaN(valueB)) {
    valueB="B"
  }

  var input = `x = {${valueA} \\over ${valueB}} + \\sqrt{b^2-4ac}`

  resultado.innerHTML = "";
  MathJax.texReset();
  var options = MathJax.getMetricsFor(resultado);
  MathJax.tex2chtmlPromise(input, options).then(function (node) {
    resultado.appendChild(node);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
  }).catch(function (error) {
    console.log(error);
  })
}


//codigo para Grafica
var contenedor = document.getElementById("grafica").getContext("2d");
var minTicks, maxTicks, stepTicks;

var momentoNegativo = {
  label: "Momento Negativo",
  data: [],
  lineTension: 0,
  fill: false,
  backgroundColor: "#777",
  borderColor: "#777"
}

var momentoPositivo = {
  label: "Momento Positivo",
  data: [],
  lineTension: 0,
  fill: false,
  backgroundColor: "#333",
  borderColor: "#333"
}

var newData = {
  labels: [],
  datasets: [momentoNegativo, momentoPositivo]
}

var chartOptions = {
  tooltips: {
    callbacks: {
      title: function(tooltipItems, data) {
        return 'Posición: ' + tooltipItems[0].xLabel + ' m';
      },
      label: function(tooltipItems, data) {
        return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' KN/m';
      }
    }
  },
  scales: {
      xAxes: [{
        display: true,
        gridLines: {
            display:false
        },
        scaleLabel: {
          display: true,
          labelString: 'Posición (m)'
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
            display:false
        },
        scaleLabel: {
          display: true,
          labelString: 'Momento (KN/m)'
        },
        ticks: {
          min: minTicks,
          max: maxTicks,
          stepSize: stepTicks
        }   
      }]
  }
}

var grafica = new Chart(contenedor, {
  //Tipo de grafica
  type: "line",
  //Insertar datos
  data: newData,
  //Insertar estilos
  options: chartOptions
});

function updateChart(nuevaInfo) {
  grafica.data.datasets.data = nuevaInfo
  grafica.update();
}

function graficar() {
  var datos = tabla.childNodes.length;
  var x, y, z;

  newData["labels"] = [];
  momentoNegativo["data"] = [];
  momentoPositivo["data"] = [];

  for (var i = 1; i < datos; i++) {
    x = parseFloat(tabla.childNodes[i].childNodes[0].childNodes[0].value);
    if (isNaN(x)) {
      x = 0;
    }
    newData["labels"].push(x)

    y = parseFloat(tabla.childNodes[i].childNodes[1].childNodes[0].value);
    if (isNaN(y)) {
      y = 0;
    }
    momentoNegativo["data"].push(y)

    z = parseFloat(tabla.childNodes[i].childNodes[2].childNodes[0].value);
    if (isNaN(z)) {
      z = 0;
    }
    momentoPositivo["data"].push(z)
  }

  minTicks = z;
  maxTicks = y;
  stepTicks = (y - z) / 10;
  updateChart(newData);
}

//Dibujar aceros en canvas
const acero = document.getElementById("table_detail");

function dibujarTablaNueva() {
  var titulo = `<tr>
    <th>Posición</th>
    <th>Acero negativo</th>
    <th>Acero positivo</th>
  </tr>`;
  acero.innerHTML = titulo;
  var numero = 1;

  for (var i = 0; i < 10; i++) {
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");
    input1 = document.createElement("input");
    input1.setAttribute("id", "posicion" + numero)
    input1.setAttribute("value", numero * 40)
    input2 = document.createElement("input");
    input2.setAttribute("id", "aceronegativo" + numero)
    input2.addEventListener("blur", dibujarAcero);
    input3 = document.createElement("input");
    input3.setAttribute("id", "aceropositivo" + numero)
    input3.addEventListener("blur", dibujarAcero);
    td1.appendChild(input1);
    td2.appendChild(input2);
    td3.appendChild(input3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    acero.appendChild(tr);
    numero++;
  }
}

dibujarTablaNueva()

var p = document.getElementById("detail");
var plano = p.getContext("2d");
var color, grosor;

function dibujarAcero(env) {
  var posicion = extraerNumero(env.target.id);

  //Definir longitud de barra
  if (posicion > 1) {
    xf = parseFloat(document.getElementById("posicion" + posicion).value);
    posicion-=1
    xi = parseFloat(document.getElementById("posicion" + posicion).value);
    posicion++
  } else {
    xf = parseFloat(document.getElementById("posicion" + posicion).value);
    xi = 10;
  }

  //Dibujar gancho
  switch (posicion) {
    case "1":
      if (document.getElementById("aceronegativo" + posicion).value === "") {
        color = "#FFFFFF";
        grosor = 3;
        dibujarGancho(5, color, grosor);
      } else {
        color = "#FFFFFF";
        grosor = 3;
        dibujarGancho(5, color, grosor);
        color = "#000000";
        grosor = 1;
        dibujarGancho(5, color, grosor);
        break;
      }
    case acero.childNodes.length-1:
      if (document.getElementById("aceronegativo" + posicion).value === "") {
        color = "#FFFFFF";
        grosor = 3;
        dibujarGancho(xf + 5, color, grosor);
      } else {
        color = "#FFFFFF";
        grosor = 3;
        dibujarGancho(xf + 5, color, grosor);
        color = "#000000";
        grosor = 1;
        dibujarGancho(xf + 5, color, grosor);
        break;
      }
  }

  //Dibujar barra
  if (document.getElementById("aceronegativo" + posicion).value === "") {
    color = "#FFFFFF";
    grosor = 3;
    crearLinea(color, grosor, xi, xf)
  } else {
    color = "#FFFFFF";
    grosor = 3;
    crearLinea(color, grosor, xi, xf)
    color = "#000000";
    grosor = 1;
    crearLinea(color, grosor, xi, xf)
  }
}

function dibujarGancho(x, color, grosor) {
  plano.beginPath();
  plano.strokeStyle = color;
  plano.lineWidth = grosor;
  plano.moveTo(x, 75);
  plano.lineTo(x, 55);
  if (x === 5) {
    plano.arc(5 + x, 55, 5, Math.PI, 3 * Math.PI / 2, false);
  } else {
    plano.arc(x - 5, 55, 5, 4 * Math.PI / 2, 3 * Math.PI / 2, true);
  }
  plano.stroke();
  plano.closePath();
}

function crearLinea(color, grosor, xi, xf) {
  plano.beginPath();
  plano.strokeStyle = color;
  plano.lineWidth = grosor;
  plano.moveTo(xi, 50);
  plano.lineTo(xf, 50);
  plano.stroke();
  plano.closePath();
}

function extraerNumero(cadena) {
  a=1
  while (true) {
    if (isNaN(parseInt(cadena.substr(-a)))) {
      a=a-1
      return cadena.substr(-a)
      break
    } else {
      a++
    }
  }
}

//Dibujar sección de viga

var seccionViga = document.getElementById("seccionViga").getContext("2d");

var datoAltura, datoBase;
var altura = document.getElementById("altura");
var base = document.getElementById("base");
altura.addEventListener("blur", dibujar);
base.addEventListener("blur", dibujar);

datoAltura = 5 * parseFloat(altura.value);
datoBase = 5 * parseFloat(base.value);
color = "#000000";
grosor = 1;
draw();

function dibujar() {
  color = "#FFFFFF";
  grosor = 3;
  draw();
  borrarTexto();
  datoAltura = 5 * parseFloat(altura.value);
  datoBase = 5 * parseFloat(base.value);
  color = "#000000";
  grosor = 1;
  draw();
}

function draw() {
  if (isNaN(datoAltura)) {
    datoAltura = 100;
  }
  if (isNaN(datoBase)) {
    datoBase = 100;
  }

  seccionViga.beginPath();
  seccionViga.strokeStyle = color;
  seccionViga.lineWidth = grosor;

  seccionViga.arc(60, 65, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(45 + datoBase/2, 65);
  seccionViga.arc(40 + datoBase/2, 65, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(25 + datoBase, 65);
  seccionViga.arc(20 + datoBase, 65, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(65, 20 + datoAltura);
  seccionViga.arc(60, 20 + datoAltura, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(45 + datoBase/2, 20 + datoAltura);
  seccionViga.arc(40 + datoBase/2, 20 + datoAltura, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(25 + datoBase, 20 + datoAltura);
  seccionViga.arc(20 + datoBase, 20 + datoAltura, 5, 0, Math.PI * 2, true);

  seccionViga.moveTo(40, 45);
  seccionViga.lineTo(40 + datoBase, 45);
  seccionViga.lineTo(40 + datoBase, 45 + datoAltura);
  seccionViga.lineTo(40, 45 + datoAltura);
  seccionViga.lineTo(40, 45);

  seccionViga.font = "15px Verdana";
  seccionViga.fillStyle = color;
  seccionViga.textAlign = "start";
  seccionViga.fillText(datoAltura/5 + " cm", 40 + datoBase + 10, 45 + datoAltura/2);
  seccionViga.textAlign = "center";
  seccionViga.fillText(datoBase/5 + " cm", 40 + datoBase/2, 45 + datoAltura + 20);

  seccionViga.stroke();
  seccionViga.closePath();
}

function borrarTexto() {
  seccionViga.beginPath();
  seccionViga.strokeStyle = color;
  seccionViga.lineWidth = grosor;

  //Borrar texto de altura
  seccionViga.moveTo(35 + datoBase + 10, 30 + datoAltura/2);
  seccionViga.lineTo(115 + datoBase + 10, 30 + datoAltura/2);
  seccionViga.lineTo(115 + datoBase + 10, 50 + datoAltura/2);
  seccionViga.lineTo(35 + datoBase + 10, 50 + datoAltura/2);
  seccionViga.lineTo(35 + datoBase + 10, 30 + datoAltura/2);
  seccionViga.fill();

  //Borrar texto de base
  seccionViga.moveTo(datoBase/2, 30 + datoAltura + 20);
  seccionViga.lineTo(80 + datoBase/2, 30 + datoAltura + 20);
  seccionViga.lineTo(80 + datoBase/2, 50 + datoAltura + 20);
  seccionViga.lineTo(datoBase/2, 50 + datoAltura + 20);
  seccionViga.lineTo(datoBase/2, 30 + datoAltura + 20);
  seccionViga.fill();

  seccionViga.stroke();
  seccionViga.closePath();
}