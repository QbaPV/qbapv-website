@echo off
echo 🔍 DIAGNÓSTICO DEL REPOSITORIO GIT
echo ===============================================================================
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo 📍 Directorio actual: %CD%
echo.

echo 📊 Estado actual de Git:
git status
echo.

echo 🌿 Rama actual:
git branch
echo.

echo 📈 Últimos commits:
git log --oneline -5
echo.

echo 🔗 Repositorio remoto configurado:
git remote -v
echo.

echo 🔄 Intentando fetch para ver estado remoto:
git fetch
echo.

echo 📡 Comparación local vs remoto:
git status
echo.

echo 🚨 Si hay problemas de autenticación, verificar:
echo - GitHub token o credenciales
echo - Configuración de git user.name y user.email
echo.

echo 👤 Configuración de usuario Git:
git config user.name
git config user.email
echo.

echo 🔐 Último intento de push (si falla, mostrará el error):
git push origin main
echo.

pause
