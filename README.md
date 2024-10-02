# Scrapring App

Scrapring App es una aplicación de escritorio desarrollada con Next.js, TypeScript y JavaScript, utilizando Express y Python FastAPI para el scraping de noticias. La aplicación está empaquetada como una aplicación de escritorio usando Electron.

## Características

- Aplicación de escritorio empaquetada con Electron.
- Frontend desarrollado con Next.js y TypeScript.
- Backend API desarrollado con Express (Node.js).
- Servicio Python FastAPI para realizar el scraping de noticias.
- Scraping de noticias desde varias fuentes.
- Obtención y procesamiento asíncrono de datos.

## Tecnologías

- **Electron**: Para empaquetar la aplicación como una app de escritorio.
- **Next.js**: Para la interfaz frontend.
- **TypeScript & JavaScript**: Para desarrollo tipado y la lógica del servidor.
- **Express**: Para manejar las solicitudes API en el servidor.
- **Python FastAPI**: Para realizar el scraping y servir los datos al backend.
  
## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

### Requisitos

- Node.js (>= 16.x.x)
- Python (>= 3.x.x)
- npm o yarn instalado globalmente.

### Clonar el repositorio

```bash
git clone https://github.com/gabykap29/scrapring_app.git
cd scrapring_app
```

### Configuración del Backend (FastAPI)

1. Navega a la carpeta fastapi:
```bash
cd fastapi
```
2.  Crea un entorno virtual:
```bash
python3 -m venv env
source env/bin/activate   # En Windows, usa `env\Scripts\activate`
```
3. Instala las dependencias:

```bash
pip install -r requirements.txt
```

4. Inicia el servidor FastAPI:

```bash
uvicorn main:app --reload
```
### Configuración del Backend (Express)
1. Navega a la carpeta express:
```bash
cd express
```
2. Instala las dependencias:

```bash
npm install
```
4. Inicia el servidor Express:

```bash
npm run dev
```
### Configuración del Frontend (Next.js)

1. Navega a la carpeta frontend:

```bash
cd frontend
```
2. Instala las dependencias:
```bash
npm install
```
3. Ejecuta la app de Next.js en modo de desarrollo:
```bash
npm run dev
```
### Configuración de Electron

1. Después de configurar el backend y frontend, navega a la raíz del proyecto:

```bash
cd ../  # Regresa al directorio raíz
```
2. Instala las dependencias de Electron:

```bash
npm install
```
3. Inicia la aplicación Electron:

```bash
npm run electron-dev
```
### Uso
Una vez que la aplicación esté en funcionamiento, la interfaz frontend, desarrollada con Next.js, permitirá a los usuarios interactuar con los datos de noticias extraídas, mientras que la API del backend de Express gestionará las solicitudes al scraper de FastAPI.
