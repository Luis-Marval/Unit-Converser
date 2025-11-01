# build.sh
#!/bin/bash

echo "🚀 Iniciando deploy..."

# Build del frontend
echo "📦 Building frontend..."
cd front-end
pnpm install
pnpm run build
cd ..

# Build del backend
echo "🔨 Building backend..."
cd back-end
pnpm install
pnpm run build
cd ..
clear
echo "✅ Build completado!"
echo "📁 Los archivos de producción están en:"
echo "   - Frontend: front-end/dist/"
echo "   - Backend: back-end/dist/"