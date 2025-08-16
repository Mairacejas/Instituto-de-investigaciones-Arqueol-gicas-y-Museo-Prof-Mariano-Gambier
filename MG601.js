// Alternar modo alto contraste
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// Alternar aumento de tamaño de texto
function toggleTextSize() {
    document.body.classList.toggle('large-text');
}


// Control de audio
let currentAudio = null;

function toggleAudio(audioId) {
    const audio = document.getElementById(audioId);
    const icon = document.querySelector(`button[onclick="toggleAudio('${audioId}')"] i`);
    
    // Pausar el audio actual si hay uno reproduciéndose
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        const currentIcon = document.querySelector(`button[onclick="toggleAudio('${currentAudio.id}')"] i`);
        if (currentIcon) {
            currentIcon.className = 'fas fa-headphones';
        }
    }
    
    // Controlar el audio seleccionado
    if (audio.paused) {
        audio.play();
        icon.className = 'fas fa-pause';
        currentAudio = audio;
    } else {
        audio.pause();
        audio.currentTime = 0;
        icon.className = 'fas fa-headphones';
        currentAudio = null;
    }
    
    // Evento cuando el audio termina
    audio.onended = function() {
        icon.className = 'fas fa-headphones';
        currentAudio = null;
    };
}

// Control de modales
function mostrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pausar audio si está reproduciéndose
    const audioId = modalId.replace('modal', 'audio');
    const audio = document.getElementById(audioId);
    if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        const icon = document.querySelector(`button[onclick="toggleAudio('${audioId}')"] i`);
        if (icon) {
            icon.className = 'fas fa-headphones';
        }
        currentAudio = null;
    }
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pausar audio asociado
            const modalId = modal.id;
            const audioId = modalId.replace('modal', 'audio');
            const audio = document.getElementById(audioId);
            if (audio && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
                const icon = document.querySelector(`button[onclick="toggleAudio('${audioId}')"] i`);
                if (icon) {
                    icon.className = 'fas fa-headphones';
                }
                currentAudio = null;
            }
        }
    });
};

// Pausar todos los audios al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
});

