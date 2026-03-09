// window.handleFileSelect = function(event) {
//     const file = event.target.files[0];
//     const previewBar = document.getElementById('filePreview');
//     const nameDisplay = document.getElementById('fileNameDisplay');

//     if (file) {
//         nameDisplay.textContent = file.name;
//         previewBar.classList.add('active');
//         // Re-run Lucide to render the 'x' icon in the new bar
//         lucide.createIcons();
//     }
// };

// window.clearFile = function() {
//     const fileInput = document.getElementById('fileInput');
//     const previewBar = document.getElementById('filePreview');
    
//     fileInput.value = ""; 
//     previewBar.classList.remove('active');
// };