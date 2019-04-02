//initializing the messagingSDK
var windowKit = new windowKit({
	account: 89307955
	//skillId: 12341234 - optional skill ID
});
//declaring variables
var userinput = '<div class="inputcontainer"><input type="text" id="messageInput" placeholder="Type your query here"/><div class="magGlass"><i class="fas fa-search"></i></div></div><div class="lp-json-pollock"><div class="lp-json-pollock-layout lp-json-pollock-layout-vertical"><div class="lp-json-pollock-element-button searchButton"><button title="Go back" aria-label"Go back">Go back</button></div></div></div>'
var taginput = '<div class="taginputcontainer"><input type="text" id="tagInput" placeholder="Enter your account number here"/></div><div class="lp-json-pollock"><div class="lp-json-pollock-layout lp-json-pollock-layout-vertical"><div class="lp-json-pollock-element-button searchButton"><button title="Go back" aria-label"Go back">Go back</button></div></div></div>'
let isScrolling;
let agentFirstText;

//connecting to a conversation, the JWT is created here
windowKit.connect();

//when the conversation has been loaded and is ready (displayed), call the scrollBottom function
windowKit.onReady( function () {
	console.log("ready");

});

//when an agent (the bot) sends a text
windowKit.onAgentTextEvent(function(text) {
	//apnend the text's contents to the conversation
	$('#caseyContainer').append('<div class="caseyTextContainer"><img class="caseyAvatar" src="img/avatar-casey.svg"/><div class="caseyText">' + text + '</div></div>');
	//a rule to check if the user asked for a search and if so, show the input field
	if (text.indexOf("Would you like to search for something else") > -1 || text.indexOf("Sorry, I could not find anything for that") > -1 || text.indexOf("What would you like to search for?") > -1) {
		displayInput();
	}
	if (text.indexOf("I'm on it, what's your account number?") > -1) {
		setTimeout (function () {
			getTag();
		}, 500);
	}
	console.log('Agent: ' + text);
	//a rule to get rid of the loader, but only one the first agent text sent to prevent errors
	if (!agentFirstText) {
		agentFirstText = true;
		$("#botLoader").css('display', 'none');
		scrollBottom(0);
	} else {
		scrollBottom(850, 1500);
	}
	$('.caseyText a').on('click', function (event) {
		event.preventDefault();
		var url = $(this).attr('href');
		window.open(url, "_blank");
	});
});

//when a user sends a text
windowKit.onVisitorTextEvent(function(text) {
	//grab that text's contents and append it to the conversation
	$('#caseyContainer').append('<div class="consumerText">' + text + '</div>');
	console.log('visitortext');
	var previousContainer = $('.lp-json-pollock-layout:last');
	var previousButtons = $(previousContainer).children('.lp-json-pollock-element-button');
	$.each (previousButtons, function() {
		if (!$(this).hasClass('keep')) {
		$(this).addClass('fadeout');
		$(this).css('pointer-events', 'none');
	}
});
	scrollBottom(850, 1500);
});

//when an agent (the bot) sends a rich content message
windowKit.onAgentRichContentEvent(function(content) {
	//grab the content of the message, render them using LP's Pollock tool and set them as a variable
  var structuredText = JsonPollock.render(content);
	var caseyImage = '<img class="caseyAvatar scAvatar" src="img/avatar-casey.svg"/>'
	//append that variable to the conversation
	$('#caseyContainer').append(structuredText, caseyImage);
	// var scTexts = document.getElementsByClassName('lp-json-pollock');
	// var latestScText = scTexts[scTexts.length - 1];
	// $(latestScText).append('')
	//when you print the text, print the rich content as an object not a string
	console.log('Agent: ', structuredText);
	//Pollock code used to navigate to the links the bot sends, effectively registering the buttons to be links to them
	JsonPollock.registerAction('link', function (linkObject) {
		//grab the link passed with the object
		var rawLink = linkObject.actionData.uri;
		//open the link in a new tab
		window.open(rawLink, "_blank");
		console.log(linkObject);
	});
	jsonButton();
	scrollBottom(850, 1500);
});

