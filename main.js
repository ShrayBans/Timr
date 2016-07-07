$(document).ready(function(){

	$('#siteInput').bind("enterKey",function(e){
		var webInput = $(this).val();
		// check if it is a url and 
		if(isURL(webInput)===true){
			//if it is, append to container
	   		$('#siteContainer').append("<div class='enteredSite' align='center'>"+webInput+"</div>");
	   		$('.enteredSite').append("<button class='xButton'>X</button>")
	   		$(this).val('');
   		}
   		else{
   			alert("Please enter valid url");
   		}
	});

	$('#siteInput').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});


	//when click xButton
	$('body').on('click', '.xButton', function(){
		$(this).closest('div').remove();
	});
});

function isURL(str) {
  var pattern = /(wwww\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return pattern.test(str);
}