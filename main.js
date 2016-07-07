$(document).ready(function(){

	$('#siteInput').bind("enterKey",function(e){
		var webInput = $(this).val();
		// check if it is a url and 
		if(isURL(webInput)===true){
			//if it is, append to container
	   		$('#siteContainer').append("<div class='enteredSite' align='center'>"+webInput+"</div>");
	   		// $('.enteredSite').append('blah')
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
});

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}