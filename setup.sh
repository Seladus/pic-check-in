#!/bin/bash
mkdir /usr/local/bin/pic-check-in/
cp -r pic-check-in.service /etc/systemd/system/pic-check-in.service
cp -r ./* /usr/local/bin/pic-check-in/
systemctl enable pic-check-in