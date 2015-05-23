/* 
 * JavaScript for MyKaraoke website
 * by Pheng L Taing (2013)
 * 
 * Some script has been taken from elsewhere
 * 
 * To navigate the big file, there are sections for different
 * functions, and global variables related to them
 * 
 */

// SECTION: *********************************************
// GLOBAL variables *************************************
// FUNCTIONS ********************************************
function out(s) {
	console.log(s);
}
function out2(s) {
	alert(s);
}
// SECTION: Visual and startup features *****************
// GLOBAL variables *************************************
var bannerOpen = true;
var currBgIndex = 1;
var maxBgOptions = 5;
// FUNCTIONS ********************************************
function doMaintanence() {
	loadSongMenu(); // must be first here!
	checkCookie();
	var screenWidth = screen.width;
	document.getElementById("widthChanger").setAttribute("max", screenWidth - 240);
}
function showBanner() {
    bannerOpen = !bannerOpen;
    if (bannerOpen) {
        $('#topBanner').stop(true, true).slideUp('slow');
        document.getElementById('pullBox').className = 'arrow DownArrow';
    } else {
        $('#topBanner').stop(true, true).slideDown('fast');
        document.getElementById('pullBox').className = 'arrow UpArrow';
    }
}
function ChangeFontSize(size) {
	var cssRuleCode = document.all ? 'rules' : 'cssRules'; //account for IE and FF
	var rule = document.styleSheets[0][cssRuleCode];
	
	for (var i = 0; i < rule.length; i++) {
		if (rule[i].selectorText == "#frontPage table tr td") {
			if (size < 0) { // special return function for 'toggleFont'
				return rule[i].style.fontSize;
			}
			
			rule[i].style.fontSize = size + "px";
			out("changed font size to " + size + "px" );
			document.getElementById('fontRangeInput').value = size;
			document.getElementById('fontRangeValue').value = size + " px";
			return;
		}
	}
	out("Error: CSS stylesheet doesn't contain entry for '#frontPage table tr td' style");	
}
function toggleFont(key) {
	var currSize = extractValue(ChangeFontSize(-1));
	var jumpSize = 2;
	if (key == 187 || key == 107) { // + up
		if (currSize < 40) ChangeFontSize(currSize + jumpSize);
	} else { // -
		if (currSize > 20) ChangeFontSize(currSize - jumpSize);
	}
}
function ChangeWidth(W){
	var cssRuleCode = document.all ? 'rules' : 'cssRules'; //account for IE and FF
	var rule = document.styleSheets[0][cssRuleCode];
	
	for (var i = 0; i < rule.length; i++) {
		if (rule[i].selectorText == "#container") {
			//out(rule[i]);
			if (W < 0) {
				return rule[i].style.width;
			}
			
			rule[i].style.width = W + "px";
			document.getElementById("topBar").style.width = W + "px";
			document.getElementById("topBanner").style.width = W + "px";
			out("changed width to " + rule[i].style.width);
			document.getElementById('widthChanger').value = W;
			document.getElementById('widthRangeValue').value = W + " px";
			return;
		}
	}
	out("Error: CSS stylesheet doesn't contain entry for '#container'");
}
function toggleWidth(key) {
	var	currWidth = extractValue(ChangeWidth(-1));
	var jumpSize = 5, newSize = currWidth, maxWidth = screen.width - 240;
	
	if (key == 68){// key 68 is 'd', shortcut for wider screen
		if(currWidth < maxWidth)	{
			newSize = currWidth + jumpSize; 
		} else {
			newSize = currWidth;
		}
	} else if (currWidth > 750) {
		newSize = currWidth - jumpSize;
	}
	
	ChangeWidth(newSize);
}
function toggleHeight(key) {
	// w87 taller, s83 shorter
	var defaultHeight = 440;
	var	currHeight = extractValue(ChangeHeight(-1));
	var jumpSize = 5, newSize = currHeight, maxHeight = screen.height - 220;
	
	if (key == 87){
		if(currHeight < maxHeight)	{
			newSize = currHeight + jumpSize; 
		} else {
			newSize = currHeight;
		}
	} else if (currHeight > defaultHeight) {
		newSize = currHeight - jumpSize;
	}
	
	ChangeHeight(newSize);
}
function ChangeHeight(H){
	var cssRuleCode = document.all ? 'rules' : 'cssRules'; //account for IE and FF
	var rule = document.styleSheets[0][cssRuleCode];
	
	for (var i = 0; i < rule.length; i++) {
		if (rule[i].selectorText == "#content") {
			//out(rule[i]);
			if (H < 0) {
				return rule[i].style.height;
			}
			
			rule[i].style.height = H + "px";
			out("changed height to " + rule[i].style.height);
			return;
		}
	}
	out("Error: CSS stylesheet doesn't contain entry for '#content'");
}
function extractValue(string) {
	// converts '12px' to 'int 12'
	return parseInt(string.substring(0, string.length - 2));
}
function positionBoxX(ele, width){
	var windowWidth = window.innerWidth;
	document.getElementById(ele).style.left = ((windowWidth / 2) - (width / 2)) + "px";
}
function positionBoxY(ele, height){
	document.getElementById(ele).style.top = height + "px";
}
function setHover(box) {
	document.getElementById(box).style.opacity = .7;
}
function noHover(box) {
	document.getElementById(box).style.opacity = 1;
}
function changePopupExit(mode, src) {
	chg = "";
	if (mode == 0) {
		chg = "img/exitPopup_o.png";
	} else {
		chg = "img/exitPopup.png";
	}
	document.getElementById(src).setAttribute("src", chg);
}
function setBackground(i) {
	var body=document.getElementsByTagName('body')[0];
	body.style.backgroundImage = "url(img/bg/" + i + ".jpg)";
	document.getElementById('currentIcon').setAttribute("class", "icons icon_"+i);
	currBgIndex = i;
	// set Cookie
	setCookie("bgChoice",i,365);
}
function toggleBg(key) {	
	if (key == 37) { // left
		currBgIndex--;
	} else {
		currBgIndex++;	
	}
	if (currBgIndex < 0) currBgIndex += maxBgOptions;
	else currBgIndex %= maxBgOptions;
	setBackground(currBgIndex);
}
function shortcutShowVideo(){
	slider = document.getElementById('showVideoInput');
	
	if (slider.disabled) {
		//nothing
	} else {
		hideBox('musicVideo');
	}
}
function askUsertoLoadPrevSong(songUrl) {
	if (confirm("Hi again!\nWould you like to load the song from your last visit?")) {
		loadSong(songUrl);	
	}
}
function openWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
// SECTION: MetaData features****************************
// GLOBAL variables *************************************
// FUNCTIONS ********************************************
function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
	  c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
	  c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function setCookie(c_name, value, exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
//	alert(c_name+" cookie has been set to "+c_value);
//	alert(document.cookie);
}

