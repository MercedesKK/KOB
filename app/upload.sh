scp -P 20000 dist/js/*.js KK_server:kob/acapp/
scp -P 20000 dist/css/*.css KK_server:kob/acapp/

ssh KK_server 'cd kob/acapp && ./rename.sh'
