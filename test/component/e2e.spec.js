describe('Add a TODO', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
  });

  it('The TODO should be added', async () => {
    await browser.get('http://localhost:8080/');
    await(browser.sleep(3000));

    await adicionarNuevoItem('Preparar charla de component UI testing');
    await adicionarNuevoItem('Crear un caso de ejemplo');
    await adicionarNuevoItem('Verificar que corran las pruebas');
    await adicionarNuevoItem('Seleccionar las herramientas');
    await adicionarNuevoItem('Comprobar que funcionan');
    await adicionarNuevoItem('Ejecutar los casos de prueba');

    await(browser.sleep(3000));

    await borrarElementos();

    await(browser.sleep(3000));
  });
});

const adicionarNuevoItem = async (nombre) => {
  await $('#new-todo-input').sendKeys(nombre);
  await $('#new-todo-button').click();
};

const borrarElementos = async (nombre) => {
  for (let i = 0; i < 6; i++) {
    await $$('[type="checkbox"]').first().click();
  }
};
