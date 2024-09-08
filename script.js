document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const generatedResume = document.getElementById('generatedResume');

    resumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;

        const resumeContent = `
            <h2>${name}</h2>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        `;

        generatedResume.innerHTML = resumeContent;
        makeEditable();
        addShareAndDownloadButtons();
    });

    function makeEditable() {
        const editableElements = generatedResume.querySelectorAll('h2, h3, p');
        editableElements.forEach(element => {
            element.setAttribute('contenteditable', 'true');
            element.addEventListener('blur', function() {
                this.setAttribute('contenteditable', 'false');
            });
            element.addEventListener('click', function() {
                this.setAttribute('contenteditable', 'true');
                this.focus();
            });
        });
    }

    function addShareAndDownloadButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share Resume';
        shareButton.addEventListener('click', shareResume);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download as PDF';
        downloadButton.addEventListener('click', downloadAsPDF);

        buttonContainer.appendChild(shareButton);
        buttonContainer.appendChild(downloadButton);
        generatedResume.parentElement.appendChild(buttonContainer);
    }

    function shareResume() {
        const uniqueId = generateUniqueId();
        const resumeContent = generatedResume.innerHTML;
        localStorage.setItem(uniqueId, resumeContent);
        const shareableLink = `${window.location.origin}/resume/${uniqueId}`;
        alert(`Share this link: ${shareableLink}`);
    }

    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }

    function downloadAsPDF() {
        const element = generatedResume;
        html2pdf().from(element).save('resume.pdf');
    }

    const pathParts = window.location.pathname.split('/');
    if (pathParts[1] === 'resume' && pathParts[2]) {
        const uniqueId = pathParts[2];
        const savedResume = localStorage.getItem(uniqueId);
        if (savedResume) {
            generatedResume.innerHTML = savedResume;
            makeEditable();
            addShareAndDownloadButtons();
            resumeForm.style.display = 'none';
        }
    }
});

