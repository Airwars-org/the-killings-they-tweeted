#!/bin/bash

# Directory containing the MP4 videos
input_dir="videos"

# Output directory (you can set this to a different directory if you want)
output_dir="videos"

# Loop over all mp4 files in the directory
for video in "$input_dir"/*.mp4; do
    # Extract the base name without extension
    base_name=$(basename "$video" .mp4)
    
    # Define the output file path
    output_file="$output_dir/$base_name.webm"
    
    # Convert the video to WebM format
    ffmpeg -i "$video" -c:v libvpx-vp9 -b:v 1M -c:a libvorbis "$output_file"
    
    echo "Converted $video to $output_file"
done
