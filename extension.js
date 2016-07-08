// prank extensions

// cenafy every few pictures
var cenafy = function() {
  var imgs = document.body.getElementsByTagName('img');
  for (var i = 2; i < imgs.length; i+=10) {
    imgs[i].setAttribute('src', 'http://www.wwe.com/f/styles/og_image/public/2016/02/20060402_cena_hhh--bb9e5fd5167e751271682e5d62a904c2.jpg');
  }
};
// $(document).ready(cenafy());


// word replacer extension
function walk(node)
{
	// Source: http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{
	var v = textNode.nodeValue;

  v = v.replace(/\bCodesmith\b/g, "Will's Dungeon");
	v = v.replace(/\bReact\b/g, "Angular");
  v = v.replace(/\breact\b/g, "angular");
  v = v.replace(/\b.99\b/g, "00.95");
  v = v.replace(/\bHacker\b/g, "slacker");

	textNode.nodeValue = v;
}


var check =[];
chrome.storage.local.get("checked", function(data){
		if(!data) check[0] = true;
		else check.push(data.checked);
		// console.log(data.checked)
		// console.log("In Extensions: "+check[0]);

		if (check[0]===true) {
			$(document).ready(cenafy());
		  walk(document.body);
		  setTimeout(function () {
		    walk(document.body);
		  }, 1000);
		}
	});

		
	




