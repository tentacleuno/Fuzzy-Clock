# Fuzzy Clock
Replace the Gnome Shell clock with a Fuzzy clock.

![Screenshot](screenshot.png)

# Install
## GIT
```
git clone https://github.com/Cj-Malone/Fuzzy-Clock ${XDG_DATA_HOME:=$HOME/.local/share}/gnome-shell/extensions/fuzzy-clock@keepawayfromfire.co.uk/
```
## Arch Linux
```
cd $(mktemp -d)
curl https://raw.githubusercontent.com/Cj-Malone/Fuzzy-Clock/master/PKGBUILD > PKGBUILD
makepkg
sudo pacman -U gnome-shell-extension-fuzzy-clock-*-any.pkg.tar
```

