# CrimsonReel
**Por:** Alejandra Valencia Rua

Una aplicación web para descubrir y explorar series de televisión, construida con React y Tailwind.

![Aplicación en Vercel de CrimsonReel](https://crimson-reel-two.vercel.app/)

## ✨ Características Principales

- Diseño oscuro con estética **vino tinto** (burgundy theme)
- Exploración de series usando la **TVMaze API** (datos en tiempo real)
- Búsqueda por nombre + filtros dinámicos por género e idioma
- Sistema de favoritos persistente entre rutas
- Página de detalles completa de cada serie
- Formulario de contacto con validación y modal de confirmación
- Estados completos: **Loading**, **Error** y **Empty**
- Modal con **dark pattern** intencional
- Notificaciones toast con auto-dismiss
- Totalmente **responsive** (móvil, tablet y escritorio)
- SVG inline personalizado
- Buenas prácticas de accesibilidad

## 🛠️ Tecnologías Utilizadas

- **React 18** + **Vite**
- **React Router DOM** v6
- **Tailwind CSS**
- **TVMaze API**
- **Context API** (manejo de favoritos)
- **localStorage** (persistencia)
- `<dialog>` nativo + `useRef`
- Custom Hooks


## 🖥️ Cómo ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/TU-USUARIO/crimson-reel.git

# Entrar en la carpeta del proyecto
cd crimson-reel

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```