# import urllib2
import urllib.request
from bs4 import BeautifulSoup
import re
from pprint import pprint


for i in range(1,302):
	print (i)
	html = urllib.request.urlopen("http://suka.s5.xrea.com/dom/list.cgi?id="+str(i)+"&mode=show")
	soup = BeautifulSoup(html)
	cell = soup.find(attrs={"class":"com3"})
	print (cell)

# print 301
# html = urllib2.urlopen("http://suka.s5.xrea.com/dom/list.cgi?id="+str(301)+"&mode=show")
# soup = BeautifulSoup(html)
# cell = soup.find(attrs={"class":"com3"})
# print cell


# htmlstring = soup.find(attrs={"class":"com3"}).string

# f = open( "cardeffect.dat", "a" )
# try:
# 	f.write(htmlstring)
# finally:
# 	f.close()