function checkCookie() {
	var bgChoice = getCookie("bgChoice"); // bgChoice can be [0,1,2,3]
	var langChoice = getCookie("langChoice"); // langChoice can be [0,1, ... , last language]
	var prevSong = getCookie("prevSong"); // previous song's code
	
	if (bgChoice != null && bgChoice != "") {
		//alert("result = "+bgChoice);
		setBackground(bgChoice);
	} else {
		// by default, it is [0]
		setBackground(0);
	}

	if (langChoice != null && langChoice != "") {
		selectLanguage(langChoice);
	} else {
		//alert("Error! "+langChoice);	
		// by default, it is Chinese [2]
		selectLanguage(2);
	}
	
	if (prevSong != null && prevSong != "") {
		askUsertoLoadPrevSong(prevSong);
	}
}

// SECTION: Select a Song, Language box *****************
// GLOBAL variables *************************************
var autoDisappear = true, autoplayMode = true;
var language = 0; // default EN
var langComponent = ["topBarText", "headerBar", "musicSelect","languageTitle", "langGroup1", "langGroup2", "notReady", "selectSongLink",
	"songMenu", "key1", "key2", "key3", "key4","key5","welcomeH1","settingWord", "footer1", "footer2", "footer3", "footer4", "footer5", "showShortcut"];
