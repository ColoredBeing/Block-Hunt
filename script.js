document.addEventListener('DOMContentLoaded', function () {
    function getRandomTime() {
        return Math.floor(Math.random() * 2 + 2) * 10; // Random time
    }

    function flashScreen() {
        const flash = document.querySelector('.flash');
        flash.style.opacity = 1;

        setTimeout(() => {
            flash.style.opacity = 0;
        }, 400); //duration flash
    }

    function initiateFlash() {
        flashScreen();
        setTimeout(initiateFlash, getRandomTime());
    }

    initiateFlash();
});

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowRight':
            moveChicken(10, 0); 
            break;
        case 'ArrowLeft':
            moveChicken(-10, 0); 
            break;
        case 'ArrowUp':
            moveChicken(0, 10); 
            break;
        case 'ArrowDown':
            moveChicken(0, -10);
            break;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let points = 0;
    let targetClicked = false;

    function getRandomTime() {
        return Math.floor(Math.random() * 5 + 1) * 100; // 
    }

    function flashScreen() {
        const flash = document.querySelector('.flash');
        const body = document.body;
        const target = document.querySelector('.target');

        const randomColor1 = getRandomColor();
        const randomColor2 = getRandomColor();

        body.style.background = `repeating-linear-gradient(-45deg, ${randomColor1}, ${randomColor1} 10px, ${randomColor2} 10px, ${randomColor2} 20px)`;

        
        target.style.backgroundColor = randomColor2;

        flash.style.opacity = 1;

        setTimeout(() => {
            // Restore the original green stripes after the flash
            body.style.background = 'repeating-linear-gradient(-45deg, #228B22, #228B22 10px, #FFFFFF 10px, #FFFFFF 20px)';
            flash.style.opacity = 0;

            // Increment points after each successful flash
            if (!targetClicked) {
                points++;
                document.getElementById('pointCount').innerText = points;
            }

            // Check for win condition
            if (points >= 25) {
                alert('Congratulations! You LOSE!');
                resetGame();
            } else {
                moveTargetSquare(); // Move the target square to a new random position
                initiateFlash();
            }
        }, 1000);
    }

    function initiateFlash() {
        setTimeout(() => {
            flashScreen();
        }, getRandomTime());
    }

    initiateFlash();

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function resetGame() {
        points = 0;
        targetClicked = false;
        document.getElementById('pointCount').innerText = points;
        moveTargetSquare(); // Move the target square to a new random position
        initiateFlash();
    }

    function moveTargetSquare() {
        const target = document.querySelector('.target');
        const container = document.querySelector('.game-container');
    
        const maxX = container.clientWidth - target.offsetWidth;
        const maxY = container.clientHeight - target.offsetHeight;
    
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
    
        target.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
    

    // Event listener for the target square
    document.querySelector('.target').addEventListener('click', function () {
        if (!targetClicked) {
            targetClicked = true;
            alert('Congratulations! You reached the target!');
            resetGame();
        }
    });

    // Event listener for moving the chicken (box)
    document.addEventListener('keydown', function (event) {
        const chicken = document.querySelector('.chicken');
        const target = document.querySelector('.target');

        const chickenRect = chicken.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // Checks for collision
        if (
            chickenRect.top < targetRect.bottom &&
            chickenRect.bottom > targetRect.top &&
            chickenRect.left < targetRect.right &&
            chickenRect.right > targetRect.left
        ) {
            points++;
            document.getElementById('pointCount').innerText = points;
            targetClicked = true;
            resetGame();
        }

        if (event.key === 'ArrowUp') {
            chicken.style.top = `${Math.max(chicken.offsetTop - 50, 0)}px`;
        } else if (event.key === 'ArrowDown') {
            chicken.style.top = `${Math.min(chicken.offsetTop + 50, window.innerHeight - chicken.offsetHeight)}px`;
        } else if (event.key === 'ArrowLeft') {
            chicken.style.left = `${Math.max(chicken.offsetLeft - 50, 0)}px`;
        } else if (event.key === 'ArrowRight') {
            chicken.style.left = `${Math.min(chicken.offsetLeft + 50, window.innerWidth - chicken.offsetWidth)}px`;
        }
    });
});
document.addEventListener('keydown', function (event) {
    const chicken = document.querySelector('.chicken');
    const target = document.querySelector('.target');

    const chickenRect = chicken.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Checks for collision with the target (cube)
    if (
        chickenRect.top < targetRect.bottom &&
        chickenRect.bottom > targetRect.top &&
        chickenRect.left < targetRect.right &&
        chickenRect.right > targetRect.left
    ) {
        alert('Congratulations! You caught the cube. You win!');
        resetGame();
    }
});

function showEpilepticAttackWarning() {
    const warningMessage = document.getElementById('epilepticWarning');
    warningMessage.style.display = 'block';

    setTimeout(() => {
        warningMessage.style.display = 'none';
        startGame('epilepticAttack');
    }, 5000);
}

function startGame(mode) {
    document.querySelector('.mode-selector').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    document.getElementById(mode).style.display = 'flex';
}


