# Pokedex Challenge – DeCampoaCampo

**Autor:** Francisco Bermudez (Frontend Developer)

---

## 📦 Descripción

Este proyecto es un **challenge técnico** realizado para la empresa **deCampoaCampo**. Consiste en una aplicación de Pokedex sencilla que consume la [PokéAPI](https://pokeapi.co/) y muestra tarjetas con información básica de cada Pokémon.

---

## 🎯 Objetivo

- Mostrar una lista de tarjetas de Pokémon.
- Cada tarjeta debe incluir:
  - Imagen del Pokémon.  
  - Nombre.  
  - Tipos.  
  - Peso.

---

## 🛠 Herramientas y enfoques recomendados

- **Vite**  
  Configuración rápida y recarga en caliente para un desarrollo ágil.

- **Styled Components**  
  Gestión de estilos en componentes React de forma modular y elegante.

- **Redux Toolkit**  
  Manejo de estado global de la aplicación (lista de Pokémon, detalles, estado de carga).

- **Compound Pattern**  
  Arquitectura de componentes escalable:  
  - `<Container>`: orquesta fetch y control de estado.  
  - `<CardsContainer>`: muestra la lista paginada con el título del proyecto.  
  - `<Card>`: tarjeta individual que muestra inicialmente imagen y nombre.  
  - `<CardDetails>`: modal con detalle avanzado que completan lo pedido en el challenge.

---

## 🚀 Instalación

1. **Clona el repositorio**  
   ```bash
   git clone https://github.com/bermudezfran/pokedex.git
   cd pokedex
   npm install
