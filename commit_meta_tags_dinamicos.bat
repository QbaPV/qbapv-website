@echo off
chcp 65001 >nul
echo ===============================================================================
echo COMMIT AUTOMATIZADO - META TAGS DINAMICOS COMPLETADOS
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
git commit -m "feat: Meta tags dinamicos implementados completamente

META TAGS DINAMICOS COMPLETADOS:
- Configuracion SEO centralizada en src/config/seoConfig.js
- Componente SEOHead.js con funcionalidad completa Open Graph y Twitter Cards
- React-helmet instalado y configurado correctamente
- Meta tags especificos por pagina en 6 idiomas (ES/EN/PT/FR/DE/IT)

PAGINAS ACTUALIZADAS CON SEO:
- Home.js: Meta tags optimizados para pagina principal
- About.js: SEO corporativo con descripcion de empresa
- Contact.js: Meta tags para formularios de contacto
- Projects.js: SEO para portafolio de proyectos
- Blog.js: Meta tags para listado de articulos
- Register.js: SEO para registro de usuarios

FUNCIONALIDADES SEO:
- Titulos unicos optimizados por pagina
- Meta descriptions especificas para cada seccion
- Keywords relevantes por tipo de contenido
- Open Graph tags para Facebook y LinkedIn
- Twitter Cards para compartir en Twitter
- Canonical URLs para evitar contenido duplicado
- Structured Data JSON-LD para buscadores
- Favicons completos y theme colors para moviles

ESTADO: Meta tags dinamicos 100 por ciento implementados y funcionando
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
echo Meta tags dinamicos guardados en repositorio GitHub
echo Proximo paso: Desplegar al servidor qbapv.com
echo Beneficios: SEO mejorado + Open Graph + Twitter Cards
echo ===============================================================================
echo.
pause
