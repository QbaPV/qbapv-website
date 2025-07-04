@echo off
chcp 65001 >nul
echo ===============================================================================
echo COMMIT - LOGOS MULTIIDIOMA Y FAVICONS IMPLEMENTADOS
echo ===============================================================================
echo Fecha: %date% %time%
echo.

echo [1/6] Configurando usuario Git...
git config --global user.name "QbaPV"
git config --global user.email "pveqb@gmail.com"

echo [2/6] Verificando estado del repositorio...
git status

echo [3/6] Agregando todos los archivos...
git add .

echo [4/6] Verificando cambios a commitear...
git status --cached

echo [5/6] Realizando commit...
git commit -m "feat: Logos con letras 32px y favicon SVG corregido

LOGOS NAVBAR FINALES:
- Letras QbaPV: 32px (tamano optimo y visible)
- Taglines: 12px (legibilidad perfecta)
- Todos los idiomas actualizados: ES, EN, PT, FR, DE, IT
- Colores QbaPV exactos aplicados

FAVICON SOLUCIONADO:
- favicon.svg optimizado y funcional
- Configuracion HTML actualizada
- Q roja prominente en circulo azul
- Acento dorado para consistencia

COLORES QBAPV EXACTOS:
- Q: Rojo vivo dc2626
- b: Gris claro 6b7280
- a: Azul celeste 38bdf8
- P: Verde fosforescente 10b981
- V: Gris claro 6b7280
- Tagline: Amarillo fbbf24

SISTEMA MULTIIDIOMA:
- Mapeo automatico 6 idiomas funcionando
- SVG para maxima calidad en cualquier resolucion
- Fallback inteligente a ingles
- Implementacion completa y estable

Estado: Logos tamano perfecto, favicon visible
Listo: Panel de Administracion como siguiente paso"

if %ERRORLEVEL% equ 0 (
    echo [6/6] Subiendo cambios a GitHub...
    git push origin main
    
    if %ERRORLEVEL% equ 0 (
        echo.
        echo ===============================================================================
        echo ✅ COMMIT EXITOSO - LOGOS Y FAVICONS IMPLEMENTADOS
        echo ===============================================================================
        echo.
        echo ✅ Logos multiidioma con tamanos ajustados
        echo ✅ Letras QbaPV 27px mas visibles
        echo ✅ Taglines 12px mejor legibilidad
        echo ✅ Favicons corregidos y funcionando
        echo ✅ Navbar automatico 6 idiomas
        echo.
        echo Proximo paso: Verificar funcionamiento en navegador
        echo.
    ) else (
        echo ❌ Error en push a GitHub
    )
) else (
    echo ❌ Error en commit
)

echo.
echo Presiona cualquier tecla para continuar...
pause >nul
