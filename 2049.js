//INITIALISATION VARIABLES
var grid = [];
var tile_a;
var tile_b;
var key;
var score = 0;
var game_on = true;
var colorMap = new Map();
var colorScale = ["#FF02", "#ffd966", "#ffb366", "#ff8c66","#ff6666","#ff471a","#ff0000","#e60000","#cc0066","#993399","#9933ff","#0000ff"];
var valueScale = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1032, 2048];
for (var i = 0; i < colorScale.length; i++) {
  colorMap.set(valueScale[i], colorScale[i]);
}

//INITIALISATION DE LA GRILLE
init_htmlcss();
init_grid();
init_tiles();
grid_to_html();

//FONCTIONS
function grid_to_html() {
    var count_row = 0;
    var count_column = 0;
    while (count_row < 4) {
        count_column = 0;
        while (count_column < 4) {
            $('#tile' + count_row + count_column + " h3").text(grid[count_row][count_column])
            count_column ++;
        }
        count_row ++;
    }
    count_row = 0;
    count_column = 0;
}

function html_to_grid() {
    var count_row = 0;
    var count_column = 0;
    while (count_row < 4) {
        count_column = 0;
        while (count_column < 4) {
            grid[count_row][count_column] = Number($('#tile' + count_row + count_column + " h3").text());
            count_column ++;
        }
        count_row ++;
    }
    count_row = 0;
    count_column = 0;
}

function game_victory() {
  var count_row = 0;
  var count_column = 0;
  while (count_row < 4) {
      count_column = 0;
      while (count_column < 4) {
          if (grid[count_row][count_column] == 2048){
            alert("VICTOIRE!");
            game_on = false;
            return("Victory");
          }
          count_column ++;
      }
      count_row ++;
  }
}
/*
function game_over() {

  game_on = false;
  return=("Defeat");
}
*/

$(document).ready(function(){
  var count_row = 0;
  var count_column = 0
  while (count_row < 4) {
      count_column = 0;
      while (count_column < 4) {
          var colorTile = colorMap.get(Number($("#tile"+[count_row]+  [count_column]+" h3").text()));
          $("#tile"+[count_row]+[count_column]).css("background-color", colorTile);
          if (Number($("#tile"+[count_row]+[count_column]+" h3").text()) == 0){
            $("#tile"+[count_row]+[count_column]+" h3").css("opacity", 0);
          }
          else{
            $("#tile"+[count_row]+[count_column]+" h3").css("opacity", 1);
          }
          count_column ++;
      }
      count_row ++;
  }
});

function update_colors(){
  var count_row = 0;
  var count_column = 0
  while (count_row < 4) {
      count_column = 0;
      grid[count_row] = [];
      while (count_column < 4) {
          var colorTile = colorMap.get(Number($("#tile"+[count_row]+[count_column]+" h3").text()));
          $("#tile"+[count_row]+[count_column]).css("background-color", colorTile);
          if (Number($("#tile"+[count_row]+[count_column]+" h3").text()) == 0){
            $("#tile"+[count_row]+[count_column]+" h3").css("opacity", 0);
          }
          else{
            $("#tile"+[count_row]+[count_column]+" h3").css("opacity", 1);
          }
          count_column ++;
      }
      count_row ++;
  }
}

function init_grid() {
    var init_row = 0;
    var init_column = 0;
    while (init_row < 4) {
        init_column = 0;
        grid[init_row] = [];
        while (init_column < 4) {
            grid[init_row][init_column] = 0;
            init_column ++;
        }
        init_row ++;
    }
}

function random() {
    var tile;
    var random_num = Math.floor(Math.random() * 2);
    if (random_num === 0) {
        tile = 2;
    } else {
        tile = 4;
    }
    return (tile);
}

function look_for_space() {
    var space_tab = [];
    var coord = [];
//    var x = Math.floor(Math.random() * 4);
//    var y = Math.floor(Math.random() * 4);
    var count_tiles_empty = 0;
    var count_row = 0;
    var count_column = 0
    while (count_row < 4) {
        count_column = 0;
        while (count_column < 4) {
            if (Number($("#tile"+[count_row]+[count_column]+" h3").text()) == 0){
              space_tab[count_tiles_empty] = [count_row, count_column];
              count_tiles_empty++;
            }
            count_column ++;
        }
        count_row ++;
    }
    var x = Math.floor(Math.random() * count_tiles_empty);
    coord[0] = space_tab[x][0];
    coord[1] = space_tab[x][1];
    $("#test h3").text(coord);
    return (coord);
}

function init_tiles() {
    tile_a = random();
    tile_b = random();
    var coord = look_for_space();
    grid[coord[0]][coord[1]] = tile_a;
    coord = look_for_space();
    grid[coord[0]][coord[1]] = tile_b;
}

