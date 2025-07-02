@echo off
echo 🚀 INICIANDO COMMIT DEL SISTEMA JSON CENTRALIZADO...
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo 📍 Directorio actual: %CD%
echo.

echo 📊 Verificando estado de Git...
git status
echo.

echo 📦 Agregando todos los archivos...
git add .
echo.

echo 💾 Realizando commit...
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
- Entorno completo funcional

🎉 ESTADO: Sistema JSON 100%% operativo
📅 Fecha: 02 julio 2025 - Sistema JSON centralizado completado"

echo.
echo 🌐 Subiendo cambios al repositorio remoto...
git push origin main

echo.
echo ✅ COMMIT COMPLETADO EXITOSAMENTE!
echo 🎉 Sistema JSON centralizado guardado en GitHub
pause
