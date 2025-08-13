import contrato from '../contratos/produtos.contrato.js'

describe('Teste da API - Produtos', () => {

    let token
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(authorization =>{
            token = authorization
        })
    });

    it('Deve validar contrato de produtos com sucesso', () => {
        cy.request('produtos').then(response =>{
            return contrato.validateAsync(response.body)
        })
    });
    
    it('Listar Produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        })
    });

    it('Deve cadastrar um produto com sucesso - POST', () => {
        const customProduct = Math.floor(Math.random() *9999)
  
        cy.cadastrarProduto(token, `Iphone ${customProduct}`, 20000, 'Smartphone', 30)
        .then((response) =>{
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        })
    });

    it('Validar mensagem de produto já cadastrado anteriormente - POST', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body: {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
            },
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).equal(400)
            expect(response.body.message).equal('Já existe produto com esse nome')
        })
    });

    it('Deve editar um produto com sucesso - PUT', () => {
       const customProduct = Math.floor(Math.random() *9999)
  
       cy.cadastrarProduto(token, `Iphone ${customProduct}`, 20000, 'Smartphone', 30)
       .then(response =>{
        let id = response.body._id

        cy.request({
            method: 'PUT',
            url: `produtos/${id}`,
            headers: { authorization: token },
            body: {
                "nome": `Iphone Editado ${customProduct}`,
                "preco": 25000,
                "descricao": "Smartphone com Ultra IA",
                "quantidade": 200
}
        }).then((response) =>{
            expect(response.status).equal(200)
            expect(response.body.message).equal('Registro alterado com sucesso')
        })
       })
    });

    it('Deve deletar um produto com sucesso - DELETE', () => {
        const customProduct = Math.floor(Math.random() *9999)
  
        cy.cadastrarProduto(token , `Iphone Deletado ${customProduct}`, 15000, 'Smartphone', 300)
        .then(response =>{
            let id = response.body._id

            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: { authorization: token }

            }).should((response) =>{
            expect(response.status).equal(200)
            expect(response.body.message).equal('Registro excluído com sucesso')
        })
        })
    });

});