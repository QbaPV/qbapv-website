@echo off
chcp 65001 >nul
echo ===============================================================================
echo DIAGNOSTICO COMMIT META TAGS DINAMICOS
echo ===============================================================================
echo Fecha: %date% %time%
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo [PASO 1] Estado actual del repositorio...
git status
echo.

echo [PASO 2] Ultimos 5 commits...
git log --oneline -5
echo.

echo [PASO 3] Verificando archivos modificados...
echo Verificando si SEOHead.js existe:
if exist "src\components\SEOHead.js" (
    echo ✅ SEOHead.js - EXISTE
) else (
    echo ❌ SEOHead.js - NO EXISTE
)

echo Verificando si seoConfig.js existe:
if exist "src\config\seoConfig.js" (
    echo ✅ seoConfig.js - EXISTE
) else (
    echo ❌ seoConfig.js - NO EXISTE
)

echo Verificando react-helmet en package.json:
findstr "react-helmet" package.json
echo.

echo [PASO 4] Verificando diferencias no guardadas...
git diff --name-only
echo.

echo [PASO 5] Verificando archivos en staging...
git diff --cached --name-only
echo.

echo [PASO 6] Verificando conexion remota...
git remote -v
echo.

echo ===============================================================================
echo DIAGNOSTICO COMPLETADO
echo ===============================================================================
echo Revisar si hay archivos pendientes de commit o problemas de conexion
echo ===============================================================================
pause
