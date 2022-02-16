//********************************************************Change font size

//get the font size
var el = document.getElementById("textSize");
var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
var fontSize = parseFloat(style);
var originalFontSize = fontSize
document.getElementById("myRange").min = originalFontSize;
document.getElementById("myRange").value = originalFontSize;
  
var slider = document.getElementById("myRange");
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  if (fontSize < 50){
       var newFontSize = this.value
       el.style.fontSize = newFontSize + "px";
    }
}



//*******************************************************************Adjust contrast

//change background

//get the background-color
var bgDiv = document.getElementById("contrastContainer");
var contrastDiv = window.getComputedStyle(bgDiv).backgroundColor
//console.log(contrastDiv)
//extract the RBG values
var pos1 = contrastDiv.indexOf("(");
var pos2 = contrastDiv.indexOf(")");
var contrastDivRGB = contrastDiv.slice(pos1+1, pos2);
var arr = contrastDivRGB.split(",");
var contrastDivRedNum = parseFloat(arr[0]);
var contrastDivGreenNum = parseFloat(arr[1]);
var contrastDivBlueNum = parseFloat(arr[2]);

//convert RGB to HSL
  
  //divide RGB by 255
  br = contrastDivRedNum/255, bg = contrastDivGreenNum/255, bb = contrastDivBlueNum/255;

  //determine which value is biggest and smallest
  var Bmax = Math.max(br, bg, bb), Bmin = Math.min(br, bg, bb);
  
  // bh = body-hue, bs = body-saturation, bl = body-lightness
  var bh, bs, bl;
  var d = Bmax - Bmin;

  //calculate lightness
  bl = (Bmax + Bmin) / 2

  //calculate saturation
  bs = (Bmax == Bmin) ? 0 : d/ 1 - Math.abs(2*bl - 1);
  bs = Math.round(bs)
  bs = Math.abs(bs)

  //calculate hue
  if (Bmax == Bmin) {
    bh = 0; // achromatic
  } else {     
    switch (Bmax) {
      // if max = red
      case br: bh = 60 * ((bg - bb) / d + (bg < bb ? 6 : 0)); break;
      // if max = green
      case bg: bh = 60 * ((bb - br) / d + 2); break;
      // if max = blue
      case bb: bh = 60 * ((br - bg) / d + 4); break;
    }  
  }
  
  // s & l * 100 to return as a %
bs *= 100;
bl *= 100;
bl = Math.round(bl);
bh = Math.round(bh);

originalBH = bh;
originalBS = bs;
originalBL = bl;
var originalContrastDivHSL = "hsl(" + originalBH + ", " + originalBS + "%, " + originalBL + "%)";
//console.log(originalContrastDivHSL)

document.getElementById("contrastRange").value = originalBL;

var contrastSlider = document.getElementById("contrastRange");

//change text contrast

//get the text-color
var textContrast = document.getElementById("contrastText");
var contrastText = window.getComputedStyle(textContrast).color;

//extract the RBG values
var pos1 = contrastText.indexOf("(");
var pos2 = contrastText.indexOf(")");
var contrastTextRGB = contrastText.slice(pos1+1, pos2);
var arr = contrastTextRGB.split(",");
var contrastTextRedNum = parseFloat(arr[0]);
var contrastTextGreenNum = parseFloat(arr[1]);
var contrastTextBlueNum = parseFloat(arr[2]);

//convert RGB to HSL
  
  //divide RGB by 255
  tr = contrastTextRedNum/255, tg = contrastTextGreenNum/255, tb = contrastTextBlueNum/255;

  //determine which value is biggest and smallest
  var Tmax = Math.max(tr, tg, tb), Tmin = Math.min(tr, tg, tb);

  var th, ts, tl;
  var d = Tmax - Tmin;

  //calculate lightness
  tl = (Tmax + Tmin) / 2

  //calculate saturation
  ts = (Tmax == Tmin) ? 0 : d/ 1 - Math.abs(2*tl - 1);
  ts = Math.round(ts)
  ts = Math.abs(ts)

  //calculate hue
  if (Tmax == Tmin) {
    th = 0; // achromatic
  } else {     
    switch (Tmax) {
      // if max = red
      case tr: th = 60 * ((tg - tb) / d + (tg < tb ? 6 : 0)); break;
      // if max = green
      case tg: th = 60 * ((tb - tr) / d + 2); break;
      // if max = blue
      case tb: th = 60 * ((tr - tg) / d + 4); break;
    }  
  }
  
  // s & l * 100 to return as a %
