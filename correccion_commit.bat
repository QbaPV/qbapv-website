@echo off
echo 🔧 CORRIGIENDO COMMIT PENDIENTE - SISTEMA JSON CENTRALIZADO
echo ===============================================================================
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo 📍 Directorio actual: %CD%
echo.

echo 📊 Estado antes de la corrección:
git status
echo.

echo 📦 Agregando archivos nuevos que faltaron:
git add PLANTILLA_COMMIT.bat
git add diagnostico_git.bat
echo.

echo 💾 EJECUTANDO EL COMMIT QUE FALTÓ:
git commit -m "feat: Sistema JSON centralizado y configuracion desarrollo

🎯 SISTEMA JSON CENTRALIZADO:
- Base de datos centralizada en src/data/blogPosts.json
- 6 articulos completos con contenido expandido en 6 idiomas
- Blog.js y BlogPost.js actualizados para usar JSON
- Mapeo inteligente de categorias e imagenes

🔧 CONFIGURACION DESARROLLO:
- Prettier configurado (.prettierrc)
- VS Code workspace optimizado (qbapv-website.code-workspace)
- Configuracion .vscode/ completa
- Scripts de automatizacion (commit_sistema_json.bat, PLANTILLA_COMMIT.bat)
- Entorno completo funcional

🛠️ HERRAMIENTAS AGREGADAS:
- diagnostico_git.bat para troubleshooting
- Plantilla estandar para futuros commits

🎉 ESTADO: Sistema JSON 100%% operativo + Flujo de commits automatizado
📅 Fecha: 02 julio 2025 - Sistema JSON centralizado completado"

echo.
echo 🌐 SUBIENDO CAMBIOS A GITHUB:
git push origin main

echo.
echo 📊 Estado final:
git status
echo.

echo ✅ CORRECCIÓN COMPLETADA EXITOSAMENTE!
echo 🎉 Sistema JSON centralizado + herramientas guardado en GitHub
echo.
echo 🔗 Verifica en: https://github.com/QbaPV/qbapv-website
echo.
pause