windowKit.onAgentChatState(function (state) {
	if (state == 'COMPOSING' && agentFirstText == true) {
		agentFirstText = true;
		$('#typing').css('display', 'flex');
		//show your agent is typing element
} else {
	$('#typing').css('display', 'none');
	//agent has stopped typing so
	//hide your agent is typing element
}
});

function displayInput () {
	let inputDisplayed;
	if (!inputDisplayed) {
	inputDisplayed = true;
	//timeout needed to make sure the input gets displayed after the response message
	$('#messageInput').attr('id', 'messageInputUsed');
	setTimeout (function () {
	//find the last child, which will always be the response message, and append the input beneath it
	$('#caseyContainer:last').append(userinput);
	jsonButton();
	//a listener to recognize whether enter was pressed on the search input
	 $('#messageInput').keydown(function (e) {
		 if (e.which == 13) {
			 //when enter was pressed, grab the text from the input field
			 var messageText = messageInput.value;
			 //send that text to the conversation, where it will get appended
			 windowKit.sendMessage(messageText);
			 console.log('enter');
			 console.log(messageText);
			 //change the id of the input field used to make sure it doesn't get picked up when this function runs again - there can only be one!
			 $(this).attr('id', 'messageInputUsed');
		 }
	 });
}, 1000);
}
setTimeout (function () {
	//allow other scrolls in the future, like those which happen when a new text is sent
	inputDisplayed = false;
}, 2000);
};

function getTag () {
	let tagDisplayed;
	if (!tagDisplayed) {
	tagDisplayed = true;
	//timeout needed to make sure the input gets displayed after the response message
	$('#tagInput').attr('id', 'tagInputUsed');
	setTimeout (function () {
	//find the last child, which will always be the response message, and append the input beneath it
	$('#caseyContainer:last').append(taginput);
	jsonButton();
	//a listener to recognize whether enter was pressed on the search input
	 $('#tagInput').keydown(function (e) {
		 if (e.which == 13) {
			 //when enter was pressed, grab the text from the input field
			 var tagText = tagInput.value;
			 //send that text to the conversation, where it will get appended
			 windowKit.sendMessage(tagText);
			 var tagMessage = "<!-- BEGIN LivePerson Monitor. -->" + "<script type='text/javascript'>" + "window.lpTag=window.lpTag||{},'undefined'==typeof window.lpTag._tagCount?(window.lpTag={wl:lpTag.wl||null,scp:lpTag.scp||null,site:'" + tagText + "'||'',section:lpTag.section||'',tagletSection:lpTag.tagletSection||null,autoStart:lpTag.autoStart!==!1,ovr:lpTag.ovr||{},_v:'1.10.0',_tagCount:1,protocol:'https:',events:{bind:function(t,e,i){lpTag.defer(function(){lpTag.events.bind(t,e,i)},0)},trigger:function(t,e,i){lpTag.defer(function(){lpTag.events.trigger(t,e,i)},1)}},defer:function(t,e){0===e?(this._defB=this._defB||[],this._defB.push(t)):1===e?(this._defT=this._defT||[],this._defT.push(t)):(this._defL=this._defL||[],this._defL.push(t))},load:function(t,e,i){var n=this;setTimeout(function(){n._load(t,e,i)},0)},_load:function(t,e,i){var n=t;t||(n=this.protocol+'//'+(this.ovr&&this.ovr.domain?this.ovr.domain:'lptag.liveperson.net')+'/tag/tag.js?site='+this.site);var o=document.createElement('script');o.setAttribute('charset',e?e:'UTF-8'),i&&o.setAttribute('id',i),o.setAttribute('src',n),document.getElementsByTagName('head').item(0).appendChild(o)},init:function(){this._timing=this._timing||{},this._timing.start=(new Date).getTime();var t=this;window.attachEvent?window.attachEvent('onload',function(){t._domReady('domReady')}):(window.addEventListener('DOMContentLoaded',function(){t._domReady('contReady')},!1),window.addEventListener('load',function(){t._domReady('domReady')},!1)),'undefined'===typeof window._lptStop&&this.load()},start:function(){this.autoStart=!0},_domReady:function(t){this.isDom||(this.isDom=!0,this.events.trigger('LPT','DOM_READY',{t:t})),this._timing[t]=(new Date).getTime()},vars:lpTag.vars||[],dbs:lpTag.dbs||[],ctn:lpTag.ctn||[],sdes:lpTag.sdes||[],hooks:lpTag.hooks||[],identities:lpTag.identities||[],ev:lpTag.ev||[]},lpTag.init()):window.lpTag._tagCount+=1;" + "</script>" + "<!-- END LivePerson Monitor. -->";
			 var tagMessageString = tagMessage.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
  		   return '&#' + i.charCodeAt(0) + ';';
			 });
			 setTimeout (function () {
			 $('#caseyContainer').append("<div class='caseyTextContainer'><img class='caseyAvatar' src='img/avatar-casey.svg'/><div class='caseyText'>Here's your code snippet. <a class='copylink' data-clipboard-target='.caseyCode' href=''>Copy it</a> and add to your website, for more info <a href='https://knowledge.liveperson.com/getting-started-add-the-liveperson-tag-to-your-website.html'>click here</a>.</div></div><div class='caseyTextContainer'><img class='caseyAvatar' src='img/avatar-casey.svg'/><div class='caseyText caseyCode'><code class='highlighter-rouge language-javascript'>" + tagMessageString + "</code></div></div>");
			 copyLink();
		 	}, 1000);

			 console.log('enter');
			 console.log(tagText);
			 //change the id of the input field used to make sure it doesn't get picked up when this function runs again - there can only be one!
			 $(this).attr('id', 'tagInputUsed');
		 }
	 });
}, 1000);
}
setTimeout (function () {
	//allow other scrolls in the future, like those which happen when a new text is sent
	tagDisplayed = false;
}, 2000);
};