ts *= 100;
tl *= 100;
tl = Math.round(tl);
th = Math.round(th);

originalTH = th;
originalTS = ts;
originalTL = tl;
var originalContrastTextHSL = "hsl(" + originalTH + ", " + originalTS + "%, " + originalTL + "%)";

// Update the current slider value (each time you drag the slider handle)
contrastSlider.oninput = function() {
newBL = this.value
var newBgHSL = "hsl(" + bh + ", " + bs + "%, " + newBL + "%)"
bgDiv.style.backgroundColor = newBgHSL;
var contrastDifference = originalBL - newBL;
var newTL = originalTL + contrastDifference;
var newTextHSL = "hsl(" + th + ", " + ts + "%, " + newTL + "%)";
textContrast.style.color = newTextHSL;
}

//****************************************************************************highlighter text

var body = document.getElementsByTagName('BODY')[0];
var text = document.getElementById("highlightText").innerHTML;
text.trim()
//excludes the abbreviations Mr., Mrs., Dr., e.g., and a.s.a.p. A more complete abbreviation list is needed
var sentenceRegExp = /(?<=(?<!Mr|Mrs|Dr|e\.g|a\.s\.a\.p|\.\.|:)\.|\!|\?)\s|<\s*br[^>]*>(?=[A-Z])/g
var lines = text.split(sentenceRegExp)
var a = 0;
var scroll = document.getElementById("scroll");

scroll.onclick=function(){

  //remove highlight if it's there
  var textIsHighlighted = document.getElementById("spanHighlight");

  if(typeof(textIsHighlighted) != 'undefined' && textIsHighlighted != null){
    lines[a] = lines[a].split(" ")
    lines[a].shift();
    lines[a].shift();
    lines[a].pop();
    lines[a] = lines[a].join(" ");
    document.getElementById("highlightText").innerHTML = lines.join(" ")
    a = 0
  }

  //create highlight bar to be width and height of text line
  var highlighterText = document.getElementById("highlightText");
  var highlighterContainer = document.getElementById('highlightContainer');
  highlighterContainer.style.position = "relative";
  var divWidth = highlighterText.clientWidth;
  var lineHeight = Math.floor(fontSize * 1.4);

  //style highlight bar 
  var div = document.createElement("DIV");
  div.style.backgroundColor = "hsl(60, 100%, 75%)";

  div.style.position = "absolute";
  div.style.width = divWidth + "px"
  div.style.height = lineHeight + "px"
  highlighterText.style.zIndex = "1"
  div.style.zIndex = "-1"
  div.id = "highlightBar"

  //add highligh bar above text
  highlighterContainer.appendChild(div)
  highlighterText.insertBefore(div, highlighterText.childNodes[0]);
  highlighterText.style.position = "relative";

  //position bar on mouseover
  highlighterContainer.addEventListener("mousemove", tagName)

  function tagName(event) { 
    var yCo = event.offsetY;
    var x = event.target

    if (x.id == 'highlightText'){
      var highlightPos = yCo
      div.style.top = highlightPos + "px"
    }
  }

  //make bar responsive
  body.onresize = function() {
    var divWidth = highlighterText.clientWidth;
    var lineHeight = Math.floor(fontSize * 1.5);
    div.style.width = divWidth + "px"
    div.style.height = lineHeight + "px"
  } 
} 

//highlight text using the down arrow on key pad

var pgDown = document.getElementById("pgDown") 

