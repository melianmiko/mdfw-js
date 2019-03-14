@echo off
cd %~dp0

if "%1"=="build" goto build
if "%1"=="mkdocs" goto docs
if "%1"=="optimize" goto opti
echo No action provided.
goto exit

:opti
echo Rebuild...
call :build
echo uglifyjs...
call node_modules\.bin\uglifyjs dist\mdfw.js -o dist\mdfw.min.js
echo cleancss...
call node_modules\.bin\cleancss -o dist\mdfw.min.css dist\mdfw.css
echo done
goto exit

:docs
echo Starting ESDoc...
call node_modules\.bin\esdoc
goto exit

:build
if exist dist RD /S /Q dist
mkdir dist
if errorlevel 1 goto exit

echo Building stylesheets using sass...
call sass src\scss\index.scss dist\mdfw.css
if errorlevel 1 goto exit

echo Merging js files...

echo /* >> dist\mdfw.js
echo. * Material Design Framework.js>> dist\mdfw.js
echo. * by mhb, https://github.com/mhbrgn/MDFWjs>> dist\mdfw.js
echo. * >> dist\mdfw.js
echo. * License: GPL v3 https://github.com/mhbrgn/MDFWjs/blob/master/LICENSE >> dist\mdfw.js
echo. */ >> dist\mdfw.js
echo. >> dist\mdfw.js

for /f "usebackq delims=|" %%f in (`dir /b "src\js"`) do call :mergefile %%f

echo Copyring assets...
xcopy /y /s src\res dist

goto exit

:mergefile
echo // Merge file %1 >> dist\mdfw.js
type src\js\%1 >> dist\mdfw.js
echo // End of %1 >> dist\mdfw.js
echo. >> dist\mdfw.js
goto exit

:exit
