#!/usr/bin/env bash
# Reconstruit public/media/axiona-agent-vocal.mp4 à partir de la vidéo source.
# Usage : scripts/video/build.sh chemin/vers/source.mp4
# Prérequis : ffmpeg. Les cartes (cards/*.png) sont fournies ; pour les régénérer :
#   node scripts/video/cards.mjs   (nécessite playwright-core + Chromium)
set -euo pipefail
SRC="${1:?vidéo source requise}"
DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$DIR/../../public/media"
END=140.97   # fin de la partie conservée (avant « abonne-toi »)
mkdir -p "$OUT"
IN=()
for c in A B C D E title freeze; do IN+=(-loop 1 -framerate 30 -t "$END" -i "$DIR/cards/$c.png"); done
ffmpeg -y -i "$SRC" "${IN[@]}" -loop 1 -framerate 30 -t 3.2 -i "$DIR/cards/end.png" \
  -filter_complex_script "$DIR/filter.txt" -map "[outv]" -map "[outa]" \
  -c:v libx264 -preset slow -crf 27 -maxrate 420k -bufsize 840k -tune film -profile:v high -level 3.1 \
  -pix_fmt yuv420p -g 60 -r 30 -c:a aac -b:a 80k -ac 2 -movflags +faststart "$OUT/axiona-agent-vocal.mp4"
# Affiche : image de la démo (1:19,5), sans sous-titre à l'écran
ffmpeg -y -ss 79.5 -i "$OUT/axiona-agent-vocal.mp4" -frames:v 1 -c:v libwebp -quality 74 "$OUT/axiona-agent-vocal-poster.webp"
