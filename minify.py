target = open("omnibox.min.js", "w")

files = ("datetime.js", "enums.js", "event.js", "location.js", "omnibox.js")

for f in files:
	for line in open(f, "r"):
		target.write(line)

	target.write("\n\n\n\n")

