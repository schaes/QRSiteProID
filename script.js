// This function generates a random number and assigns the reward points based on the number it gets (eg. prize 1 = 10% etc.)
function getRandomRewardPoints() {
    const rewardType = Math.floor(Math.random() * 3) + 1; // Random points between 1 and 100
    if (rewardType === 1) {
        return 10; // 10 points
    } else if (rewardType === 2) {
        return 20; // 20 points
    } else {
        return 30; // 30 points
    }
}

//console.log('Reward points generated:', getRandomRewardPoints());

const rewardPoints = getRandomRewardPoints(); // Call the function to get the reward points
document.getElementById('rewardMessage').textContent = `You have ${rewardPoints}% off on all items!`;
// gives element with id the text content with the reward.