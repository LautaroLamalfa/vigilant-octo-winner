const socket = io();

socket.on("render", (data)=>{
    console.log(data);
    renderTabla();
    renderChat();
    mainLogin();
})

renderTabla = () =>{
    const tabla = document.getElementById('tBody');
    const url = '/api/products';

    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        tabla.innerHTML="";
        for (const pto of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `${pto.nombre}`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `$ ${pto.precio}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<img src = ${pto.imagen} width="60"height="60">`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
      
    })
    .catch((error) => {
      console.log(error);
    });
    return false;
}

renderChat = () =>{
    const tabla = document.getElementById('tBodyChat');
    const url = '/api/chat';

    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        
         let html = data.map(x => {
             return `<p><strong>Compresion</strong>: ${x.compresion}</p>`;
         }).join(" ");

         document.getElementById('porcentaje').innerHTML= html


        tabla.innerHTML="";
        for (const chat of denormalizeChat) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `<strong><font color="light-blue">${chat.author.id}</font></strong>`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `<font color="brown">${chat.author.avatar}</font>`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<i><font color="green">${chat.text}</font></i>`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
        
    })
    .catch((error) => {
      console.log(error);
    });
    return false;
}

enviarChat = () =>{
    /* Armando request para la funcion fetch */
    const url = '/api/chat';
    let data = {
        author:{ 
            id: document.getElementById('email').value, 
            nombre: document.getElementById('name').value, 
            apellido: document.getElementById('apellido').value, 
            edad: document.getElementById('edad').value, 
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('msg').value
    }
    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };

    fetch(url, request)
        .then(() =>{
            document.getElementById('msg').value = "";
            socket.emit("actualizacion");
    });

    return false;
}

mainLogin = () =>{
    const url = '/api/login';

    fetch(url)
        .then((resp) => resp.json())
        .then((data) =>{
            if (data) {
                console.log(data)
                let x = document.getElementById("usuarioLogin");
                x.innerHTML = "Hola "+data.user
                let y = document.getElementById("bienvenido");
                y.style.display = "block";

            } else {
             window.location.href = "login.html"   
            }
        }) .catch((error) => {
            console.log(error);
        });
}

logout = () => {
    const url = '/api/login';

    fetch(url)
        .then((resp) => resp.json())

        .then((data) =>{
            if (data) {
                if (data) {
                    console.log(data)
                    let x = document.getElementById("logout");
                    x.innerHTML = "Adios " + data.user
                    setTimeout(() =>{
                        window.location.href = "api/logout"
                    }, 2000);
            } else {
                window.location.href = "login.html";
            }
        }
    }).catch((error) => {
        console.log(error);
    })
}
    