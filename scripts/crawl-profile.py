import re, urllib, csv

with open('../public/files/company_profile.csv', "a") as writefile:
	profile = csv.writer(writefile)
	with open('../public/files/secwiki_tickers2.csv', "r") as readfile:
		tickers = csv.reader(readfile)
		next(tickers, None)
		for row in tickers:
			print row[0]
			
			for i in re.findall('<p>.*<b>Key Statistics</b></a></p>', urllib.urlopen("http://finance.yahoo.com/q/pr?s="+row[0]+"+Profile").read(), re.I):
				try:
				    desc = (i.split(".")[0] + "." + i.split(".")[1])[3:] +".";
				    print desc
				    profile.writerow([row[0], desc])
				except IndexError:
					print 'IndexError'
					continue