function init_htmlcss() {
  $("body").append("<div class='header'></div>");
  $(".header").append("<h1>2048</h1>");
  $(".header").append("<div class='score'><p id='score_ti'>Score</p><p id='score'><strong>0</strong></p></div>");
  $("body").append("<div class='grid'></div>");
  var count_row = 0;
  var count_column = 0
  while (count_row < 4) {
      count_column = 0;
      grid[count_row] = [];
      while (count_column < 4) {
        $(".grid").append("<div class='tile' id='tile"+[count_row]+[count_column]+"'><h3>0</h3></div>");
        count_column++;
      }
      count_row++;
    }
    $("#score_ti").css("font-size", "17px");
    $(".score").css("margin-left", "600px");
    $(".score").css("font-family", "sans-serif");
    $(".score").css("height", "80px");
    $(".score").css("width", "200px");
    $(".score").css("border", "solid");
    $(".score").css("border-width", "3px");
    $(".score").css("border-radius", "9px");
    $(".score").css("text-align", "center");
  $(".grid").css("display","inline-block");
  $(".grid").css("height","800px");
  $(".grid").css("width","800px");
  $(".grid").css("z-index","1");
  $(".grid").css("background-color","#FF01");

  $(".tile").css("display","inline-block");
  $(".tile").css("height","190px");
  $(".tile").css("width","190px");
  $(".tile").css("z-index","2");
  $(".tile").css("margin-top","4px");
  $(".tile").css("margin-right","4px");
  $(".tile").css("background-color","#FF02");
  $(".tile").css("border-style","solid");
  $(".tile").css("border-color","#4274");
  $(".tile").css("border-width","3px");
  $(".tile").css("border-radius","9px");

  $("h3").css("font-family","sans-serif");
  $("h3").css("z-index","3");
  $("h3").css("font-size","30px");
  $("h3").css("position","relative");
  $("h3").css("text-align","center");
  $("h3").css("top","50px");

  $(".score").css("display","inline-block");
  $("h2").css("position","relative");
  $("h2").css("font-family","Georgia");
  $("h2").css("margin-left","350px");

  $(".grid").append("<div class='tile' id='test'><h3>0</h3></div>");

}

function is_grid_full() {
    var count_row = 0;
    var count_column = 0;

    while (count_row < 4) {
        count_column = 0;
        while (count_column < 4) {
            if (Number($("#tile"+[count_row]+[count_column]+" h3").text()) == 0) {
                return false;
            }
            count_column++;
        }
        count_row++;
    }
    return true;
}

function is_game_over() {
    var count_row = 0;
    var count_column = 0;
    while (count_row < 4) {
        count_column = 0;
        while(count_column < 3) {
            if (Number(($("#tile"+[count_row]+[count_column+1]+" h3").text())) == (Number($("#tile"+[count_row]+[count_column]+" h3").text()))) {
                return;
            }
            count_column++;
        }
        count_row++;
    }

    count_row = 0;
    count_column = 0;
    while (count_row < 3) {
        count_column = 0;
        while(count_column < 4) {
            if ((Number($("#tile"+[count_row+1]+[count_column]+" h3").text())) == (Number($("#tile"+[count_row]+[count_column]+" h3").text()))) {
                return;
            }
            count_column++;
        }
        count_row ++;
    }
    if (confirm("Score : " + score + " ~ Restart a game ?")) {
        game_on = true;
        location.reload();
    }
}

//FONCTIONS DE MOUVEMENT
function move_tile_right() {
    var change = false;
    var count_row = 0;
    var count_column = 2;
    var tile = false;

    while (count_row < 4) {
        var stop = true;
        count_column = 2;
        while (count_column >= 0) {
            var valueTile = Number($("#tile"+[count_row]+[count_column]+" h3").text());
            var valueNearByTile = Number($("#tile"+[count_row]+[count_column + 1]+" h3").text());
            if (valueTile != 0){
              if (valueTile == valueNearByTile && stop == true) {
                $("#tile"+[count_row]+[count_column + 1]+" h3").text(valueTile*2);
                $("#tile"+[count_row]+[count_column]+" h3").text(0);
                score = score + valueTile*2;
                $("#score").text(score);
                stop = false;
                change = true;
              }
              else if (valueNearByTile == 0) {
                $("#tile"+[count_row]+[count_column + 1]+" h3").text(valueTile);
                $("#tile"+[count_row]+[count_column]+" h3").text(0);
                change = true;
                count_row--;
              }
            }
            count_column--;
        }
        count_row ++;
    }
  // à la fin de la boucle et des vérifs de grid
    if (change == true) {
        tile_add = random();
        var coord = look_for_space();
        $("#tile"+[coord[0]]+[coord[1]]+" h3").text(tile_add);
        html_to_grid();
        game_victory();
        update_colors();
        if (is_grid_full() == true){
            $("#test h3").text("babel");
            if (is_game_over() == true) {
                game_on = false;
            }
        }
    }

}