pgDown.onclick=function(){

  // //remove bar when box unchecked
  var highlightBar = document.getElementById('highlightBar')

  if(typeof(highlightBar) != 'undefined' && highlightBar != null){
    highlightBar.parentNode.removeChild(highlightBar);
  }

  //functions for selecting next or previous array items
  function nextItem() {
    a += 1; // increase i by one
    a = a % lines.length; // if we've gone too high, start from `0` again
    return lines[a]; // give us back the item of where we are now
  }

  function prevItem() {
    if (a === 0) { // i would become 0
      a = lines.length; // so put it at the other end of the array
    }
    a = a - 1; // decrease by one
    return lines[a]; // give us back the item of where we are now
  }

  if(a === 0){
    lines[0] = lines[0].split(" ")
    lines[0].unshift("<span id=\"spanHighlight\">");
    lines[0].push("</span>");
    lines[0] = lines[0].join(" ")
    var highlightLines = lines.join(" ")
    document.getElementById("highlightText").innerHTML = highlightLines
    document.getElementById("spanHighlight").style.backgroundColor = "hsl(60, 100%, 75%)";
  }

  window.onkeydown=function highlighText(){
    if(event.key == "d"){

      nextItem();

      if (a == 0){
        lines[a] = lines[a].split(" ")
        lines[a].unshift("<span id=\"spanHighlight\">");
        lines[a].push("</span>");
        lines[a] = lines[a].join(" ")

        var lastItem = lines.length - 1
        lines[lastItem] = lines[lastItem].split(" ")
        lines[lastItem].shift();
        lines[lastItem].shift();
        lines[lastItem].pop();
        lines[lastItem] = lines[lastItem].join(" ");

        var highlightLines = lines.join(" ");
        document.getElementById("highlightText").innerHTML = highlightLines;

      } else {

        lines[a] = lines[a].trim()
        lines[a] = lines[a].split(" ")
        lines[a].unshift("<span id=\"spanHighlight\">");
        lines[a].push("</span>");
        lines[a] = lines[a].join(" ")

        lines[a-1] = lines[a-1].split(" ")
        lines[a-1].shift();
        lines[a-1].shift();

        lines[a-1].pop();
        lines[a-1] = lines[a-1].join(" ");

        var highlightLines = lines.join(" ")

        document.getElementById("highlightText").innerHTML = highlightLines
      }
    } else if (event.key == "w"){

      prevItem();
      var lastItem = lines.length - 1

      if (a == lastItem){

        lines[a] = lines[a].split(" ")
        lines[a].unshift("<span id=\"spanHighlight\">");
        lines[a].push("</span>");
        lines[a] = lines[a].join(" ")

        lines[0] = lines[0].split(" ")
        lines[0].shift();
        lines[0].shift();

        lines[0].pop();
        lines[0] = lines[0].join(" ");

        var highlightLines = lines.join(" ")
        document.getElementById("highlightText").innerHTML = highlightLines
      } else {

        lines[a] = lines[a].trim()
        lines[a] = lines[a].split(" ")
        lines[a].unshift("<span id=\"spanHighlight\">");
        lines[a].push("</span>");
        lines[a] = lines[a].join(" ")

        lines[a+1] = lines[a+1].split(" ")
        lines[a+1].shift();
        lines[a+1].shift();

        lines[a+1].pop();
        lines[a+1] = lines[a+1].join(" ");

        var highlightLines = lines.join(" ")

        document.getElementById("highlightText").innerHTML = highlightLines
      }
    }
  }
} 

//********************************************************************Dyslexia friendly text

var dyselxiaFriendlyText = document.getElementsByClassName("dyselxia-friendly-text");
var styling = []
var TD = []
var FW = []
var variant = []
//Get capital letters

upperCaseNoPeriod = /(?<!\.|\.\s|<br>|<\/br>)[A-Z]{2,}/g;
upperCasePeriod = /(?<=\.[A-Z]|\.\s[A-Z]|<br>[A-Z]|<\/br>[A-Z])[A-Z]{2,}/g;
    //make capital text lowercase


