window.onload = function () {


    /* Find HTML elements in the DOM by using the element id and
    * return the element as an object
    */
    var states = document.getElementById('state');
    var counries = document.getElementById('countries');
    var _msg_error = document.getElementById('msg_error');


    /*
     * This method use AJAX to dynamically populate countries and state into the drop-down 
     * list by loading external data from a specified file.
     * @param {type} Url
     * @param {type} target
     * Url - specify location of data
     * terger - specify location to load data
     use AJAX to populate drop down list by loading external file */
    function loadData(Url, target) {
        /*create a new XMLHttpRequest object request*/
        var xhr = new XMLHttpRequest();

        /*
         * Create a GET Request used to get inforamation using the parameter-based  URL.
         * The request is set true which means request should be asynchronous
         */
        xhr.open('GET', Url, true);

        /*
         * Function to check if state of request has changed, checking the response status.
         * onreadystatechange is triggered whenever readystate changes
         * 4 - request finished and response is ready 
         * 2XX - Check for successful http request
         * 3XX - Check if the resource has not been modified
         */
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {

                    //Get response body as string 
                    target.innerHTML += xhr.responseText;
                } else {
                    //Get http text that corresponse with the status
                    console.log(xhr.statusText);

                    // display error message
                    _msg_error.innerHTML += '<p class="msgerror">Error getting ' +
                                  target.name + ": " + xhr.statusText + ",code: " + xhr.status + "</p>";
                }
            }
        };
        /*
         * Finally send the request
         */
        xhr.send();
    }

    //load the external files 	
    loadData('jsonfiles/states.html', states);
    loadData('jsonfiles/countries.html', counries);


};
