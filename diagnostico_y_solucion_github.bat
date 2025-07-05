@echo off
chcp 65001 > nul
echo.
echo ===============================================================================
echo DIAGNÓSTICO PROBLEMA GITHUB PUSH - 04 JUL 2025
===============================================================================
echo.

echo [PASO 1] Verificando configuración Git actual...
echo.
git config --list | findstr user
echo.

echo [PASO 2] Verificando estado del repositorio...
echo.
git status
echo.

echo [PASO 3] Verificando remote GitHub configurado...
echo.
git remote -v
echo.

echo [PASO 4] Verificando último commit local...
echo.
git log --oneline -3
echo.

echo [PASO 5] Verificando conexión a GitHub...
echo.
git remote show origin
echo.

echo [PASO 6] Intentando push con diagnóstico detallado...
echo.
git push origin main --verbose
echo.

echo ===============================================================================
echo DIAGNÓSTICO COMPLETADO
===============================================================================
echo.
echo Si el push falló, vamos a intentar soluciones:
echo.
echo SOLUCIÓN 1: Verificar si hay conflictos o cambios remotos
git fetch origin
git status
echo.

echo SOLUCIÓN 2: Si hay problemas de autenticación, usar token personal
echo Nota: Es posible que necesites configurar Personal Access Token
echo.

echo SOLUCIÓN 3: Verificar si el repositorio remoto existe y está accesible
echo URL del repositorio: https://github.com/QbaPV/qbapv-website
echo.

echo SOLUCIÓN 4: Force push si es necesario (¡CUIDADO!)
echo Comando: git push origin main --force
echo.

echo ===============================================================================
echo INSTRUCCIONES ADICIONALES:
echo.
echo 1. Si ves errores de autenticación:
echo    - Verifica tu Personal Access Token en GitHub
echo    - Configura: git config --global credential.helper store
echo.
echo 2. Si el repositorio no existe:
echo    - Crea el repositorio en GitHub: https://github.com/new
echo    - Nombre: qbapv-website
echo.
echo 3. Si hay conflictos:
echo    - git pull origin main --rebase
echo    - Resolver conflictos manualmente
echo    - git push origin main
echo.
echo 4. Verificar GitHub después del push:
echo    - https://github.com/QbaPV/qbapv-website/commits/main
echo.
echo ===============================================================================

pause