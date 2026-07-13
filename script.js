// This function generates a random number and assigns the reward points based on the number it gets (eg. prize 1 = 10% etc.)
const rewards = document.getElementById('rewards');
if (rewards) {
    rewards.style.display = 'none'; // Initially hide the rewards container
}
function timer() {
    const countdownElement = document.getElementById('timeLeft');
    if (!countdownElement) {
        return;
    }

    let timeLeft = 10; // Set the countdown time in seconds
    countdownElement.textContent = `Time left until you can claim your reward: ${timeLeft} seconds`;

    const timerId = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `Time left until you can claim your reward: ${timeLeft} seconds`;
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            countdownElement.textContent = "Time's up! You can claim your reward now.";
            const rewardPoints = getRandomRewardPoints(); // Call the function to get the reward points
            
            const button = document.getElementById('claimRewardButton');
            if (button) {
                button.style.display = 'block'; // Show the button when time is up
            }

            button.addEventListener('click', () => {
                document.getElementById('rewardMessage').textContent = `You get ${rewardPoints}!`;
                button.style.display = 'none'; // Hide the button after claiming the reward
                const image = document.getElementById('imageContainer');
                const dialogueBox = document.getElementById('dialogueBox');
                const mascotImage = document.getElementById('mascot');
                if (image) {
                    image.style.display = 'none'; // Hide the image after claiming the reward
                }
                if (countdownElement) {
                    countdownElement.style.display = 'none'; // Hide the countdown text after claiming the reward
                }
                if (dialogueBox) {
                    dialogueBox.style.display = 'none';
                }
                if (mascotImage) {
                    mascotImage.style.display = 'none'; // Hide the mascot image after claiming the reward
                }

                if (rewards) {
                    rewards.style.display = 'block'; // Show the rewards container after claiming the reward
                }
                
            }
            );
            // gives element with id the text content with the reward.
        }
        
    }, 1000);
}

function getRandomRewardPoints() {
    const rewardType = Math.floor(Math.random() * 100) + 1; 
    if (rewardType <= 50) {
        return "a 2$ voucher"; // 10 points
    } else if (rewardType <= 75) {
        return "a 10$ voucher"; // 20 points
    } else if (rewardType <= 87) {
        return "a free drink/snack from any store of choice"; // 30 points
    } else if (rewardType <= 94) {
        return "exclusive merchandise from any store of choice"; // 40 points
    } else {
        return "a 20$ dining voucher"; // 50 points
    }
}

//console.log('Reward points generated:', getRandomRewardPoints());
timer();

/// area map code
const dialogueBox = document.getElementById('dialogueBox');
const dialogueMessage = document.getElementById('dialogueMessage');
const imageMap = document.querySelector('img[usemap="#image-map"]');
const mapAreas = document.querySelectorAll('area[id^="info"]');

if (dialogueBox) {
    dialogueBox.style.display = 'none'; // Initially hide the dialogue box
}

function scaleMapAreas() {
    if (!imageMap || !imageMap.naturalWidth || !imageMap.naturalHeight) {
        return;
    }

    const scaleX = imageMap.clientWidth / imageMap.naturalWidth;
    const scaleY = imageMap.clientHeight / imageMap.naturalHeight;

    mapAreas.forEach((area) => {
        const originalCoords = area.dataset.originalCoords || area.coords;
        area.dataset.originalCoords = originalCoords;

        const scaledCoords = originalCoords
            .split(',')
            .map((coord, index) => {
                const numericCoord = Number(coord.trim());
                return Number.isNaN(numericCoord)
                    ? coord
                    : Math.round(numericCoord * (index % 2 === 0 ? scaleX : scaleY));
            })
            .join(',');

        area.coords = scaledCoords;
    });
}

mapAreas.forEach((area) => {
    area.addEventListener('click', (event) => {
        event.preventDefault();

        const openedId = event.currentTarget.id;

        if (!dialogueBox || !dialogueMessage) {
            return;
        }

        dialogueBox.style.display = 'block';

        if (openedId === 'info1') {
            dialogueMessage.textContent = "This is the first area of the map. You can find various shops and restaurants here.";
        } else if (openedId === 'info2') {
            dialogueMessage.textContent = "This is the second area of the map. It contains different points of interest.";
        } else if (openedId === 'info3') {
            dialogueMessage.textContent = "This is the third area of the map. Explore more locations here.";
        }

        console.log('Dialog opened by:', openedId);
    });
});

if (imageMap.complete) {
    scaleMapAreas();
} else {
    imageMap.addEventListener('load', scaleMapAreas);
}

window.addEventListener('resize', scaleMapAreas);