var i
for(i=0;i<dyselxiaFriendlyText.length;i++){

     dyselxiaFriendlyText[i].innerHTML = dyselxiaFriendlyText[i].innerHTML.replace(upperCaseNoPeriod, function(match) {
      return "<span class='uppercase'>" + match + "</span>";
    });

    dyselxiaFriendlyText[i].innerHTML = dyselxiaFriendlyText[i].innerHTML.replace(upperCasePeriod, function(match) {

     return "<span class='uppercase'>" + match + "</span>";
          });

  //Get text size

  var DFsize = window.getComputedStyle(dyselxiaFriendlyText[i], null).getPropertyValue('font-size');
var DFfontSize = parseFloat(DFsize);

//Get font family
var DFstyle = window.getComputedStyle(dyselxiaFriendlyText[i], null).getPropertyValue('font-family');

//Get spacing
var DFletterSpace = window.getComputedStyle(dyselxiaFriendlyText[i], null).getPropertyValue('letter-spacing');
var DFwordSpace = window.getComputedStyle(dyselxiaFriendlyText[i], null).getPropertyValue('word-spacing');
var DFlineHeight = window.getComputedStyle(dyselxiaFriendlyText[i], null).getPropertyValue('line-height');

var DFtextShadow = window.getComputedStyle(dyselxiaFriendlyText[i], null).getPropertyValue('text-shadow');
var DFtextColor = window.getComputedStyle(dyselxiaFriendlyText[i], null).getPropertyValue('color');
var DFtextAlign = window.getComputedStyle(dyselxiaFriendlyText[i], null).getPropertyValue('text-align');

//save original values
var originalDFFontSize = DFfontSize;
var originalDFStyle = DFstyle;
var originalDFLetterSpace = DFletterSpace;
var originalDFWordSpace = DFwordSpace;
var originalDFLineHeight = DFlineHeight;
var originalDFTextShadow = DFtextShadow;
var originalDFTextColor = DFtextColor;
var originalDFTextAlign = DFtextAlign
}

//console.log(styling)



//get colours
var dyselxiaFriendlyContainer = document.getElementById("dyselxiaFriendlyContainer");
var bgDFColor = window.getComputedStyle(dyselxiaFriendlyContainer, null).getPropertyValue('background-color');

//dyslexia friendly font choices
var friendlyFonts = ["Arial", "Comic Sans", "Verdana", "Tahoma", "Century Gothic", "Trebuchet", "Calibri", "Open Sans"]

//get heading data

var h1 = document.getElementsByTagName("H1");
if(typeof(h1) != 'undefined' && h1 != null){
  for(i=0;i<h1.length;i++){
    var h1size = window.getComputedStyle(h1[i], null).getPropertyValue('font-size');
    var h1FontSize = parseFloat(h1size);
    var h1color = window.getComputedStyle(h1[i], null).getPropertyValue('color');
    var h1align = window.getComputedStyle(h1[i], null).getPropertyValue('text-align');

  }
}

var h2 = document.getElementsByTagName("H2");
if(typeof(h2) != 'undefined' && h2 != null){
  for(i=0;i<h2.length;i++){
    var h2size = window.getComputedStyle(h2[i], null).getPropertyValue('font-size');
    var h2FontSize = parseFloat(h2size);
   var h2color = window.getComputedStyle(h2[i], null).getPropertyValue('color');
    var h2align = window.getComputedStyle(h2[i], null).getPropertyValue('text-align');

  }
}

var h3 = document.getElementsByTagName("H3");
if(typeof(h3) != 'undefined' && h3 != null){
  for(i=0;i<h3.length;i++){
    var h3size = window.getComputedStyle(h3[i], null).getPropertyValue('font-size');
    var h3FontSize = parseFloat(h3size);
    var h3color = window.getComputedStyle(h3[i], null).getPropertyValue('color');
    var h3align = window.getComputedStyle(h3[i], null).getPropertyValue('text-align');

  }
}

var h4 = document.getElementsByTagName("H4");

if(typeof(h4) != 'undefined' && h4 != null){
 for(i=0;i<h4.length;i++){
    var h4size = window.getComputedStyle(h4[i], null).getPropertyValue('font-size');
    var h4FontSize = parseFloat(h4size);
    var h4color = window.getComputedStyle(h4[i], null).getPropertyValue('color');
    var h4align = window.getComputedStyle(h4[i], null).getPropertyValue('text-align');
  }
}

