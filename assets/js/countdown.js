/**
 * Countdown Timer Controller
 * Gerencia o contador regressivo da oferta
 */

class CountdownTimer {
    constructor(targetElementId, endDate = null) {
        this.targetElement = document.getElementById(targetElementId);
        this.endDate = endDate || this.getDefaultEndDate();
        this.interval = null;
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        this.init();
    }
    
    init() {
        if (this.targetElement && this.validateElements()) {
            this.start();
        }
    }
    
    validateElements() {
        return Object.values(this.elements).every(element => element !== null);
    }
    
    getDefaultEndDate() {
        // Oferta termina em 3 dias por padrão
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.getTime();
    }
    
    start() {
        // Atualizar imediatamente
        this.update();
        
        // Atualizar a cada segundo
        this.interval = setInterval(() => {
            this.update();
        }, 1000);
    }
    
    update() {
        const now = new Date().getTime();
        const distance = this.endDate - now;
        
        if (distance < 0) {
            this.onExpire();
            return;
        }
        
        const timeUnits = this.calculateTimeUnits(distance);
        this.displayTime(timeUnits);
    }
    
    calculateTimeUnits(distance) {
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    }
    
    displayTime(timeUnits) {
        Object.keys(this.elements).forEach(unit => {
            if (this.elements[unit]) {
                this.elements[unit].textContent = this.formatNumber(timeUnits[unit]);
            }
        });
    }
    
    formatNumber(number) {
        return number.toString().padStart(2, '0');
    }
    
    onExpire() {
        this.stop();
        
        if (this.targetElement) {
            this.targetElement.innerHTML = `
                <div class="text-center">
                    <div class="text-2xl font-bold text-white mb-2">
                        <i data-lucide="clock-x" class="w-8 h-8 mx-auto mb-2"></i>
                        Oferta Encerrada!
                    </div>
                    <p class="text-indigo-200">Fique atento às próximas promoções</p>
                </div>
            `;
            
            // Recriar ícones
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('countdownExpired', {
            detail: { countdown: this }
        }));
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    restart(newEndDate = null) {
        this.stop();
        if (newEndDate) {
            this.endDate = newEndDate;
        }
        this.start();
    }
    
    // Métodos utilitários
    getRemainingTime() {
        const now = new Date().getTime();
        const distance = this.endDate - now;
        return distance > 0 ? this.calculateTimeUnits(distance) : null;
    }
    
    isExpired() {
        return new Date().getTime() >= this.endDate;
    }
    
    setEndDate(date) {
        this.endDate = date instanceof Date ? date.getTime() : date;
        if (!this.isExpired()) {
            this.restart();
        }
    }
}

// Exportar para uso global
window.CountdownTimer = CountdownTimer;