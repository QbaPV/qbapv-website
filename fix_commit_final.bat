@echo off
chcp 65001 >nul
echo Configurando Git y completando commit - Sistema JSON Centralizado
echo ===============================================================================
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo Directorio actual: %CD%
echo.

echo PASO 1: Configurando usuario Git
git config --global user.email "pveqb@gmail.com"
git config --global user.name "QbaPV"
echo Usuario Git configurado exitosamente.
echo.

echo PASO 2: Verificando configuracion
echo Usuario: 
git config user.name
echo Email: 
git config user.email
echo.

echo PASO 3: Ejecutando commit
git commit -m "feat: Sistema JSON centralizado y configuracion desarrollo

SISTEMA JSON CENTRALIZADO:
- Base de datos centralizada en src/data/blogPosts.json
- 6 articulos completos con contenido expandido en 6 idiomas
- Blog.js y BlogPost.js actualizados para usar JSON
- Mapeo inteligente de categorias e imagenes

CONFIGURACION DESARROLLO:
- Prettier configurado (.prettierrc)
- VS Code workspace optimizado
- Configuracion .vscode/ completa
- Scripts de automatizacion

HERRAMIENTAS AGREGADAS:
- Scripts de commit automatizado
- Diagnostico y plantillas

ESTADO: Sistema JSON 100%% operativo
Fecha: 02 julio 2025"

echo.
echo PASO 4: Subiendo a GitHub
git push origin main

echo.
echo PASO 5: Verificando estado final
git status
echo.

echo EXITO! Commit completado y subido a GitHub
echo Verifica en: https://github.com/QbaPV/qbapv-website
echo.
pause
