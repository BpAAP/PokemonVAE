# Pokemon Generation and Interpolation

## Overview
This project uses a Variational Autoencoder to encode 128x128 pixel images of pokemon to a 200 dimensional latent space. Then decodes this latent vector to another 128x128 image.

This repo specifically contains a demo webapp for playing around with the trained model.

For more details see `www.benedekpapp.page/projects/pokemon-generation-and-interpolation`

## Demonstration
This repo is mirrored in a Glitch project, you can try it out at:
`URL`

## Training
The model used in the demo was trained with Keras in Python on Google's free Colab platform using GPU acceleration. You can view and run the annotated code here:
`https://colab.research.google.com/drive/1xibaC9LFv2df-1I1p0QoKbZJk3VT4ddW?usp=sharing`

## JavaScript App
The JavaScript app loads the saved model from this github.