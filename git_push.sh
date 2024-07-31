# @echo off


git pull
git add .
read -p "input commit message: " msg
git commit -m "$msg"
# git commit -m 'WIN10'
git push
read -p "===== git push ok, Type enter to exit. ===== " msg00