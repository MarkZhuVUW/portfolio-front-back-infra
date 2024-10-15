docker-compose -f /home/ec2-user/portfolio-app/docker-compose-prod.yml down
docker-compose -f /home/ec2-user/portfolio-app/docker-compose-prod.yml rm -f
docker-compose -f /home/ec2-user/portfolio-app/docker-compose-prod.yml up -d --build --force-recreate
