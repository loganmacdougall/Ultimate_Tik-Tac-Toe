var SubGames = document.getElementsByClassName("SubGame");
var buttons = document.getElementsByClassName("square");

var cursor = document.getElementsByClassName("Cursor")[0];

var turn = 1;

function startUp()
{ 
    cursor.style.top = "-100px";
    
    for(var i = 0; i < buttons.length; i++)
    {
        buttons[i].addEventListener("click", (e) => {
            console.log("Pressed button with id of "+e.target.id+" and is "+e.target.className.split(" ")[1]);
            let ID = e.target.id;
            let Class = e.target.className.split(" ")[1]; //If className is square valid, Class = valid;

            let subgame = Math.floor(ID/9);
            
            if (Class === "valid")
            {
                if (turn === 1)
                {
                    e.target.className = "square X";
                    e.target.innerHTML = "X";
                
                    let won = checkForSubWin(subgame,'X');
                    if (won)
                    {
                        SubGames[subgame].children[10].innerText = "X"; //Big X over top of the subgame
                        SubGames[subgame].children[10].className = "win_letter visible";
                        SubGames[subgame].children[9].className = "win_line state_" + won;
                        SubGames[subgame].className = "SubGame Won_X";
                        won = checkForGameWin('X');

                        if(won)
                        {
                            console.log("X Wins");
                        }

                    }

                    cursor.innerHTML = "O";
                    turn = 2;
                }
                else
                {
                    e.target.className = "square O";
                    e.target.innerHTML = "O";

                    let won = checkForSubWin(subgame,'O');
                    if (won)
                    {
                        SubGames[subgame].children[10].innerText = "O"; //Big X over top of the subgame
                        SubGames[subgame].children[10].className = "win_letter visible";
                        SubGames[subgame].children[9].className = "win_line state_" + won;
                        SubGames[subgame].className = "SubGame Won_O";
                        won = checkForGameWin('O');

                        if(won)
                        {
                            console.log("O Wins");
                        }

                    }

                    cursor.innerHTML = "X";
                    turn = 1;
                }

                let NewClass;

                try
                {
                    NewClass = SubGames[ID%9].className.split(" ")[1];
                } catch (e) {
                    NewClass = " ";
                }   
                if (NewClass === "Won_X" || NewClass === "Won_O")
                {
                    setInvertVaild(ID%9);
                }
                else
                {
                    setSubgameVaild(ID%9);
                }

            }
        });
    }
}

function setSubgameVaild(n)
{   
    let allInvalid = true;
    let Class;
    for (b in buttons)
    {
        try
        {
            Class = buttons[b].className.split(" ")[1];   
        } catch (e) {
            Class = "Open";
        }
        if(Class !== "X" && Class !== "O")
        {
            if (Math.floor(b/9) === n)
            {
                buttons[b].className = "square valid";
                allInvalid = false;
            }
            else
            {
                buttons[b].className = "square invalid";
            }
        }
    }
    if(allInvalid)
    {
        setInvertVaild(n);
    }
}

function setInvertVaild(n)
{
    let Class;
    let ParentClass;
    for (b in buttons)
    {
        try
        {
            Class = buttons[b].className.split(" ")[1];   
        } catch (e) {
            Class = "Open";
        }

        try {
            ParentClass = buttons[b].parentElement.className.split(" ")[1];
        } catch (e) {
            ParentClass = "Open"
        }

        if(Class !== "X" && Class !== "O")
        {
            if (Math.floor(b/9) === n || ParentClass === "Won_X" || ParentClass === "Won_O")
            {
                buttons[b].className = "square invalid";
            }
            else
            {
                buttons[b].className = "square valid";
            }
        }
    }
}

function checkForGameWin(c)
{
    let ownedSquares = [];
    for (let i = 0; i < 9; i++)
    {
        if (SubGames[i].className === "SubGame Won_" + c);
        {
            ownedSquares.push(i);
        }
    }

    if (ownedSquares.includes(4))
    {
        if (ownedSquares.includes(0) && ownedSquares.includes(8))
        {
            return 3;
        }
        if (ownedSquares.includes(1) && ownedSquares.includes(7))
        {
            return 4;
        }
        if (ownedSquares.includes(2) && ownedSquares.includes(6))
        {
            return 5;
        }
        if (ownedSquares.includes(3) && ownedSquares.includes(5))
        {
            return 7;
        }
    }

    if (ownedSquares.includes(0))
    {
        if (ownedSquares.includes(1) && ownedSquares.includes(2))
        {
            return 1;
        }
        if (ownedSquares.includes(3) && ownedSquares.includes(6))
        {
            return 2;
        }
    }

    if (ownedSquares.includes(8))
    {
        if (ownedSquares.includes(2) && ownedSquares.includes(5))
        {
            return 6;
        }
        if (ownedSquares.includes(6) && ownedSquares.includes(7))
        {
            return 8;
        }
    }

    return false;
}

function checkForSubWin(n,c) //n = subgame ID & c is the letter I'm checking a win for.
{
    let gameToCheck = SubGames[n].children;
    let ownedSquares = [];
    for (let i = 0; i < 9; i++)
    {
        if (gameToCheck[i].innerHTML === c)
        {
            ownedSquares.push(i);
        }
    }

    if (ownedSquares.includes(4))
    {
        if (ownedSquares.includes(0) && ownedSquares.includes(8))
        {
            return 3;
        }
        if (ownedSquares.includes(1) && ownedSquares.includes(7))
        {
            return 4;
        }
        if (ownedSquares.includes(2) && ownedSquares.includes(6))
        {
            return 5;
        }
        if (ownedSquares.includes(3) && ownedSquares.includes(5))
        {
            return 7;
        }
    }

    if (ownedSquares.includes(0))
    {
        if (ownedSquares.includes(1) && ownedSquares.includes(2))
        {
            return 1;
        }
        if (ownedSquares.includes(3) && ownedSquares.includes(6))
        {
            return 2;
        }
    }

    if (ownedSquares.includes(8))
    {
        if (ownedSquares.includes(2) && ownedSquares.includes(5))
        {
            return 6;
        }
        if (ownedSquares.includes(6) && ownedSquares.includes(7))
        {
            return 8;
        }
    }

    return false;

}

window.addEventListener("load", startUp(), false);
window.addEventListener("mousemove", (e) => {
    cursor.style.top = String(-30 + e.clientY) + "px";
    cursor.style.left = String(-20 + e.clientX) + "px";
});