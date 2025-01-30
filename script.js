document.addEventListener("DOMContentLoaded", () => {
    let extractedText = "";

    // Process Image
    document.getElementById("processImage").addEventListener("click", () => {
        const imageInput = document.getElementById("imageInput").files[0];
        if (imageInput) {
            const reader = new FileReader();
            reader.onload = function(event) {
                Tesseract.recognize(
                    event.target.result,
                    'eng',
                    { logger: m => console.log(m) }
                ).then(({ data: { text } }) => {
                    extractedText = text;
                    document.getElementById("textOutput").innerText = text;
                }).catch(error => console.error("OCR Error:", error));
            };
            reader.readAsDataURL(imageInput);
        } else {
            alert("Please select an image first.");
        }
    });

    // Text to Speech
    document.getElementById("speakText").addEventListener("click", () => {
        let text = document.getElementById("textToSpeak").value || extractedText;
        if (text) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("No text to speak.");
        }
    });

    // Google Search
    document.getElementById("searchButton").addEventListener("click", () => {
        let query = document.getElementById("searchQuery").value || extractedText;
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        } else {
            alert("No text to search.");
        }
    });

    // Dark Mode Toggle
    document.getElementById("toggleTheme").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
