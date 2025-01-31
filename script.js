document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeButton = document.getElementById('toggleTheme');
    const processImageButton = document.getElementById('processImage');
    const clearTextButton = document.getElementById('clearText');
    const searchGoogleButton = document.getElementById('searchGoogle');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const progressBar = document.getElementById('progressBar');
    const imagePreview = document.getElementById('imagePreview');
    let extractedText = '';

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    processImageButton.addEventListener('click', () => {
        const imageUpload = document.getElementById('imageUpload').files[0];
        if (imageUpload) {
            loadingIndicator.style.display = 'block';
            progressBar.style.display = 'block';
            imagePreview.style.display = 'block';
            imagePreview.src = URL.createObjectURL(imageUpload);

            Tesseract.recognize(imageUpload, 'eng', {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        progressBar.value = m.progress;
                    }
                }
            })
                .then(({ data: { text } }) => {
                    extractedText = text;
                    const utterance = new SpeechSynthesisUtterance(text);
                    speechSynthesis.speak(utterance);
                })
                .catch(error => {
                    console.error('Error processing image:', error);
                })
                .finally(() => {
                    loadingIndicator.style.display = 'none';
                    progressBar.style.display = 'none';
                });
        } else {
            alert('Please upload an image first.');
        }
    });

    clearTextButton.addEventListener('click', () => {
        extractedText = '';
        alert('Text cleared.');
    });

    searchGoogleButton.addEventListener('click', () => {
        if (extractedText) {
            const query = encodeURIComponent(extractedText);
            window.open(`https://www.google.com/search?q=${query}`, '_blank');
        } else {
            alert('No text to search.');
        }
    });
});