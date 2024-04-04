#!/bin/bash

# Specify the directory path
directory="public/images/products"

# Check if the directory exists
if [ -d "$directory" ]; then
    # Delete all files within the directory
    rm -f "${directory}"/*
    echo "All files inside the directory have been deleted."
else
    echo "Directory not found."
fi
