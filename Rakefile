# encoding: utf-8

require "html-proofer"

task :default => [:test]

task :test do
	HTMLProofer.check_directory("/_site/", {
		:ignore_urls => [
			"#",
			"wetboew-demos/"
		],
		:allow_missing_href => true,
		:disable_external => true,
		:enforce_https => false
	}).run
end
