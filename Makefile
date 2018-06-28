.PHONY: upload


upload:
	aws s3 cp ./src s3://mapmaker.datadesk.news/ --recursive --acl=public-read
