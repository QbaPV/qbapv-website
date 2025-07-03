@echo off
chcp 65001 >nul
echo ===============================================================================
echo INSTALACION REACT-HELMET Y FINALIZACION META TAGS DINAMICOS
echo ===============================================================================
echo Fecha: %date% %time%
echo.

echo [PASO 1] Navegando al directorio del proyecto...
cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"
echo Directorio actual: %cd%
echo.

echo [PASO 2] Instalando react-helmet...
npm install react-helmet
echo.

echo [PASO 3] Verificando instalacion...
npm list react-helmet
echo.

echo [PASO 4] Compilando para verificar funcionamiento...
npm run build
echo.

echo ===============================================================================
echo REACT-HELMET INSTALADO
echo ===============================================================================
echo Proximo paso: Completar integracion en Blog.js, Register.js y BlogPost.js
echo Luego hacer commit de Meta Tags Dinamicos completado
echo ===============================================================================
pause
