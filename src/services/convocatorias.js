export async function getAllConvocatorias() {
  const url = 'http://localhost:3001/api/convocatorias';
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
/*
  tambien se puede hacer asi: con metodos nativos de java script
  const [convocatorias, setConvocatorias] = useState([null]);
    useEffect(() => {
      fetch('http://localhost:3001/api/convocatorias/')
        .then(response => response.json())
        .then(response => {
          //console.log(response);
          //console.log(typeof response.data[0].nombre);
          //console.log(response.data[0].nombre);
          //const lista = response.data.map(elem => elem.nombre);
          //console.log(lista);
          setConvocatorias(response);
        })
    }, []);
*/

//export async function postProveedor(body) {
//  const url = 'http://localhost:3001/api/proveedores';
//  const response = await fetch(url, {
//    method: 'POST', // *GET, POST, PUT, DELETE, etc.
//    mode: 'cors', // no-cors, *cors, same-origin
//    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//    credentials: 'same-origin', // include, *same-origin, omit
//    headers: {
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(body),
//    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//  });
//  return response; // parses JSON response into native JavaScript objects
//}