var topBarText = 	["English","Deutsch","中文"];
var headerBar =		["Karaoke","Karaoke", "卡拉OK"];
var musicSelect = 	["Music Player", "Musik-Player", "音乐播放器"];
var languageTitle = ["Languages","Sprachen","语言"];
var langGroup1 = ["European Languages","Europäischen Sprachen", "欧洲语言"];
var langGroup2 = ["Asian Languages","Asiatische Sprachen", "亚洲语言"];
var notReady = ["*Not available","*Nicht verfügbar","*不可用"];
var selectSongLink = ["Select a song", "Wählen Sie einen Lied", "选择一首歌曲"];
var songMenu = 		["Menu", "Menü", "菜单"];
var key1 = 			["Key", "Legende", "图例"];
var key2 = 			["only audio", "nur audio", "歌曲没有视频"];
var key3 = 			["video included", "video enthalten", "歌曲有视频"];
var key4 = 			["close this window after selection", "automatisch schließen Sie dieses Panel", "选择一首歌曲后，关闭弹出框"]; 
var key5 = 			["Others","andere","其它"];

var welcomeH1 = 	["Welcome to my Karaoke website","Willkommen auf meiner Website Karaoke","欢迎到 卡拉OK 网站"];
var settingWord = 	["Settings", "Einstellungen","设置"];
var footer1 = 		["Adjust site width","Webseite Breite","屏幕宽度"];
var footer2 = 		["Adjust font","Schriftgröße","字体大小"];
var footer3 = 		["Autoplay", "Autoplay", "自动播放"];
var footer4 = 		["Show video","Video zeigen","显示视频"];
var footer5 = 		["Shortcuts","Schnelltaste","快捷"];

// FUNCTIONS ********************************************
function turnAutoDis(){
	autoDisappear = !autoDisappear;
}
function selectLanguage(num) {
	language = num;
	if (num < 0) return;
	document.getElementById("topBarText").className= "flag flag" + num;
	document.title = headerBar[num];
	
	var component, array, i;
	for (i = 0; i < langComponent.length; i++) {
		component = document.getElementById(langComponent[i]);
		
		if (component != null) {
			array = window[langComponent[i]];
			component.innerHTML = array[num];
		}
	}	
	//set Cookie
	setCookie("langChoice", num ,365);
	
}
function update(txt) {
	document.getElementById("musicSelect").innerHTML = txt;
}
function changeAutoplay() {
	slider = document.getElementById('autoplayInput');
	if (autoplayMode == false) {
		slider.className = 'slider onoff setOn';
		player.autoplay = true;
		autoplayMode = true;
		slider.value = 1;
		
	} else {
		slider.className = 'slider onoff setOff';
		player.autoplay = false;
		autoplayMode = false;
		slider.value = 0;
		
	}
}
function pauseMusic() {
	var player = document.getElementById('player');
	if (! player.paused) player.pause();
	else player.play();	
}
// SECTION: Navigation **********************************
// GLOBAL variables *************************************
var popups = ["popupBox", "selectSongBox", "musicVideo"];
var boxWidth = [270, 430, 500];
var firstTime = [true, true, true];
// FUNCTIONS ********************************************
function hideDirect(src) {
	document.getElementById(src).className='hide';
}
function showDirect(src) {
	document.getElementById(src).className='';
}
function closePanels() {
	for (var i = 0; i < 2; i++) {
		hideDirect(popups[i]);
	}
	if (document.getElementById(popups[2]).className == '') {
		hideBox(popups[2]);
	}
}
function hideBox(src) {
	obj = document.getElementById(src);
	if (obj == null) return;
	
	if (src == popups[0] && firstTime[0]) {
		positionBoxX('popupBox', boxWidth[0]); 
		positionBoxY('popupBox', 20);
		firstTime[0] = false;
	} else if (src == popups[1] && firstTime[1])  {
		positionBoxX('selectSongBox', boxWidth[1]); 
		positionBoxY('selectSongBox', 120);
		firstTime[1] = false;
	} else if (src == popups[2]){
		if(firstTime[2]) {
			positionBoxX('musicVideo', boxWidth[2]); 
			positionBoxY('musicVideo', 200);
			firstTime[2] = false;
		}
	}
	slider = document.getElementById('showVideoInput');
	
	if (obj.className == 'hide') {
		obj.className = '';
		if (src == popups[2]) {
			slider.className = 'slider onoff setOn';
			slider.value = 1;
			
		}
		//$('#'+src).stop(true, true).fadeIn('slow');
	}else {
		obj.className= 'hide';
		if (src == popups[2]) {
			slider.className = 'slider onoff setOff';
			slider.value = 0;
		}
		//$('#'+src).stop(true, true).fadeOut('slow');
	}
	
}


