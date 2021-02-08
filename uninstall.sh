#!/bin/bash
systemctl disable pic-check-in
rm -rf /etc/systemd/system/pic-check-in.service
rm -rf /usr/local/bin/pic-check-in/