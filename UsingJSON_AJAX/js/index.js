window.onload = function () {


    /* Find HTML elements in the DOM by using the element id and
    * return the element as an object
    */
    var states = document.getElementById('state');
    var counries = document.getElementById('countries');
    


    /*
     * This method use AJAX to dynamically populate countries and state into the drop-down 
     * list by loading external data from a specified file.
     * @param {type} Url
     * @param {type} target
     * Url - specify location of data
     * target - specify location to load data
     * use AJAX to populate drop down list by loading external file */
    function loadData(Url, obj) {
        /*create a new XMLHttpRequest object*/
        var xmlhttp = new XMLHttpRequest();
        /*
         * Function to check if state of request has changed. Checking the response status.
         * onreadystatechange is triggered whenever readystate changes
         * 4 - request finished and response is ready 
         * 2XX - Check for successful http request
         
         */
        xmlhttp.onreadystatechange = function () {
            if ((xmlhttp.readyState === 4) && (xmlhttp.status === 200)) {

                //Get response body as string 
                obj.innerHTML += xmlhttp.responseText;
            }

        };

        /*
         * Create a GET Request used to get inforamation using the parameter-based  URL.
         * The request is set true which means request should be asynchronous
         */
        xmlhttp.open('GET', Url, true);


        /*
         * Finally send the request
         */
        xmlhttp.send();
    }

    //load the external files 	
    loadData('jsonfiles/states.html', states);
    loadData('jsonfiles/countries.html', counries);


};
