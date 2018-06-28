.PHONY: upload


upload:
	aws s3 cp ./src s3://mapmaker.latimes.com/ --recursive --acl=public-read
