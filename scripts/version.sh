#!/bin/bash
# Agrega comandos de depuración
echo "Ejecutando el script de versión..."

# Obtener la versión actual del proyecto
current_version=$(node -p -e "require('./package.json').version")

# Dividir la versión en partes: mayor, menor y parche
IFS='.' read -r -a version_parts <<< "$current_version"
major=${version_parts[0]}
minor=${version_parts[1]}
patch=${version_parts[2]}

# Incrementar el tercer número (parche)
patch=$((patch + 1))

# Verificar si el tercer número supera 9
if [ "$patch" -gt 9 ]; then
  # Incrementar el segundo número (menor)
  minor=$((minor + 1))
  # Restablecer el tercer número a 0
  patch=0

  # Verificar si el segundo número supera 9
  if [ "$minor" -gt 9 ]; then
    # Incrementar el primer número (mayor)
    major=$((major + 1))
    # Restablecer el segundo número a 0
    minor=0
  fi
fi

# Construir la nueva versión
new_version="$major.$minor.$patch"

# Imprimir la nueva versión
echo "Nueva versión: $new_version"

# Aplicar la nueva versión
npm --no-git-tag-version version $new_version