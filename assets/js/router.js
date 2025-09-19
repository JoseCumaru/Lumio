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
        // Configurar filtros de produtos
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remover active de todos os botões
                filterButtons.forEach(b => {
                    b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600');
                    b.classList.add('text-gray-600', 'border-gray-300');
                });
                
                // Adicionar active ao botão clicado
                e.target.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600');
                e.target.classList.remove('text-gray-600', 'border-gray-300');
                
                const filter = e.target.getAttribute('data-filter');
                this.filterProducts(filter);
            });
        });
        
        // Carregar produtos
        this.loadProducts();
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
    
    async loadProducts() {
        // Placeholder para carregar produtos - aqui você integraria com uma API
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            // Simular produtos por enquanto
            productsGrid.innerHTML = `
                <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden group">
                    <div class="product-image relative">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
                             alt="Relógio Clássico" 
                             class="w-full h-64 object-cover">
                        <button class="product-quick-view absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-semibold"
                                data-product='{"id":1,"name":"Relógio Clássico","price":"199,90","oldPrice":"249,90","image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop","description":"Um relógio elegante e sofisticado, perfeito para qualquer ocasião. Movimento suíço de alta precisão com resistência à água."}'>
                            Visualização Rápida
                        </button>
                    </div>
                    <div class="p-6">
                        <h3 class="font-semibold text-lg">Relógio Clássico</h3>
                        <div class="flex items-baseline mt-2">
                            <p class="text-xl font-bold text-indigo-600">R$ 199,90</p>
                            <p class="text-sm text-gray-500 line-through ml-2">R$ 249,90</p>
                        </div>
                    </div>
                </div>
                <!-- Mais produtos seriam carregados aqui -->
            `;
            
            // Configurar visualização rápida
            this.setupQuickView();
        }
    }
    
    setupQuickView() {
        const quickViewBtns = document.querySelectorAll('.product-quick-view');
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productData = JSON.parse(btn.getAttribute('data-product'));
                this.openProductModal(productData);
            });
        });
    }
    
    openProductModal(product) {
        // Aqui integraremos com o modal de produto
        if (window.app && window.app.openProductModal) {
            window.app.openProductModal(product);
        }
    }
    
    filterProducts(filter) {
        console.log(`🔍 Filtrando produtos por: ${filter}`);
        // Implementar lógica de filtro aqui
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