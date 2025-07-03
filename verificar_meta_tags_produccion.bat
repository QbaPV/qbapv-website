@echo off
chcp 65001 >nul
echo ===============================================================================
echo VERIFICACION META TAGS EN PRODUCCION
echo ===============================================================================
echo.

echo [VERIFICACION 1] Probando acceso directo a qbapv.com...
curl -s -I https://qbapv.com | head -10
echo.

echo [VERIFICACION 2] Buscando meta tags en HTML...
curl -s https://qbapv.com | findstr /i "title\|og:title\|twitter:title" | head -5
echo.

echo [VERIFICACION 3] Verificando si react-helmet esta cargando...
curl -s https://qbapv.com | findstr /i "react\|helmet" | head -3
echo.

echo [VERIFICACION 4] Verificando JavaScript principal...
curl -s https://qbapv.com | findstr /i "main.*\.js"
echo.

echo ===============================================================================
echo VERIFICACION COMPLETADA
echo ===============================================================================
echo Si aparecen meta tags dinamicos, la implementacion funciona
echo Si no aparecen, puede ser problema de cache o compilacion
echo ===============================================================================
pause
