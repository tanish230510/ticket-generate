const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

if (dropzone) {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('border-blue-500', 'border-2');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-blue-500', 'border-2');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-blue-500', 'border-2');

        const files = e.dataTransfer.files;
        if (typeof handleFiles === 'function') {
            handleFiles(files);
        }
    });
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const imageData = event.target.result;

                localStorage.setItem('avatar', imageData);
            };

            reader.readAsDataURL(files[0]);
        }
    });
}

const avatar = localStorage.getItem('avatar');

const form = document.getElementById('formm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('name', document.getElementById('name').value);
        localStorage.setItem('email', document.getElementById('email').value);
        localStorage.setItem('githubUsername', document.getElementById('githubUsername').value);
        window.location.href = 'index2.html';
    });
}

function populateTicketInfo() {
    
    const nameElement = document.getElementById('name');
    const gitElement = document.getElementById('git');
    const name = localStorage.getItem('name');
    const githubUsername = localStorage.getItem('githubUsername');

    if (nameElement && name) {
        nameElement.textContent = name;
    }

    if (gitElement && githubUsername) {
        gitElement.textContent = githubUsername.startsWith('@') ? githubUsername : '@' + githubUsername;
    }

    if (avatar) {
        const avatarElement = document.getElementById('avatar');
        if (avatarElement) {
            avatarElement.src = avatar;
        }
    }
    if (congrats) {
        
        congrats.innerHTML = `CONGRATS, ${name}! <br> YOUR TICKETS ARE READY`;
    }
    if(emailnotification){
        emailnotification.innerHTML = `we are emailed to <div class="text-white text-lg"> ${localStorage.getItem('email')} </div> Your Tickets and will send updates<br> in the run up event`;

    }
}

const dateElement = document.getElementById('date');
if (dateElement) {
    dateElement.textContent = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
    });
}

populateTicketInfo();

