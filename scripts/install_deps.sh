#!/usr/bin/env bash

wget -O - https://raw.githubusercontent.com/audstanley/NodeJs-Raspberry-Pi/master/Install-Node.sh | sudo bash
sudo apt-get update
sudo apt-get install -y cmake libudev-dev libusb-1.0-0-dev libmagick++-dev 
sudo apt-get remove bluez bluez-firmware pi-bluetooth triggerhappy pigpio
