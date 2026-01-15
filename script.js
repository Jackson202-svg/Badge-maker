document.addEventListener('DOMContentLoaded', () => {
    const labelInput = document.getElementById('label');
    const messageInput = document.getElementById('message');
    const logoInput = document.getElementById('logo');
    const colorInput = document.getElementById('color');
    const styleInput = document.getElementById('style');
    const previewImg = document.getElementById('badge-preview');
    const codeOutput = document.getElementById('code-output');
    const copyBtn = document.getElementById('copy-btn');

    function updateBadge() {
        // Sanitize inputs for URL: replace spaces with underscores
        const label = encodeURIComponent(labelInput.value.trim().replace(/\s+/g, '_') || ' ');
        const message = encodeURIComponent(messageInput.value.trim().replace(/\s+/g, '_') || ' ');
        const color = colorInput.value.replace('#', '');
        const logo = logoInput.value.toLowerCase().trim();
        const style = styleInput.value;

        // Base URL using Shields.io dynamic badge API
        let url = `https://img.shields.io/badge/${label}-${message}-${color}?style=${style}`;
        
        // Add logo if user typed something
        if (logo) {
            url += `&logo=${logo}&logoColor=white`;
        }

        // Update the image and the text area
        previewImg.src = url;
        const markdown = `![Custom Badge](${url})`;
        codeOutput.innerText = markdown;
    }

    // Add event listeners to all inputs
    [labelInput, messageInput, logoInput, colorInput, styleInput].forEach(el => {
        el.addEventListener('input', updateBadge);
    });

    // Copy to clipboard function
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeOutput.innerText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "Copied!";
            copyBtn.style.backgroundColor = "#0969da";
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = "";
            }, 2000);
        });
    });

    // Run once on load to show initial state
    updateBadge();
});
