# gac-api

## Configuração inicial para utilizar o ambiente com o Husky
  - Ao clonar o repositório, instale as dependências com o gerenciador de pacotes yarn: 

    comando:  `yarn`
  - Agora rode o comando de instalação do husky:

  `yarn husky install`

  Pronto. O Husky está instalado!

## Configuração de desenvolvimento do prisma
  - Ao clonar o repositório, é necessário rodar o comando: `yarn prisma:gen`
    
    PS.: Isso se dá pois o prisma mantém uma coleção de tipos na **node_modules**. Portanto, estes arquivos não são *pushados* para o repositório. Caso esteja clonando o repositório agora, ao instalar as dependências este comando irá rodar automaticamente.
    
    PS.(2): Este comando é muito útil caso você baixe atualizações nas *models* do prisma feitas por um colega.

  - Para rodar as migrations você precisa de um banco de desenvolvimento. Para isso, basta copiar o arquivo **.env.example** para um arquivo **.env** e manipular a url de acordo com o seu banco de desenvolvimento local. O comando é o seguinte: `yarn prisma:migrate`