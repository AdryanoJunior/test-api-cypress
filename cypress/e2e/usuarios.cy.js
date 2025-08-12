
describe('Teste da API - Usuarios', () => {

    let token
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(authorization =>{
            token = authorization
        })
        
    });
    
    it('Deve listar todos os usuários cadastrados - GET', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios'

        }).then((response) =>{
            expect(response.status).equal(200)
            expect(Array.isArray(response.body.usuarios)).equal(true)
        })
    });

    it('Deve cadastrar um usuário com sucesso - POST', () => {
        const randomEmail = Math.floor(Math.random() *9999)

        cy.cadastrarUsuário(token, 'TestUser', `qaseniorcanada${randomEmail}@qa.com`, 'teste', 'true')
        .then((response) =>{
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id')
        })
    });

    it('Deve validar mensagem de email já cadastrado - POST', () => {
        cy.cadastrarUsuário(token, 'QA Senior', 'beltrano@qa.com.br', 'teste', 'true')
        .then((response) =>{
            expect(response.status).equal(400)
            expect(response.body.message).equal('Este email já está sendo usado')
        })
    });

    it('Buscar usuário por ID - GET', () => {
        const randomEmail = Math.floor(Math.random() *9999)

        cy.cadastrarUsuário(token, 'Test User', `qaseniorcanada${randomEmail}@qa.com`, 'teste', 'true')
        .then(response =>{
            let id = response.body._id

            cy.request({
                method: 'GET',
                url: `usuarios/${id}`
            })
        }).then((response) =>{
            expect(response.status).equal(200)
        })
    });

    it('Deve editar um usuário com sucesso - PUT', () => {
         const randomEmail = Math.floor(Math.random() *9999)
 
         cy.cadastrarUsuário(token, 'Test User', `qaseniorcanada${randomEmail}@qa.com`, 'teste', 'true')
         .then(response =>{
            let id = response.body._id

            cy.request({
            method: 'PUT',
            url: `usuarios/${id}`,
            body: {
                "nome": "Test User Editado",
                "email": `testingqa${randomEmail}@qa.com`,
                "password": "test12345$",
                "administrador": "true"
}
        }).then((response) =>{
            expect(response.status).equal(200)
            expect(response.body.message).equal('Registro alterado com sucesso')
        })
         })
        
    });

    it('Deve deletar um usuário com sucesso - DELETE', () => {
        const randomEmail = Math.floor(Math.random() *9999)

        cy.cadastrarUsuário(token, 'Test User', `qaseniorcanada${randomEmail}@qa.com`, 'teste', 'true')
        .then(response =>{
            let id = response.body._id

            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,
                
            }).then((response) =>{
                expect(response.status).equal(200)
                expect(response.body.message).equal('Registro excluído com sucesso')
            })
        })
    });
});