document.addEventListener("DOMContentLoaded", () => {
    let extractedText = "";

    // Check if Tesseract.js is loaded
    if (typeof Tesseract === 'undefined') {
        alert("Tesseract.js is not loaded. Please check the script tag in index.html.");
        return;
    }

    // Process Image
    document.getElementById("processImage").addEventListener("click", () => {
        const fileInput = document.getElementById("imageUpload");
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    console.log("Image loaded successfully.");
                    // Use Tesseract.js to extract text
                    Tesseract.recognize(
                        img,
                        'eng',
                        {
                            logger: info => console.log(info) // Log progress
                        }
                    ).then(({ data: { text } }) => {
                        extractedText = text;
                        document.getElementById("extractedText").innerText = extractedText;
                    }).catch(err => {
                        console.error("Tesseract Error:", err);
                        alert("Error during text extraction. Please try a different image.");
                    });
                };

                img.onerror = (error) => {
                    console.error("Image Load Error:", error);
                    alert("Error loading the image. Please try a different image.");
                };
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload an image.");
        }
    });

    // Google Search
    document.getElementById("searchGoogle").addEventListener("click", () => {
        if (extractedText) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(extractedText)}`;
            window.open(searchUrl, "_blank");
        } else {
            alert("No text extracted to search.");
        }
    });
});
