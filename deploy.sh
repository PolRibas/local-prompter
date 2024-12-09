#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Variables
APP_DIR="/home/grizzly/Documents/domains/grizzly-app"          # Directorio de la aplicación
REPO_DIR="/home/grizzly/Documents/domains/grizzly-app"         # Directorio del repositorio
BRANCH="main"                                # Rama del repositorio
PM2_APP_NAME="grizzly-app"                   # Nombre de la aplicación en PM2
LOG_FILE="/home/grizzly/Documents/domains/grizzly-app/deploy.log"  # Archivo de log


# Redireccionar stdout y stderr al archivo de log
exec >> $LOG_FILE 2>&1

echo "========================================="
nvm use 20 
echo "========================================="
echo "Inicio del despliegue: $(date)"
echo "========================================="

# Navegar al directorio de la aplicación
cd $APP_DIR || { echo "Directorio de la aplicación no encontrado!"; exit 1; }

# Guardar cambios locales (opcional)
git stash

# Obtener los últimos cambios
echo "Obteniendo los últimos cambios de la rama $BRANCH..."
git pull origin $BRANCH || { echo "Error al ejecutar git pull!"; exit 1; }

# Instalar dependencias
echo "Instalando dependencias..."
npm install || { echo "Error al ejecutar npm install!"; exit 1; }

# Construir la aplicación
echo "Construyendo la aplicación..."
npm run build || { echo "Error al ejecutar npm run build!"; exit 1; }

# Reiniciar la aplicación con PM2
echo "Reiniciando la aplicación con PM2..."
pm2 restart $PM2_APP_NAME || { echo "Error al reiniciar la aplicación con PM2!"; exit 1; }

# Guardar la lista de procesos de PM2
pm2 save || { echo "Error al guardar la configuración de PM2!"; exit 1; }

echo "Despliegue exitoso: $(date)"
echo "========================================="
