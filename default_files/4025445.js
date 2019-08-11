xQuery(function($j) {
      var formState = {
          overrideBackends: false,
          backends: {}
      };
      
      // Name of the cookie
      var cookieName;
      
      // Mostly just for debugging, store the cookie string value here
      // rather than in the sub-function scope
      var cookieStr;
      
      // An object representation of the cookie.  This is converted from the
      // XML cookie value on init.  The form controls will manipulate this,
      // and when the user clicks "Go", this will be converted back into
      // XML.
      var cookieObj;

      ///////////////////////////////////////////////////////////////////////////////
      function cbChanged(event) {
          //console.info("Event caught: " + event);
          var target = $j(event.target);
          var id = target.attr("id");
          var value = target.attr("value");
          var checked = target.attr("checked");
          /*console.info("target id: '" + id + 
                       "', value: '" + value + 
                       "', checked: '" + checked + "'");*/
          
          
          if (id == "besetsel-cb") {
              if (checked) {
                  $j("#besetsel-sel").removeAttr("disabled");
                  besetSelFormToObj();
              }
              else {
                  $j("#besetsel-sel").attr("disabled", 1);
                  delete cookieObj.besetName;
              }
          }
          else if (id == "besetsel-sel") {
              besetSelFormToObj();
          }
          else {
              var m;
              if (m = id.match(/besetsel-be-(.*?)-cb/)) {
                  var backend = m[1];
                  //console.info(">>>backend checkbox:  " + backend);
                  if (checked) {
                      $j("#besetsel-be-" + backend + "-text").removeAttr("disabled");
                      beUrlFormToObj(backend);
                  }
                  else {
                      $j("#besetsel-be-" + backend + "-text").attr("disabled", 1);
                      delete cookieObj.backendUrls[backend];
                  }
              }
              else if (m = id.match(/besetsel-be-(.*?)-text/)) {
                  backend = m[1];
                  //console.info(">>>backend text:  " + backend);
                  beUrlFormToObj(backend);
              }
          }
          
          // PMC-11784 and PMC-11785.
          // This fixes a nasty IE bug.  It causes a slight flash when the user
          // clicks a checkbox, but it works.
          if (xQuery.browser.msie){
              target.hide();
              window.setTimeout( function(){ target.show();}, 0 );
          }
          
      }

      ///////////////////////////////////////////////////////////////////////////////
      // besetSelFormToObj()
      // This is called by a couple of event handlers and decodes the
      // currently selected BESet (in the drop-down form) and sets the
      // cookieObj.besetName accordingly.

      function besetSelFormToObj()
      {
          cookieObj.besetName = $j("#besetsel-sel").val();
      }

      ///////////////////////////////////////////////////////////////////////////////
      // beUrlFormToObj(backend)
      // This is similar, and takes care of reading the text value from the
      // form and stuffing it into the object

      function beUrlFormToObj(backend) {
          var value = $j("#besetsel-be-" + backend + "-text").attr("value");
          if (value) cookieObj.backendUrls[backend] = value;
      }

      ///////////////////////////////////////////////////////////////////////////////
      function init() {
          if ($j("#besetsel-form").length < 1)
          {
              return;
          }
          
          cookieName = $j("#besetsel-form").attr("cookieName");
          cookieObj = cookieXmlToJson(cookieName);
          initFormState();

          // Set event handers
          $j("#besetsel-form .besetsel-control").change(function(event) {
              cbChanged(event);
          });
          $j("#besetsel-go-button").click(function(event) {
              goButton(event);
          });
          $j("#besetsel-reset-button").click(function(event) {
              resetButton(event);
          });
          
          // This "pullout" might be empty, in the case of the BESet being
          // selected by path segment instead of cookie.  In that case, the
          // tab acts as a watermark, just to identify the BESet, and we
          // don't want to allow it to be "pulled out".  So we'll set the
          // width to 0 in that case.
          var w = $j("#besetsel-go-button").length > 0 ? "400px" : "0px";

          // Put it into the sidecontent pullout
          $j("#besetsel-form").sidecontent({
              /*classmodifier: "besetsel",*/
              attachto: "rightside",
              width: w,
              opacity: "0.8",
              pulloutpadding: "5",
              textdirection: "vertical",
              clickawayclose: 0,
              titlenoupper: 1
          });
          
          var pulloutColor = $j("#besetsel-form").attr("pulloutColor");
          //alert("color is " + pulloutColor);
          $j("#besetsel-form").data("pullout").css("background-color", pulloutColor || '#663854');
          
          if ($j("#besetsel-go-button").size() > 0) {
              $j("#besetsel-form").data("pullout").css({
                  "border-top": "ridge gray 5px",
                  "border-bottom": "ridge gray 5px",
                  "border-left": "ridge gray 5px"
              });
          }
      }

      ///////////////////////////////////////////////////////////////////////////////
      // goButton(event)
      // Handle the user-click of the "Go!" button.
      
      function goButton(event) {
          // Convert the object into XML
          var cookieXml = "<Backends><BESet" + ( cookieObj.besetName ? (" name='" + cookieObj.besetName + "'>") : ">" );
          for (var backend in cookieObj.backendUrls) {
              //console.info("+++ backend " + backend);
              cookieXml += 
                "<Backend name='" + backend + "'>" + xmlEscape(cookieObj.backendUrls[backend]) + "</Backend>";
          }
          cookieXml += "</BESet></Backends>";
          //console.info(cookieXml);
          
          // Set the cookie
          document.cookie = cookieName + "=" + encodeURIComponent(cookieXml) +
                            "; max-age=604800" +
                            "; path=/" +
                            "; domain=nih.gov";
          // Reload the page
          window.location.reload();
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      // resetButton(event)
      // Handle the user-click of the "Reset" button.
      // Does the same thing as "Go!", but sets the cookie to the empty string.

      function resetButton(event) {
          // Clear the cookie
          document.cookie = cookieName + "=" + 
                            "; max-age=604800" +
                            "; path=/" +
                            "; domain=nih.gov";
          // Reload the page
          window.location.reload();
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      function xmlEscape(str) {
          str = str.replace(/\&/g, '&amp;')
                   .replace(/\</g, '&lt;')
                   .replace(/\>/g, '&gt;')
                   .replace(/\"/g, '&quot;')
                   .replace(/\'/g, '&apos;');
          return str;
      }

      ///////////////////////////////////////////////////////////////////////////////
      // This function reads the cookie value and initializes the form state
      // Don't assume anything about the form state -- redo everything.
      function initFormState() {

          var besetName = cookieObj.besetName;

          if (!besetName) {
              $j("#besetsel-cb").removeAttr("checked");
              $j("#besetsel-sel").attr("disabled", 1);
          }
          else {
              var selBESet = $j("#besetsel-opt-" + besetName);
              if (selBESet.length != 0) {
                  $j("#besetsel-cb").attr("checked", 1);
                  $j("#besetsel-sel").removeAttr("disabled");
                  selBESet.attr("selected", 1);
              }
              else {
                  $j("#besetsel-cb").removeAttr("checked");
                  $j("#besetsel-sel").attr("disabled", 1);
              }
          }
          
          // Foreach backend in the form
          $j(".besetsel-be-cb").each(function(i) {
              var id = $j(this).attr("id");
              var beName = id.match(/besetsel-be-(.*?)-cb/)[1];
              //console.info("### backend, id is '" + id + "', beName is '" + beName + "'");
              if (!beName) return;
              
              // See if there's a corresponding element in the cookie
              if (!cookieObj.backendUrls ||
                  !cookieObj.backendUrls[beName]) {
                  //console.info("Didn't find " + beName);
                  $j("#besetsel-be-" + beName + "-cb").removeAttr("checked");
                  $j("#besetsel-be-" + beName + "-text").attr("disabled", 1);
              }
              else {
                  //console.info("Found " + beName);
                  $j("#besetsel-be-" + beName + "-cb").attr("checked", 1);
                  var textbox = $j("#besetsel-be-" + beName + "-text");
                  textbox.removeAttr("disabled");
                  textbox.attr("value", cookieObj.backendUrls[beName]);
              }
          });
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      // This gets the value of the <snapshot>_beset cookie, which is in XML, and turns it
      // from this:
      //   <BESet name='test'>
      //     <BackendUrl backend='tagserver' url='bingo'/>
      //     ...
      //   </BESet>
      // Into this (note that everything is optional):
      //   { besetName: 'test',
      //     backendUrls: {
      //         tagserver: 'bingo', ... }
      //   }
      // If there is no cookie set or parsing fails, this returns {}.
      
      function cookieXmlToJson(cookieName) {
          var cookieObj = {
              backendUrls: {}
          };

          cookieStr = getCookie(cookieName);
          //console.info("cookie value is '" + cookieStr + "'");

          // Parse XML
          try {
              var cookieXml = $j(cookieStr);
          }
          catch(err) {
              return cookieObj;
          }
          
          var besetElem = cookieXml.find('BESet');
          if (besetElem.length == 0) {
              // No valid cookie value found.
              return cookieObj;
          }
          
          var besetName = besetElem.attr("name");
          if (besetName) {
              cookieObj.besetName = besetName; 
          }
          
          var backends = besetElem.find("backend");
          if (backends.length != 0) {
              backends.each(function (i) {
                  var e = $j(backends[i]);
                  cookieObj.backendUrls[e.attr("name")] = e.text();
                  //console.info("Setting " + e.attr("backend") + ": " + e.attr("url"));
              })
          }
          
          return cookieObj;
      }

      ///////////////////////////////////////////////////////////////////////////////
      function getCookie(name) {
          var allCookies = document.cookie;
          //console.info("allCookies = " + allCookies);
          var pos = allCookies.indexOf(name + "=");
          if (pos != -1) {
              var start = pos + (name + "=").length;
              var end = allCookies.indexOf(";", start);
              if (end == -1) end = allCookies.length;
              return decodeURIComponent(allCookies.substring(start, end)); 
          }
          return "";
      }
        
    init();
    
});



;
(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Side-Content/
	// Feel free to use this xQuery Plugin
	// Version: 3.0.2
	
	var classModifier = "";
	var sliderCount = 0;
	var sliderWidth = "400px";
	
	var attachTo = "rightside";
	
	var totalPullOutHeight = 0;
	
	function CloseSliders (thisId) {
		// Reset previous sliders
		for (var i = 0; i < sliderCount; i++) {
			var sliderId = classModifier + "_" + i;
			var pulloutId = sliderId + "_pullout";
			
			// Only reset it if it is shown
			if ($("#" + sliderId).width() > 0) {

				if (sliderId == thisId) {
					// They have clicked on the open slider, so we'll just close it
					showSlider = false;
				}

				// Close the slider
				$("#" + sliderId).animate({
					width: "0px"
				}, 100);
				
				// Reset the pullout
				if (attachTo == "leftside") {
					$("#" + pulloutId).animate({
						left: "0px"
					}, 100);
				} else {
					$("#" + pulloutId).animate({
						right: "0px"
					}, 100);
				}
			}
		}
	}
	
	function ToggleSlider () {
		var rel = $(this).attr("rel");

		var thisId = classModifier + "_" + rel;
		var thisPulloutId = thisId + "_pullout";
		var showSlider = true;
		
		if ($("#" + thisId).width() > 0) {
			showSlider = false;
		}

        CloseSliders(thisId);
		
		if (showSlider) {
			// Open this slider
			$("#" + thisId).animate({
				width: sliderWidth
			}, 250);
			
			// Move the pullout
			if (attachTo == "leftside") {
				$("#" + thisPulloutId).animate({
					left: sliderWidth
				}, 250);
			} else {
				$("#" + thisPulloutId).animate({
					right: sliderWidth
				}, 250);
			}
		}
		
		return false;
	};

	$.fn.sidecontent = function (settings) {
	
		var config = {
			classmodifier: "sidecontent",
			attachto: "rightside",
			width: "300px",
			opacity: "0.8",
			pulloutpadding: "5",
			textdirection: "vertical",
			clickawayclose: false
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		return this.each(function () {
		
			$This = $(this);
			
			// Hide the content to avoid flickering
			$This.css({ opacity: 0 });
			
			classModifier = config.classmodifier;
			sliderWidth = config.width;
			attachTo = config.attachto;
			
			var sliderId = classModifier + "_" + sliderCount;
			var sliderTitle = config.title;
			
			// Get the title for the pullout
			sliderTitle = $This.attr("title");
			
			// Start the totalPullOutHeight with the configured padding
			if (totalPullOutHeight == 0) {
				totalPullOutHeight += parseInt(config.pulloutpadding);
			}

			if (config.textdirection == "vertical") {
				var newTitle = "";
				var character = "";
				for (var i = 0; i < sliderTitle.length; i++) {
					character = sliderTitle.charAt(i).toUpperCase();
					if (character == " ") {
						character = "&nbsp;";
					}
					newTitle = newTitle + "<span>" + character + "</span>";
				}
				sliderTitle = newTitle;
			}
			
			// Wrap the content in a slider and add a pullout			
			$This.wrap('<div class="' + classModifier + '" id="' + sliderId + '"></div>').wrap('<div style="width: ' + sliderWidth + '"></div>');
            var pullout = $('<div class="' + classModifier + 'pullout" id="' + sliderId + '_pullout" rel="' + sliderCount + '">' + sliderTitle + '</div>').insertBefore($("#" + sliderId));
            
            // Store reference to the tab element in parent 
            $This.data('pullout', pullout);
			
			if (config.textdirection == "vertical") {
				$("#" + sliderId + "_pullout span").css({
					display: "block",
					textAlign: "center"
				});
			}
			
			// Hide the slider
			$("#" + sliderId).css({
				position: "absolute",
				overflow: "hidden",
				top: "0",
				width: "0px",
				zIndex: "1",
				opacity: config.opacity
			});
			
			// For left-side attachment
			if (attachTo == "leftside") {
				$("#" + sliderId).css({
					left: "0px"
				});
			} else {
				$("#" + sliderId).css({
					right: "0px"
				});
			}
			
			// Set up the pullout
			$("#" + sliderId + "_pullout").css({
				position: "absolute",
				top: totalPullOutHeight + "px",
				zIndex: "1000",
				cursor: "pointer",
				opacity: config.opacity
			})
			
			$("#" + sliderId + "_pullout").live("click", ToggleSlider);
			
			var pulloutWidth = $("#" + sliderId + "_pullout").width();
			
			// For left-side attachment
			if (attachTo == "leftside") {
				$("#" + sliderId + "_pullout").css({
					left: "0px",
					width: pulloutWidth + "px"
				});
			} else {
				$("#" + sliderId + "_pullout").css({
					right: "0px",
					width: pulloutWidth + "px"
				});
			}
			
			totalPullOutHeight += parseInt($("#" + sliderId + "_pullout").height());
			totalPullOutHeight += parseInt(config.pulloutpadding);
			
			var suggestedSliderHeight = totalPullOutHeight + 30;
			if (suggestedSliderHeight > $("#" + sliderId).height()) {
				$("#" + sliderId).css({
					height: suggestedSliderHeight + "px"
				});
			}
			
			if (config.clickawayclose) {
				$("body").click( function () {
					CloseSliders("");
				});
			}
			
			// Put the content back now it is in position
			$This.css({ opacity: 1 });
			
			sliderCount++;
		});
		
		return this;
	};
})(xQuery);
;
/* Override this file with one containing code that belongs on every page of your application */


;



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
(function($){

    $(function() {    

        var theSearchInput = $("#term");
        var originalTerm = $.trim(theSearchInput.val());
        var theForm = xQuery("form").has(theSearchInput);
        var dbNode = theForm.find("#database");
        var currDb = dbNode.val();
        var sbConfig = {};
        try{
            sbConfig = eval("({" + theSearchInput.data("sbconfig") + "})");
        }catch(e){}
        var defaultSubmit =  sbConfig.ds == "yes";
        var searched = false;
        var dbChanged = null; //since db.change is triggered as a work around for JSL-2067 
        var searchModified = false; //this is used to allow searching when something esle changed on the page with out the term changing
    
        if(!$.ncbi)
            $.extend($,{ncbi:{}});
        if(!$.ncbi.searchbar)
            $.extend($.ncbi,{searchbar:{}});
            
        $.extend($.ncbi.searchbar,
            (function(){
                //*****************private ******************/
               function doSearchPing() {
                   try{
                    var cVals = ncbi.sg.getInstance()._cachedVals;
                    var searchDetails = {}
                    searchDetails["jsEvent"] = "search";
                    var app = cVals["ncbi_app"];
                    var db = cVals["ncbi_db"];
                    var pd = cVals["ncbi_pdid"];
                    var pc = cVals["ncbi_pcid"];
                    var sel = dbNode[0];
                    var searchDB = sel.options[sel.selectedIndex].value;
                    var searchText = theSearchInput[0].value;
                    if( app ){ searchDetails["ncbi_app"] = app.value; }
                    if( db ){ searchDetails["ncbi_db"] = db.value; }
                    if( pd ){ searchDetails["ncbi_pdid"] = pd.value; }
                    if( pc ){ searchDetails["ncbi_pcid"] = pc.value; }
                    if( searchDB ){ searchDetails["searchdb"] = searchDB;}
                    if( searchText ){ searchDetails["searchtext"] = searchText;}
                    ncbi.sg.ping( searchDetails );
                   }catch(e){
                       console.log(e);
                   }
                }
                function getSearchUrl(term){
                    var url = "";
                    if (typeof(NCBISearchBar_customSearchUrl) == "function") 
                            url = NCBISearchBar_customSearchUrl();
                    if (!url) {
                        var searchURI = dbNode.find("option:selected").data("search_uri");
                        url = searchURI ?  searchURI.replace('$',term) : 
                             "/" + dbNode.val() + "/" + ( term !="" ? "?term=" + term : "");
                       
                        url = "//www.ncbi.nlm.nih.gov"+url;                         }
                    return url;
                }
            
                return {
                    //*****************exposed attributes and functions ******************/
                    'theSearchInput':theSearchInput,
                    'theForm':theForm,
                    'dbNode':dbNode,
                    'searched':searched,
                    'setSearchModified':function(){searchModified=true;},
                    'searchModified':function(){return searchModified;},
                    'doSearch':function(e){
                           e.stopPropagation();
                           e.preventDefault();
                           //checking for the searched flag is necessary because the autocompelete control fires on enter key, the form submit also fires on enter key
                           if(searched == false){
                               searched = true;
                               theForm.find('input[type="hidden"][name^="p$"]').attr('disabled', 'disabled');
                               //$("input[name]").not(xQuery(".search_form *")).attr('disabled', 'disabled');
                               if (defaultSubmit)
                                   $.ncbi.searchbar.doSearchPing();
                               else {
                                   var term = $.trim(theSearchInput.val());
                                   if (dbChanged || searchModified || term !== originalTerm){
                                       $.ncbi.searchbar.doSearchPing();
                                       var searchUrl = $.ncbi.searchbar.getSearchUrl(encodeURIComponent(term).replace(/%20/g,'+'));
                                       var doPost = (term.length  > 2000) ? true : false; 
                                       if (doPost){
                                           if (e.data.usepjs){
                                               Portal.$send('PostFrom',{"theForm":theForm,"term":term,"targetUrl":searchUrl.replace(/\?.*/,'')});
                                           }
                                           else{
                                               theForm.attr('action',searchUrl.replace(/\?.*/,''));
                                               theForm.attr('method','post');
                                           }
                                       }
                                       else {
                                           window.location = searchUrl;
                                       }
                                   }
                                   else{ //if (term !== originalTerm){
                                       searched = false;
                                   }
                               }
                           }
                    },
                    'onDbChange':function(e){
                         if (dbChanged === null)
                             dbChanged = false;
                         else
                             dbChanged = true;
                         var optionSel = $(e.target).find("option:selected");
                         var dict = optionSel.data("ac_dict");
                         if (dict){
                             theSearchInput.ncbiautocomplete("option","isEnabled",true).ncbiautocomplete("option","dictionary",dict);
                             theSearchInput.attr("title","Search " + optionSel.text() + ". Use up and down arrows to choose an item from the autocomplete.");
                         }
                         else{
                           theSearchInput.ncbiautocomplete("turnOff",true);
                           theSearchInput.attr("title", "Search " + optionSel.text());
                         }
                         if (defaultSubmit)
                            theForm.attr('action','/' + dbNode.val() + '/');  
                    },
                    'doSearchPing':function(){
                        doSearchPing();
                    },
                    'getSearchUrl':function(term){
                        return getSearchUrl(term);
                    }
                    
                };//end of return 
             })() //end of the self executing anon
        );//end of $.extend($.ncbi.searchbar
    
         function initSearchBar(usepjs){
         	//enable the controls for the back button
            theForm.find('input[type="hidden"][name^="p$"]').removeAttr('disabled');
             if (usepjs)
                 portalSearchBar();
         }
         
        
    
        function portalSearchBar(){
            
            Portal.Portlet.NcbiSearchBar = Portal.Portlet.extend ({
                init:function(path,name,notifier){
                    this.base (path, name, notifier);
                },
                send:{
                    "Cmd":null,
                    "Term":null
                },
                "listen":{
                    "PostFrom":function(sMessage,oData,sSrc){
            		    this.postForm(oData.theForm,oData.term,oData.targetUrl);
            		}
                },
                "postForm":function(theForm,term,targetUrl){
                       //console.log('targetUrl = ' + targetUrl);
                       theForm.attr('action',targetUrl);
                       theForm.attr('method','post');
                       this.send.Cmd({
                	        'cmd' : 'Go'
                        });
                           this.send.Term({
                	        'term' : term
                        });
                        Portal.requestSubmit();
                },
                'getPortletPath':function(){
                    return this.realpath + '.Entrez_SearchBar';
                }
            });
    
        }//portalSearchBar
        


         //portal javascript is required to make a POST when the rest of the app uses portal forms 
         var usepjs = sbConfig.pjs == "yes"; 
         //console.log('sbConfig',sbConfig);
         initSearchBar(usepjs);
         
         dbNode.on("change",$.ncbi.searchbar.onDbChange);
        
        theForm.on("submit",{'usepjs':usepjs},$.ncbi.searchbar.doSearch);
        theSearchInput.on("ncbiautocompleteenter ncbiautocompleteoptionclick", function(){theForm.submit();});
        //a work around for JSL-2067
        dbNode.trigger("change");
        //iOS 8.02 changed behavior on autofocus, should probably check other mobile devices too
        if (sbConfig.afs == "yes" && !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) ){ 
            window.setTimeout(function(){
                try{
                    var x = window.scrollX, y = window.scrollY;
                    var size= originalTerm.length;
                    if (size == 0 || /\s$/.test(originalTerm))
                        theSearchInput.focus()[0].setSelectionRange(size, size);
                    else
                        theSearchInput.focus().val(originalTerm + " ")[0].setSelectionRange(size+1, size+1);
                     window.scrollTo(x, y);
                }
                catch(e){} //setSelectionRange not defined in IE8
            },1);
        }
        
        //set the query changed flag true after a few seconds, still prevents scripted clicking or stuck enter key
        window.setTimeout(function(){$.ncbi.searchbar.setSearchModified();},2000);
         
     });//End of DOM Ready

})(xQuery);

/*
a call back for the 'Turn off' link at the bottom of the auto complete list
*/
function NcbiSearchBarAutoComplCtrl(){
    xQuery("#term").ncbiautocomplete("turnOff",true);
    if (typeof(NcbiSearchBarSaveAutoCompState) == 'function')
        NcbiSearchBarSaveAutoCompState();
 }

 


