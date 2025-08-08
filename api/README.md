# Challenges API

## Banco de dados

- PostgreSQL
- Prisma ORM

### Prisma Generators

- Foi usado o generator `zod-prisma` para criar, num primeiro momento, os schemas do Zod a partir do prisma.schema;
- Foi usado o generator `prisma-dbml-generator` para criar o arquivo `dbml` que representa a estrutura do banco de dados, podendo ser visualizado graficamente no [dbdiagram](https://dbdiagram.io)

## Arquitetura do projeto

O projeto utiliza **NestJS** através da **Clean Architecture**, com a separação dos domínios em módulos e o compartilhamento de um **núcleo central** (core) com tudo o que é utilizado dentre os **módulos**.

### Camadas

- src
  - core
    - application
      - abstractions
      - adapters
      - dtos
      - locales
      - schemas
      - use-cases
      - utils
    - domain
      - constants
      - entities
    - infra
      - controllers
      - decorators
      - errors
      - factories
      - filters
      - repositories
      - services
  - modules
    - domain-name
      - **mocks**
      - application
      - domain
      - infra

Cada módulo possui é dividido nas seguintes camadas (na ordem da direção das dependências):

&darr; infra
&darr; application
&darr; domain

A regra é que uma camada só pode depender das camadas abaixo, mas uma camada mais abaixo não pode NUNCA depender de uma camada acima
