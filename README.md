<h1 align="center">
FrexcoShop
</h1>
<p align="center">


<p align="center">
  <a href="#images">Começando</a> &#xa0; | &#xa0; 
  <a href="#about">Primeiro acesso</a> &#xa0; | &#xa0;
  <a href="#sobre">Imagens</a> &#xa0; 
</p>

## Começando

```bash
# Clone esse repositório
$ git clone https://github.com/NaySoares/frexco-desafio.git

# Entre no diretório do back
$ cd frexco-desafio/frexco-back/

# Instale as dependências e execute o docker-compose
$ yarn
$ docker-compose up -d

# Rode as migrations e a seed do banco de dados
$ yarn typeorm migrations:run
$ yarn seed:admin

# Navegue até o front
$ cd ../frexco-front

# Instale as dependências e e rode a aplicação
$ yarn
$ yarn start

# Nota: O app usará a porta 3000
```

## Primeiro acesso 

No primeiro acesso o banco estará vazio e apenas com um usuário administrador.
Navegue até o login e use:

EMAIL: admin@frexco.com
SENHA: admin

Com isso você terá acesso ao dashboard de administrador onde pode cadastrar livros,
os livros não aceitam o upload de imagens para as capas, para isso envie o link de uma imagem no campo de capa ou deixe em branco para que seja usado a imagem padrão.

Os livros sempre são criados sem estoque e um administrador por cadastrar uma quantidade no painel dashboard de estoque.

Caso não tenha estoque em um livro a opção de compra será desativada e só será reativada quando o mesmo receber estoque.

Ao clicar em "comprar", na página de um livro, sempre é descontado uma unidade do estoque.



## Imagens
<h1 align="center">
<img alt="frexcoshop-image" src="https://github.com/NaySoares/frexco-desafio/blob/main/.github/frexco-01.png?raw=true" width = "600px" />
<img alt="frexcoshop-image" src="https://github.com/NaySoares/frexco-desafio/blob/main/.github/frexco-02.png?raw=true" width = "600px" />
<img alt="frexcoshop-image" src="https://github.com/NaySoares/frexco-desafio/blob/main/.github/frexco-03.png?raw=true" width = "600px" />
<img alt="frexcoshop-image" src="https://github.com/NaySoares/frexco-desafio/blob/main/.github/frexco-04.png?raw=true" width = "600px" />
<img alt="frexcoshop-image" src="https://github.com/NaySoares/frexco-desafio/blob/main/.github/frexco-05.png?raw=true" width = "600px" />
<img alt="frexcoshop-image" src="https://github.com/NaySoares/frexco-desafio/blob/main/.github/frexco-06.png?raw=true" width = "600px" />
</h1>
