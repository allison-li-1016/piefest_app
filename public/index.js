(function() {
    window.addEventListener("load", init);

    function init() {
        id("btn").addEventListener('click', testBackend);
    }
    function testBackend() {
        let url = "/hello";
        fetch(url)
        .then(checkStatus)
        .then(resp => resp.text())
        .then(getResults)
        .catch(console.log);
    }

    function id(idName) {
        return document.getElementById(idName);
    }

    function getResults(resp) {
        id("piefest-overview").textContent = resp;
    }


    function checkStatus(response) {
        if (response.ok) {
            return response;
        } else {
            throw Error("Error in request: " + response.statusText);
        }
    }
})();