var year=2012;var month=10;var day=10;var hour=10;var minute=0;var second=0;var eventtext="";var endtext="now!";var end=new Date(year,month,day,hour,minute,second);var timerID;function timeleft(){var now=new Date();if(now.getYear()<1900)
yr=now.getYear()+ 1900;var sec=second- now.getSeconds();var min=minute- now.getMinutes();var hr=hour- now.getHours();var dy=day- now.getDate();var mnth=month- now.getMonth();var yr=year- yr;var daysinmnth=32- new Date(now.getYear(),now.getMonth(),32).getDate();if(sec<0){sec=(sec+60)%60;min--;}
if(min<0){min=(min+60)%60;hr--;}
if(hr<0){hr=(hr+24)%24;dy--;}
if(dy<0){dy=(dy+daysinmnth)%daysinmnth;mnth--;}
if(mnth<0){mnth=(mnth+12)%12;yr--;}
var sectext="s ";var mintext="m ";var hrtext="h, ";var dytext="d, ";var mnthtext=" months, ";var yrtext=" years, ";if(yr==1)
yrtext=" year, ";if(mnth==1)
mnthtext=" month, ";if(dy==1)
dytext=" day, ";if(hr==1)
hrtext=" hour, ";if(min==1)
mintext=" minute, and ";if(sec==1)
sectext=" second ";if(now>=end){document.getElementById("mlp").innerHTML=endtext;clearTimeout(timerID);}else{document.getElementById("mlp").innerHTML=dy+ dytext+ hr+ hrtext+ min+ mintext+ sec+ sectext+ eventtext;}
timerID=setTimeout(timeleft,1000);}
window.onload=timeleft;