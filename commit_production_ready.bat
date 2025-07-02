@echo off
chcp 65001 >nul
echo.
echo =====================================================
echo COMMIT: ARCHIVOS DE PRODUCCION LISTOS PARA DESPLIEGUE
echo =====================================================
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo Configurando usuario Git...
git config --global user.name "QbaPV"
git config --global user.email "pveqb@gmail.com"

echo.
echo Estado actual del repositorio:
git status

echo.
echo Agregando archivos al staging...
git add .

echo.
echo Realizando commit...
git commit -m "feat: Archivos de produccion optimizados para despliegue

CATEGORIA PRINCIPAL: CONFIGURACION DE PRODUCCION
- Server.js optimizado con CORS para qbapv.com
- Variables de entorno de produccion configuradas
- Script de despliegue automatizado para Digital Ocean
- Guia de despliegue manual completa
- Configuracion nginx incluida
- Health check endpoint agregado
- Error handling mejorado

ARCHIVOS NUEVOS:
- server_production.js - Configuracion optimizada
- deploy_production.sh - Script automatizado
- Guia de despliegue manual

ARCHIVOS ACTUALIZADOS:
- .env.production - URLs y configuracion de qbapv.com
- Variables de entorno para Mailgun configuradas

ESTADO: Listo para despliegue inmediato a Digital Ocean
IP SERVIDOR: 143.198.52.139 (qbapv.com)
Fecha: 02 julio 2025"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Commit realizado exitosamente
    echo.
    echo Subiendo cambios a GitHub...
    git push origin main
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ========================================
        echo ARCHIVOS DE PRODUCCION GUARDADOS
        echo ========================================
        echo.
        echo Estado: LISTO PARA DESPLIEGUE
        echo Servidor: 143.198.52.139 (qbapv.com)
        echo Repositorio actualizado en GitHub
        echo.
        echo PROXIMOS PASOS:
        echo 1. Conectar a Digital Ocean Console
        echo 2. Ejecutar comandos de despliegue
        echo 3. Verificar funcionamiento
        echo.
    ) else (
        echo Error al subir a GitHub
    )
) else (
    echo Error en el commit
)

echo.
echo Estado final del repositorio:
git status

echo.
echo Presiona cualquier tecla para continuar...
pause >nul