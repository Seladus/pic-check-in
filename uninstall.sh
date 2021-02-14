#!/bin/bash
systemctl disable pic-check-in
cp /usr/local/bin/pic-check-in/ressources/users-data/Data.db ~/Data.db
rm -rf /etc/systemd/system/pic-check-in.service
rm -rf /usr/local/bin/pic-check-in/