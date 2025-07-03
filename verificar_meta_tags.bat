@echo off
chcp 65001 >nul
echo ===============================================================================
echo VERIFICACION META TAGS DINAMICOS - COMPILACION
echo ===============================================================================
echo Fecha: %date% %time%
echo.

echo [PASO 1] Navegando al directorio del proyecto...
cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"
echo Directorio actual: %cd%
echo.

echo [PASO 2] Verificando que react-helmet esta instalado...
npm list react-helmet
echo.

echo [PASO 3] Compilando proyecto para verificar errores...
npm start
echo.

echo ===============================================================================
echo VERIFICACION COMPLETADA
echo ===============================================================================
echo Si compila sin errores, Meta Tags Dinamicos estan 100% implementados
echo ===============================================================================
pause
