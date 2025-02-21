
# Sistema de Eventos

Sistema de eventos para a avaliação técnica da empresa Weef

## Stack utilizada

**Front-end:** React, Material UI

**Back-end:** Python/Django


## Documentação da API

#### Retorna todos os eventos

```http
GET /api/event
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um evento

```http
GET /api/event/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do item que você quer |

#### Cria um novo evento
```http
  POST /api/event
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `event_name`      | `string` | **Obrigatório**. nome do evento |
| `event_date_time`      | `datetime` | **Obrigatório**. Data e hora do evento (ex: 2025-02-21T14:00:00)|
| `city`      | `string` | **Obrigatório**. Cidade do evento |
| `state`      | `string` | **Obrigatório**. Estado do evento |
| `address`      | `string` | **Obrigatório**. Endereço do evento |
| `number`      | `string` | **Obrigatório**. Número do endereço |
| `complement`      | `string` | Complemento do endereço |
| `phone`      | `string` | **Obrigatório**. Telefone para contato |
| `image`      | `file` | Imagem do evento (opcional) |

#### Atualiza um evento
```http
PUT /api/event/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do evento a ser atualizado |

#### Exclui um evento

```http
DELETE /api/event/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do evento a ser excluído |

## Funcionalidades

- Login com autenticação JWT
- Gerenciamento de eventos


## Instalação

Clone o repositorio no lugar desejado e acesse

```bash
  git clone git@github.com:gbarrosd/test-back-weef.git
```

```bash
  cd <PASTA_DO_REPOSITORIO>
```

Crie e inicie os containers do Docker

```bash
  docker-compose up --build
```
- O que o Docker Compose irá fazer
  - db: Inicia um container com o PostgreSQL
  - backend: Cria o ambiente de backend utilizando o Dockerfile presente no diretório ./backend/
  - frontend: Inicia o frontend com o Dockerfile presente no diretório ./frontend/

- Django (backend) estará disponível em http://localhost:8000.
- O frontend estará disponível em http://localhost:5173.

