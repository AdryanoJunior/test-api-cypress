describe('Teste da API - Login', () => {

  it('Deve autenticar com sucesso e retornar um token', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
          "email": "fulano@qa.com",
          "password": "teste"
}
    }).should((response) =>{
      expect(response.status).equal(200)
      expect(response.body.message).equal('Login realizado com sucesso')
    })
  })
})