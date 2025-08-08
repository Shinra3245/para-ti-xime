# 💖 Para Ti — Animación Interactiva

Este proyecto es una página web interactiva diseñada como un detalle especial para una persona querida. Combina animaciones CSS y JavaScript para crear un ambiente romántico y visualmente atractivo.

## ✨ Características

- **Lluvia de corazones** constante en el fondo, con corazones extra que aparecen al hacer clic o tocar la pantalla.
- **Corazón central** formado por una cuadrícula de puntos que aparecen secuencialmente con animación.
- **Ramo de flores SVG** que se dibuja y florece de forma progresiva.
- **Optimización de rendimiento**:
  - Menor densidad y tamaño de elementos en dispositivos móviles.
  - Animaciones optimizadas con `animation-delay` en lugar de múltiples `setTimeout`.
  - Dibujo por lotes del ramo con `requestAnimationFrame`.
  - Pool de elementos reutilizables para los corazones generados por clic.
  - Uso de `will-change` para mejoras de rendimiento en GPU.

## 📂 Estructura del proyecto

```plaintext
index.html      # Página principal con HTML, CSS y JS integrados
```

> *No requiere dependencias externas. Todo el código y estilos están incluidos en un solo archivo HTML.*

## 🚀 Uso

1. Clona o descarga este repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. Disfruta de la animación:
   - Corazones cayendo de fondo.
   - Haz clic o toca la pantalla para generar corazones adicionales.
   - Observa cómo el corazón central se forma y el ramo florece.

## 📱 Compatibilidad

- Compatible con navegadores modernos.
- Adaptado para pantallas móviles y de escritorio.
- Incluye soporte para usuarios con **preferencia de reducción de movimiento** (`prefers-reduced-motion`).

## 🛠 Personalización

Puedes modificar fácilmente:
- Colores (`:root` en CSS).
- Texto de los mensajes.
- Cantidad y tamaño de puntos del corazón.
- Número de pétalos del ramo.

## 📄 Licencia

Este proyecto se distribuye con fines personales y educativos. Puedes modificarlo y adaptarlo para tus propios proyectos, pero se recomienda dar crédito al autor original.

---
Hecho Por Omar Bolaños con ❤️ y mucho cariño.
