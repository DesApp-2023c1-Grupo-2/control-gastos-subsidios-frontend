const SERVICES_CONFIG = {
  baseUrl: 'http://localhost',
  port: ':3001',
  path: '/api/subsidiosAsignados',
};

export async function getSubsidioXProyectoXRubro(idProyecto, idRubro) {
  const EXTRA_PATH = '/xproyectoxrubro/';
  const endpoint = `${SERVICES_CONFIG.baseUrl}${SERVICES_CONFIG.port}${SERVICES_CONFIG.path}${EXTRA_PATH}${idProyecto}/${idRubro}`;
  const response = await fetch(endpoint, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}
