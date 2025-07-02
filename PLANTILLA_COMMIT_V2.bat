@echo off
chcp 65001 >nul
REM ===============================================================================
REM PLANTILLA ESTÁNDAR PARA SCRIPTS DE COMMIT - PROYECTO PISAAV WEBSITE
REM VERSIÓN 2.0 - LECCIONES APRENDIDAS 02/07/2025
REM ===============================================================================
REM INSTRUCCIONES PARA USO FUTURO:
REM 1. Copiar esta plantilla cuando se necesite un commit
REM 2. Cambiar [TITULO_DEL_COMMIT] por descripción específica
REM 3. Actualizar sección [CATEGORIA_PRINCIPAL] con detalles técnicos
REM 4. Modificar [ESTADO_RESULTADO] según el progreso
REM 5. Ajustar fecha en el mensaje del commit
REM 6. NO USAR EMOJIS en el mensaje del commit (problemas de encoding)
REM ===============================================================================

echo Iniciando commit: [TITULO_DEL_COMMIT]
echo ===============================================================================
echo.

cd /d "C:\Users\pveqb\OneDrive\Documents\Pisaav_Web_Site\qbapv-website"

echo Directorio actual: %CD%
echo.

echo PASO 1: Configurando usuario Git
git config --global user.name "QbaPV"
git config --global user.email "pveqb@gmail.com"
echo Usuario Git configurado.
echo.

echo PASO 2: Verificando estado de Git
git status
echo.

echo PASO 3: Agregando todos los archivos
git add .
echo.

echo PASO 4: Ejecutando commit
git commit -m "feat: [TITULO_DEL_COMMIT]

[CATEGORIA_PRINCIPAL]:
- [CAMBIO_1]
- [CAMBIO_2]
- [CAMBIO_3]

[CATEGORIA_SECUNDARIA]:
- [CAMBIO_A]
- [CAMBIO_B]

ESTADO: [ESTADO_RESULTADO]
Fecha: [FECHA] - [DESCRIPCION_BREVE]"

echo.
echo PASO 5: Subiendo cambios al repositorio remoto
git push origin main

echo.
echo PASO 6: Verificando estado final
git status

echo.
echo EXITO! [TITULO_DEL_COMMIT] completado
echo Verifica en: https://github.com/QbaPV/qbapv-website
echo.
echo PROXIMOS PASOS SUGERIDOS:
echo - Verificar cambios en GitHub
echo - Continuar con siguiente mejora
echo - Actualizar documentacion si es necesario
echo.
pause