var h5 = document.getElementsByTagName("H5");
if(typeof(h5) != 'undefined' && h5 != null){
  for(i=0;i<h5.length;i++){
    var h5size = window.getComputedStyle(h5[i], null).getPropertyValue('font-size');
    var h5FontSize = parseFloat(h5size);
    var h5color = window.getComputedStyle(h5[i], null).getPropertyValue('color');
    var h5align = window.getComputedStyle(h5[i], null).getPropertyValue('text-align');

  }
}

var h6 = document.getElementsByTagName("H6");
if(typeof(h6) != 'undefined' && h6 != null){
  for(i=0;i<h6.length;i++){
    var h6size = window.getComputedStyle(h6[i], null).getPropertyValue('font-size');
    var h6FontSize = parseFloat(h6size);
    var h6color = window.getComputedStyle(h6[i], null).getPropertyValue('color');
    var h6align = window.getComputedStyle(h6[i], null).getPropertyValue('text-align');

  }
}

var headerSizes = [h6FontSize,h5FontSize,h4FontSize,h3FontSize,h2FontSize,h1FontSize]

//console.log(headerSizes)
//Get link styling

var link = document.getElementsByTagName("A");
if(typeof(link) != 'undefined' && link != null){
  for(i=0;i<link.length;i++){
    var linkColor = window.getComputedStyle(link[i], null).getPropertyValue('color');
    var linkWeight = window.getComputedStyle(link[i], null).getPropertyValue('font-weight');
    var linkDecorationLine =  window.getComputedStyle(link[i], null).getPropertyValue('text-decoration-line');
    var linkDecorationColor =  window.getComputedStyle(link[i], null).getPropertyValue('text-decoration-color');
    var linkDecorationStyle =  window.getComputedStyle(link[i], null).getPropertyValue('text-decoration-style');
    var cursor =  window.getComputedStyle(link[i], null).getPropertyValue('cursor');
  }
}

//console.log(linkColor,linkWeight,linkDecorationLine,linkDecorationColor,linkDecorationStyle,cursor)

