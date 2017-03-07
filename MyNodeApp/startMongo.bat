echo off

echo connecting to mongodb database...
set PATH= C:\Program Files\MongoDB\Server\3.4\bin
cd %PATH%
echo setting mongodb exe path to: %PATH%
start mongod.exe
echo.  
pause
start mongo.exe
