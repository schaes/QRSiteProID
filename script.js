// This function generates a random number and assigns the reward points based on the number it gets (eg. prize 1 = 10% etc.)
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
                const image = document.getElementById('moonstoneAd');
                if (image) {
                    image.style.display = 'none'; // Hide the image after claiming the reward
                }
                if (countdownElement) {
                    countdownElement.style.display = 'none'; // Hide the countdown text after claiming the reward
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