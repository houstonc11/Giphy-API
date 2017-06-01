$(document).ready(function() {

	var topics = ["husky", "pug", "german shepard", "beagle", "bulldog", "terrier"];
        // displayBreedInfo function re-renders the HTML to display the appropriate content
        function displayBreedInfo() {
            var topic = $(this).attr("data-name");
            //creating a div for the display breed area
            var mainDiv = $("<div>");
            mainDiv.attr("class", "displayArea panel panel-inverse-primary col-md-8")

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC";
            // Creating an AJAX call for the specific dog breed button being clicked
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                for (var m = 0; m < response.data.length; m++) {

                    // Creating a div to hold the breed
                    var topicDiv = $("<div>");
                    topicDiv.attr("class", "displayBreed")
                    // move our topics into our display area
                    mainDiv.append(topicDiv);
                    // Storing the rating data
                    var rating = response.data[m].rating;
                    // Creating an element to have the rating displayed
                    var pOne = $("<p>").text("Rating: " + rating);
                    // Displaying the rating
                    topicDiv.append(pOne);

                    // Creating an element to hold the image
                    var image = $("<img>");
 
                    // Creating attributes to define when the image is still or moving
                    image.attr("class", "dog-gif")
                    image.attr("data-state", "still")
                    image.attr("data-animate", response.data[m].images.fixed_height_small.url)
                    image.attr("data-still", response.data[m].images.fixed_height_small_still.url)
                    image.attr("src", response.data[m].images.fixed_height_small_still.url)

                    // Appending the image
                    topicDiv.append(image);
                    // Putting the entire display area onto the page when breed button is clicked
                    $("#topics-view").append(mainDiv);

                }
                // Creating a conditional to determine if the image is currently still or animated and change its state when clicked
                $(".dog-gif").on("click", function() {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        var animateURL = $(this).attr("data-animate");
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", animateURL);
                    } else {
                        var stillURL = $(this).attr("data-still");
                        $(this).attr("data-state", "still");
                        $(this).attr("src", stillURL);
                    }
                });
            });
        }

        // Function for displaying dog breed data
        function renderButtons() {
            // Deleting the dog breeds prior to adding new breeds
            // (this is necessary otherwise you will have repeat buttons)
            $("#buttons-view").empty();
            // Looping through the array of dog breeds
            for (var i = 0; i < topics.length; i++) {
                // Then dynamicaly generating buttons for each dog breed in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var newButton = $("<button>");
                // Adding a class of breed to our button

                newButton.attr("class", "breed btn btn-primary");
                // Adding a data-attribute
                newButton.attr("data-name", topics[i]);
                // Providing the initial button text
                newButton.text(topics[i]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(newButton);
            }
        }
        // This function handles events where a dog breed button is clicked
        $("#add-breed").on("click", function(event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var alreadyThere = true

            var topic = $("#topics-input").val().trim().toLowerCase()           
                // Adding breed from the textbox to our array
                // Run loop to see if the entry has already been added. If so, don't push again
            for (var k = 0; k < topics.length; k++) {
                if (topics[k] != topic) {
                    alreadyThere = false
                } 
                else {
                    alreadyThere = true
                }
            }
            if (alreadyThere == false) {
                topics.push(topic)                
            }

            // Calling renderButtons which handles the processing of our dog breed array
            renderButtons();
        });
        // Adding a click event listener to all elements with a class of "breed"
        $(document).on("click", ".breed", function() {
            $("#topics-view").empty();
        });
        $(document).on("click", ".breed", displayBreedInfo);
        // Calling the renderButtons function to display the intial buttons
        renderButtons();
});
