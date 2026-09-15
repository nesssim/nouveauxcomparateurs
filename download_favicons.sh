#!/bin/bash

mkdir -p public/images/partners

download_logo() {
  NAME=$1
  DOMAIN=$2
  SAFE_NAME=$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/é/e/g')
  echo "Downloading $NAME ($DOMAIN)..."
  curl -L -s -f -o "public/images/partners/${SAFE_NAME}.png" "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${DOMAIN}&size=128" || echo "Failed to download $NAME"
}

download_logo "Neoliane" "neoliane.fr"
download_logo "Zenioo" "zenioo.com"
download_logo "SwissLife" "swisslife.fr"
download_logo "Cegema" "cegema.com"
download_logo "Malakoff" "malakoffhumanis.com"
download_logo "Apivia" "apivia.fr"
download_logo "April" "april.fr"
download_logo "Harmonie Mutuelle" "harmonie-mutuelle.fr"
download_logo "Groupe Aesio" "aesio.fr"
download_logo "Abeille" "abeille-assurances.fr"
download_logo "GMF" "gmf.fr"
download_logo "FMA Assurances" "fma.fr"
download_logo "iAssure" "iassure.fr"
download_logo "Pop Santé" "popsante.fr"
download_logo "Praeconis" "praeconis.fr"
download_logo "SPVie" "spvie.com"
download_logo "Wazari" "wazari.fr"
download_logo "2MA" "2ma.fr"
download_logo "Lequite" "equite.com"
