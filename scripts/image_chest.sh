#!/bin/sh
/home/pi/gitroot/rpi-rgb-led-matrix/utils/led-image-viewer --led-cols=128 --led-rows=32 --led-pixel-mapper="S-mapper;Rotate:180" --led-chain=4 --led-parallel=2 --led-panel-type="FM6126A" /home/pi/$1
