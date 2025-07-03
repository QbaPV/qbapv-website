@echo off
chcp 65001 >nul
echo ===============================================================================
echo COMMIT AUTOMATIZADO - GOOGLE ANALYTICS 4 IMPLEMENTADO
echo ===============================================================================
echo Fecha: %date% %time%
echo.

echo [PASO 1] Configurando usuario Git...
git config --global user.name "QbaPV"
git config --global user.email "pveqb@gmail.com"
echo Usuario Git configurado correctamente.
echo.

echo [PASO 2] Navegando al directorio del proyecto...
cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"
echo Directorio actual: %cd%
echo.

echo [PASO 3] Verificando estado del repositorio...
git status
echo.

echo [PASO 4] Agregando archivos modificados...
git add .
echo Archivos agregados al staging area.
echo.

echo [PASO 5] Realizando commit...
git commit -m "feat: Implementacion completa Google Analytics 4

GOOGLE ANALYTICS 4 CONFIGURADO:
- ID de tracking configurado: G-07NB061E1F
- Archivo analytics.js creado en src/config/
- Integracion en App.js para tracking automatico de paginas
- Eventos implementados en Navbar.js para navegacion
- Eventos implementados en LanguageSelector.js para cambios de idioma
- Eventos implementados en Contact.js para formularios
- Eventos preparados para proyectos, blog y engagement

FUNCIONALIDADES:
- Tracking automatico de page views
- Eventos de navegacion y cambios de idioma
- Tracking de envios de formulario exitosos y errores
- Analytics listos para monitoreo en tiempo real

ESTADO: Google Analytics 4 completamente implementado y listo para deployment
Fecha: 03 julio 2025"

if %errorlevel% equ 0 (
    echo ✅ Commit realizado exitosamente
) else (
    echo ❌ Error en el commit
    pause
    exit /b 1
)
echo.

echo [PASO 6] Subiendo cambios a GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo ✅ Push realizado exitosamente a GitHub
) else (
    echo ❌ Error en el push
    pause
    exit /b 1
)
echo.

echo [PASO 7] Verificacion final...
git log --oneline -3
echo.

echo ===============================================================================
echo COMMIT COMPLETADO EXITOSAMENTE
echo ===============================================================================
echo Google Analytics 4 guardado en repositorio GitHub
echo Proximo paso: Verificar funcionamiento en dashboard de Google Analytics
echo Siguiente mejora: Meta tags dinamicos para SEO
echo ===============================================================================
echo.
pause
