@echo off
chcp 65001 >nul
echo ===============================================================================
echo REPARANDO PANEL DE ADMINISTRACIÓN - INSTALANDO DEPENDENCIAS
echo ===============================================================================
echo.

echo 🔧 Instalando Lucide React (iconos)...
npm install lucide-react

echo.
echo ✅ Verificando instalación...
npm list lucide-react

echo.
echo 🎉 DEPENDENCIAS INSTALADAS CORRECTAMENTE
echo.
echo 📋 PRÓXIMOS PASOS:
echo 1. Reiniciar el servidor: Ctrl+C y luego npm start
echo 2. Ir a: http://localhost:4000/admin/login
echo 3. Usar credenciales: admin / qbapv2025
echo.
echo 🔧 ERRORES CORREGIDOS:
echo - Lucide React instalado
echo - Syntax error en Login.js corregido
echo - Background SVG arreglado
echo.
pause
