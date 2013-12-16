$(w.document).ready(function(){
	
	$(w.document).scroll(function() {
	
				
				var esimeseSalmiKaugusTipust=$(w.document).find(".salm:first").offset().top-scrollBufferPx;
				var viimaseSalmiKaugus=$(w.document).find(".salm:last").offset().top+$(w.document).find(".salm:last").height();
				var aknaKaugusTipust=$(w.document).scrollTop();
				var aknapohjaKaugusTipust=aknaKaugusTipust+$(w).height();
				
				if(aknaKaugusTipust>esimeseSalmiKaugusTipust) {
					
					$(document).find("button[value='pgUp']").show();
				} else {
					$(document).find("button[value='pgUp']").hide();
				}
				
				if(aknapohjaKaugusTipust<viimaseSalmiKaugus) {
					$(document).find("button[value='pgDown']").show();
				} else {
					$(document).find("button[value='pgDown']").hide();
				}
	});
});