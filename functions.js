function calcularModificador(caracteristica)
{
    let modificador = 0;
    let retorno;
    if(caracteristica<10)
    {
        for(let i = 10; i>=caracteristica; i--)
        {
            if(!(i%2 == 0))
            {
                modificador -= 1;
            }
        }
        retorno = modificador;
    }
    else
    {
        for(let i = 11; i<=caracteristica; i++)
        {
            if(i%2 == 0)
            {
                modificador += 1;
            }
        }
        retorno = "+" + modificador;
    }

    return retorno;
}


function agregarRazas(razas)
{
    let newForm = document.getElementById('formRazas');

    let contador = 0;
    let texto = '';
    for(let raza of razas)
    {
        texto += `<input type="radio" name="raza" id="raza${contador}" value="${raza}" class="radio-raza">
                  <label for="raza${contador}" class="radio-r mode-radio">
                  <div class="nombre-raza">${raza}</div>
                  </label>`;
        contador++;
    }
    newForm.innerHTML = texto;
}

function agregarClases(clases)
{
    let newForm = document.getElementById('formClases');

    let contador = 0;
    let texto = '';
    for(let clase of clases)
    {
        texto += `<input type="radio" name="clase" id="clase${contador}" value="${clase}" class="radio-clase">
                  <label for="clase${contador}" class="radio-c mode-radio">
                  <div class="nombre-clase">${clase}</div>
                  </label>`;
        contador++;
    }
    newForm.innerHTML = texto;
}


function agregarPuntos2(caracteristica, arrayNumeros)
{
    let destino = document.getElementById('idCaracteristicas'); 
    let newDiv = document.createElement('div');
    let menor = encontrarMenor(arrayNumeros);
    let suma = calcularPuntaje(arrayNumeros, menor);
    let flag = 0;

    newDiv.className = 'carac';
    let texto = `<p class="nombreCarac title">${caracteristica.nombre}</p>
                 <div class="puntoSuma puntos-mode">${suma}</div><div class="listaPun">`;
    arrayNumeros.forEach(num => {
        if(num == menor && flag == 0)
        {
            texto += `<p class="unNum numMenor">${num}</p>`
            flag = 1;
        }
        else
        {
            texto += `<p class="unNum puntos-mode">${num}</p>`
        }
    });
    texto += `</div>`;

    newDiv.innerHTML = texto;
    destino.append(newDiv);

    caracteristica.puntos = suma;
}

function mostrarPersonaje(personaje, caracteristicas)
{
    const {nombrePersonaje, nombreUsuario, raza, clase, habilidades, puntosCaracteristica} = personaje;

    let destino = document.getElementById('destinoPersonaje');
    let newDiv = document.createElement('div');
    newDiv.id = 'divPersonaje';
    let texto = `<div id="nombresPer"><h1 class="text-center mode">Personaje de ${nombreUsuario}</h1><h1 class="nombrePer mode">${nombrePersonaje}</h1></div>`;
    texto += `<div id="razaClase"><div id="divINFO"><p class="div-info mode" id="raza-clase"><strong>Raza: </strong>${raza.nombre}<strong><br><br>Clase: </strong>${clase.nombre}</p><br><br>`;
    texto += `<p class="div-info mode" id="habilidades"><strong><br>Habilidades:<br> </strong><br>∘ ${habilidades.join('<br>∘ ')}</p></div><div id="finCarac">`;

    let cont = 0;
    for(let carac of caracteristicas)
    {
        texto += `<div class="fin-carac carac-mode"><p class="nombreCarac nombreCaracEx mode">${carac.nombre}</p><p class="modificador mode">${calcularModificador(puntosCaracteristica[cont])}</p><p class="punto-fin">${personaje.puntosCaracteristica[cont]}</p></div>`;
        cont ++;
    }

    texto += `</div></div>`;

    newDiv.innerHTML = texto;
    destino.append(newDiv);

}

function ocultar(id)
{
    let elemento = document.getElementById(id);
    elemento.style.display = 'none';
    elemento.style.visibility = 'hidden';
}

function mostrar(id)
{
    let elemento = document.getElementById(id);
    elemento.style.display = 'block';
    elemento.style.visibility = 'visible';
}


function tirarDados2() 
{
    let numero;
    let numeros = [];

    for(let i=0; i<4; i++)
    {
        numero = Math.floor(Math.random() * 6) + 1;
        numeros.push(numero);
    }
    return numeros;
}

function encontrarMenor(numeros) 
{
    let menor = Math.min(...numeros);

    return menor;
}

function calcularPuntaje(array, menor) 
{
    let acumulador = 0;
    let flag = 0;
    array.forEach(num => {
        acumulador += num;
        if(num == menor && flag == 0)
        {
            acumulador -= num;
            flag = 1;
        }
    });
    return acumulador;
}


export {calcularModificador, agregarRazas, agregarClases, agregarPuntos2, mostrarPersonaje, mostrar, ocultar, tirarDados2, encontrarMenor, calcularPuntaje};