var a="<div id='loadingLayer' style='position:absolute; width:100%; height:100%; z-index:100; background-color: #FFFFFF; layer-background-color: #FFFFFF; border: 1px none #000000; visibility: visible'><b> <font face='Verdana, Arial, Helvetica, sans-serif' size='3' color='#FF0000'>Sayfa Yükleniyor...</font></b></div>"
document.write(a);
function loadProgressBar() {  
  document.getElementById("loadingLayer").style.display='none';
  document.getElementById("pageContent").style.display="";
}