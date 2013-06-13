var MaxReverse=0,ReverseItems=[],toastIndex=0,ScrapCost=0,val="",classes="all",slots="all",savedSearch="",notifyPermission,lastQueueStatus=-1;function toggleClass(elem){var str=$(elem).attr('data-class');if(classes!=str)
{classes=str;li=$('#classes li.classes');li.each(function(){$(this).css('opacity','0.3');});$(elem).css('opacity','1.0');}
else
{classes='all';li=$('#classes li.classes');li.each(function(){$(this).css('opacity','1.0');});}
UpdateFilters();}
function toggleSlot(elem){var str=$(elem).attr('data-slot');if(slots!=str)
{slots=str;li=$('#classes li.slots');li.each(function(){$(this).css('opacity','0.3');});$(elem).css('opacity','1.0');}
else
{slots='all';li=$('#classes li.slots');li.each(function(){$(this).css('opacity','1.0');});}
UpdateFilters();}
function UpdateFilters(){$(".item").each(function(){show=true;var data_classes=$(this).attr("data-classes");var data_slot=$(this).attr("data-slot");if(data_classes!=undefined&&data_classes.indexOf(classes)==-1&&classes!="all")
show=false;if(data_slot!=undefined&&data_slot!=slots&&slots!="all")
show=false;if(show)
$(this).show();else
$(this).hide();});}
$(function(){checkQueue();querySearch();if(window.webkitNotifications){notifyPermission=window.webkitNotifications.checkPermission();}else{notifyPermission=1;}
$("#item-filters-toggle").click(function(){$("#item-filters").slideToggle();});$(".sits").popover({"html":true,"placement":"bottom","trigger":"manual","title":"Login with steam","content":"To access the full features of this site, such as scrap banking and reverse banking, you must sign in though steam. <a href='http://scrap.tf/login.php'>Click here</a> if the button doesn't show."}).popover('show');if($("#max-reverse-bank")){MaxReverse=$("#max-reverse-bank").text();}
$(".item").click(function(){if($(this).hasClass("selected-item")){$(this).removeClass("selected-item");}else{if($(".selected-item").length>=MaxReverse){Toast("This is the max amount of items you can reverse bank per trade.<br/>View the help page on how to increase this limit.","alert-error",7000);}else{$(this).addClass("selected-item");}}
ScrapCost=Math.ceil($(".selected-item").length/2);ScrapHatCost=$(".selected-item").length*12;RecCost=(ScrapHatCost%9);RefCost=Math.floor(ScrapHatCost/9);if(RecCost==3)RefCost+=0.33;if(RecCost==6)RefCost+=0.66;$("#ref-cnt").text(RefCost);$("#scrap-cnt").text(ScrapCost);});$("#btn-item-search").click(function(){$("#input-search").val("");savedSearch="";$(".item").each(function(){$(this).css("display","block");});});$("[rel=tooltip]").tooltip({'placement':'bottom'});$(".finish-reverse").click(function()
{$(".selected-item").each(function(i,v){ReverseItems[i]=$(this).attr("data-id");});$.ajax({type:"POST",url:'public_api.php',data:{m:"EnQueueReverseBank","items":JSON.stringify(ReverseItems),"bot":botID},dataType:'json',success:function(data){console.log(data);if(data.success==true){checkQueue();$(".reverse-container").slideUp();$(".reverse-complete").slideDown();Toast(data.message,"alert-success");}else{Toast(data.message,"alert-error");}}});});$(".finish-hatbank").click(function()
{$(".selected-item").each(function(i,v){ReverseItems[i]=$(this).attr("data-id");});$.ajax({type:"POST",url:'public_api.php',data:{m:"EnQueueReverseHatBank","items":JSON.stringify(ReverseItems),"bot":botID},dataType:'json',success:function(data){console.log(data);if(data.success==true){checkQueue();$(".reverse-container").slideUp();$(".reverse-complete").slideDown();Toast(data.message,"alert-success");}else{Toast(data.message,"alert-error");}}});});$("#finish-keybank").click(function()
{text=$("#num-keys-textbox").val();$.ajax({type:"POST",url:'public_api.php',data:{m:"EnQueueReverseKeyBank","keys":text,"bot":10},dataType:'json',success:function(data){if(data.success==true){checkQueue();Toast(data.message,"alert-success");}else{Toast(data.message,"alert-error");}}});});$(".item").popover({"html":true,"animation":false,"placement":"bottom","trigger":"hover"});$(".donationgoal").popover({"html":true,"placement":"bottom","trigger":"hover"});});function postComment()
{$.ajax({type:"POST",url:'public_api.php',data:{m:"PostComment","profile":$("#profile-id").val(),"text":$(".profile-postcomment").val()},dataType:'json',success:function(data){console.log(data);if(data.success==true){Toast(data.message,"alert-success");window.location.reload();}else{Toast(data.message,"alert-error");}}});}
function querySearch(){var text=$("#input-search").val();if(text!=savedSearch){savedSearch=text;searchItems(text);}
setTimeout("querySearch()",100);}
function searchItems(val)
{$(".item").each(function(){if(val==""||val==null){$(this).show();}else{var name=$(this).attr("data-original-title").toLowerCase();if(name.indexOf(val.toLowerCase())!=-1){$(this).show();}else{$(this).hide();}}});}
function pullDown()
{$(".main").addClass("pulled-down");$(".navbar-queue").slideDown();return $(".navbar-inner").addClass("expanded");}
function pullUp()
{lastQueueStatus=-1;$(".main").removeClass("pulled-down");$(".navbar-queue").slideUp();return $(".navbar-inner").removeClass("expanded");}
function desktopNotify(title,text){notification_test=window.webkitNotifications.createNotification('img/favico.png',title,stripHTML(text));notification_test.ondisplay=function(){if(navigator.userAgent.indexOf("Firefox")==-1){setTimeout(function(){notification_test.cancel();},parseInt(window.localStorage.show_len)*1000);}};notification_test.onclose=function(){};notification_test.show();}
function stripHTML(html)
{var tmp=document.createElement("DIV");tmp.innerHTML=html;return tmp.textContent||tmp.innerText;}
function checkQueue()
{$.ajax({type:"POST",url:'public_api.php',data:{m:"inQueue",time:new Date().getTime()},dataType:'json',success:function(data){if(data.success==true){if(data.inQueue==true){if(lastQueueStatus!=data.stat&&window.localStorage.enable_notify&&window.localStorage.show_on_stat_update){desktopNotify("Queue Status Update","Your queue status changed to "+data.botStatusYou+".");}
console.log("Last: "+lastQueueStatus+"\nNewest: "+data.stat);lastQueueStatus=data.stat;$(".bot-name").html(data.botName);$(".bot-status").html(data.botStatus);$(".bot-status-you").html(data.botStatusYou);$(".queue").html("");var display="";$.each(data.items,function(i,val){if(val.fade==true){display="display:none;";}else{display="";}
$(".queue").append("<div class='q-item qi"+val.stat+"' id='que_"+i+"' style='"+display+"' rel='tooltip' title='"+val.username+"'><img src='"+val.avatar+"' class='avatar avatar-small' /></div>");});$("[rel='tooltip']").tooltip({'placement':'bottom'});pullDown();$.each(data.items,function(i,val){if(val.fade==true){$("#que_"+i).fadeIn();}});setTimeout(checkQueue,3000);}else{pullUp();}}}});}
function EnQueueScrapBank()
{PublicAPIbasic("EnQueueScrapBank");}
function EnQueueHatBank()
{PublicAPIbasic("EnQueueHatBank");}
function EnQueueKeyBank()
{PublicAPIbasic("EnQueueKeyBank");}
function ShowBuyKeyMenu(){$(".reverse-container").slideUp();$(".key-buy-container").slideDown();}
function doDonate()
{PublicAPIbasic("ItemDonation");}
function removeQueue()
{PublicAPIbasic("RemoveQueueItem");}
function PublicAPIbasic(method)
{$.ajax({type:"POST",url:'public_api.php',data:{m:method},dataType:'json',success:function(data){console.log(data);if(data.success==true){Toast(data.message,"alert-success");checkQueue();}else{Toast(data.message,"alert-error");}}});}
function Toast(text,classes,timeout)
{timeout=timeout?timeout:3000;$("body").append('<div class="toast" id="toast-'+toastIndex+'" style="display:none;"><div class="inside"></div></div>');$("#toast-"+toastIndex+" .inside").html(text);$("#toast-"+toastIndex+" .inside").addClass(classes);$("#toast-"+toastIndex).fadeIn('fast');setTimeout("clearToast("+toastIndex+")",timeout);toastIndex++;}
function clearToast(index)
{$("#toast-"+index+" .inside").fadeOut('fast',function(){$("#toast-"+index+" .inside").remove();});}