//a function to scroll to the bottom of the conversation
function scrollBottom (offset, interval) {
	//only scroll if we haven't scrolled before
	// if (!isScrolling) {
	// 	//change the var so this doesn't repeat
	// 	isScrolling = true;
	//now that we have bottom, animate the body and html to simulate a scroll. Don't scroll on mobile.
	setTimeout (function () {
		//find the bottom of the conversation window by adding the top attribute and the height of the div
	var bottom = $(document).height() - offset;
	var children = $('#caseyContainer').children();
	if (children.length > 4) {
		$('body, html').animate({ scrollTop: bottom, complete: function() { isScrolling = false; } }, 600, 'linear');
		}
	}, 100);
	// }
	setTimeout (function () {
		//allow other scrolls in the future, like those which happen when a new text is sent
		isScrolling = false;
	}, 2000);
};

function jsonButton () {
	//when a user click on a strucuted content button
	$('.lp-json-pollock-element-button').on('click', function () {
		//grab the text of the button
		var scText = $(this).text();
		//if it's not a view result button which instead navigates to a link as above
		if (scText.indexOf("View result") == -1) {
		//send it to the conversation, it will get appended in onVisitorTextEvent
		windowKit.sendMessage(scText);
		var buttons = $('.lp-json-pollock-layout').children('.lp-json-pollock-element-button');
		$(this).addClass('keep')
		$.each (buttons, function() {
			if (!$(this).hasClass('keep')) {
			$(this).addClass('fadeout');
		}
			$(this).css('pointer-events', 'none');
	});
	}
		//if the user wants to search, show the input field
		if (scText == "Take me back to the search") {
			setTimeout (function () {
				displayInput();
			}, 1000);
		}
	});
}

function copyLink() {
	$('.copylink').on('click', function (event) {
	event.preventDefault();
});
};

$(document).ready(function () {
	new ClipboardJS('.copylink');
	//when the reset button is clicked
	$('#resetcontainer').click(function() {
		//clear localStorage, killing the JWT
		window.localStorage.clear();
		//refresh the page. Since there's no JWT stored, a new conversation will be created
    window.location.reload(true);
});
})
