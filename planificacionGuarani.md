# Proyecto Guarani

Este es un proyecto donde el usuario pueda aprender idomas o palabras en guarani , que cosnta de un frontend, un backend y una base de datos

## Stack tecnologico

Frontend: React, vite, tailwind, react router.

Backend: Java spring-boot,jwt,hibernate/jpa

Base de datos: Postgresql

## Funcionalidades
### Funcionalidad 1 

La funcionalidad 1 es el login de usuarios

### Funcionalidad 2 

La funcionalidad 2 es un buscador de palabras en guarani

### Funcionalidad 3

funcionalidad 3 se especializa en traducir al usuario el resultado de su pregunta o palabra buscada en guarani traducido al español

### Funcionalidad 4

se incluye en el proyecto o diccionario digital del guarani los acentos y oraciones que se puedan utilizar en la vida cotidiana tanto en una conversacion como para dar clases en las  escuelas donde no se enseña el idoma guarani en la Argentina

## Flujo del trabajo

Utilizaremos un monorepo para gestionar el proyecto completo. con un docker-compose para orquestar su despliegue.
El repo remoteo se encuentra en: <link_repo>
https://github.com/Maycol2007ARG/ProyectoDiccionarioGuarani.git
Creamos diferentes perfiles de desarrollo en vite para poder ejecutar de manera individual el frontend o backend desde el metadirectorio.

## Varios
-Zonas horiarias: utilizar la zona horaria UTC para la base de datos y configurar los timestamps automaticamente dependiendo de la zona horaria del cliente
-