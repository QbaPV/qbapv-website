@echo off
chcp 65001 > nul
echo ===============================================================================
echo DESPLIEGUE LOGOS 3D AL SERVIDOR DIGITAL OCEAN
echo ===============================================================================
echo Servidor: 143.198.52.139
echo Proyecto: qbapv-website
echo Fecha: %date% %time%
echo.

echo [1/5] Conectando al servidor y actualizando codigo...
ssh root@143.198.52.139 "cd /var/www/html/qbapv-website && git pull origin main"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Codigo actualizado en servidor
) else (
    echo ❌ Error al actualizar codigo
    pause
    exit /b 1
)

echo.
echo [2/5] Verificando nuevos logos 3D en servidor...
ssh root@143.198.52.139 "ls -la /var/www/html/qbapv-website/src/assets/logos/*-3d.svg"

echo.
echo [3/5] Instalando dependencias si es necesario...
ssh root@143.198.52.139 "cd /var/www/html/qbapv-website && npm install"

echo.
echo [4/5] Generando nuevo build con logos 3D...
ssh root@143.198.52.139 "cd /var/www/html/qbapv-website && npm run build"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build generado exitosamente
) else (
    echo ❌ Error en build
    pause
    exit /b 1
)

echo.
echo [5/5] Verificando servicios del servidor...
ssh root@143.198.52.139 "pm2 status && systemctl status nginx --no-pager -l"

echo.
echo ===============================================================================
echo 🚀 VERIFICACION FINAL - LOGOS 3D EN PRODUCCION
echo ===============================================================================
echo.
echo 🌐 Sitio web: https://qbapv.com
echo.
echo ✅ Pasos completados:
echo   - Codigo actualizado en servidor
echo   - Logos 3D verificados en servidor
echo   - Build regenerado con nuevos logos
echo   - Servicios verificados (PM2 + Nginx)
echo.
echo 📋 Verificacion manual requerida:
echo   1. Abrir https://qbapv.com en navegador
echo   2. Verificar que logos 3D aparezcan correctamente
echo   3. Cambiar idioma y confirmar logos cambian
echo   4. Verificar efecto 3D en todos los idiomas
echo   5. Confirmar responsive en movil
echo.
echo ✅ Despliegue completado - Verificar manualmente sitio web
echo ===============================================================================

pause
