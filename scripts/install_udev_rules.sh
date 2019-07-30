#!/usr/bin/env bash
cp conf/50-elgato.rules /etc/udev/rules.d
udevadm control --reload-rules
