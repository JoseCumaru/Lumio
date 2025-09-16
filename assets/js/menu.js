/**
 * Menu Mobile Controller
 * Gerencia a funcionalidade do menu mobile
 */

class MobileMenu {
    constructor() {
        this.mobileMenuButton = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.mobileMenuButton && this.mobileMenu) {
            this.mobileMenuButton.addEventListener('click', () => this.toggle());
            
            // Fechar menu ao clicar em links
            this.mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
            });
            
            // Fechar menu ao redimensionar para desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768 && this.isOpen) {
                    this.close();
                }
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.mobileMenuButton.contains(e.target) && !this.mobileMenu.contains(e.target)) {
                    this.close();
                }
            });
        }
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.mobileMenu.classList.remove('hidden');
        this.mobileMenuButton.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
        this.isOpen = true;
        
        // Recriar ícones após mudança
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Adicionar classe para animação
        setTimeout(() => {
            this.mobileMenu.classList.add('show');
        }, 10);
    }
    
    close() {
        this.mobileMenu.classList.add('hidden');
        this.mobileMenu.classList.remove('show');
        this.mobileMenuButton.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        this.isOpen = false;
        
        // Recriar ícones após mudança
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Exportar para uso global
window.MobileMenu = MobileMenu;