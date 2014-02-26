#!/bin/bash
start=$(date +%s)
echo -e "Current repo: $TRAVIS_REPO_SLUG\n"

function error_exit
{
	echo -e "\e[01;31m$1\e[00m" 1>&2
	exit 1
}

if [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_REPO_SLUG" == "wet-boew/GCWeb" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

	#Set git user
	git config --global user.email "wet.boew.bot@gmail.com"
	git config --global user.name "Web Experience Toolkit Bot"

	#Add the latest build result
	echo -e "Uploading the build artifacts\n"

	grunt deploy || error_exit "Error running gh-pages task";

	echo -e "Updating submodules"

	cd themes-dist

	git fetch origin refs/heads/gh-pages:gh-pages
	git checkout gh-pages
	git submodule update --remote --init > /dev/null 2>&1 || error_exit "Error updating submodules"
	git add .
	git commit -m "Updated submodules"

	git push -fq https://${GH_TOKEN}@github.com/wet-boew/themes-dist.git gh-pages > /dev/null 2>&1 || error_exit "Error updating the working examples"
fi

end=$(date +%s)
elapsed=$(( $end - $start ))
minutes=$(( $elapsed / 60 ))
seconds=$(( $elapsed % 60 ))
echo "Post-Build process finished in $minutes minute(s) and $seconds seconds"
