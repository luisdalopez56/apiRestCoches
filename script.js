const url = ' http://192.168.1.122:3000/coches';

var coches = [];


function cargarLista() {
fetch(url,
    {
    method: 'GET',
    })
    .then(response => response.json())
    .then(json => { 
        coches = json;
        let res = document.getElementById('coches');
        res.innerHTML = '';

        var index = 0;
        
        for (let item of coches){
            
            res.innerHTML += `<div><p>Id: ${item.id}</p><p>Marca: ${item.marca}</p><p>Modelo: ${item.modelo}</p>
            <p>Año: ${item.ano}</p><p>Combustible: ${item.combustible}</p>
            <p>
                <input type="image" name"modificar" src="img/edit.png" width="30px" onclick="prepararFormulario(${index})">
                <input type="image" name="borrar" src="img/delete.png" width="30px" onclick="borrar(${item.id}); location.reload()">
            </p><div>`
          
            index++;
        }
    console.log(json)
    }) 
}


function submitForm(e, form){
    e.preventDefault();
    
    fetch(url, {
      method: 'post',
      body: JSON.stringify({
          marca: form.marca.value, 
          modelo: form.modelo.value,
          ano: form.ano.value,
          combustible: form.combustible.value
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(function(response) {
      return response.json();
    }).then(function(data) {

        let res = document.getElementById('coches');
        res.innerHTML = '';
            
        console.log(data);

        cargarLista();
    });
}

function borrar(id) {    
    fetch(' http://192.168.1.122:3000/coches/'+id, {
        method: 'delete',
    })
    .then(response =>
        response.json().then(json => {
          return json;

        })
      );
      alert("Coche eliminado");
}


function modificar(index, form){
  console.log(index);
  
    fetch(' http://192.168.1.122:3000/coches/'+coches[index].id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          marca: document.getElementById("marca").value, 
          modelo: document.getElementById("modelo").value,
          ano: document.getElementById("ano").value,
          combustible: document.getElementById("combustible").value
        })
      }).then(response => {
        return response.json( )
    })
    .then(data => 
        console.log(data) 
    ).catch(error => console.log(error));

    alert("Coche modificado correctamente");
    location.reload();

}


function prepararFormulario(index){
    let res = document.getElementById('formulario');
    res.innerHTML = `         
    <form action="Base de Datos.html">
        <p><input id="marca" type="text" name="marca" size="30" placeholder="Marca" value="`+coches[index].marca+`"></p>
        <p><input id="modelo" type="text" name="modelo" size="30" placeholder="Modelo" value="`+coches[index].modelo+`"></p>
        <p><input id="ano" type="text" name="ano" size="30" placeholder="Año" value="`+coches[index].ano+`"></p>
        <p><input id="combustible" type="text" name="combustible" size="30" placeholder="Combustible" value="`+coches[index].combustible+`"></p>
        <input id="submit" type="button" value="Enviar" onclick="modificar(`+index+`, this)">
    </form>
    `
}

function nuevoCoche(){
    let res = document.getElementById('formulario');
    res.innerHTML = `         
    <form action="Base de Datos.html" onsubmit="submitForm(event,this)">
        <p><input id="marca" type="text" name="marca" size="30" placeholder="Marca"></p>
        <p><input id="modelo" type="text" name="modelo" size="30" placeholder="Modelo"></p>
        <p><input id="ano" type="text" name="ano" size="30" placeholder="Año"></p>
        <p><input id="combustible" type="text" name="combustible" size="30" placeholder="Combustible"></p>
        <input id="submit" type="submit" value="Enviar">
        <input id="reset" type="reset" value="Borrar">
    </form>
    `
}