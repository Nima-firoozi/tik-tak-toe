
    const $ = document,
        squares = $.querySelectorAll(".square"),
        turn = $.querySelector(".turns"),
        end = $.querySelector(".theend"),
        winEnd = end.firstElementChild,
        restart = end.lastElementChild,
        firstpage = $.querySelector('.firstpage'),
        selectPage = $.querySelector('.select'),
        oneBtn = $.querySelector('.one'),
        twoBtn = $.querySelector('.two'),
        xBtn = $.querySelector(".x"),
        oBtn = $.querySelector(".o"),
        game = $.querySelector('.game')




    //variables

    let isTurnX = false,
        emptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8],
        onePerson = false,
        x = false,
        line = $.createElement('div')

    //variables




    //function show or hide pages
    function showOrHide(element) {
        element.classList.contains("opacity-100") ? element.classList.replace('opacity-100', 'opacity-0') : element.classList.replace('opacity-0', 'opacity-100')
        element.classList.contains("visible") ? element.classList.replace('visible', 'invisible') : element.classList.replace('invisible', 'visible')
    }

    //function show or hide pages

    //set click on xBtn

    xBtn.addEventListener("click", function () {
        showOrHide(selectPage)
        x = true
        game.classList.add('pointer-events-none')
        if (onePerson && x) {

            setTimeout(() => {
                cpuPlay(false)
            }, 400);

        }
    })

    //set click on xBtn

    //set click on oBtn

    oBtn.addEventListener("click", function () {
        showOrHide(selectPage)
        x = false
    })

    //set click on oBtn



    //set click on oneBtn for clear first page 

    oneBtn.addEventListener("click", function (e) {
        showOrHide(firstpage)
        showOrHide(selectPage)
        onePerson = true
    })

    //set click on oneBtn for clear first page

    //set click on twoBtn for show page Two

    twoBtn.addEventListener("click", function () {
        showOrHide(firstpage)
        onePerson = false
    })

    //set click on twoBtn for show page Two


    //set onclick on square for append x or o
    function squareHandler(e) {
        isTurnX ? appendX(e.target) : appendO(e.target)

    }
    squares.forEach(element => {
        element.addEventListener("click", squareHandler)
    })




    //set onclick on square for append x or o

    //end of game handle

    function endGame(char) {
        winEnd.innerHTML = `player <span class="${char == `O` ? `text-green-500` : 'text-cyan-400'}">${char}</span> wins!`
        showOrHide(end)
    }

    //end of game handle

    function upDateEmpty(number) {

        emptySquares.splice(emptySquares.indexOf(number), 1)
        if (!emptySquares.length) {
            winEnd.innerHTML = '<span class="text-cyan-500">X</span> = <span class="text-green-500">O</span>'
            setTimeout(() => {
                showOrHide(end)
            }, 800);
        }
    }

    //function appendO for append icon O to square

    function appendO(element) {
        (onePerson && x) && game.classList.remove('pointer-events-none')
        element.innerHTML = `<i data-char="o" class="bi bi-circle font-bold text-9xl text-green-500"></i>`
        element.classList.remove('hover:bg-cyan-900')
        upDateEmpty(+element.dataset.number)
        element.removeEventListener("click", squareHandler)
        checkWin() && setTimeout(() => { endGame('O') }, 400);
        isTurnX = true
        turn.classList.replace('text-green-500', 'text-cyan-400')
        turn.innerText = `x`

        if (onePerson && !x && emptySquares.length) {
            game.classList.add('pointer-events-none')
            setTimeout(() => {
                cpuPlay(true)
            }, 400);

        }
    }

    //function appendO for append icon O to square

    //function appendO for append icon X to square

    function appendX(element) {
        (onePerson && !x) && game.classList.remove('pointer-events-none')
        game.classList.remove('pointer-events-none')
        element.innerHTML = `<i data-char="x" class="bi bi-x-lg font-bold text-9xl text-cyan-400"></i>`
        element.classList.remove('hover:bg-cyan-900')
        upDateEmpty(+element.dataset.number)
        element.removeEventListener("click", squareHandler)
        checkWin() && setTimeout(() => { endGame('X') }, 400);
        isTurnX = false
        turn.classList.replace('text-cyan-400', 'text-green-500')
        turn.innerText = `o`
        if (onePerson && x && emptySquares.length) {
            game.classList.add('pointer-events-none')
            setTimeout(() => {
                cpuPlay(false)
            }, 400);

        }
    }
    //function appendO for append icon X to square



    //functions for check win
    function myClassName(number) {
        if (squares[number].hasChildNodes()) {
            return squares[number].firstElementChild.className
        } else {
            return `${number}`
        }
    }



    function checkThreeSquare(number1, number2, number3) {
        return myClassName(number1) == myClassName(number2) && myClassName(number2) == myClassName(number3)
    }


    function checkWin() {

        switch (true) {
            case checkThreeSquare(0, 1, 2):
                line.setAttribute("class", `winline winline-row w-0 top-[16.25%] ${isTurnX ? `bg-cyan-400` : `bg-green-500`}`)
                game.appendChild(line)
                game.classList.add('pointer-events-none')
                setTimeout(() => {
                    game.querySelector('.winline-row').classList.replace('w-0', 'w-full')
                }, 10);
                return true
                break;
            case checkThreeSquare(0, 3, 6):
                line.setAttribute("class", `winline winline-col h-0 left-[16.25%] ${isTurnX ? `bg-cyan-400` : `bg-green-500`}`)
                game.appendChild(line)
                game.classList.add('pointer-events-none')
                setTimeout(() => {
                    game.querySelector('.winline-col').classList.replace('h-0', 'h-full')
                }, 10);
                return true
                break;
            case checkThreeSquare(0, 4, 8):
                line.setAttribute("class", `winline winline-left w-0 ${isTurnX ? `bg-cyan-400` : `bg-green-500`}`)
                game.appendChild(line)
                game.classList.add('pointer-events-none')
                setTimeout(() => {
                    game.querySelector('.winline-left').classList.replace('w-0', 'wfull')
                }, 10);
                return true
                break;
            case checkThreeSquare(1, 4, 7):
                line.setAttribute("class", `winline winline-col h-0 left-[50%] ${isTurnX ? `bg-cyan-400` : `bg-green-500`}`)
                game.appendChild(line)
                game.classList.add('pointer-events-none')
                setTimeout(() => {
                    game.querySelector('.winline-col').classList.replace('h-0', 'h-full')
                }, 10);
                return true
                break;
            case checkThreeSquare(2, 5, 8):
                line.setAttribute("class", `winline winline-col h-0 left-[83.75%] ${isTurnX ? `bg-cyan-400` : `bg-green-500`}`)
                game.appendChild(line)
                game.classList.add('pointer-events-none')
                setTimeout(() => {
                    game.querySelector('.winline-col').classList.replace('h-0', 'h-full')
                }, 10);
                return true
                break;
            case checkThreeSquare(2, 4, 6):
                line.setAttribute("class", `winline winline-right w-0 ${isTurnX ? `bg-cyan-400` : `bg-green-500`}`)
                game.appendChild(line)
                game.classList.add('pointer-events-none')
                setTimeout(() => {
                    game.querySelector('.winline-right').classList.replace('w-0', 'wfull')
                }, 10);
                return true
                break;
            case checkThreeSquare(3, 4, 5):
                line.setAttribute("class", `winline winline-row w-0 top-[50%] ${isTurnX ? `bg-cyan-400` : `bg-green-500`}`)
                game.appendChild(line)
                game.classList.add('pointer-events-none')
                setTimeout(() => {
                    game.querySelector('.winline-row').classList.replace('w-0', 'w-full')
                }, 10);
                return true
                break;
            case checkThreeSquare(6, 7, 8):
                line.setAttribute("class", `winline winline-row w-0 top-[83.75%] ${isTurnX ? `bg-cyan-400` : `bg-green-500`}`)
                game.appendChild(line)
                game.classList.add('pointer-events-none')
                setTimeout(() => {
                    game.querySelector('.winline-row').classList.replace('w-0', 'w-full')
                }, 10);
                return true
                break;

            default:
                return false
                break;
        }
    }
    //functions for check win


    //restart game

    restart.addEventListener("click", function () {
        squares.forEach(element => {
            element.innerHTML = ``
            element.classList.add('hover:bg-cyan-900')
            element.addEventListener("click", squareHandler)
        })
        showOrHide(end)
        showOrHide(firstpage)
        isTurnX = false
        turn.innerText = `o`
        emptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        game.querySelector('.winline').remove()
        game.classList.remove('pointer-events-none')
    })
    //restart game

    //cpuPlay for play 1 person


    function cpuPlay(x) {

        function selectRandomSquare(emptyLi, x) {

            let cloneLi = [...emptyLi]
            let random = Math.round(Math.random() * cloneLi.length - 1)
            let select = cloneLi.splice(random, 1)
            while (cloneLi) {
                if (myClassName(select) == `${select}`) {
                    x ? appendX(squares[select]) : appendO(squares[select])
                    break
                } else {
                    random = Math.round(Math.random() * cloneLi.length - 1)
                    select = cloneLi.splice(random, 1)
                }
            }
        }

        if (x) {
            if (myClassName(0) == '0' && (myClassName(1) == myClassName(2)) && (squares[1].firstElementChild.dataset.char == 'x')) {
                appendX(squares[0])
            } else if (myClassName(0) == '0' && (myClassName(4) == myClassName(8)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendX(squares[0])
            } else if (myClassName(0) == '0' && (myClassName(3) == myClassName(6)) && (squares[3].firstElementChild.dataset.char == 'x')) {
                appendX(squares[0])
            } else if (myClassName(1) == '1' && (myClassName(4) == myClassName(7)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendX(squares[1])
            } else if (myClassName(1) == '1' && (myClassName(0) == myClassName(2)) && (squares[0].firstElementChild.dataset.char == 'x')) {
                appendX(squares[1])
            } else if (myClassName(2) == '2' && (myClassName(1) == myClassName(0)) && (squares[0].firstElementChild.dataset.char == 'x')) {
                appendX(squares[2])
            } else if (myClassName(2) == '2' && (myClassName(8) == myClassName(5)) && (squares[5].firstElementChild.dataset.char == 'x')) {
                appendX(squares[2])
            } else if (myClassName(2) == '2' && (myClassName(4) == myClassName(6)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendX(squares[2])
            } else if (myClassName(3) == '3' && (myClassName(0) == myClassName(6)) && (squares[0].firstElementChild.dataset.char == 'x')) {
                appendX(squares[3])
            } else if (myClassName(3) == '3' && (myClassName(4) == myClassName(5)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendX(squares[3])
            } else if (myClassName(4) == '4' && (myClassName(3) == myClassName(5)) && (squares[3].firstElementChild.dataset.char == 'x')) {
                appendX(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(0) == myClassName(8)) && (squares[0].firstElementChild.dataset.char == 'x')) {
                appendX(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(1) == myClassName(7)) && (squares[1].firstElementChild.dataset.char == 'x')) {
                appendX(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(2) == myClassName(6)) && (squares[2].firstElementChild.dataset.char == 'x')) {
                appendX(squares[4])
            } else if (myClassName(5) == '5' && (myClassName(2) == myClassName(8)) && (squares[2].firstElementChild.dataset.char == 'x')) {
                appendX(squares[5])
            } else if (myClassName(5) == '5' && (myClassName(3) == myClassName(4)) && (squares[3].firstElementChild.dataset.char == 'x')) {
                appendX(squares[5])
            } else if (myClassName(6) == '6' && (myClassName(7) == myClassName(8)) && (squares[7].firstElementChild.dataset.char == 'x')) {
                appendX(squares[6])
            } else if (myClassName(6) == '6' && (myClassName(0) == myClassName(3)) && (squares[3].firstElementChild.dataset.char == 'x')) {
                appendX(squares[6])
            } else if (myClassName(6) == '6' && (myClassName(4) == myClassName(2)) && (squares[2].firstElementChild.dataset.char == 'x')) {
                appendX(squares[6])
            } else if (myClassName(7) == '7' && (myClassName(6) == myClassName(8)) && (squares[6].firstElementChild.dataset.char == 'x')) {
                appendX(squares[7])
            } else if (myClassName(7) == '7' && (myClassName(1) == myClassName(4)) && (squares[1].firstElementChild.dataset.char == 'x')) {
                appendX(squares[7])
            } else if (myClassName(8) == '8' && (myClassName(7) == myClassName(6)) && (squares[6].firstElementChild.dataset.char == 'x')) {
                appendX(squares[8])
            } else if (myClassName(8) == '8' && (myClassName(2) == myClassName(5)) && (squares[2].firstElementChild.dataset.char == 'x')) {
                appendX(squares[8])
            } else if (myClassName(8) == '8' && (myClassName(4) == myClassName(0)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendX(squares[8])
            } else if (myClassName(0) == '0' && (myClassName(1) == myClassName(2)) && (squares[1].firstElementChild.dataset.char == 'o')) {
                appendX(squares[0])
            } else if (myClassName(0) == '0' && (myClassName(4) == myClassName(8)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendX(squares[0])
            } else if (myClassName(0) == '0' && (myClassName(3) == myClassName(6)) && (squares[3].firstElementChild.dataset.char == 'o')) {
                appendX(squares[0])
            } else if (myClassName(1) == '1' && (myClassName(4) == myClassName(7)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendX(squares[1])
            } else if (myClassName(1) == '1' && (myClassName(0) == myClassName(2)) && (squares[0].firstElementChild.dataset.char == 'o')) {
                appendX(squares[1])
            } else if (myClassName(2) == '2' && (myClassName(1) == myClassName(0)) && (squares[0].firstElementChild.dataset.char == 'o')) {
                appendX(squares[2])
            } else if (myClassName(2) == '2' && (myClassName(8) == myClassName(5)) && (squares[5].firstElementChild.dataset.char == 'o')) {
                appendX(squares[2])
            } else if (myClassName(2) == '2' && (myClassName(4) == myClassName(6)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendX(squares[2])
            } else if (myClassName(3) == '3' && (myClassName(0) == myClassName(6)) && (squares[0].firstElementChild.dataset.char == 'o')) {
                appendX(squares[3])
            } else if (myClassName(3) == '3' && (myClassName(4) == myClassName(5)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendX(squares[3])
            } else if (myClassName(4) == '4' && (myClassName(3) == myClassName(5)) && (squares[3].firstElementChild.dataset.char == 'o')) {
                appendX(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(0) == myClassName(8)) && (squares[0].firstElementChild.dataset.char == 'o')) {
                appendX(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(1) == myClassName(7)) && (squares[1].firstElementChild.dataset.char == 'o')) {
                appendX(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(2) == myClassName(6)) && (squares[2].firstElementChild.dataset.char == 'o')) {
                appendX(squares[4])
            } else if (myClassName(5) == '5' && (myClassName(2) == myClassName(8)) && (squares[2].firstElementChild.dataset.char == 'o')) {
                appendX(squares[5])
            } else if (myClassName(5) == '5' && (myClassName(3) == myClassName(4)) && (squares[3].firstElementChild.dataset.char == 'o')) {
                appendX(squares[5])
            } else if (myClassName(6) == '6' && (myClassName(7) == myClassName(8)) && (squares[7].firstElementChild.dataset.char == 'o')) {
                appendX(squares[6])
            } else if (myClassName(6) == '6' && (myClassName(0) == myClassName(3)) && (squares[3].firstElementChild.dataset.char == 'o')) {
                appendX(squares[6])
            } else if (myClassName(6) == '6' && (myClassName(4) == myClassName(2)) && (squares[2].firstElementChild.dataset.char == 'o')) {
                appendX(squares[6])
            } else if (myClassName(7) == '7' && (myClassName(6) == myClassName(8)) && (squares[6].firstElementChild.dataset.char == 'o')) {
                appendX(squares[7])
            } else if (myClassName(7) == '7' && (myClassName(1) == myClassName(4)) && (squares[1].firstElementChild.dataset.char == 'o')) {
                appendX(squares[7])
            } else if (myClassName(8) == '8' && (myClassName(7) == myClassName(6)) && (squares[6].firstElementChild.dataset.char == 'o')) {
                appendX(squares[8])
            } else if (myClassName(8) == '8' && (myClassName(2) == myClassName(5)) && (squares[2].firstElementChild.dataset.char == 'o')) {
                appendX(squares[8])
            } else if (myClassName(8) == '8' && (myClassName(4) == myClassName(0)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendX(squares[8])
            } else if (myClassName(0) != '0' && squares[0].firstElementChild.dataset.char == 'x') {
                if (myClassName(4) == '4' && myClassName(8) == '8') {
                    appendX(squares[4])
                } else if (myClassName(1) == '1' && myClassName(2) == '2') {
                    appendX(squares[2])
                } else if (myClassName(3) == '3' && myClassName(3) == '6') {
                    appendX(squares[6])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(1) != '1' && squares[1].firstElementChild.dataset.char == 'x') {
                if (myClassName(0) == '0' && myClassName(2) == '2') {
                    appendX(squares[2])
                } else if (myClassName(4) == '4' && myClassName(7) == '7') {
                    appendX(squares[4])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(2) != '2' && squares[2].firstElementChild.dataset.char == 'x') {
                if (myClassName(4) == '4' && myClassName(6) == '6') {
                    appendX(squares[4])
                } else if (myClassName(1) == '1' && myClassName(0) == '0') {
                    appendX(squares[0])
                } else if (myClassName(5) == '5' && myClassName(8) == '8') {
                    appendX(squares[8])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(3) != '3' && squares[3].firstElementChild.dataset.char == 'x') {
                if (myClassName(4) == '4' && myClassName(5) == '5') {
                    appendX(squares[4])
                } else if (myClassName(0) == '0' && myClassName(6) == '6') {
                    appendX(squares[6])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(4) != '4' && squares[4].firstElementChild.dataset.char == 'x') {
                if (myClassName(0) == '0' && myClassName(8) == '8') {
                    appendX(squares[8])
                } else if (myClassName(2) == '2' && myClassName(6) == '6') {
                    appendX(squares[6])
                } else if (myClassName(1) == '1' && myClassName(7) == '7') {
                    appendX(squares[7])
                } else if (myClassName(3) == '3' && myClassName(5) == '5') {
                    appendX(squares[4])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(5) != '5' && squares[5].firstElementChild.dataset.char == 'x') {
                if (myClassName(2) == '2' && myClassName(8) == '8') {
                    appendX(squares[8])
                } else if (myClassName(4) == '4' && myClassName(3) == '3') {
                    appendX(squares[4])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(6) != '6' && squares[6].firstElementChild.dataset.char == 'x') {
                if (myClassName(4) == '4' && myClassName(2) == '2') {
                    appendX(squares[4])
                } else if (myClassName(0) == '0' && myClassName(3) == '3') {
                    appendX(squares[0])
                } else if (myClassName(7) == '7' && myClassName(8) == '8') {
                    appendX(squares[8])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(7) != '7' && squares[7].firstElementChild.dataset.char == 'x') {
                if (myClassName(6) == '6' && myClassName(8) == '8') {
                    appendX(squares[6])
                } else if (myClassName(4) == '4' && myClassName(1) == '1') {
                    appendX(squares[4])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(8) != '8' && squares[8].firstElementChild.dataset.char == 'x') {
                if (myClassName(4) == '4' && myClassName(0) == '0') {
                    appendX(squares[4])
                } else if (myClassName(5) == '5' && myClassName(2) == '2') {
                    appendX(squares[2])
                } else if (myClassName(7) == '7' && myClassName(6) == '6') {
                    appendX(squares[6])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else {
                if (myClassName(4) == '4') {
                    appendX(squares[4])
                } else {
                    selectRandomSquare([0, 2, 6, 8], x)
                }
            }
        } else {
            if (myClassName(0) == '0' && (myClassName(1) == myClassName(2)) && (squares[1].firstElementChild.dataset.char == 'x')) {
                appendO(squares[0])
            } else if (myClassName(0) == '0' && (myClassName(4) == myClassName(8)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendO(squares[0])
            } else if (myClassName(0) == '0' && (myClassName(3) == myClassName(6)) && (squares[3].firstElementChild.dataset.char == 'x')) {
                appendO(squares[0])
            } else if (myClassName(1) == '1' && (myClassName(4) == myClassName(7)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendO(squares[1])
            } else if (myClassName(1) == '1' && (myClassName(0) == myClassName(2)) && (squares[0].firstElementChild.dataset.char == 'x')) {
                appendO(squares[1])
            } else if (myClassName(2) == '2' && (myClassName(1) == myClassName(0)) && (squares[0].firstElementChild.dataset.char == 'x')) {
                appendO(squares[2])
            } else if (myClassName(2) == '2' && (myClassName(8) == myClassName(5)) && (squares[5].firstElementChild.dataset.char == 'x')) {
                appendO(squares[2])
            } else if (myClassName(2) == '2' && (myClassName(4) == myClassName(6)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendO(squares[2])
            } else if (myClassName(3) == '3' && (myClassName(0) == myClassName(6)) && (squares[0].firstElementChild.dataset.char == 'x')) {
                appendO(squares[3])
            } else if (myClassName(3) == '3' && (myClassName(4) == myClassName(5)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendO(squares[3])
            } else if (myClassName(4) == '4' && (myClassName(3) == myClassName(5)) && (squares[3].firstElementChild.dataset.char == 'x')) {
                appendO(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(0) == myClassName(8)) && (squares[0].firstElementChild.dataset.char == 'x')) {
                appendO(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(1) == myClassName(7)) && (squares[1].firstElementChild.dataset.char == 'x')) {
                appendO(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(2) == myClassName(6)) && (squares[2].firstElementChild.dataset.char == 'x')) {
                appendO(squares[4])
            } else if (myClassName(5) == '5' && (myClassName(2) == myClassName(8)) && (squares[2].firstElementChild.dataset.char == 'x')) {
                appendO(squares[5])
            } else if (myClassName(5) == '5' && (myClassName(3) == myClassName(4)) && (squares[3].firstElementChild.dataset.char == 'x')) {
                appendO(squares[5])
            } else if (myClassName(6) == '6' && (myClassName(7) == myClassName(8)) && (squares[7].firstElementChild.dataset.char == 'x')) {
                appendO(squares[6])
            } else if (myClassName(6) == '6' && (myClassName(0) == myClassName(3)) && (squares[3].firstElementChild.dataset.char == 'x')) {
                appendO(squares[6])
            } else if (myClassName(6) == '6' && (myClassName(4) == myClassName(2)) && (squares[2].firstElementChild.dataset.char == 'x')) {
                appendO(squares[6])
            } else if (myClassName(7) == '7' && (myClassName(6) == myClassName(8)) && (squares[6].firstElementChild.dataset.char == 'x')) {
                appendO(squares[7])
            } else if (myClassName(7) == '7' && (myClassName(1) == myClassName(4)) && (squares[1].firstElementChild.dataset.char == 'x')) {
                appendO(squares[7])
            } else if (myClassName(8) == '8' && (myClassName(7) == myClassName(6)) && (squares[6].firstElementChild.dataset.char == 'x')) {
                appendO(squares[8])
            } else if (myClassName(8) == '8' && (myClassName(2) == myClassName(5)) && (squares[2].firstElementChild.dataset.char == 'x')) {
                appendO(squares[8])
            } else if (myClassName(8) == '8' && (myClassName(4) == myClassName(0)) && (squares[4].firstElementChild.dataset.char == 'x')) {
                appendO(squares[8])
            } else if (myClassName(0) == '0' && (myClassName(1) == myClassName(2)) && (squares[1].firstElementChild.dataset.char == 'o')) {
                appendO(squares[0])
            } else if (myClassName(0) == '0' && (myClassName(4) == myClassName(8)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendO(squares[0])
            } else if (myClassName(0) == '0' && (myClassName(3) == myClassName(6)) && (squares[3].firstElementChild.dataset.char == 'o')) {
                appendO(squares[0])
            } else if (myClassName(1) == '1' && (myClassName(4) == myClassName(7)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendO(squares[1])
            } else if (myClassName(1) == '1' && (myClassName(0) == myClassName(2)) && (squares[0].firstElementChild.dataset.char == 'o')) {
                appendO(squares[1])
            } else if (myClassName(2) == '2' && (myClassName(1) == myClassName(0)) && (squares[0].firstElementChild.dataset.char == 'o')) {
                appendO(squares[2])
            } else if (myClassName(2) == '2' && (myClassName(8) == myClassName(5)) && (squares[5].firstElementChild.dataset.char == 'o')) {
                appendO(squares[2])
            } else if (myClassName(2) == '2' && (myClassName(4) == myClassName(6)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendO(squares[2])
            } else if (myClassName(3) == '3' && (myClassName(0) == myClassName(6)) && (squares[0].firstElementChild.dataset.char == 'o')) {
                appendO(squares[3])
            } else if (myClassName(3) == '3' && (myClassName(4) == myClassName(5)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendO(squares[3])
            } else if (myClassName(4) == '4' && (myClassName(3) == myClassName(5)) && (squares[3].firstElementChild.dataset.char == 'o')) {
                appendO(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(0) == myClassName(8)) && (squares[0].firstElementChild.dataset.char == 'o')) {
                appendO(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(1) == myClassName(7)) && (squares[1].firstElementChild.dataset.char == 'o')) {
                appendO(squares[4])
            } else if (myClassName(4) == '4' && (myClassName(2) == myClassName(6)) && (squares[2].firstElementChild.dataset.char == 'o')) {
                appendO(squares[4])
            } else if (myClassName(5) == '5' && (myClassName(2) == myClassName(8)) && (squares[2].firstElementChild.dataset.char == 'o')) {
                appendO(squares[5])
            } else if (myClassName(5) == '5' && (myClassName(3) == myClassName(4)) && (squares[3].firstElementChild.dataset.char == 'o')) {
                appendO(squares[5])
            } else if (myClassName(6) == '6' && (myClassName(7) == myClassName(8)) && (squares[7].firstElementChild.dataset.char == 'o')) {
                appendO(squares[6])
            } else if (myClassName(6) == '6' && (myClassName(0) == myClassName(3)) && (squares[3].firstElementChild.dataset.char == 'o')) {
                appendO(squares[6])
            } else if (myClassName(6) == '6' && (myClassName(4) == myClassName(2)) && (squares[2].firstElementChild.dataset.char == 'o')) {
                appendO(squares[6])
            } else if (myClassName(7) == '7' && (myClassName(6) == myClassName(8)) && (squares[6].firstElementChild.dataset.char == 'o')) {
                appendO(squares[7])
            } else if (myClassName(7) == '7' && (myClassName(1) == myClassName(4)) && (squares[1].firstElementChild.dataset.char == 'o')) {
                appendO(squares[7])
            } else if (myClassName(8) == '8' && (myClassName(7) == myClassName(6)) && (squares[6].firstElementChild.dataset.char == 'o')) {
                appendO(squares[8])
            } else if (myClassName(8) == '8' && (myClassName(2) == myClassName(5)) && (squares[2].firstElementChild.dataset.char == 'o')) {
                appendO(squares[8])
            } else if (myClassName(8) == '8' && (myClassName(4) == myClassName(0)) && (squares[4].firstElementChild.dataset.char == 'o')) {
                appendO(squares[8])
            } else if (myClassName(0) != '0' && squares[0].firstElementChild.dataset.char == 'o') {
                if (myClassName(4) == '4' && myClassName(8) == '8') {
                    appendO(squares[4])
                } else if (myClassName(1) == '1' && myClassName(2) == '2') {
                    appendO(squares[2])
                } else if (myClassName(3) == '3' && myClassName(3) == '6') {
                    appendO(squares[6])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(1) != '1' && squares[1].firstElementChild.dataset.char == 'o') {
                if (myClassName(0) == '0' && myClassName(2) == '2') {
                    appendO(squares[2])
                } else if (myClassName(4) == '4' && myClassName(7) == '7') {
                    appendO(squares[4])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(2) != '2' && squares[2].firstElementChild.dataset.char == 'o') {
                if (myClassName(4) == '4' && myClassName(6) == '6') {
                    appendO(squares[4])
                } else if (myClassName(1) == '1' && myClassName(0) == '0') {
                    appendO(squares[0])
                } else if (myClassName(5) == '5' && myClassName(8) == '8') {
                    appendO(squares[8])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(3) != '3' && squares[3].firstElementChild.dataset.char == 'o') {
                if (myClassName(4) == '4' && myClassName(5) == '5') {
                    appendO(squares[4])
                } else if (myClassName(0) == '0' && myClassName(6) == '6') {
                    appendO(squares[6])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(4) != '4' && squares[4].firstElementChild.dataset.char == 'o') {
                if (myClassName(0) == '0' && myClassName(8) == '8') {
                    appendO(squares[8])
                } else if (myClassName(2) == '2' && myClassName(6) == '6') {
                    appendO(squares[6])
                } else if (myClassName(1) == '1' && myClassName(7) == '7') {
                    appendO(squares[7])
                } else if (myClassName(3) == '3' && myClassName(5) == '5') {
                    appendO(squares[4])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(5) != '5' && squares[5].firstElementChild.dataset.char == 'o') {
                if (myClassName(2) == '2' && myClassName(8) == '8') {
                    appendO(squares[8])
                } else if (myClassName(4) == '4' && myClassName(3) == '3') {
                    appendO(squares[4])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(6) != '6' && squares[6].firstElementChild.dataset.char == 'o') {
                if (myClassName(4) == '4' && myClassName(2) == '2') {
                    appendO(squares[4])
                } else if (myClassName(0) == '0' && myClassName(3) == '3') {
                    appendO(squares[0])
                } else if (myClassName(7) == '7' && myClassName(8) == '8') {
                    appendO(squares[8])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(7) != '7' && squares[7].firstElementChild.dataset.char == 'o') {
                if (myClassName(6) == '6' && myClassName(8) == '8') {
                    appendO(squares[6])
                } else if (myClassName(4) == '4' && myClassName(1) == '1') {
                    appendO(squares[4])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else if (myClassName(8) != '8' && squares[8].firstElementChild.dataset.char == 'o') {
                if (myClassName(4) == '4' && myClassName(0) == '0') {
                    appendO(squares[4])
                } else if (myClassName(5) == '5' && myClassName(2) == '2') {
                    appendO(squares[2])
                } else if (myClassName(7) == '7' && myClassName(6) == '6') {
                    appendO(squares[6])
                } else {
                    selectRandomSquare(emptySquares, x)
                }
            } else {
                if (myClassName(4) == '4') {
                    appendO(squares[4])
                } else {
                    selectRandomSquare([0, 2, 6, 8], x)
                }
            }
        }
    }


    //cpuPlay for play 1 person

