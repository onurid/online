var path = window.location.pathname.split('/')[2];


if (window.localStorage.getItem("template") != path) {
    if ( window.localStorage.getItem("template") === null)
    {
        window.location.replace("../../index.html");        
    }
    else
    {
window.location.replace("#!/login");
}
}


var result = window.localStorage.getItem("app");
            if (result == null) {
                window.location.replace("#!/login");
            }
            else {
                //var appFile = JSON.parse(result);
             	    var script = document.createElement("script");  // create a script DOM node
    var url = '../../system/apps/' + result;
    script.src =  url;

    document.head.appendChild(script);	   
            }

