# Práctica SOLID - Empleados y Salarios

Esta versión funciona, pero está deliberadamente mal estructurada.

## Objetivo

Refactorizar el servidor aplicando una separación clara de responsabilidades:

- controllers
- routes
- services
- repository
- models
- errorHandler

## Regla de negocio

El salario final se calcula así:

**salario final = salario base + 2% del salario base por cada año de antigüedad**

Ejemplo:

- Salario base: 1.000.000
- Antigüedad: 5 años
- Adicional: 10%
- Salario final: 1.100.000

## Endpoints requeridos

- POST /employees
- GET /employees
- GET /employees/:id

## Cómo ejecutar

```bash
cp .env.example .env
docker compose up -d
npm install
npm run dev
```

## Consigna

Identificar los problemas del diseño actual y refactorizarlo.
El comportamiento observable de la API debe mantenerse.

## Problemas identificados en el diseño original

Todo vivía en `src/server.ts`:

- **SRP**: un solo archivo definía el schema, validaba, calculaba el salario, accedía a la base, armaba las respuestas HTTP y levantaba el servidor.
- **DIP**: los handlers usaban directamente el modelo de Mongoose; no había forma de cambiar la persistencia ni de testear sin base de datos.
- **Manejo de errores duplicado**: cada endpoint repetía su `try/catch` con el mismo 500.
- **Regla de negocio enterrada**: el cálculo del salario estaba embebido en el handler del POST, sin poder reutilizarlo ni testearlo aislado.
- **Inicialización acoplada**: la creación de la app y la conexión a Mongo estaban mezcladas.

## Estructura resultante

```
src/
├── server.ts                  # bootstrap: conecta a Mongo y levanta la app
├── app.ts                     # crea la app Express y arma las dependencias (composition root)
├── routes/                    # mapeo de URL -> controller
├── controllers/               # traduce HTTP <-> service (sin lógica de negocio)
├── services/                  # casos de uso; depende de la interfaz IEmployeeRepository
├── repository/                # acceso a datos (Mongoose) detrás de IEmployeeRepository
├── models/                    # schema de Mongoose y tipos
├── validators/                # validación del input de creación
├── utils/salary.ts            # regla de negocio: salario final
├── errors/HttpError.ts        # error de dominio con status code
└── middlewares/errorHandler.ts # manejo centralizado de errores
```

Las respuestas (status codes, mensajes y cuerpos) de los tres endpoints se mantienen idénticas a la versión original.
