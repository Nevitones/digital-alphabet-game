for %%a in ("*.mp3") do ffmpeg -i "%%a" "%%~na.oga"
pause