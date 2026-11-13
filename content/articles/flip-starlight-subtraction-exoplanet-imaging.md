---
title: "Seeing Fainter Planets: A Physics-Based Way to Remove Starlight Below the Telescope Stability Limit"
slug: flip-starlight-subtraction-exoplanet-imaging
excerpt: "A Nature paper from November 2026 describes FLIP, a method that models the telescope itself to subtract starlight, improving sensitivity to faint exoplanets in James Webb Space Telescope coronagraph data."
date: 2026-11-04
coverImage: "https://images.vierapparatus.com/articles/2026/11/i_xAXngGgUzPB7kDsu.webp"
coverImageAlt: "ESO image of the planet Beta Pictoris d taken with the Very Large Telescope. The star's position is marked, and the faint planet is arrowed after the starlight is suppressed."
coverImageSource: "Image: ESO/B. Sutlieff, M. Bonse et al., CC BY 4.0, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:VLT_image_of_the_Beta_Pictoris_d_exoplanet_(eso2609a).jpg)"
author: "Muhammad Satrio"
category: "Scientific Commentary"
tags:
  - exoplanets
  - direct imaging
  - James Webb Space Telescope
  - image processing
  - astrophysics
seoTitle: "FLIP: Physics-Based Starlight Subtraction for Exoplanet Imaging"
seoDescription: "How the FLIP method models the telescope to subtract starlight and find fainter exoplanets in James Webb Space Telescope coronagraph images."
status: published
---

Finding a planet beside its star is like finding a firefly beside a searchlight. The star's glare is millions of times brighter than the planet, and any leftover light from the star can hide the planet's faint signal. Direct imaging, which photographs a planet rather than inferring it from the star's wobble, is the main way to study planets that orbit far from their stars. It depends on removing the starlight well enough to see what is left.

A paper published in *Nature* in November 2026 presents a new way to do that. The method, called FLIP, improves sensitivity to faint planets in data from the James Webb Space Telescope (Ferrer-Chavez et al., 2026).

## Why Standard Subtraction Struggles

Standard algorithms estimate the starlight in an image from reference images, usually taken of other stars or of the same star at other times. The reference is meant to match the starlight in the science image, and the difference is what remains. The problem is that no telescope stays perfectly still. Small changes in its optics between the reference and the science observation alter the pattern of starlight, so the subtraction never fits exactly. Those mismatches leave residual light that can hide a planet (Ferrer-Chavez et al., 2026).

## A Model of the Telescope Instead of a Library of Stars

FLIP takes a different approach. Rather than relying on reference images, it builds a physical model of the starlight, one that accounts for how the telescope's instrument changes from one observation to the next. The model is flexible enough to represent instrumental instabilities, and it is fitted to the data by optimisation. The authors use automatic differentiation to tune millions of model parameters at once, which is what makes a model of this detail practical to fit (Ferrer-Chavez et al., 2026).

Because the model describes the starlight itself, the instabilities are estimated and compensated during the fit, rather than assumed away. That is why the authors describe the approach as physics-based rather than purely reference-based.

## What the Telescope Data Show

The authors tested FLIP on observations from the coronagraph of the James Webb Space Telescope's Near-InfraRed Camera (NIRCam). They report sensitivity two to fifteen times better than standard techniques. The gain depends on the target and the observing setup. The paper also reports the first detection of the planet 51 Eridani b at a wavelength of 4.3 micrometres, using this kind of processing (Ferrer-Chavez et al., 2026).

These are the authors' results on real on-sky data. The authors state that, to their knowledge, this is the first demonstration of substantially improved sensitivity from such an approach on real coronagraphic imaging (Ferrer-Chavez et al., 2026).

## What the Method Does Not Yet Settle

A fitted model is only as good as its match to the instrument. FLIP reduces the dependence on exact reference images, but it still relies on a model of the telescope, and the quality of its results depends on how well that model describes the data. Fitting millions of parameters is also likely to demand substantial computing. Those are the natural next questions for the method, and they are the reason its authors frame it as a framework to be extended, not as a finished pipeline.

The paper also suggests that the framework could be applied to other current and future observatories, including the Nancy Grace Roman Space Telescope and the proposed Habitable Worlds Observatory. The authors point out that a method like this could reduce how stable those telescopes must be to reach the same sensitivity (Ferrer-Chavez et al., 2026).

## Why It Matters

Imaging planets is slow and difficult. Each gain in starlight subtraction brings more planets within reach of direct study, including planets that are faint, close to their stars, or both. The approach also shows a wider lesson for astronomy: when the physics of an instrument is modelled explicitly, data processing can recover information that statistical comparison with reference images discards.

The result does not by itself reveal a new planet population or the composition of any planet. It improves the tool that makes those measurements possible.

## References

1. Ferrer-Chavez, R., Wang, J. J., Bouman, K. L., Freeman, W. T., Pueyo, L., Feng, B. Y., & Perrin, M. D. (2026). Imaging exoplanets below the telescope stability limit. *Nature*, 659(8139), 58–62. https://doi.org/10.1038/s41586-026-11213-z
