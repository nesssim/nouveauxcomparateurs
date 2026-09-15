#!/bin/bash
# Les Nouveaux Comparateurs — Setup & Run Script
# =================================================

set -e

echo "🚀 Les Nouveaux Comparateurs — Setup"
echo "======================================"

# 1. Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
else
  echo "✅ Dependencies already installed"
fi

# 2. Check if fonts exist
if [ ! -f "public/fonts/Inter-Variable.woff2" ]; then
  echo "🔤 Downloading fonts..."
  mkdir -p public/fonts
  curl -sL "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2" -o public/fonts/Inter-Variable.woff2
  curl -sL "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko70yyygA.woff2" -o public/fonts/PlusJakartaSans-Variable.woff2
  echo "✅ Fonts downloaded"
else
  echo "✅ Fonts already present"
fi

# 3. Check if logo exists
if [ ! -f "public/images/logo.webp" ] && [ -f "../components/logo.webp" ]; then
  echo "📸 Copying logo..."
  cp ../components/logo.webp public/images/logo.webp
  echo "✅ Logo copied"
fi

# 4. Check for placeholder images
echo ""
echo "📸 Image status:"
for img in \
  "public/images/hero/hero-main.jpg" \
  "public/images/services/mutuelle-seniors.jpg" \
  "public/images/services/chiens-chats.jpg" \
  "public/images/services/obseques.jpg" \
  "public/images/services/protection-juridique.jpg" \
  "public/images/advisor/herve-migliore.jpg" \
  "public/images/recruitment/responsable-secteur.jpg" \
  "public/images/logo.webp"; do
  if [ -f "$img" ]; then
    echo "  ✅ $img"
  else
    echo "  ❌ $img (MISSING)"
  fi
done

echo ""
echo "======================================"
echo "🎯 Starting dev server..."
echo "======================================"
echo ""
echo "  Local:   http://localhost:3000"
echo "  Network: http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "  Press Ctrl+C to stop"
echo ""

npm run dev
