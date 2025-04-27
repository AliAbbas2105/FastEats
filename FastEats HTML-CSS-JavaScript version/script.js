const progress = [0, 25, 50, 75, 100]; // Progress in percentages
const progressSteps = document.querySelectorAll('.tracker-step'); //selects all the steps 

function updateProgress(index) {
    const progressBar = document.querySelector('.loading-progress');
    const stepWidth = 100 / (progressSteps.length - 1);
    const width = index * stepWidth;
    progressBar.style.width = `${width}%`;

    // Update active step
    progressSteps.forEach((step, i) => {
        if (i === index) {
            step.classList.add('active'); //activates the percentage it wants to use and then removes it 
        } else {
            step.classList.remove('active');
        }
    });
}

let currentIndex = 0;
setInterval(() => {
    currentIndex = currentIndex < progress.length - 1 ? currentIndex + 1 : 0;
    updateProgress(currentIndex);
}, 4000); // 4000 ms = 4 secs