var DFcheckbox = document.getElementById("dyselxiaFriendly");
DFcheckbox.onclick=function(){
  var DFcheckboxCheck = DFcheckbox.checked
  
  if (DFcheckboxCheck == true){

    var i
    for(i=0;i<dyselxiaFriendlyText.length;i++){
      //enlarge text
      if (DFfontSize < 19){
        dyselxiaFriendlyText[i].style.fontSize = 19 + "px"
      }
      //change font family
     var j
     for (j=0; j<friendlyFonts.length; j++){
       if (DFstyle != friendlyFonts[j]){
         dyselxiaFriendlyText[i].style.fontFamily = "Arial, \"Helvetica Neue\", Helvetica, sans-serif";
       }
     }

    if (DFletterSpace != "0.35em"){
      dyselxiaFriendlyText[i].style.fontSpacing = 0.35 + "em"
    }

    if (DFwordSpace != "1.2em"){
      dyselxiaFriendlyText[i].style.WordSpacing = 1.2 + "em"
    }

    if (DFlineHeight != "1.8em"){
        dyselxiaFriendlyText[i].style.lineHeight = 1.8 + "em"
    }

    if (DFtextShadow != "none"){
     dyselxiaFriendlyText[i].style.textShadow = "none"
    }

      dyselxiaFriendlyText[i].style.textAlign = "left"


      //check if the element has any text decoration and if so remove it and add bold instead
      //set font variants to normal
    var childEl = dyselxiaFriendlyText[i].querySelectorAll("*")
    var x
    for (x=0;x<childEl.length;x++){
        var fontStyle = window.getComputedStyle(childEl[x], null).getPropertyValue('font-style');
        var textDecoration = window.getComputedStyle(childEl[x], null).getPropertyValue('text-decoration-line')
        var fontWeight = window.getComputedStyle(childEl[x], null).getPropertyValue('font-weight')
        var fontVariant = window.getComputedStyle(childEl[x], null).getPropertyValue('font-variant')

        styling.push(fontStyle);
        TD.push(textDecoration);
        FW.push(fontWeight);
        variant.push(fontVariant);
      
    if (textDecoration != "none" && childEl[x].tagName != "a"){
       childEl[x].style.textDecoration = "none"
       childEl[x].style.fontWeight = "bold"
    }
      if (fontStyle != "normal"){
       childEl[x].style.fontStyle = "normal"
       childEl[x].style.fontWeight = "bold"
    }

    if (fontVariant != "normal"){
       childEl[x].style.fontVariant = "normal"
    }
    }

    //change colours of text and background

    dyselxiaFriendlyText[i].style.color = "#000"
    }
  
    dyselxiaFriendlyContainer.style.backgroundColor = "#FFFAF0"

    
 //make capital text lowercase

  var uppercase = document.getElementsByClassName("uppercase")
    
 var j
 for(j=0;j<uppercase.length;j++){
uppercase[j].innerHTML = uppercase[j].innerHTML.toLowerCase();
    console.log(uppercase[j])  
  }
    
  //restyle links

  for(i=0;i<link.length;i++){
        link[i].style.cssText = "font-weight: bold !important; color: #0000FF; text-decoration: underline solid blue; cursor: pointer"
  }
  
  
  var h1 = document.getElementsByTagName("H1");
  if(typeof(h1) != 'undefined' && h1 != null){
    for(i=0;i<h1.length;i++){
      h1[i].style.color = "#000";
      h1[i].style.textAlign = "left";
    }
  }

  var h2 = document.getElementsByTagName("H2");
  if(typeof(h2) != 'undefined' && h2 != null){
    for(i=0;i<h2.length;i++){
      h2[i].style.color = "#000";
      h2[i].style.textAlign = "left";
    }
  }

  var h3 = document.getElementsByTagName("H3");
  if(typeof(h3) != 'undefined' && h3 != null){
    for(i=0;i<h3.length;i++){
      h3[i].style.color = "#000"
      h3[i].style.textAlign = "left";
    }
  }

  var h4 = document.getElementsByTagName("H4");
  if(typeof(h4) != 'undefined' && h4 != null){
   for(i=0;i<h4.length;i++){
      h4[i].style.color = "#000";
      h4[i].style.textAlign = "left";
    }
  }

  var h5 = document.getElementsByTagName("H5");
  if(typeof(h5) != 'undefined' && h5 != null){
    for(i=0;i<h5.length;i++){
      h5[i].style.color = "#000"
    }
  }

  var h6 = document.getElementsByTagName("H6");
  if(typeof(h6) != 'undefined' && h6 != null){
    for(i=0;i<h6.length;i++){
      h6[i].style.color = "#000";
      h6[i].style.textAlign = "left";
    }
  }
  
  // Enlarge header text
  if (fontSize < 19){
    if (headerSizes[0] != undefined){
      if(headerSizes[0] < 23){
          for (i=0;i<h6.length;i++){
            h6[i].style.fontSize = 23 + "px"
          }
        }
      if(headerSizes[1] < 28){
          for (i=0;i<h5.length;i++){
            h5[i].style.fontSize = 28 + "px"
          }
        }
      if(headerSizes[2] < 34){
          for (i=0;i<h4.length;i++){
            h4[i].style.fontSize = 34 + "px"
          }
        }
      if(headerSizes[3] < 39){
          for (i=0;i<h3.length;i++){
            h3[i].style.fontSize = 39 + "px"
          }
        }
      if(headerSizes[4] < 51){
          for (i=0;i<h2.length;i++){
            h2[i].style.fontSize = 51 + "px"
          }
        }
      if(headerSizes[0] < 67){
          for (i=0;i<h1.length;i++){
            h1[i].style.fontSize = 67 + "px"
          }
        }
    } else if (headerSizes[1] != undefined){
      if(headerSizes[1] < 23){
          for (i=0;i<h5.length;i++){
            h5[i].style.fontSize = 23 + "px"
          }
        }
      if(headerSizes[2] < 28){
          for (i=0;i<h4.length;i++){
            h4[i].style.fontSize = 28 + "px"
          }
        }
      if(headerSizes[3] < 34){
          for (i=0;i<h3.length;i++){
            h3[i].style.fontSize = 34 + "px"
          }
        }
      if(headerSizes[4] < 39){
          for (i=0;i<h2.length;i++){
            h2[i].style.fontSize = 39 + "px"
          }
        }
      if(headerSizes[5] < 51){
          for (i=0;i<h1.length;i++){
            h1[i].style.fontSize = 51 + "px"
          }
        }
    } else if (headerSizes[2] != undefined){
      if(headerSizes[2] < 23){
          for (i=0;i<h4.length;i++){
            h4[i].style.fontSize = 23 + "px"
          }
        }
      if(headerSizes[3] < 28){
          for (i=0;i<h3.length;i++){
            h3[i].style.fontSize = 28 + "px"
          }
        }
      if(headerSizes[4] < 34){
          for (i=0;i<h2.length;i++){
            h2[i].style.fontSize = 34 + "px"
          }
        }
      if(headerSizes[5] < 39){
          for (i=0;i<h1.length;i++){
            h1[i].style.fontSize = 39 + "px"
          }
        }
    } else if (headerSizes[3] != undefined){
        if(headerSizes[3] < 23){
          for (i=0;i<h3.length;i++){
            h3[i].style.fontSize = 23 + "px"
          }
        }
      if(headerSizes[4] < 28){
          for (i=0;i<h2.length;i++){
            h2[i].style.fontSize = 28 + "px"
          }
        }
      if(headerSizes[5] < 34){
          for (i=0;i<h1.length;i++){
            h1[i].style.fontSize = 34 + "px"
          }
        }
    } 
   }else if (fontSize > 19){

     var smallestHeader = (fontSize * 1.20);
       var penSmHeader = (fontSize * 1.47);
       var nextSmHeader = (fontSize * 1.79);
       var midHeader = (fontSize * 2.05);
       var penBigHeader = (fontSize * 2.68);
       var biggestHeader = (fontSize * 3.53);

     if(headerSizes[1] != undefined){ 
        if(headerSizes[0] < smallestHeader){
            for (i=0;i<h6.length;i++){
              h6[i].style.fontSize = smallestHeader + "px"
            }
        }
        if(headerSizes[1] < penSmHeader){
            for (i=0;i<h5.length;i++){
              h5[i].style.fontSize = penSmHeader + "px"
            }
          }
        if(headerSizes[2] < nextSmHeader){
            for (i=0;i<h4.length;i++){
              h4[i].style.fontSize = nextSmHeader + "px"
            }
          }
        if(headerSizes[3] < midHeader){
            for (i=0;i<h3.length;i++){
              h3[i].style.fontSize = midHeader + "px"
            }
          }
        if(headerSizes[4] < penBigHeader){
            for (i=0;i<h2.length;i++){
              h2[i].style.fontSize = penBigHeader + "px"
            }
          }
        if(headerSizes[0] < biggestHeader){
            for (i=0;i<h1.length;i++){
              h1[i].style.fontSize = biggestHeader + "px"
            }
          }
      } else if (headerSizes[1] != undefined){
        if(headerSizes[1] < smallestHeader){
            for (i=0;i<h5.length;i++){
              h5[i].style.fontSize = smallestHeader + "px"
            }
          }
        if(headerSizes[2] < penSmHeader){
            for (i=0;i<h4.length;i++){
              h4[i].style.fontSize = penSmHeader + "px"
            }
          }
        if(headerSizes[3] < nextSmHeader){
            for (i=0;i<h3.length;i++){
              h3[i].style.fontSize = nextSmHeader + "px"
            }
          }
        if(headerSizes[4] < midHeader){
            for (i=0;i<h2.length;i++){
              h2[i].style.fontSize = midHeader + "px"
            }
          }
        if(headerSizes[5] < penBigHeader){
            for (i=0;i<h1.length;i++){
              h1[i].style.fontSize = penBigHeader + "px"
            }
          }
      } else if (headerSizes[2] != undefined){
        if(headerSizes[2] < smallestHeader){
            for (i=0;i<h4.length;i++){
              h4[i].style.fontSize = smallestHeader + "px"
            }
          }
        if(headerSizes[3] < penSmHeader){
            for (i=0;i<h3.length;i++){
              h3[i].style.fontSize = penSmHeader + "px"
            }
          }
        if(headerSizes[4] < nextSmHeader){
            for (i=0;i<h2.length;i++){
              h2[i].style.fontSize = nextSmHeader + "px"
            }
          }
        if(headerSizes[5] < midHeader){
            for (i=0;i<h1.length;i++){
              h1[i].style.fontSize = midHeader + "px"
            }
          }
     } else if (headerSizes[3] != undefined){
        if(headerSizes[3] < smallestHeader){
          for (i=0;i<h3.length;i++){
            h3[i].style.fontSize = smallestHeader + "px"
          }
        }
      if(headerSizes[4] < penSmHeader){
          for (i=0;i<h2.length;i++){
            h2[i].style.fontSize = penSmHeader + "px"
          }
        }
      if(headerSizes[5] < nextSmHeader){
          for (i=0;i<h1.length;i++){
            h1[i].style.fontSize = nextSmHeader + "px"
          }
        }   
      }
    }
  } else {
    //reset styling
    
    for(i=0;i<dyselxiaFriendlyText.length;i++){ 

       dyselxiaFriendlyText[i].style.fontSize = originalDFFontSize + "px"
       dyselxiaFriendlyText[i].style.fontFamily = originalDFStyle;
       dyselxiaFriendlyText[i].style.letterSpacing = originalDFLetterSpace
       dyselxiaFriendlyText[i].style.wordSpacing = originalDFWordSpace
       dyselxiaFriendlyText[i].style.lineHeight = originalDFLineHeight
       dyselxiaFriendlyText[i].style.textShadow = originalDFTextShadow
       dyselxiaFriendlyText[i].style.textAlign = originalDFTextAlign

    //change colours of text and background - need to do text variant

    dyselxiaFriendlyText[i].style.color = originalDFTextColor
      
            //styling
    
           var child = dyselxiaFriendlyText[i].querySelectorAll("*")
           var x
            for (x=0;x<child.length;x++){

              child[x].style.fontStyle =  styling[0];
              styling.shift();
              child[x].style.fontWeight = FW[0];
              FW.shift();
              child[x].style.textDecoration = TD[0];
              TD.shift();
              child[x].style.fontVariant = variant[0];
              variant.shift();
 
      }
    }
    dyselxiaFriendlyContainer.style.backgroundColor = bgDFColor
    
//reset header styling
    
    var h1 = document.getElementsByTagName("H1");

  for(i=0;i<h1.length;i++){
    h1[i].style.fontSize = h1FontSize + "px";
    h1[i].style.color = h1color;
    h1[i].style.textAlign = h1align;
  }
    
    var h2 = document.getElementsByTagName("H2");

  for(i=0;i<h2.length;i++){
    h2[i].style.fontSize = h2FontSize + "px";
    h2[i].style.color = h2color
    h2[i].style.textAlign = h2align;

  }

  var h3 = document.getElementsByTagName("H3");

  for(i=0;i<h3.length;i++){
    h3[i].style.fontSize = h3FontSize + "px"
    h3[i].style.color = h3color;
    h3[i].style.textAlign = h3align;
  }
    
var h4 = document.getElementsByTagName("H4");

 for(i=0;i<h4.length;i++){
   h4[i].style.fontSize = h4FontSize + "px";
   h4[i].style.color = h4color;
    h4[i].style.textAlign = h4align;
  }

 var h5 = document.getElementsByTagName("H5");

  for(i=0;i<h5.length;i++){
    h5[i].style.fontSize = h5FontSize + "px";
        h5[i].style.color = h5color;
    h5[i].style.textAlign = h5align;

  }
    
 var h6 = document.getElementsByTagName("H6");

  for(i=0;i<h6.length;i++){
    h6[i].style.fontSize = h6FontSize + "px";
   h6[i].style.color = h6color
    h6[i].style.textAlign = h6align;

  }

         //links
    var i
for(i=0;i<link.length;i++){
        link[i].style.cssText = "font-weight: " + linkWeight + " !important; color: " + linkColor + "; text-decoration: " + linkDecorationLine + " " + linkDecorationStyle + " " + linkDecorationColor + "; cursor: " + cursor
  }

         //restore capital text

  var uppercase = document.getElementsByClassName("uppercase")
  
  var j
  for(j=0;j<uppercase.length;j++){
   uppercase[j].innerHTML = uppercase[j].innerHTML.toUpperCase();
    }
   
  }
} 

