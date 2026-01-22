// ABAS
document.querySelectorAll(".menu").forEach(menu => {
    menu.addEventListener("click", () => {
        document.querySelectorAll(".menu").forEach(m => m.classList.remove("active"));
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

        menu.classList.add("active");
        document.getElementById(menu.dataset.tab).classList.add("active");
    });
});

// CHECKBOX IMAGEM (OFF PADRÃO)
function toggleCheck(element) {
    const img = element.querySelector(".checkbox");

    if (img.dataset.state === "off") {
        img.src = "assets/checkbox_on.png";
        img.dataset.state = "on";
    } else {
        img.src = "assets/checkbox_off.png";
        img.dataset.state = "off";
    }
}

/* PARTICULAS */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();

let particles = [];
for (let i = 0; i < 70; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: Math.random() * 0.4 + 0.1,
        dy: Math.random() * 0.4 + 0.1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(160, 80, 255, 0.7)";

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", resize);

// SISTEMA DE ÁUDIO SIMPLIFICADO
class SimpleRobotAudio {
    constructor() {
        this.audioContext = null;
        this.isAudioSupported = false;
        this.initAudio();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isAudioSupported = true;
            console.log("✅ Áudio suportado");
        } catch (e) {
            console.log("⚠️ Áudio não suportado, usando fallback");
            this.isAudioSupported = false;
        }
    }

    // Criar tom robótico
    createRobotTone(frequency, duration, type = 'sine') {
        if (!this.isAudioSupported || !this.audioContext) return;

        return new Promise((resolve) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            // Envelope de áudio
            const now = this.audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
            
            oscillator.onended = () => {
                resolve();
            };
        });
    }

    // Sequência de tons para "Injetando"
    async playInjectingSound() {
        if (!this.isAudioSupported) {
            console.log("🔊 Injetando Headtrick Rayz...");
            return;
        }

        try {
            // Sequência de tons robóticos
            await this.createRobotTone(220, 0.1, 'square');  // I
            await new Promise(resolve => setTimeout(resolve, 50));
            await this.createRobotTone(165, 0.1, 'square');  // n
            await new Promise(resolve => setTimeout(resolve, 50));
            await this.createRobotTone(196, 0.1, 'square');  // j
            await new Promise(resolve => setTimeout(resolve, 50));
            await this.createRobotTone(247, 0.2, 'square');  // e
            await new Promise(resolve => setTimeout(resolve, 50));
            await this.createRobotTone(294, 0.3, 'square');  // t
            await new Promise(resolve => setTimeout(resolve, 80));
            
            // Headtrick Rayz
            await this.createRobotTone(330, 0.2, 'sawtooth');
            await new Promise(resolve => setTimeout(resolve, 50));
            await this.createRobotTone(262, 0.2, 'sawtooth');
            await new Promise(resolve => setTimeout(resolve, 50));
            await this.createRobotTone(392, 0.3, 'sawtooth');
            
        } catch (error) {
            console.log("🔊 Injetando Headtrick Rayz... (fallback)");
        }
    }

    // Sequência de tons para "Sucesso"
    async playSuccessSound() {
        if (!this.isAudioSupported) {
            console.log("✅ Headtrick Rayz Injetado com Sucesso!");
            return;
        }

        try {
            // Tons de sucesso (mais agudos)
            await this.createRobotTone(523, 0.2, 'triangle');  // H
            await new Promise(resolve => setTimeout(resolve, 30));
            await this.createRobotTone(659, 0.2, 'triangle');  // e
            await new Promise(resolve => setTimeout(resolve, 30));
            await this.createRobotTone(784, 0.2, 'triangle');  // a
            await new Promise(resolve => setTimeout(resolve, 30));
            await this.createRobotTone(880, 0.3, 'triangle');  // d
            
            // Fanfarra final
            await this.createRobotTone(1047, 0.4, 'sine');
            await new Promise(resolve => setTimeout(resolve, 100));
            await this.createRobotTone(1175, 0.4, 'sine');
            await new Promise(resolve => setTimeout(resolve, 100));
            await this.createRobotTone(1319, 0.5, 'sine');
            
        } catch (error) {
            console.log("✅ Headtrick Rayz Injetado com Sucesso! (fallback)");
        }
    }
}

// Criar instância do áudio
const robotAudio = new SimpleRobotAudio();

// MODAL FUNCTIONS
const injectBtn = document.getElementById('injectBtn');
const modalOverlay = document.getElementById('modalOverlay');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

// Abrir modal
injectBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
});

// Fechar modal ao clicar no cancelar
cancelBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Fechar modal ao clicar fora
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

// Ação de injeção SIMPLIFICADA
confirmBtn.addEventListener('click', async () => {
    // Fechar modal
    modalOverlay.style.display = 'none';
    
    // Salvar texto original
    const originalText = injectBtn.textContent;
    
    // FASE 1: Injetando
    injectBtn.textContent = 'INJETANDO... 🔊';
    injectBtn.style.background = '#FF9800';
    injectBtn.disabled = true;
    
    // Tocar som "Injetando"
    console.log("🔊 Injetando Headtrick Rayz...");
    await robotAudio.playInjectingSound();
    
    // Simular processo
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // FASE 2: Sucesso
    injectBtn.textContent = 'SUCESSO! ✅';
    injectBtn.style.background = '#4CAF50';
    
    // Tocar som "Sucesso"
    console.log("✅ Headtrick Rayz Injetado com Sucesso!");
    await robotAudio.playSuccessSound();
    
    // Mostrar notificação
    showSuccessMessage();
    
    // FASE 3: Reset
    setTimeout(() => {
        injectBtn.textContent = originalText;
        injectBtn.style.background = '#8f3dff';
        injectBtn.disabled = false;
    }, 2000);
});

// Mostrar mensagem de sucesso (SIMPLIFICADA)
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #2E7D32);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1001;
        font-family: Arial, sans-serif;
        font-size: 14px;
        animation: slideInRight 0.3s ease;
    `;
    
    message.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 4px;">✅ INJEÇÃO CONCLUÍDA</div>
        <div style="font-size: 12px; opacity: 0.9;">Headtrick Rayz injetado com sucesso!</div>
    `;
    
    document.body.appendChild(message);
    
    // Remover após 3 segundos
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
        modalOverlay.style.display = 'none';
    }
});

// Inicializar áudio quando o usuário interagir
document.addEventListener('click', () => {
    if (robotAudio.audioContext && robotAudio.audioContext.state === 'suspended') {
        robotAudio.audioContext.resume();
    }
}, { once: true });