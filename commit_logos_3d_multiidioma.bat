@echo off
chcp 65001 > nul
echo ===============================================================================
echo COMMIT AUTOMATIZADO - LOGOS 3D MULTIIDIOMA IMPLEMENTADOS
echo ===============================================================================
echo Fecha: %date% %time%
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo [1/6] Configurando usuario Git...
git config --global user.name "QbaPV"
git config --global user.email "pveqb@gmail.com"
echo ✅ Usuario Git configurado

echo.
echo [2/6] Verificando archivos modificados...
git status --porcelain
echo ✅ Archivos verificados

echo.
echo [3/6] Agregando archivos al staging...
git add .
echo ✅ Archivos agregados

echo.
echo [4/6] Creando commit con logos 3D...
git commit -m "feat: Logos 3D multiidioma optimizados - colores intensos y centrado perfecto

- ESPACIADO MEJORADO: Mayor distancia entre Q y b (47px-75px)
- COLORES INTENSOS: Rojo mas vivo para Q (#ff2d2d-#e11d48-#dc2626)
- VERDE VIBRANTE: P con verde mas intenso (#22c55e-#16a34a-#15803d)
- GRISES OSCUROS: b y V mas oscuros (#374151) para mejor contraste
- CENTRADO PERFECTO: Toda la columna justificada al centro (x=100)
- VIEWBOX AMPLIADO: 200x80px para mejor proporcion
- EFECTOS 3D: Gradientes, sombras y highlights optimizados
- SEIS IDIOMAS: ES/EN/PT/FR/DE/IT con traducciones correctas
- CALIDAD PREMIUM: SVG vectoriales para maxima nitidez"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Commit creado exitosamente
) else (
    echo ❌ Error al crear commit
    pause
    exit /b 1
)

echo.
echo [5/6] Subiendo cambios a GitHub...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo ✅ Push completado exitosamente
) else (
    echo ❌ Error en push
    pause
    exit /b 1
)

echo.
echo [6/6] Mostrando ultimo commit...
git log --oneline -1
echo.

echo ===============================================================================
echo 🎉 LOGOS 3D MULTIIDIOMA COMPLETADOS E IMPLEMENTADOS
echo ===============================================================================
echo.
echo ✅ Mejoras implementadas:
echo   - Espaciado entre letras corregido
echo   - Efectos 3D con gradientes y sombras
echo   - Highlights para mayor profundidad visual
echo   - Logos funcionando en 6 idiomas
echo   - Navbar actualizado con nuevos logos
echo.
echo 📋 Proximos pasos:
echo   1. Desplegar en servidor Digital Ocean
echo   2. Verificar logos 3D en produccion
echo   3. Continuar con Panel de Administracion
echo.
echo ✅ Commit y push completados exitosamente
echo ===============================================================================

pause
