@echo off
chcp 65001 >nul
echo ===============================================================================
echo INSTALACIÓN DEPENDENCIAS PANEL DE ADMINISTRACIÓN
echo ===============================================================================
echo.

echo 🔧 Instalando Lucide React (iconos)...
npm install lucide-react

echo.
echo 📦 Verificando React Router DOM...
npm list react-router-dom

echo.
echo ✅ Dependencias instaladas correctamente
echo.
echo 📋 PRÓXIMOS PASOS:
echo 1. Agregar rutas del admin a App.js
echo 2. Agregar AuthProvider al App principal
echo 3. Probar login con admin/qbapv2025
echo.
echo 🌐 URLs del Panel Admin:
echo - Login: http://localhost:3000/admin/login
echo - Dashboard: http://localhost:3000/admin/dashboard
echo.
pause
