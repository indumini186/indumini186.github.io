@echo off
echo ========================================================
echo   Indumini Portfolio - Deploy to GitHub Pages
echo ========================================================
echo.
echo Make sure you have created the empty repository on GitHub:
echo https://github.com/new with name: indumini186.github.io
echo.
cd /d "%~dp0"
echo Adding changes...
git add .
echo Committing...
git commit -m "Update portfolio website" 2>nul
echo Pushing to GitHub...
git push -u origin main
echo.
echo ========================================================
echo Done! Your portfolio will be live at:
echo https://indumini186.github.io/
echo ========================================================
pause
