// search bar functionality
function toggleInHouseCheckbox(visibility){
	document.getElementById("switch_nobr").style.visibility = visibility; 
}

function SymbolSearch(bookID)
{

  var f = document.forms['frmSymbolSearch'];
  var url; 
  var sel;
  var in_house = f.switch.checked;

  for(i=0;i<f.__symboloc.length;i++) if(f.__symboloc[i].checked == true ) { sel=f.__symboloc[i].id; }


  if(sel=='book_search') { 
    url = "http://www.ncbi.nlm.nih.gov/toolkitbookgh/?term=" + f.__symbol.value; 
  } else

  if(sel=='toolkit') { 
    if(in_house) 
      url = "http://test.ncbi.nlm.nih.gov/toolkitinternal/?term=" + f.__symbol.value; 
    else
      url = "http://www.ncbi.nlm.nih.gov/toolkit/?term=" + f.__symbol.value; 
  } else

  if(sel=='pLXR') { 
    if(in_house)
      url = "http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/ident?i=" + f.__symbol.value + "&d=";
    else
      url = "http://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=" + f.__symbol.value + "&d="; 
  } else

  if(sel=='pLib') { 
    if(in_house)
      url = "http://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lib_search/libsearch.cgi?public=no&symbol=" + f.__symbol.value; 
    else
      url = "http://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lib_search/libsearch.cgi?public=yes&symbol=" + f.__symbol.value; 
  }

 //  if(sel=='google_search') { url = "http://www.google.com/#q=" + f.__symbol.value + " site:ncbi.github.io/cxx-toolkit"; }  

  // window.location = url;
  window.open(url,'_newtab');
  
  return false;
}

function SymbolSearchKeyPress(bookID,e)
{
 var nav = ( navigator.appName == "Netscape" ) ? true : false;
 var msie = ( navigator.appName.indexOf("Microsoft") != -1 ) ? true : false;
 var k = 0;

 if( nav ) { k = e.which; }
 else if( msie ) { k = e.keyCode; }
 if( k==13 ) SymbolSearch(bookID);
}


// var oldOnLoad = window.onload;
window.onload = unoem();

function unoem()
{
//	window.onload = oldOnLoad;
    
    var elements = document.getElementsByClassName("oem_span");
    for(var i=0; i<elements.length; i++) {
		var str = elements[i].innerHTML;
		var x='';
		for(var j=0; j<str.length; j++) {
		  c = str.charCodeAt(j);
		  if(c>51&&c<123) { c-=7; } 
		  else if(c>44&&c<52) { c+=71; }
		  x+= String.fromCharCode(c);
		}
		em = "<a href=\"mailto:"+x+"\">"+x+"</a>";
		elements[i].innerHTML = em;
    } 
}

;
