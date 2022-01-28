<h1 align="center">TinDin-Teste Desenvolvedor: Backend</h1>

## Informações de contato
Nome: Roberto Costa Tupinambá <br>
Email: robertotupinamba@gmail.com <br>
Telefone: (34) 9 9824-2757 <br>
Linkedin: https://www.linkedin.com/in/robertotupi/

## Implementação
Utilizei o express, pois ele possibilita a criação rápida de aplicações utilizando um conjunto pequeno de arquivos e pastas; E por acreditar que ele deixa o código muito mais limpo. Segui uma arquitetura onde tentei separar ao máximo as responsabilidades para tornar o código de fácil leitura e compreensão.
Caso eu fosse hospedar eu escolheria hopedar na heroku por lá ser um ambiente da fácil configuração das variaveis ambiente e porque possui uma integração com o GitHub que deixa o deploy e o controle mais fácil. Deixa bem mais simples de usar, aumentando muito a produtividade.

## OBS do projeto
Estou comitando o .env apenas para que vocês possam testar o backend, por esse motivo tirei ele do gitignore
SERVIDOR ouvindo porta 3333 de padrao
Você ira encontrar tbm um arquivo que exportei do insomnia para testar as rotas

## Endpoints da API:
|  Método | Endpoint  |  Descrição |
|------------|-------------------------|----------------------------------------------|
|   POST     | /users                  |  Logar com um usuário (**)                   |
|   POST     | /classes                |  Criar uma nova aula                         |
|   GET      | /classes                |  Listar aulas cadastradas (*1)               |
|   GET      | /classes/:id            |  Obter detalhes de uma aula pelo o id (*2)   |
|   PUT      | /classes                |  Atualizar o cadastro de uma aula            |
|   DELETE   | /classes/:id            |  Excluir o cadastro de uma aula              |
|   POST     | /classes/comments       |  Cadastrar um comentário de uma aula (*3)    |
|   GET      | /classes/comments       |  Listar todos os comentários de uma aula (*4)|
|   DELETE   | /classes/comments/:id   |  Excluir um comentário                       |

### OBS
(**) O login do usuário pode ser feito com os seguintes dados: <br>
```JSON
{
	"email": "robertotupinamba@gmail.com",
	"password": "11111111"
}
```
o servidor devera responder algo parecido com a imagem abaixo:
![image](https://user-images.githubusercontent.com/41094007/150206562-6879703d-b381-40fc-b54e-0852e129518a.png)
<br><br>
(*1) Nesta rota é possivel passar diferentes tipo de filtros para ela como por exemplo: <br>
Como essa rota foi paginada, limitei ela em 50 aulas, precisando apenas passar por exemplo page=2 na query para buscar mais.
Buscar uma classe pelo nome: <br>
para fazer isso basta passar como parametro para a rota name=/php/i com isso ele ira trazer todas as classes que tem em seu nome php nelas.
```JSON
[
	{
		"_id": "61e78b8f4946edc839cedd06",
		"userId": "61e5deb8e583e519a7e1d5b9",
		"name": "Aula php 3",
		"description": "",
		"video": "fdgddfgddffghhdgggffffggvvffvs",
		"data_init": "2022-01-15T00:00:00.000Z",
		"data_end": "2022-01-26T00:00:00.000Z",
		"total_comments": 0,
		"date_created": "2022-01-19T03:54:55.934Z",
		"date_updated": "2022-01-19T03:54:55.934Z",
		"__v": 0,
		"last_comment": null,
		"last_date_comment": null
	},
	{
		"_id": "61e7848378a3d4ba2c43510a",
		"userId": "61e5deb8e583e519a7e1d5b9",
		"name": "Aula php 2",
		"description": "",
		"video": "fdgddfgddffghhdffffggvvffvs",
		"data_init": "2022-01-15T00:00:00.000Z",
		"data_end": "2022-01-26T00:00:00.000Z",
		"total_comments": 1,
		"date_created": "2022-01-19T03:24:51.224Z",
		"date_updated": "2022-01-19T03:25:09.244Z",
		"__v": 0,
		"last_comment": "ultimo php 2",
		"last_date_comment": "2022-01-19T03:25:09.212Z"
	},
]
```
Tambem se pode filtar por uma data, bastando apenas passar como parametro data_end<2022-02-25, que ira trazer todas as classes que possua essa data de fim menor que a especificada

```JSON
[
	{
		"_id": "61e78ba84946edc839cedd0b",
		"userId": "61e5deb8e583e519a7e1d5b9",
		"name": "Aula js 1",
		"description": "",
		"video": "fdgddfgddffghhdgggffsffggvvffvs",
		"data_init": "2022-01-15T00:00:00.000Z",
		"data_end": "2022-01-26T00:00:00.000Z",
		"total_comments": 3,
		"date_created": "2022-01-19T03:55:20.296Z",
		"date_updated": "2022-01-19T19:19:53.112Z",
		"__v": 2,
		"last_comment": "ultimo js 3",
		"last_date_comment": "2022-01-19T14:56:49.052Z"
	},
]
```





