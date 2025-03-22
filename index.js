$(document).ready(function () {
    let lastPage = localStorage.getItem("lastVisitedPage");
    if (lastPage) {
        $.mobile.changePage(lastPage);
    }

    // Save the last visited page when navigating
    $(document).on("pagecontainerchange", function (event, ui) {
        if (ui.toPage[0].id) {
            localStorage.setItem("lastVisitedPage", "#" + ui.toPage[0].id);
        }
    });
});

// Function to add a game to favorites
function addToFavorites(gameName) {
    let favorites = JSON.parse(localStorage.getItem("favoriteGames")) || [];
    if (!favorites.includes(gameName)) {
        favorites.push(gameName);
        localStorage.setItem("favoriteGames", JSON.stringify(favorites));
    }
    displayFavorites();
}

// Display favorite games on load
function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favoriteGames")) || [];
    let favList = $("#favoriteGamesList");
    favList.empty();
    favorites.forEach(game => {
        favList.append(`<li>${game} <button onclick="removeFromFavorites('${game}')">Remove</button></li>`);
    });
}

// Remove game from favorites
function removeFromFavorites(gameName) {
    let favorites = JSON.parse(localStorage.getItem("favoriteGames")) || [];
    favorites = favorites.filter(game => game !== gameName);
    localStorage.setItem("favoriteGames", JSON.stringify(favorites));
    displayFavorites();
}

// Load favorites on page load
$(document).ready(displayFavorites);

$(document).ready(function () {
           loadFavorites();

           $('#addGameBtn').click(function () {
               let game = $('#gameInput').val().trim();
               if (game) {
                   let games = JSON.parse(localStorage.getItem('fpsGames')) || [];
                   games.push(game);
                   localStorage.setItem('fpsGames', JSON.stringify(games));
                   $('#gameInput').val('');
                   loadFavorites();
               }
           });

           function loadFavorites() {
               let games = JSON.parse(localStorage.getItem('fpsGames')) || [];
               let list = $('#gameList');
               list.empty();
               if (games.length > 0) {
                   $.each(games, function (index, game) {
                       list.append('<li>' + game + ' <a href="#" class="delete" data-index="' + index + '">X</a></li>');
                   });
                   list.listview('refresh');
               }
           }

           $(document).on('click', '.delete', function () {
               let index = $(this).data('index');
               let games = JSON.parse(localStorage.getItem('fpsGames')) || [];
               games.splice(index, 1);
               localStorage.setItem('fpsGames', JSON.stringify(games));
               loadFavorites();
           });
});