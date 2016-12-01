var day1Puzzle1 = function () {
    var floorNumber = 0;
    fileReader('1-1-file', function (text) {
        var currentLocation = [0, 0];
        var currentDirection = 0; //Current direction in directions array
        var directions = ['N', 'E', 'S', 'W'];
        var previousCoordinates = [];
        var part2Answer = [0, 0];
        var hasPart2BeenFound = false;
        var instructions = text.split(', ');
        for (var i = 0; i < instructions.length; i++) {
            var instruction = instructions[i].trim();
            
            if (instruction[0] === 'R') {
                currentDirection = currentDirection != 3 ? currentDirection + 1 : 0;
            }
            else {
                currentDirection = currentDirection != 0 ? currentDirection - 1 : 3;
            }
            
            var steps = +instruction.substring(1);
            
            for (var j = 1; j <= steps; j++) {
                switch (currentDirection) {
                case 0:
                    currentLocation = [currentLocation[0], currentLocation[1] + 1];
                    break;
                case 1:
                    currentLocation = [currentLocation[0] + 1, currentLocation[1]];
                    break;
                case 2:
                    currentLocation = [currentLocation[0], currentLocation[1] - 1];
                    break;
                case 3:
                    currentLocation = [currentLocation[0] - 1, currentLocation[1]];
                    break;
                }
                
                var doesExistAlready = previousCoordinates.find(function(item){
                    return item[0] === currentLocation[0] && item[1] === currentLocation[1];
                });
                
                if (doesExistAlready != undefined && !hasPart2BeenFound) {
                    hasPart2BeenFound = true;
                    part2Answer = currentLocation;
                }
                
                previousCoordinates.push(currentLocation);
            }
            
        }
        var blocksAway1 = Math.abs(currentLocation[0]) + Math.abs(currentLocation[1]);
        var blocksAway2 = Math.abs(part2Answer[0]) + Math.abs(part2Answer[1]);
        showAnswer('#1-1', blocksAway1);
        showAnswer('#1-2', blocksAway2);
    });
};
var fileReader = function (inputElementId, callback) {
    var file = document.getElementById(inputElementId).files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
        callback(e.target.result)
    }
};
var showAnswer = function (puzzleId, answer) {
    $(puzzleId + " .answer span").text(answer);
    $(puzzleId + " .answer").show();
};
var closeAccordionSection = function () {
    $('.accordion .accordionTitle').removeClass('active');
    $('.accordion .accordionContent').slideUp(300).removeClass('open');
};
$('.accordionTitle').click(function (e) {
    var currentAttrValue = $(this).attr('href');
    if ($(e.target).is('.active')) {
        closeAccordionSection();
    }
    else {
        closeAccordionSection();
        $(this).addClass('active');
        $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
    }
    e.preventDefault();
});
$(document).ready(function () {
    $(".accordionSection:last-child .accordionTitle").addClass('active');
    $(".accordionSection:last-child .accordionContent").slideDown(300).addClass('open');
});