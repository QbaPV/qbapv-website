@echo off
chcp 65001 >nul
echo.
echo ===============================
echo SUBIENDO CAMBIOS A GITHUB
echo ===============================
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo Configurando usuario Git...
git config --global user.name "QbaPV"
git config --global user.email "pveqb@gmail.com"

echo.
echo Estado actual:
git status

echo.
echo Subiendo cambios a GitHub...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo CAMBIOS SUBIDOS EXITOSAMENTE A GITHUB
    echo ========================================
    echo.
    echo Estado: LISTO PARA DESPLIEGUE
    echo Repositorio: https://github.com/QbaPV/qbapv-website
    echo Hash del commit: f70cbdc
    echo.
    echo PROXIMO PASO: Conectar a Digital Ocean
    echo.
) else (
    echo Error al subir a GitHub
    echo Intentando de nuevo...
    git push origin main
)

echo.
echo Presiona cualquier tecla para continuar...
pause >nul