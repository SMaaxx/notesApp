CREATE USER {{pguser}} WITH PASSWORD '{{pguserpassword}}';
GRANT ALL PRIVILEGES ON DATABASE {{postgres}} TO {{pguser}};