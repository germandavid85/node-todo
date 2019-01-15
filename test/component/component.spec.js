const ServerMock = require("mock-http-server");

const server = new ServerMock({ host: "localhost", port: 9999 });

describe('Add a TODO', () => {
  beforeEach((done) => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

    server.start(done);
  });

  afterEach((done) => {
    server.stop(done);
  });

  it('The TODO should be added', async () => {
    prepararListaInicialHTTP();

    await browser.get('http://localhost:8080/');
    await(browser.sleep(10000));

    adicionarNuevoItemHTTP('Preparar charla de component UI testing');

    await adicionarNuevoItem('Preparar charla de component UI testing');
    await(browser.sleep(3000));

    adicionarNuevoItemHTTP('Crear un caso de ejemplo')

    await adicionarNuevoItem('Crear un caso de ejemplo');

    await(browser.sleep(3000));

    borrarItemHTTP();

    await borrarElementos();

    await(browser.sleep(3000));
  });
});

const elementos = [];

// for(let i = 0; i < 100; i++) {
//   elementos.push({ _id: '1234', __v: 0, text: 'todo name' });
// }

const prepararListaInicialHTTP = () => {
  server.on({
    method: 'GET',
    path: '/api/todos',
    reply: {
        status:  200,
        headers: { "content-type": "application/json" },
        body:    JSON.stringify(elementos)
    }
  });
};

const adicionarNuevoItemHTTP = (nombre) => {
  elementos.push({ _id: '1234', __v: 0, text: nombre })
  server.on({
    method: 'POST',
    path: '/api/todos',
    reply: {
        status:  200,
        headers: { "content-type": "application/json" },
        body:    JSON.stringify(elementos)
    }
  });
};

const borrarItemHTTP = () => {
  elementos.pop();

  server.on({
    method: 'DELETE',
    path: '/api/todos/1234',
    reply: {
        status:  200,
        headers: { "content-type": "application/json" },
        body:    JSON.stringify(elementos)
    }
  });
};

const adicionarNuevoItem = async (nombre) => {
  await $('#new-todo-input').sendKeys(nombre);
  await $('#new-todo-button').click();
};

const borrarElementos = async (nombre) => {
  for (let i = 0; i < 2; i++) {
    await $$('[type="checkbox"]').first().click();
  }
};