function move_tile_left() {
    var change = false;
    var count_row = 0;
    var count_column = 1;
    while (count_row < 4) {
        var stop = true;
        count_column = 1;
        while (count_column < 4) {
            var valueTile = Number($("#tile"+[count_row]+[count_column]+" h3").text());
            var valueNearByTile = Number($("#tile"+[count_row]+[count_column - 1]+" h3").text());
            if (valueTile != 0){
              if (valueTile == valueNearByTile && stop == true) {
                $("#tile"+[count_row]+[count_column - 1]+" h3").text(valueTile*2);
                $("#tile"+[count_row]+[count_column]+" h3").text(0);
                score = score + valueTile*2;
                $("#score").text(score);
                stop = false;
                change = true;
              }
              else if (valueNearByTile == 0) {
                $("#tile"+[count_row]+[count_column - 1]+" h3").text(valueTile);
                $("#tile"+[count_row]+[count_column]+" h3").text(0);
                change = true;
                count_row--;
              }
            }
            count_column++;
        }
        count_row ++;
    }

  // à la fin de la boucle et des vérifs de grid
    if (change == true) {
        tile_add = random();
        var coord = look_for_space();
        $("#tile"+[coord[0]]+[coord[1]]+" h3").text(tile_add);
        html_to_grid();
        game_victory();
        update_colors();
        if (is_grid_full() == true){
            $("#test h3").text("babel");
            if (is_game_over() == true) {
                game_on = false;
            }
        }
    }
}

function move_tile_up() {
    var count_column = 0;
    var count_row = 1;
    var change = false;
    while (count_column < 4) {
        var stop = true;
        count_row = 1;
        while (count_row < 4) {
            var valueTile = Number($("#tile"+[count_row]+[count_column]+" h3").text());
            var valueNearByTile = Number($("#tile"+[count_row - 1]+[count_column]+" h3").text());
            if (valueTile != 0){
              if (valueTile == valueNearByTile && stop == true) {
                $("#tile"+[count_row - 1]+[count_column]+" h3").text(valueTile*2);
                $("#tile"+[count_row]+[count_column]+" h3").text(0);
                score = score + valueTile*2;
                $("#score").text(score);
                stop = false;
                change = true;
              }
              else if (valueNearByTile == 0) {
                $("#tile"+[count_row - 1]+[count_column]+" h3").text(valueTile);
                $("#tile"+[count_row]+[count_column]+" h3").text(0);
                count_column--;
                change = true;
              }
            }
            count_row++;
        }
        count_column ++;
    }

  // à la fin de la boucle et des vérifs de grid
    if (change == true) {
        tile_add = random();
        var coord = look_for_space();
        $("#tile"+[coord[0]]+[coord[1]]+" h3").text(tile_add);
        html_to_grid();
        game_victory();
        update_colors();
        if (is_grid_full() == true){
            $("#test h3").text("babel");
            if (is_game_over() == true) {
                game_on = false;
            }
        }
    }
}

function move_tile_down() {
    var change = false;
    var count_column = 0;
    var count_row = 2;
    while (count_column < 4) {
        var stop = true;
        count_row = 2;
        while (count_row >= 0) {
            var valueTile = Number($("#tile"+[count_row]+[count_column]+" h3").text());
            var valueNearByTile = Number($("#tile"+[count_row + 1]+[count_column]+" h3").text());
            if (valueTile != 0){
                if (valueTile == valueNearByTile && stop == true) {
                    $("#tile"+[count_row + 1]+[count_column]+" h3").text(valueTile*2);
                    $("#tile"+[count_row]+[count_column]+" h3").text(0);
                    score = score + valueTile*2;
                    $("#score").text(score);
                    stop = false;
                    change = true;
                }
                else if (valueNearByTile == 0) {
                    $("#tile"+[count_row + 1]+[count_column]+" h3").text(valueTile);
                    $("#tile"+[count_row]+[count_column]+" h3").text(0);
                    change = true;
                    count_column--;
                }
            }
            count_row--;
        }
        count_column ++;
    }

  // à la fin de la boucle et des vérifs de grid
    if (change == true) {
        tile_add = random();
        var coord = look_for_space();
        $("#tile"+[coord[0]]+[coord[1]]+" h3").text(tile_add);
        html_to_grid();
        game_victory();
        update_colors();
        if (is_grid_full() == true){
            $("#test h3").text("babel");
            if (is_game_over() == true) {
                game_on = false;
            }
        }
    }
}

//GESTION DES EVENEMENTS
$(document).keydown(function (e) {
    if (game_on == true) {
      key = 0;
      switch (e.which) {
          case 37: //left
              key = "left";
              move_tile_left();

              break;
          case 38: //up
              key = "up";
              move_tile_up();
              break;
          case 39: //right
              key = "right";
              move_tile_right();

              break;
          case 40: //down
              key = "down";
              move_tile_down();
              break;
      }
    }


    //$("#tile33 h3").text(key)
});
