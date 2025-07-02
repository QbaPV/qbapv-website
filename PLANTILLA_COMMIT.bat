@echo off
REM ===============================================================================
REM PLANTILLA ESTÁNDAR PARA SCRIPTS DE COMMIT - PROYECTO PISAAV WEBSITE
REM ===============================================================================
REM INSTRUCCIONES PARA USO FUTURO:
REM 1. Copiar esta plantilla cuando se necesite un commit
REM 2. Cambiar TÍTULO_DEL_COMMIT por descripción específica
REM 3. Actualizar sección CAMBIOS_REALIZADOS con detalles técnicos
REM 4. Modificar ESTADO_RESULTADO según el progreso
REM 5. Ajustar fecha en el mensaje del commit
REM ===============================================================================

echo 🚀 INICIANDO COMMIT: [TÍTULO_DEL_COMMIT]
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
git commit -m "feat: [TÍTULO_DEL_COMMIT]

🎯 [CATEGORÍA_PRINCIPAL]:
- [CAMBIO_1]
- [CAMBIO_2]
- [CAMBIO_3]

🔧 [CATEGORÍA_SECUNDARIA]:
- [CAMBIO_A]
- [CAMBIO_B]

🎉 ESTADO: [ESTADO_RESULTADO]
📅 Fecha: [FECHA] - [DESCRIPCIÓN_BREVE]"

echo.
echo 🌐 Subiendo cambios al repositorio remoto...
git push origin main

echo.
echo ✅ COMMIT COMPLETADO EXITOSAMENTE!
echo 🎉 [TÍTULO_DEL_COMMIT] guardado en GitHub
echo.
echo 📋 PRÓXIMOS PASOS SUGERIDOS:
echo - Verificar cambios en GitHub
echo - Continuar con siguiente mejora
echo - Actualizar documentación si es necesario
echo.
pause
