# "deploy:uidev:gzip:css": "
# aws s3 sync www/ s3://uidev.way.me \
#     --acl='public-read' \
#     --region='us-west-2' \
#     --content-encoding='gzip'  \
#     --cache-control 'max-age=604800' \
#     --exclude '*' \
#     --include '*.css';
ls ./www
find ./www \( -iname '*.css' -o -iname '*.js' \) -exec gzip -9 -n {} \; -exec mv {}.gz {} \;

##
# Mario's approach
# yellow '--> Uploading css files'
aws s3 sync --exclude '*' \
--include './www/css/*.css'  \
--content-type='text/css' \
--cache-control='max-age=604800' \
--content-encoding='gzip' ./www s3://waymetest/;

# "deploy:uidev:gzip:js": "
# aws s3 sync www/ s3://uidev.way.me \
#     --acl='public-read' \
#     --region='us-west-2' \
#     --content-encoding='gzip' \
#     --cache-control='max-age=604800' \
#     --exclude '*' \
#     --include '*.js';

##
# Mario's approach
aws s3 sync \
--exclude '*' \
--include './www/js/*.js' \
--content-type='application/javascript' \
--cache-control='max-age=604800' \
--content-encoding='gzip' ./www s3://waymetest/;

# "deploy:uidev:all": "
# aws s3 sync www/ s3://uidev.way.me \
#     --acl='public-read' \
#     --region='us-west-2' \
#     --exclude '*.gz';

# "deploy:uidev:delete": "
# aws s3 sync www/ s3://uidev.way.me --delete --region='us-west-2';

ls ./www/index*

aws s3 sync \
    --exclude '*' \
    --include './www/*.html' \
    --cache-control no-cache \
    --delete ./www s3://waymetest/;
