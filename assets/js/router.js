/**
 * Router System
 * Sistema simples de roteamento para navegação entre páginas
 */

class Router {
    constructor() {
        this.routes = {
            '': 'home',
            'home': 'home',
            'produtos': 'produtos',
            'sobre': 'sobre',
            'contato': 'contato'
        };
        
        this.currentPage = 'home';
        this.contentContainer = null;
        
        this.init();
    }
    
    init() {
        // Aguardar DOM estar carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.contentContainer = document.getElementById('main-content');
        
        if (!this.contentContainer) {
            console.error('❌ Container de conteúdo não encontrado');
            return;
        }
        
        // Configurar navegação
        this.setupNavigation();
        
        // Carregar página inicial
        this.loadInitialPage();
        
        // Escutar mudanças na URL
        window.addEventListener('popstate', () => {
            this.handleRouteChange();
        });
        
        console.log('🛣️ Sistema de roteamento inicializado');
    }
    
    setupNavigation() {
        // Configurar links de navegação
        const navLinks = document.querySelectorAll('[data-route]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigateTo(route);
            });
        });
    }
    
    loadInitialPage() {
        const hash = window.location.hash.replace('#', '');
        const route = this.routes[hash] || 'home';
        this.loadPage(route);
    }
    
    navigateTo(route) {
        if (this.routes[route]) {
            window.history.pushState(null, null, `#${route}`);
            this.loadPage(route);
        } else {
            console.warn(`⚠️ Rota não encontrada: ${route}`);
            this.navigateTo('home');
        }
    }
    
    handleRouteChange() {
        const hash = window.location.hash.replace('#', '');
        const route = this.routes[hash] || 'home';
        this.loadPage(route);
    }
    
    async loadPage(pageName) {
        try {
            console.log(`🔄 Carregando página: ${pageName}`);
            
            // Mostrar loading se necessário
            this.showLoading();
            
            const response = await fetch(`pages/${pageName}.html`);
            if (response.ok) {
                const html = await response.text();
                this.contentContainer.innerHTML = html;
                this.currentPage = pageName;
                
                // Atualizar navegação ativa
                this.updateActiveNavigation(pageName);
                
                // Carregar componentes se for a home
                if (pageName === 'home') {
                    console.log('🏠 Detectada página home, carregando componentes...');
                    await this.loadHomeComponents();
                } else {
                    console.log(`📄 Página ${pageName} carregada (não é home)`);
                }
                
                // Configurar funcionalidades específicas da página
                this.setupPageFeatures(pageName);
                
                // Reinicializar modal de produtos
                if (window.app && typeof window.app.setupProductModal === 'function') {
                    window.app.setupProductModal();
                    console.log('🔧 Modal de produto reconfigurado após carregamento da página');
                }
                
                // Scroll para o topo
                window.scrollTo(0, 0);
                
                console.log(`✅ Página ${pageName} carregada com sucesso`);
            } else {
                throw new Error(`Erro ao carregar página: ${response.status}`);
            }
        } catch (error) {
            console.error(`❌ Erro ao carregar página ${pageName}:`, error);
            this.showError();
        }
    }
    
    async loadHomeComponents() {
        console.log('🏠 Iniciando carregamento de componentes da home...');
        
        // Carregar componentes da home
        const components = [
            { id: 'hero-placeholder', file: 'hero.html' },
            { id: 'categories-placeholder', file: 'categories.html' },
            { id: 'products-placeholder', file: 'products.html' },
            { id: 'offers-placeholder', file: 'offers.html' },
            { id: 'newsletter-placeholder', file: 'newsletter.html' }
        ];
        
        try {
            for (const component of components) {
                console.log(`🔄 Carregando componente: ${component.file}`);
                
                const element = document.getElementById(component.id);
                if (element) {
                    console.log(`✅ Elemento encontrado: ${component.id}`);
                    try {
                        const response = await fetch(`components/${component.file}`);
                        if (response.ok) {
                            const html = await response.text();
                            element.innerHTML = html;
                            console.log(`✅ Componente ${component.file} carregado com sucesso`);
                        } else {
                            console.error(`❌ Erro ao buscar ${component.file}: ${response.status}`);
                        }
                    } catch (fetchError) {
                        console.error(`❌ Erro na requisição ${component.file}:`, fetchError);
                    }
                } else {
                    console.error(`❌ Elemento não encontrado: ${component.id}`);
                }
                // Pequeno delay entre componentes
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            // Reinicializar ícones Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
                console.log('🎨 Ícones Lucide reinicializados');
            }
            
            // Carregar produtos dinamicamente para a seção produtos
            if (window.app && typeof window.app.renderFeaturedProducts === 'function') {
                await window.app.renderFeaturedProducts();
                console.log('📦 Produtos em destaque carregados dinamicamente');
            }
            
            // Reinicializar animações de scroll para os novos elementos
            if (window.app && window.app.modules && window.app.modules.animations) {
                // Aguardar um momento para o DOM se estabilizar
                setTimeout(() => {
                    window.app.modules.animations.refresh();
                    console.log('🎬 Animações de scroll reinicializadas');
                    
                    // Fallback: forçar visibilidade de todos elementos scroll-animate como solução temporária
                    setTimeout(() => {
                        const hiddenElements = document.querySelectorAll('.scroll-animate:not(.visible)');
                        console.log(`🔍 Encontrados ${hiddenElements.length} elementos ocultos`);
                        hiddenElements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                                console.log(`✨ Elemento ${index + 1} tornado visível`);
                            }, index * 100); // animação escalonada
                        });
                    }, 300);
                }, 150);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar componentes da home:', error);
        }
    }
    
    setupPageFeatures(pageName) {
        switch (pageName) {
            case 'produtos':
                this.setupProductsPage();
                break;
            case 'contato':
                this.setupContactPage();
                break;
        }
        
        // Sempre reinicializar ícones Lucide
        if (typeof lucide !== 'undefined') {
            setTimeout(() => {
                lucide.createIcons();
            }, 100);
        }
    }
    
    setupProductsPage() {
        console.log('🛍️ Configurando página de produtos...');
        
        // Carregar produtos dinamicamente
        if (window.app && typeof window.app.renderAllProducts === 'function') {
            window.app.renderAllProducts();
        }
    }
    
    setupContactPage() {
        // Configurar formulário de contato
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(form);
            });
        }
    }
    
    async handleContactForm(form) {
        const formData = new FormData(form);
        
        // Simular envio
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostrar sucesso
            if (window.app && window.app.showNotification) {
                window.app.showNotification('✅ Mensagem enviada com sucesso!', 'success');
            }
            
            form.reset();
        } catch (error) {
            if (window.app && window.app.showNotification) {
                window.app.showNotification('❌ Erro ao enviar mensagem. Tente novamente.', 'error');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        }
    }
    
    updateActiveNavigation(pageName) {
        // Atualizar link ativo na navegação
        const navLinks = document.querySelectorAll('[data-route]');
        navLinks.forEach(link => {
            const route = link.getAttribute('data-route');
            if (route === pageName) {
                link.classList.add('text-indigo-600');
                link.classList.remove('text-gray-600');
            } else {
                link.classList.add('text-gray-600');
                link.classList.remove('text-indigo-600');
            }
        });
    }
    
    showLoading() {
        if (this.contentContainer) {
            this.contentContainer.innerHTML = `
                <div class="flex items-center justify-center min-h-[400px]">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <p class="text-gray-600">Carregando...</p>
                    </div>
                </div>
            `;
        }
    }
    
    showError() {
        if (this.contentContainer) {
            this.contentContainer.innerHTML = `
                <div class="flex items-center justify-center min-h-[400px]">
                    <div class="text-center">
                        <i data-lucide="alert-circle" class="w-16 h-16 text-red-500 mx-auto mb-4"></i>
                        <h2 class="text-2xl font-bold mb-2">Oops! Algo deu errado</h2>
                        <p class="text-gray-600 mb-4">Não foi possível carregar a página.</p>
                        <button onclick="location.reload()" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            `;
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }
}

// Inicializar router
const router = new Router();

// Exportar para uso global
window.Router = Router;
window.router = router;