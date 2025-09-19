/**
 * Scroll Animations Controller
 * Gerencia animações baseadas no scroll da página
 */

class ScrollAnimations {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            animatedClass: 'scroll-animate',
            visibleClass: 'visible',
            ...options
        };
        
        this.observer = null;
        this.elements = [];
        
        this.init();
    }
    
    init() {
        this.setupObserver();
        this.findElements();
        this.observeElements();
        this.setupNavbarScroll();
    }
    
    setupObserver() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => this.handleIntersection(entry));
            }, {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin
            });
        } else {
            // Fallback para navegadores sem suporte
            this.fallbackAnimation();
        }
    }
    
    findElements() {
        this.elements = document.querySelectorAll(`.${this.options.animatedClass}`);
    }
    
    observeElements() {
        if (this.observer) {
            this.elements.forEach(element => {
                this.observer.observe(element);
            });
        }
    }
    
    handleIntersection(entry) {
        if (entry.isIntersecting) {
            this.animateElement(entry.target);
            
            // Parar de observar após animar (performance)
            if (this.observer) {
                this.observer.unobserve(entry.target);
            }
        }
    }
    
    animateElement(element) {
        element.classList.add(this.options.visibleClass);
        
        // Adicionar delay baseado no data-attribute se existir
        const delay = element.dataset.animationDelay;
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
        
        // Disparar evento personalizado
        element.dispatchEvent(new CustomEvent('elementAnimated', {
            detail: { element, controller: this }
        }));
    }
    
    fallbackAnimation() {
        // Para navegadores sem IntersectionObserver
        this.elements.forEach((element, index) => {
            setTimeout(() => {
                this.animateElement(element);
            }, index * 100);
        });
    }
    
    setupNavbarScroll() {
        const navbar = document.getElementById('header');
        if (!navbar) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateNavbar = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Esconder/mostrar navbar baseado na direção do scroll
            if (scrollY > lastScrollY && scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    // Métodos públicos
    addElement(element) {
        if (element && !element.classList.contains(this.options.visibleClass)) {
            element.classList.add(this.options.animatedClass);
            if (this.observer) {
                this.observer.observe(element);
            }
        }
    }
    
    removeElement(element) {
        if (this.observer) {
            this.observer.unobserver(element);
        }
    }
    
    refreshElements() {
        this.findElements();
        this.observeElements();
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    
    // Método para reinicializar animações após mudanças no DOM
    refresh() {
        console.log('🔄 Reinicializando animações...');
        
        // Desconectar observer existente para evitar duplicatas
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Reinicializar completamente
        this.setupObserver();
        this.findElements();
        this.observeElements();
        
        console.log(`✅ ${this.elements.length} elementos encontrados para animação`);
        
        // Forçar animação de elementos que já estão no viewport
        this.checkVisibleElements();
    }
    
    // Verificar e animar elementos que já estão visíveis
    checkVisibleElements() {
        this.elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains(this.options.visibleClass)) {
                console.log('🎯 Animando elemento imediatamente visível');
                this.animateElement(element);
            }
        });
    }
    
    // Animações específicas
    animateCounter(element, start = 0, end = 100, duration = 2000) {
        if (!element) return;
        
        const startTime = performance.now();
        const startValue = parseFloat(start);
        const endValue = parseFloat(end);
        const difference = endValue - startValue;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (difference * easeOut);
            
            element.textContent = Math.floor(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = endValue;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.animateElement(element);
            }, index * delay);
        });
    }
}

// Exportar para uso global
window.ScrollAnimations = ScrollAnimations;