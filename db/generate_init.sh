#!/bin/bash

# MYSQL_USER.envから環境変数を読み込む
source ./.env.develop

# SQLを含むファイルを作成/上書きする
echo "GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO '${MYSQL_USER}'@'%';" >./db/init/init.sql
