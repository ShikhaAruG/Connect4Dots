$(document).ready(function() {
    var player1 = prompt("Player one: Enter your name. You will be blue");
    var player1colour = 'rgb(86, 151, 255)';

    var player2 = prompt("Player two: Enter your name. You will be red");
    var player2colour = 'rgb(237, 45, 73)';

    var game_on = true;
    var table = $('table tr');

    // Reporting that the win has occurred
    function reportWin(rowNum, colNum) {
        console.log("You won starting at this row,col");
        console.log(rowNum);
        console.log(colNum);
    }

    // Changing the color
    function changeColour(rowIndex, colIndex, colour) {
        return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', colour);
    }

    // Return the current color of the chip
    function returnColour(rowIndex, colIndex) {
        return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
    }

    // Checking the last row with a column available for inputting the chip
    function checkBottom(colIndex) {
        for (var row = 5; row > -1; row--) {
            var colorReport = returnColour(row, colIndex);
            if (colorReport === 'rgb(128, 128, 128)') {
                return row;
            }
        }
    }

    // Check the color match
    function colourMatchCheck(one, two, three, four) {
        return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
    }

    // Horizontal win check
    function horiWinCheck() {
        for (var row = 0; row < 6; row++) {
            for (var col = 0; col < 4; col++) {
                if (colourMatchCheck(returnColour(row, col), returnColour(row, col + 1), returnColour(row, col + 2), returnColour(row, col + 3))) {
                    console.log("Checking the horizontals");
                    reportWin(row, col);
                    return true;
                }
            }
        }
    }

    // Vertical win check
    function verWinCheck() {
        for (var col = 0; col < 7; col++) {
            for (var row = 0; row < 3; row++) {
                if (colourMatchCheck(returnColour(row, col), returnColour(row + 1, col), returnColour(row + 2, col), returnColour(row + 3, col))) {
                    console.log("Checking the verticals");
                    reportWin(row, col);
                    return true;
                }
            }
        }
    }

    // Diagonal win check
    function diagonalWinCheck() {
        for (var col = 0; col < 7; col++) {
            for (var row = 0; row < 6; row++) {
                if (colourMatchCheck(returnColour(row, col), returnColour(row + 1, col + 1), returnColour(row + 2, col + 2), returnColour(row + 3, col + 3))) {
                    console.log("Checking the diagonals");
                    reportWin(row, col);
                    return true;
                } else if (colourMatchCheck(returnColour(row, col), returnColour(row - 1, col + 1), returnColour(row - 2, col + 2), returnColour(row - 3, col + 3))) {
                    console.log("Checking the diagonals");
                    reportWin(row, col);
                    return true;
                }
            }
        }
    }

    // Game starts here
    // START with player 1
    var currentplayer = 1;
    var currentname = player1;
    var currentcolour = player1colour;

    $('h3').text(player1 + " it is your turn, pick a column and drop in the chip!");

    $('.board button').on('click', function() {
        var col = $(this).closest('td').index();
        var bottomavail = checkBottom(col);
        changeColour(bottomavail, col, currentcolour);

        if (horiWinCheck() || verWinCheck() || diagonalWinCheck()) {
            $('h1').text(currentname + ": you have won!").fadeIn(2000);
            console.log("Fading out elements");
            
            $('h3').fadeOut(1500, function() {
                console.log('h3 faded out');
            });
            $('h2').fadeOut(1500, function() {
                console.log('h2 faded out');
            });
            $('.board').fadeOut(1500,function(){
                console.log("END");
            });
            return; // Add return to stop further execution after a win
        }
        

        currentplayer = currentplayer * -1;

        if (currentplayer === 1) {
            currentname = player1;
            currentcolour = player1colour;
        } else {
            currentname = player2;
            currentcolour = player2colour;
        }

        $('h3').text(currentname + " your turn.");
    });
});
