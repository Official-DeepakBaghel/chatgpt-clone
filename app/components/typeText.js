export const typeText = (text, onUpdate, speed = 10, onComplete) => {
    let index = 0;
    let currentText = "";

    const interval = setInterval(() => {
        currentText += text[index];
        onUpdate(currentText);
        index++;

        if (index >= text.length) {
            clearInterval(interval);
            if (onComplete) onComplete();
        }
    }, speed);
};
