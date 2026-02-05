# 📸 Script de Subida de Imágenes a Backblaze B2

Script interactivo para subir y optimizar imágenes de la página web (NO para productos del admin).

## 🎯 Uso

```bash
node scripts/upload-images-interactive.cjs
```

## 📁 Categorías Disponibles

1. **Hero** - Imágenes principales del hero
2. **Services** - Imágenes de servicios
3. **About** - Imágenes de la sección "nosotros"
4. **Team** - Fotos del equipo
5. **Gallery** - Galería general
6. **Logos** - Logos (Calitop, Topservice, etc.)
7. **Icons** - Iconos y elementos gráficos
8. **Backgrounds** - Fondos y texturas
9. **Certificates** - Certificados y documentos
10. **Projects** - Proyectos realizados

También puedes **crear nuevas categorías** durante la ejecución del script.

## ⚙️ Qué Hace

1. **Optimiza** las imágenes automáticamente
2. **Genera múltiples formatos**:
   - WebP (original, medium, thumb)
   - AVIF (original, medium)
3. **Tamaños generados**:
   - 1920px (Full HD)
   - 1200px (Medium)
   - 600px (Thumbnail)
4. **Sube** a Backblaze B2 en la carpeta correspondiente

## 📋 Ejemplo de Flujo

```
🚀 Script de Subida de Imágenes a Backblaze B2

📁 Ingresa la ruta completa de la carpeta con imágenes: C:\Users\...\mis-imagenes

📋 Selecciona la categoría de destino:
 1. 🎯 Hero - Imágenes principales
 2. ⚙️  Services - Servicios
 ...

🔢 Ingresa el número de categoría (1-11): 1

✅ Categoría seleccionada: hero
¿Continuar con el procesamiento? (y/n): y

🔄 Procesando: imagen1.jpg
  ✅ hero/imagen1.webp
  ✅ hero/imagen1_medium.webp
  ✅ hero/imagen1_thumb.webp
  ...
```

## 💡 Uso en Código

### Next.js Image Component
```jsx
<Image
  src="https://f005.backblazeb2.com/file/CALITOP/hero/mi-imagen.webp"
  alt="Descripción"
  width={1200}
  height={800}
/>
```

### Background CSS
```css
background-image: url('https://f005.backblazeb2.com/file/CALITOP/hero/mi-imagen.webp');
```

### Picture Element (AVIF + WebP)
```html
<picture>
  <source srcSet="https://f005.backblazeb2.com/file/CALITOP/hero/mi-imagen_avif.avif" type="image/avif" />
  <source srcSet="https://f005.backblazeb2.com/file/CALITOP/hero/mi-imagen.webp" type="image/webp" />
  <img src="https://f005.backblazeb2.com/file/CALITOP/hero/mi-imagen.webp" alt="..." />
</picture>
```

## ⚠️ Importante

- Este script es **SOLO para imágenes generales de la página**
- Las imágenes de **productos** se suben desde el **panel admin**
- Las imágenes se optimizan automáticamente (no es necesario optimizarlas antes)
- Formatos aceptados: JPG, JPEG, PNG, WebP, AVIF
