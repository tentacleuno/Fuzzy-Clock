pkgname=gnome-shell-extension-fuzzy-clock
pkgver=1
pkgrel=1
pkgdesc="Fuzzy Clock for Gnome Shell"
arch=('any')
url="https://github.com/Cj-Malone/Fuzzy-Clock"
licence=('mit')
source=("https://github.com/Cj-Malone/Fuzzy-Clock/releases/download/v$pkgver/fuzzy-clock.zip")
md5sums=('d446c68bc67bc7deff529235718f79ca')
sha265sums=('204f1adc701aacf7a51f880411ce0ef1825647c62072b8a8cf622a41043f44db')

package() {
	cd "$srcdir"

	install -Dm644 LICENSE		"$pkgdir"/usr/share/licenses/$pkgname/LICENSE
	install -Dm644 extension.js	"$pkgdir"/usr/share/gnome-shell/extensions/fuzzy-clock@keepawayfromfire.co.uk/extension.js
	install -Dm644 metadata.json	"$pkgdir"/usr/share/gnome-shell/extensions/fuzzy-clock@keepawayfromfire.co.uk/metadata.json
}
