var app = {
        name: "My App",
        version: "1.2.3",
        pages: [],
        init: function () {

            document.addEventListener("deviceready", function () {
//add listeners for pages, links, interface, etc
        //populate the pages array
        //add main listeners
                app.pages.push(document.getElementById("about"));
                app.pages.push(document.getElementById("home"));
                app.pages.push(document.getElementById("login"));

                var button1 = document.querySelector(".homebutton");
                var button2 = document.querySelector(".loginbutton");
                var button3 = document.querySelector(".aboutbutton");

                
                button1.style.backgroundColor = "white";

                
                button1.addEventListener("click", function () {
                    app.pages[0].className = "active";
                    app.pages[1].className = "";
                    app.pages[2].className = "";
                    button1.style.backgroundColor = "white";
                    button2.style.backgroundColor = "";
                    button3.style.backgroundColor = "";
                });
                button2.addEventListener("click", function () {
                    app.pages[0].className = "";
                    app.pages[1].className = "active";
                    app.pages[2].className = "";
                    button1.style.backgroundColor = "";
                    button2.style.backgroundColor = "white";
                    button3.style.backgroundColor = "";

            /***********************************
                        geolocation
            ************************************/

                    if (navigator.geolocation) {
                        var params = {
                            enableHighAccuracy: true,
                            timeout: 4000000,
                            maximumAge: 0
                        };
                        navigator.geolocation.getCurrentPosition(watchPosition, gpsError, params);
                    } else {
                        console.log("fail");
                    }

                    function watchPosition(position) {

                        var bod = document.querySelector(".geogeo");
                        bod.innerHTML = "<div id='latlong'>" + "Latitude: " + position.coords.latitude.toFixed(2) + "&deg;<br/>" + "Longitude: " + position.coords.longitude.toFixed(2) + "&deg;<br/>" + "</div";
                        var canvas = document.createElement('canvas');
                        canvas.setAttribute("id", "cancan");
                        canvas.setAttribute("width", "250px");
                        canvas.setAttribute("height", "250px");

                        var latlat = position.coords.latitude;
                        var longlong = position.coords.longitude;

                        var imgimg = document.createElement("img");
                        imgimg.setAttribute("width", "250px");
                        imgimg.setAttribute("heigh", "250px");
                        imgimg.setAttribute("src", "https://maps.googleapis.com/maps/api/staticmap?center=" + latlat + "," + longlong + "&zoom=14&size=250x250");

                        bod.appendChild(canvas);
                        canvas.appendChild(imgimg);

                        var getcanvas = document.getElementById("cancan");
                        var context = getcanvas.getContext('2d');

                        imgimg.onload = function () {
                            context.drawImage(imgimg, 0, 0);
                        };

                    }

                    function gpsError(error) {
                        var errors = {
                            1: 'Permission denied',
                            2: 'Position unavailable',
                            3: 'Request timeout'
                        };
                        alert("Error: " + errors[error.code]);
                    }
                });


                    button3.addEventListener("click", function () {
                        app.pages[0].className = "";
                        app.pages[1].className = "";
                        app.pages[2].className = "active";
                        button1.style.backgroundColor = "";
                        button2.style.backgroundColor = "";
                        button3.style.backgroundColor = "white";
        

                        var options = new ContactFindOptions();
                        var filter = ["displayName", "phoneNumbers"];
                        options.filter = "";
                        options.multiple = true;
                        navigator.contacts.find(filter, successFunc, errFunc, options);


                        function successFunc(matches) {
                            var inputC = document.querySelector(".inputcontact");
                            var CON = Math.round(Math.random() * (matches.length - 1));
                            inputC.innerHTML = "<p class='names'>" + matches[CON].displayName + "</p>";
                            inputC.innerHTML += "<p class='names'>" + matches[CON].phoneNumbers[1].value + "</p>";
                            
                        }

                        function errFunc(error) {
                            alert("error with your code");
                    }
                });
            });
        }
    };


app.init();