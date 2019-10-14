var bc;
var last_uuid;
var scrollBufferPx = 6;

bc = new BroadcastChannel('piibel');


bc.onmessage = function (ev) {
	var obj = JSON.parse(ev.data)

	console.log(obj)

	switch(obj.cmd) {
			case "window":
					bc.postMessage(JSON.stringify({cmd:"window-exist", val:"yes"}))
					break;
			case "data":
					$(document).find("body").find("#wraper").html(obj.data);
					last_uuid = obj.u_id;
					break;
			case "scroll":
					if(obj.value == "pageDown") pageDown();
					if(obj.value == "pageUp") pageUp();
					if(obj.value == "scrollUp") scrollUp();
					if(obj.value == "scrollDown") scrollDown();
					break;
			case "style":
			    if(obj.element) {
						try {
						   $(document).find(obj.element.color.elm).css(obj.element.color.attr,obj.element.color.value);
						} catch(err) {
							console.log(err);
						}
					}
				 if(obj.data) {
					 var varv = obj.data.body.v2rv;
					 $(document).find("body").css("background-color",varv);
					 varv=obj.data.salm.v2rv;
					 $(document).find(".salm").css("color",varv);
					 varv=obj.data.salmiNr.v2rv;
					 $(document).find(".salmiNr").css("color",varv);
					 varv=obj.data.salmPlkr.v2rv;
					 $(document).find(".salmPlkr").css("color",varv);
					 varv=obj.data.ptkNr.v2rv;
					 $(document).find(".ptkNr").css("color",varv);
					 varv=obj.data.rNim.v2rv;
					 $(document).find(".rNim").css("color",varv);
				 }
				 break;
			default:
				 break;
	}
 }

$(document).ready(function(){
	//window.opener.getColor('ProjektoriAken');


	bc.postMessage(JSON.stringify({cmd:"window-opened"}));
	bc.postMessage(JSON.stringify({cmd:"get-style", u_id:last_uuid}));

	$(document).scroll(function() {

				var esimeseSalmiKaugusTipust=$(document).find(".salm:first").offset().top-scrollBufferPx;
				var viimaseSalmiKaugus=$(document).find(".salm:last").offset().top+$(document).find(".salm:last").height();
				var aknaKaugusTipust=$(document).scrollTop();
				var aknapohjaKaugusTipust=aknaKaugusTipust+$(window).height();

				if(aknaKaugusTipust>esimeseSalmiKaugusTipust) {
          bc.postMessage(JSON.stringify({cmd:"button", value:"pgUp-show"}))
					//$(window.opener.document).find("button[value='pgUp']").show();
				} else {
					bc.postMessage(JSON.stringify({cmd:"button", value:"pgUp-hide"}))
					//$(window.opener.document).find("button[value='pgUp']").hide();
				}

				if(aknapohjaKaugusTipust<viimaseSalmiKaugus) {
					bc.postMessage(JSON.stringify({cmd:"button", value:"pgDown-show"}))
					//$(window.opener.document).find("button[value='pgDown']").show();
				} else {
					bc.postMessage(JSON.stringify({cmd:"button", value:"pgDown-hide"}))
					//$(window.opener.document).find("button[value='pgDown']").hide();
				}
	});
});


function windowClosed() {
    bc.postMessage(JSON.stringify({cmd:"window-closed"}))
}


/**
*
*	Lehe alla kerimine PageDown
*/
function pageDown()  {

	var scrollPosition = $(document).scrollTop(), //akna ülemine äär tipust
	    nextPost = 0,
	    currentPosition = 0;
		var height=scrollPosition+$(window).height();  // akna alumine äär tipust

	$(document).find(".salm").each(function() {
	    currentPosition = $(this).offset().top; //salmi ülemise ääre kaugus tipust

	    if (currentPosition > height && currentPosition > scrollPosition) {
			currentPosition = $(this).prev().offset().top-scrollBufferPx;
	        nextPost = currentPosition;
	        return false; // break the loop
	    }

	});

	//$(w.document).scrollTop(nextPost); // Scrolls the page to the post
	$(document).find("html").animate({scrollTop:nextPost}, 2000);

}


	/**
	*
	*	Lehe üless kerimine PageUp
	*/
	function pageUp()  {

		var scrollPosition = $(document).scrollTop(),
			nextPost = 0,
			currentPosition = 0;
			var height=scrollPosition-$(window).height();
		$(document).find(".salm").each(function() {
			currentPosition = $(this).offset().top;

			if (currentPosition > height) {
				currentPosition = $(this).offset().top-scrollBufferPx;
				nextPost = currentPosition;
				return false; // break the loop
			}


	  });
	//$(w.document).scrollTop(nextPost); // Scrolls the page to the post
	$(document).find("html").animate({scrollTop:nextPost}, 2000);

	}


	function scrollUp()  {

		var scrollPosition = $(document).scrollTop(),
			nextPost = 0,
			currentPosition = 0,
			salm,
			i=0;


		var test=$(document).find(".salm").each(function() {
			currentPosition = $(this).offset().top;
			if (currentPosition > scrollPosition) {

					salm = $(this).prev();
					if($(salm).attr('class')!="salm") {
						do{
							salm = $(salm).prev();
							if(typeof salm ==="undefined") return false; //väljub functionist. break loob each

							i++;
						}
						while($(salm).attr('class')!="salm" && i<4)
					}

					if(salm.length!=0) { //salm element ei sisalda midagi. Tühjus. tuleb prev()
						nextPost=$(salm).offset().top-scrollBufferPx;
					} else {
						nextPost=currentPosition-200; //200 on suvaline arv, et piisavalt ülesse kerida, et minna edasi normaalselt
					}

				return false; // break the loop
			}

		});
		//$(w.document).scrollTop(nextPost); // Scrolls the page to the post
		$(document).find("html").animate({scrollTop:nextPost}, 500);
	}

	function scrollDown()  {

		var scrollPosition = $(document).scrollTop(),
			nextPost = 0,
			currentPosition = 0;
		var position2=scrollPosition+$(window).height();

		$(document).find(".salm").each(function() {
			currentPosition = $(this).offset().top+$(this).height();

			if (currentPosition > position2) {
				nextPost = scrollPosition+(currentPosition-position2)+scrollBufferPx;
				return false; // break the loop
			}

					/*
					currentPosition += $(this).height();
					nextPost=scrollPosition+(currentPosition-position2)+10;
					$("button[value='pgDown']").hide();
					return false; */
		});
		//$(w.document).scrollTop(nextPost); // Scrolls the page to the post
		$(document).find("html").animate({scrollTop:nextPost}, 500);
	}
