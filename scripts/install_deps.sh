#!/usr/bin/env bash

wget -O - https://raw.githubusercontent.com/audstanley/NodeJs-Raspberry-Pi/master/Install-Node.sh | sudo bash
sudo apt-get update
sudo apt-get install -y libudev-dev libusb-1.0-0-dev	
