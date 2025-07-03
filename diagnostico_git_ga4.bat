@echo off
chcp 65001 >nul
echo ===============================================================================
echo DIAGNÓSTICO GIT - GOOGLE ANALYTICS 4
echo ===============================================================================
echo Fecha: %date% %time%
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo [PASO 1] Verificando configuración Git...
echo Usuario:
git config user.name
echo Email:
git config user.email
echo.

echo [PASO 2] Estado actual del repositorio...
git status
echo.

echo [PASO 3] Últimos 5 commits...
git log --oneline -5
echo.

echo [PASO 4] Verificando archivos de Google Analytics...
echo Verificando src/config/analytics.js:
if exist "src\config\analytics.js" (
    echo ✅ src/config/analytics.js - EXISTE
) else (
    echo ❌ src/config/analytics.js - NO EXISTE
)

echo Verificando src/App.js con GA4:
findstr /C:"import { initGA, pageview }" src\App.js >nul
if %errorlevel% equ 0 (
    echo ✅ src/App.js - GA4 integrado
) else (
    echo ❌ src/App.js - GA4 NO integrado
)
echo.

echo [PASO 5] Verificando conexión remota...
git remote -v
echo.

echo [PASO 6] Verificando diferencias no guardadas...
git diff --name-only
echo.

echo [PASO 7] Verificando archivos en staging...
git diff --cached --name-only
echo.

echo ===============================================================================
echo DIAGNÓSTICO COMPLETADO
echo ===============================================================================
echo Si hay archivos modificados, necesitamos hacer commit manual
echo Si no hay conexión a GitHub, revisar credenciales
echo ===============================================================================
pause