// SECTION: Dragging Function ***************************
// GLOBAL variables *************************************
var dragObj = new Object();

// FUNCTIONS ********************************************
function dragStart(event, id) {
  var x, y;
  
  setHover(id);
  dragObj.elNode = getID(id);
  
  // Get cursor position with respect to the page.
  try {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  catch (e) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  // Save starting positions of cursor and element.

  dragObj.cursorStartX = x;
  dragObj.cursorStartY = y;
  dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
  dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);

  if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
  if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;

  // Capture mousemove and mouseup events on the page.

  try {
    document.attachEvent("onmousemove", dragGo);
    document.attachEvent("onmouseup",   dragStop);
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  catch (e) {
    document.addEventListener("mousemove", dragGo,   true);
    document.addEventListener("mouseup",   dragStop, true);
    event.preventDefault();
  }
}

function dragGo(event) {

  var x, y;

  // Get cursor position with respect to the page.

  try  {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  catch (e) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  // Move drag element by the same amount the cursor has moved.
  var drLeft = (dragObj.elStartLeft + x - dragObj.cursorStartX);
  var drTop = (dragObj.elStartTop  + y - dragObj.cursorStartY);

  if (drLeft > 0)
  {
     dragObj.elNode.style.left = drLeft  + "px";
  }
  else
  {
	dragObj.elNode.style.left = "1px";  
  }
  if (drTop > 0)
  {
     dragObj.elNode.style.top  = drTop + "px";
  }
  else
  {
	dragObj.elNode.style.top  = "1px";  
  }

  try {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  catch(e){
    event.preventDefault();
  }
}

function dragStop(event) {

  // Stop capturing mousemove and mouseup events.

  try {
    document.detachEvent("onmousemove", dragGo);
    document.detachEvent("onmouseup",   dragStop);
  }
  catch (e) {
    document.removeEventListener("mousemove", dragGo,   true);
    document.removeEventListener("mouseup",   dragStop, true);
  }
}
function getID(id) {
	return document.getElementById(id);
}

// SECTION: Fading image *******************************
// GLOBAL variables *************************************
// FUNCTIONS ********************************************
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

// SECTION: Loading XML data *******************
// GLOBAL variables *************************************
// FUNCTIONS ********************************************
function loadXML(fileName, firstTag) {
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	try {
		xmlhttp.open("GET", "xml/" + fileName + ".xml" ,false);
		xmlhttp.send();
		file = xmlhttp.responseXML;
		return file.getElementsByTagName(firstTag)[0];
	} catch(e) {
		out("Error: Getting file "+fileName+".xml caused an error.\nPlease check the browser's console for debugging");
		return -1;	
	}
}
function loadSong(songUrl) {
	if (autoDisappear) {
		hideBox('selectSongBox');
	}
	
	song = loadXML(songUrl, "song");
	if (song < 0) {
		// show Welcome Arrow pointing user to choose a song
		document.getElementById("contentWrapper").style.backgroundImage = "url(img/welcomeArrow.png)";
		return;
	}
	
	// song loaded successfully
	setCookie("prevSong", songUrl, 365);
	document.getElementById('frontPage').innerHTML = '';	
	document.getElementById('player').setAttribute("src","mp3/"+songUrl+".mp3");
	document.getElementById("contentWrapper").style.backgroundImage = "none";

	var w = function(stuff) {
		var box = document.getElementById('frontPage').innerHTML += stuff;
	}

	var temp = null;	
	var songTitle = song.getElementsByTagName("title")[0].childNodes[0].nodeValue;
	document.getElementById("musicSelect").innerHTML = songTitle;
	w("<h1>" + songTitle + "</h1>");
	
	var songArtist = song.getElementsByTagName("artist")[0].childNodes[0].nodeValue;
	w("<h2>" + songArtist + "</h2>");

	temp = song.getElementsByTagName("youtubeURL");
	slider = document.getElementById('showVideoInput');
	if (temp.length > 0) {
		temp = temp[0].childNodes[0].nodeValue;
		hideBox('musicVideo'); // display videoBox
		document.getElementById('videoIFrame').setAttribute("src","http://www.youtube.com/embed/"+temp+"?rel=0");
		document.getElementById('videoTitle').innerHTML = songTitle;	
		slider.disabled = false;
	} else {
		if (document.getElementById(popups[2]).className == '') {
			hideBox(popups[2]);
		}
		slider.disabled = true;
	}
	
	var th = "<table id='lyricsTable'>";
	// HTML for <table> placed in a String before writing
	
	var cov = function(s) {
		return s.split(/\r?\n/).join("<br>"); 
	};
	
	var rows = song.getElementsByTagName("p");
	
	for (j = 0; j < rows.length; j++) {
		
		if (rows[j].hasAttribute('symbol')) {
			var symbolType = rows[j].getAttribute('symbol');
			var label = '';
			switch (symbolType) {
				case "male" : label =  '♂'; break;
				case "female" : label =  '♀'; break;
				case "fast" : label = '⇝'; break;
				case "repeat" : label = '↺'; break;
				case "chorus" : label = '♬';break;
				case "both" : label = '♂+♀'; break;
			}
			if (symbolType != "chorus") 
				symbolType = 'symbol '+symbolType;
			th += "<tr class='" + symbolType + "'><td colspan='2'>" + label + "</td>";
		} else {
			if (rows[j].hasAttribute('chorus')) {
				th += ("<tr class='chorus'>");
			} else  th += ("<tr>");
		
			th += ("<td>");
			temp = rows[j].getElementsByTagName("zh");
			th += cov(temp[0].childNodes[0].nodeValue);
			th += ("</td>");			
			
			temp = rows[j].getElementsByTagName("py");
			if (temp.length > 0) {
				// if there's a pinyin for this paragraph
				th += ("<td>");
				th += cov(temp[0].childNodes[0].nodeValue);
				th += ("</td>");			
			}
		}
		th += ("</tr>");
	}
	th += ("</table>");
	
	w(th);
	out(songTitle + "(" + songUrl + ") loaded successfully");
}
function loadSongMenu() {
	var file = "songlist";
	list = loadXML(file, "collection");
	if (list < 0) {
		out("Error: Can't load song menu");
		return;
	}
	
	//w writes HTML code to a container
	htmlCode= '';
	var w = function(stuff) {
		var box = document.getElementById('forScroll').innerHTML += stuff;
	}
	
	artists = list.getElementsByTagName("artist");
	for (i = 0; i < artists.length; i++) {
		songs = artists[i].getElementsByTagName("song");
		
		if (artists[i].hasAttribute('others')) {
			htmlCode += "<div class='artist'  style='width:92%'><span id='key5'>其它</span>";
		} else {
			htmlCode += "<div class='artist'>";
			htmlCode += artists[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
		}
		
		htmlCode += "<ul>";
		for (j = 0; j < songs.length; j++) {
			songCode = "'" + songs[j].getAttribute('code') + "'";
			hasVideo = songs[j].getAttribute('video');
			songName = songs[j].childNodes[0].nodeValue;
			htmlCode += '<li onclick="loadSong(' + songCode + ')"'
			if (hasVideo == 'true') htmlCode += " class='incVideo'";
			htmlCode += '>' + songName + "</li>";
			
		}
		htmlCode += "</ul></div>";		
	}
	w(htmlCode);
}
