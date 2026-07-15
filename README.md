# Proyecto Diccionario Guarani

Plataforma digital interactiva para aprender el idioma Guarani, basada en datos oficiales
de la Secretaria de Politicas Linguisticas (SPL) del Paraguay.

## Objetivo

Que cualquier persona pueda aprender Guarani de forma autodidacta, con traducciones
precisas, pronunciacion, ejercicios interactivos y contenido categorizado por temas
cotidianos. Disenado para uso en escuelas donde no se ensena el idioma en Argentina.

## Datos Fuente

- **CSV Oficial SPL**: https://www.datos.gov.py/dataset/vocabularios-del-guarani-al-espanol
- **CSV Oficial SPL**: https://www.datos.gov.py/dataset/vocabularios-del-espanol-al-guarani
- **Portal traductor**: https://www.paraguay.gov.py/traductor-guarani
- **~15,000+ entradas** con acentos guaranies completos (Ã, E, I, N, O, U, Y)

## Stack Tecnologico

| Capa          | Tecnologia                       |
|---------------|----------------------------------|
| Frontend      | React + Vite + Tailwind CSS      |
| Routing       | React Router                     |
| Backend       | Java Spring Boot                 |
| Seguridad     | JWT + BCrypt                     |
| ORM           | Hibernate / JPA                  |
| Base de datos | PostgreSQL                       |
| Orquestacion  | Docker Compose (monorepo)        |
| Plataforma    | PWA (Progressive Web App)        |

## Estructura del Proyecto

```
ProyectoDiccionarioGuarani/
├── docker-compose.yml
├── README.md
├── planificacionGuarani.md
├── session_summary.md
├── frontend/                     # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/           # Navbar, SearchBar, WordCard, AudioButton, etc.
│   │   ├── pages/                # Home, Login, Register, Search, etc.
│   │   ├── context/              # AuthContext
│   │   ├── hooks/                # useAuth
│   │   └── services/             # api.js (axios)
│   ├── public/
│   │   └── manifest.json         # PWA manifest
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
├── backend/                      # Spring Boot
│   ├── src/main/java/com/guarani/
│   │   ├── config/               # SecurityConfig, JwtAuthFilter, WebConfig
│   │   ├── controller/           # Auth, Word, Quiz, Favorite, etc.
│   │   ├── model/                # User, Word, Category, Quiz, Phrase, etc.
│   │   ├── repository/           # JPA Repositories
│   │   ├── service/              # Auth, Jwt, Word, Quiz, etc.
│   │   └── dto/                  # Request/Response DTOs
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── data.sql              # Seed data desde CSV
│   └── Dockerfile
└── data/
    ├── traductor-espanol-guarani.csv
    └── traductor-guarani-espanol.csv
```

## Funcionalidades

### 1. Autenticacion de Usuarios
- Registro con nombre, email y contrasena (BCrypt)
- Login con JWT (token expirable)
- Rutas protegidas

### 2. Buscador de Palabras
- Busqueda por prefijo/parcial en espanol y guarani
- Soporte completo de acentos guaranies (UTF-8 con collation especial)
- Resultados instantaneos

### 3. Traduccion Bidireccional
- Espanol -> Guarani y Guarani -> Espanol
- Muestra todas las traducciones posibles para una palabra
- Visualizacion del significado completo

### 4. Acentos y Oraciones Cotidianas
- Todas las palabras incluyen caracteres especiales del guarani
 Frases utiles para conversacion diaria y uso escolar

### 5. Categorias Tematicas
- Animales, Colores, Familia, Comida, Numeros, Saludos, Profesiones, Partes del cuerpo
- Navegacion por categoria para aprendizaje dirigido

### 6. Quiz / Cuestionarios
- Tests de opcion multiple (4 opciones por pregunta)
- Generados por nivel de dificultad
- Retroalimentacion inmediata (correcto/incorrecto)
- Puntuacion y estadisticas

### 7. Favoritos
- Guardar palabras en lista personal
- Repaso rapido desde la seccion de favoritos

### 8. Historial de Busquedas
- Registro de las ultimas palabras consultadas
- Reacceso rapido a busquedas anteriores

### 9. Frase del Dia
- Frase cotidiana en guarani con traduccion al espanol
- Audio de pronunciacion
- Rotacion diaria automatica

### 10. Pronunciacion con Audio
- Boton de audio por palabra
- Web Speech API + audios del portal oficial del gobierno

### 11. Sistema de Niveles y Progreso
- 3 niveles: Principiante (1), Intermedio (2), Avanzado (3)
- Palabras asignadas por nivel de dificultad
- XP acumulado por actividades

### 12. Tablero de Logros
- Badges desbloqueables:
  - Primera Palabra: buscar tu primera palabra
  - Racha de 7: usar la app 7 dias seguidos
  - Bibliotecario: aprender 100 palabras
  - Maestro Guarani: completar todos los quizzes
  - Colecccionista: guardar 50 favoritos
  - Precision Perfecta: quiz sin errores

### 13. Modo Offline (PWA)
- Service Worker para cachear assets y datos
- Instalable desde el navegador en celular
- Funciona sin conexion a internet

## Datos y Seed

Los datos se importan desde los CSVs oficiales del gobierno de Paraguay:
- **~15,000+ entradas** espanol <-> guarani
- Formato UTF-8 con acentos completos
- Frases cotidianas creadas manualmente para aprendizaje

## Ejecucion

```bash
# Clonar el repositorio
git clone https://github.com/Maycol2007ARG/ProyectoDiccionarioGuarani.git
cd ProyectoDiccionarioGuarani

# Levantar con Docker Compose
docker-compose up --build

# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
```

## Plataforma

| Plataforma | Como usar                                        |
|------------|--------------------------------------------------|
| Windows    | Docker Compose en terminal                        |
| Linux      | Docker Compose en terminal                        |
| Celular    | Abrir en navegador -> "Agregar a pantalla" (PWA)  |

## Licencia

Uso de datos: Licencia de Uso de la Informacion Publica del Gobierno Paraguay
