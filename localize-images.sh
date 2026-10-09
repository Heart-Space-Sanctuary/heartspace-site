#!/usr/bin/env bash
# Copies every image the site still loads from Wix into ./images and rewrites
# the pages to use the local copies. Run this ONCE, before you cancel Wix:
#
#   bash scripts/localize-images.sh
#
# Then commit and push. Safe to run again; already-downloaded files are skipped.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p images

urls=$(grep -ohE 'https://static\.wixstatic\.com/media/[^"'"'"') ]+' *.html | sort -u)

for url in $urls; do
  id=$(echo "$url" | sed -E 's#https://static\.wixstatic\.com/media/([^/]+)/.*#\1#')
  ext="${id##*.}"
  base="${id%%~*}"
  # Include the size in the name so two sizes of the same picture don't collide.
  size=$(echo "$url" | grep -oE 'w_[0-9]+,h_[0-9]+' | tail -1 | tr ',' '-')
  file="images/${base}-${size}.${ext}"
  if [ ! -s "$file" ]; then
    echo "Downloading $file"
    curl -fsSL "$url" -o "$file"
  fi
  # Rewrite every page that uses this exact URL.
  for page in *.html; do
    URL="$url" FILE="/$file" perl -pi -e 's/\Q$ENV{URL}\E/$ENV{FILE}/g' "$page"
  done
done

echo "Done. Images now live in ./images. Commit and push to publish."
