/**
 * Main Application Controller
 * Arquivo principal que inicializa todos os módulos da aplicação
 */

class LumioApp {
    constructor() {
        this.modules = {
            mobileMenu: null,
            countdown: null,
            animations: null
        };
        
        this.config = {
            countdownDuration: 3, // dias
            animationThreshold: 0.1,
            newsletter: {
                enabled: true,
                apiEndpoint: '/api/newsletter' // Para futuro uso
            }
        };
        
        this.init();
    }
    
    init() {
        // Aguardar DOM estar completamente carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        console.log('🚀 Inicializando Lumio...');
        
        try {
            this.initializeLucideIcons();
            this.initializeModules();
            this.setupEventListeners();
            this.setupNewsletterForm();
            this.setupProductInteractions();
            this.setupSmoothScrolling();
            
            console.log('✅ Aplicação inicializada com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação:', error);
        }
    }
    
    initializeLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
            console.log('📦 Ícones Lucide carregados');
        }
    }
    
    initializeModules() {
        // Inicializar Menu Mobile
        if (window.MobileMenu) {
            this.modules.mobileMenu = new MobileMenu();
            console.log('📱 Menu mobile inicializado');
        }
        
        // Inicializar Countdown
        if (window.CountdownTimer) {
            this.modules.countdown = new CountdownTimer('countdown');
            console.log('⏰ Countdown inicializado');
        }
        
        // Inicializar Animações
        if (window.ScrollAnimations) {
            this.modules.animations = new ScrollAnimations();
            console.log('✨ Animações inicializadas');
        }
    }
    
    setupEventListeners() {
        // Listener para redimensionamento da janela
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Listener para mudanças de orientação
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleResize(), 100);
        });
        
        // Listener para teclas de navegação
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }
    
    setupNewsletterForm() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(e.target);
            });
        }
    }
    
    setupProductInteractions() {
        // Adicionar ao carrinho
        const addToCartButtons = document.querySelectorAll('[data-action="add-to-cart"]');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleAddToCart(e.target);
            });
        });
        
        // Visualização rápida de produtos
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.handleProductHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.handleProductHover(card, false);
            });
        });
    }
    
    setupSmoothScrolling() {
        // Links de navegação suave
        const smoothLinks = document.querySelectorAll('a[href^="#"]');
        smoothLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }
    
    // Event Handlers
    handleResize() {
        // Lógica para redimensionamento
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('is-mobile', isMobile);
        
        // Fechar menu mobile se mudou para desktop
        if (!isMobile && this.modules.mobileMenu) {
            this.modules.mobileMenu.close();
        }
    }
    
    handleKeyboardNavigation(e) {
        // ESC para fechar menus
        if (e.key === 'Escape') {
            if (this.modules.mobileMenu && this.modules.mobileMenu.isOpen) {
                this.modules.mobileMenu.close();
            }
        }
    }
    
    async handleNewsletterSubmit(form) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button[type="submit"]');
        
        if (!email || !this.validateEmail(email)) {
            this.showNotification('Por favor, insira um e-mail válido', 'error');
            return;
        }
        
        // Simular envio (substituir por chamada real da API)
        button.disabled = true;
        button.textContent = 'Inscrevendo...';
        
        try {
            // Simular delay de rede
            await this.delay(1500);
            
            this.showNotification('✅ Inscrição realizada com sucesso!', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('❌ Erro ao inscrever. Tente novamente.', 'error');
        } finally {
            button.disabled = false;
            button.textContent = 'Inscrever';
        }
    }
    
    handleAddToCart(button) {
        // Simular adição ao carrinho
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Animação do botão
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Atualizar contador do carrinho
        this.updateCartCounter();
        
        this.showNotification(`${productName} adicionado ao carrinho!`, 'success');
    }
    
    handleProductHover(card, isHovering) {
        const overlay = card.querySelector('.product-overlay');
        if (overlay) {
            if (isHovering) {
                overlay.classList.add('opacity-100');
                overlay.classList.remove('opacity-0');
            } else {
                overlay.classList.add('opacity-0');
                overlay.classList.remove('opacity-100');
            }
        }
    }
    
    // Utility Methods
    smoothScrollTo(element, offset = 80) {
        const targetPosition = element.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        requestAnimationFrame(animation);
    }
    
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    updateCartCounter() {
        const counter = document.querySelector('.shopping-cart span');
        if (counter) {
            const currentCount = parseInt(counter.textContent) || 0;
            counter.textContent = currentCount + 1;
            
            // Animação do contador
            counter.style.transform = 'scale(1.3)';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `
            fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full
            ${type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'}
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Método para destruir a aplicação (cleanup)
    destroy() {
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
    }
}

// Inicializar aplicação quando o script for carregado
const app = new LumioApp();

// Exportar para uso global
window.LumioApp = LumioApp;
window.app = app;