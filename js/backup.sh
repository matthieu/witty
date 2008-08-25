#! /usr/bin/env sh
TIME=$(date +%s)
tar czf lang-${TIME}.tgz .git
scp lang-${TIME}.tgz people.apache.org:/home/mriou/backup
scp lang-${TIME}.tgz 192.168.1.135:/home/mriou/dev/lang
rm lang-*.tgz
