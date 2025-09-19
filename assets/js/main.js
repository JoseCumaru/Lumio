/**
 * Main Application Controller
 * Arquivo principal que iniciali    async initializeApp() {
        console.log('🚀 Inicializando Lumio...');
        
        try {
            await this.loadComponents();
            
            // Aguardar um pequeno delay para garantir que o DOM seja atualizado
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Segunda inicialização dos ícones para garantir
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
    }os da aplicação
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
        
        // Garantir que todos os recursos estejam carregados
        if (document.readyState !== 'complete') {
            window.addEventListener('load', () => {
                // Aguardar um pouco mais para garantir que tudo esteja pronto
                setTimeout(() => {
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                        console.log('🔄 Ícones Lucide re-inicializados após load completo');
                    }
                }, 500);
            });
        }
    }
    
    async loadComponents() {
        console.log('📦 Carregando componentes...');
        
        const components = [
            { id: 'header-placeholder', file: 'header.html' },
            { id: 'product-modal-placeholder', file: 'product-modal.html' },
            { id: 'footer-placeholder', file: 'footer.html' }
        ];
        
        try {
            // Carregar todos os componentes sequencialmente para evitar problemas
            console.log('🔍 Iniciando carregamento sequencial de componentes...');
            
            for (let i = 0; i < components.length; i++) {
                const component = components[i];
                console.log(`🔄 Tentando carregar componente ${i + 1}/${components.length}: ${component.file}`);
                
                const element = document.getElementById(component.id);
                if (element) {
                    console.log(`✓ Elemento ${component.id} encontrado`);
                    try {
                        const response = await fetch(`components/${component.file}`);
                        console.log(`📡 Resposta do fetch para ${component.file}:`, response.status);
                        
                        if (response.ok) {
                            const html = await response.text();
                            element.innerHTML = html;
                            console.log(`✅ Componente ${component.file} carregado com sucesso`);
                            
                            // Aguardar um pequeno delay entre componentes
                            await new Promise(resolve => setTimeout(resolve, 50));
                        } else {
                            console.warn(`⚠️ Não foi possível carregar ${component.file} (Status: ${response.status})`);
                        }
                    } catch (error) {
                        console.error(`❌ Erro ao carregar ${component.file}:`, error);
                    }
                } else {
                    console.error(`❌ Elemento ${component.id} NÃO encontrado no DOM`);
                }
            }
            
            console.log('📦 Todos os componentes foram carregados');
            
            // Aguardar um momento para o DOM ser atualizado
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Inicializar ícones Lucide após carregar todos os componentes
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
                console.log('🎨 Ícones Lucide inicializados após carregamento dos componentes');
            }
            
            // Configurar modal de produto
            this.setupProductModal();
            
            // Forçar aplicação de estilos CSS se necessário
            document.body.style.display = 'none';
            document.body.offsetHeight; // trigger reflow
            document.body.style.display = '';
            
        } catch (error) {
            console.error('❌ Erro ao carregar componentes:', error);
        }
    }
    
    async initializeApp() {
        console.log('🚀 Inicializando Lumio...');
        
        try {
            await this.loadComponents();
            
            // Aguardar um pequeno delay para garantir que o DOM seja atualizado
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Segunda inicialização dos ícones para garantir
            this.initializeLucideIcons();
            this.initializeModules();
            this.setupEventListeners();
            this.setupNewsletterForm();
            this.setupProductInteractions();
            this.setupSmoothScrolling();
            
            // Inicializar router após tudo estar pronto
            if (typeof Router !== 'undefined') {
                this.router = new Router();
                console.log('📍 Router inicializado');
            }
            
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
    
    setupProductModal() {
        const modal = document.getElementById('product-modal');
        const closeBtn = document.getElementById('close-modal');
        
        if (modal && closeBtn) {
            // Fechar modal
            closeBtn.addEventListener('click', () => this.closeProductModal());
            
            // Fechar ao clicar no fundo
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeProductModal();
                }
            });
            
            // Controles de quantidade
            const decreaseBtn = document.getElementById('decrease-qty');
            const increaseBtn = document.getElementById('increase-qty');
            const quantitySpan = document.getElementById('product-quantity');
            
            if (decreaseBtn && increaseBtn && quantitySpan) {
                decreaseBtn.addEventListener('click', () => {
                    const current = parseInt(quantitySpan.textContent);
                    if (current > 1) {
                        quantitySpan.textContent = current - 1;
                    }
                });
                
                increaseBtn.addEventListener('click', () => {
                    const current = parseInt(quantitySpan.textContent);
                    quantitySpan.textContent = current + 1;
                });
            }
            
            // Adicionar ao carrinho do modal
            const addToCartBtn = document.getElementById('add-to-cart-modal');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    this.handleAddToCartFromModal();
                });
            }
            
            console.log('🛒 Modal de produto configurado');
        }
        
        // Configurar botões "Ver Detalhes" dos produtos
        this.setupProductViewButtons();
    }
    
    setupProductViewButtons() {
        // Remover listeners existentes para evitar duplicatas
        document.removeEventListener('click', this.handleProductViewClick);
        
        // Adicionar listener usando delegação de eventos
        document.addEventListener('click', this.handleProductViewClick.bind(this));
        
        console.log('🔍 Event listeners dos botões "Ver Detalhes" configurados');
    }
    
    handleProductViewClick(event) {
        if (event.target.classList.contains('btn-view-product')) {
            event.preventDefault();
            
            try {
                const productData = JSON.parse(event.target.getAttribute('data-product'));
                console.log('📦 Abrindo modal para produto:', productData);
                this.openProductModal(productData);
            } catch (error) {
                console.error('❌ Erro ao processar dados do produto:', error);
            }
        }
    }
    
    openProductModal(product) {
        const modal = document.getElementById('product-modal');
        const modalContent = modal.querySelector('.transform');
        
        if (modal) {
            // Preencher dados do produto
            this.fillProductModalData(product);
            
            // Mostrar modal
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Animar entrada
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);
            
            // Reinicializar ícones
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }
    
    closeProductModal() {
        const modal = document.getElementById('product-modal');
        const modalContent = modal.querySelector('.transform');
        
        if (modal) {
            // Animar saída
            modal.classList.add('opacity-0');
            modalContent.classList.add('scale-95');
            modalContent.classList.remove('scale-100');
            
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                
                // Reset quantidade
                const quantitySpan = document.getElementById('product-quantity');
                if (quantitySpan) {
                    quantitySpan.textContent = '1';
                }
            }, 300);
        }
    }
    
    fillProductModalData(product) {
        // Preencher dados do produto no modal
        const elements = {
            image: document.getElementById('modal-product-image'),
            name: document.getElementById('modal-product-name'),
            price: document.getElementById('modal-product-price'),
            oldPrice: document.getElementById('modal-product-old-price'),
            discount: document.getElementById('modal-product-discount'),
            description: document.getElementById('modal-product-description')
        };
        
        if (elements.image) {
            elements.image.src = product.image;
            elements.image.alt = product.name;
        }
        
        if (elements.name) {
            elements.name.textContent = product.name;
        }
        
        if (elements.price) {
            elements.price.textContent = `R$ ${product.price}`;
        }
        
        if (elements.oldPrice && product.oldPrice) {
            elements.oldPrice.textContent = `R$ ${product.oldPrice}`;
            elements.oldPrice.classList.remove('hidden');
        } else if (elements.oldPrice) {
            elements.oldPrice.classList.add('hidden');
        }
        
        if (elements.discount && product.discount) {
            elements.discount.textContent = product.discount;
            elements.discount.classList.remove('hidden');
        } else if (elements.discount) {
            elements.discount.classList.add('hidden');
        }
        
        if (elements.description) {
            elements.description.textContent = product.description || 'Descrição não disponível.';
        }
    }
    
    handleAddToCartFromModal() {
        const name = document.getElementById('modal-product-name').textContent;
        const quantity = document.getElementById('product-quantity').textContent;
        
        // Atualizar contador do carrinho
        this.updateCartCounter(parseInt(quantity));
        
        // Mostrar notificação
        this.showNotification(`${quantity}x ${name} adicionado ao carrinho!`, 'success');
        
        // Fechar modal
        this.closeProductModal();
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
    
    updateCartCounter(quantity = 1) {
        const counter = document.querySelector('.shopping-cart span');
        if (counter) {
            const currentCount = parseInt(counter.textContent) || 0;
            counter.textContent = currentCount + quantity;
            
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
    
    // Sistema de carregamento dinâmico de produtos
    async loadProducts() {
        try {
            console.log('📦 Carregando produtos do JSON...');
            
            const response = await fetch('config/products.json');
            if (!response.ok) {
                throw new Error(`Erro ao carregar produtos: ${response.status}`);
            }
            
            const data = await response.json();
            return data.products;
        } catch (error) {
            console.error('❌ Erro ao carregar produtos:', error);
            this.showProductsError();
            return [];
        }
    }
    
    async renderFeaturedProducts() {
        const loadingElement = document.getElementById('products-loading');
        const gridElement = document.getElementById('products-grid');
        const errorElement = document.getElementById('products-error');
        
        if (!gridElement) {
            console.log('⚠️ Container de produtos não encontrado');
            return;
        }
        
        try {
            // Mostrar loading
            if (loadingElement) loadingElement.classList.remove('hidden');
            if (errorElement) errorElement.classList.add('hidden');
            if (gridElement) gridElement.classList.add('hidden');
            
            const products = await this.loadProducts();
            const featuredProducts = products.filter(product => product.isFeatured);
            
            console.log(`✅ ${featuredProducts.length} produtos em destaque carregados`);
            
            // Limpar grid atual
            gridElement.innerHTML = '';
            
            // Renderizar produtos
            featuredProducts.forEach((product, index) => {
                const productCard = this.createProductCard(product, index * 100);
                gridElement.appendChild(productCard);
            });
            
            // Ocultar loading e mostrar produtos
            if (loadingElement) loadingElement.classList.add('hidden');
            if (gridElement) gridElement.classList.remove('hidden');
            
            // Reinicializar animações e ícones
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                if (window.app && window.app.modules && window.app.modules.animations) {
                    window.app.modules.animations.refresh();
                }
            }, 100);
            
        } catch (error) {
            console.error('❌ Erro ao renderizar produtos:', error);
            this.showProductsError();
        }
    }
    
    createProductCard(product, delay = 0) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-lg overflow-hidden group scroll-animate';
        productCard.style.transitionDelay = `${delay}ms`;
        
        // Determinar imagem principal
        const mainImage = this.getProductMainImage(product);
        
        // Formatação de preço
        const price = this.formatPrice(product.price);
        const originalPrice = product.originalPrice ? this.formatPrice(product.originalPrice) : null;
        
        // Badges
        let badge = '';
        if (product.isNew) {
            badge = '<span class="new-badge absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">NOVO</span>';
        } else if (product.discount > 0) {
            badge = `<span class="discount-badge absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-${product.discount}%</span>`;
        }
        
        // Preço original (se houver desconto)
        const originalPriceHtml = originalPrice ? 
            `<p class="text-sm text-gray-500 line-through ml-2">${originalPrice}</p>` : '';
        
        // Dados do produto para o modal (com múltiplas imagens se existirem)
        const productData = {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: mainImage,
            images: this.getProductImages(product),
            description: product.description,
            stock: product.stock,
            category: product.category,
            tags: product.tags
        };
        
        productCard.innerHTML = `
            <div class="product-image relative">
                <img src="${mainImage}" 
                     alt="${product.alt || product.name}" 
                     class="w-full h-64 object-cover">
                    }"
                <div class="product-overlay absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="bg-white text-gray-900 py-2 px-6 rounded-full font-semibold btn-hover transition-transform duration-300" 
                            data-action="add-to-cart" 
                            data-product-id="${product.id}"
                            data-product-name="${product.name}">
                        Adicionar ao Carrinho
                    </button>
                </div>
                ${badge}
            </div>
            <div class="p-6">
                <h3 class="font-semibold text-lg">${product.name}</h3>
                <div class="flex items-baseline mt-2 mb-4">
                    <p class="text-xl font-bold text-indigo-600">${price}</p>
                    ${originalPriceHtml}
                </div>
                <button class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors btn-view-product" 
                        data-product='${JSON.stringify(productData).replace(/'/g, "&apos;")}'>
                    Ver Detalhes
                </button>
            </div>
        `;
        
        return productCard;
    }
    
    getProductMainImage(product) {
        // Prioridade: image0, image, primeiro image* encontrado
        if (product.image0) return product.image0;
        if (product.image) return product.image;
        
        // Procurar por image1, image2, etc.
        for (let i = 1; i <= 10; i++) {
            if (product[`image${i}`]) {
                return product[`image${i}`];
            }
        }
        
        // Fallback para uma imagem placeholder
        return 'https://via.placeholder.com/300x300?text=Produto';
    }
    
    getProductImages(product) {
        const images = [];
        
        // Adicionar image principal
        if (product.image) images.push(product.image);
        
        // Adicionar image0, image1, image2, etc.
        for (let i = 0; i <= 10; i++) {
            if (product[`image${i}`] && !images.includes(product[`image${i}`])) {
                images.push(product[`image${i}`]);
            }
        }
        
        return images.length > 0 ? images : [this.getProductMainImage(product)];
    }
    
    formatPrice(priceInCents) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(priceInCents / 100);
    }
    
    showProductsError() {
        const loadingElement = document.getElementById('products-loading');
        const gridElement = document.getElementById('products-grid');
        const errorElement = document.getElementById('products-error');
        
        if (loadingElement) loadingElement.classList.add('hidden');
        if (gridElement) gridElement.classList.add('hidden');
        if (errorElement) errorElement.classList.remove('hidden');
    }
    
    // Renderizar todos os produtos na página de produtos
    async renderAllProducts() {
        const container = document.getElementById('products-page-grid');
        const loading = document.getElementById('products-page-loading');
        const errorDiv = document.getElementById('products-page-error');
        
        if (!container) return;
        
        try {
            // Mostrar loading
            loading.classList.remove('hidden');
            container.classList.add('hidden');
            errorDiv.classList.add('hidden');
            
            const products = await this.loadProducts();
            
            // Renderizar todos os produtos usando HTML strings
            const productCardsHTML = products.map(product => this.createProductCardHTML(product)).join('');
            container.innerHTML = productCardsHTML;
            
            // Esconder loading e mostrar produtos
            loading.classList.add('hidden');
            container.classList.remove('hidden');
            
            // Configurar filtros
            this.setupProductFilters(products);
            
            // Refresh animations para novos elementos
            if (window.scrollAnimations) {
                window.scrollAnimations.refresh();
            }
            
        } catch (error) {
            console.error('Erro ao carregar produtos na página de produtos:', error);
            loading.classList.add('hidden');
            errorDiv.classList.remove('hidden');
        }
    }
    
    // Criar HTML de card de produto como string
    createProductCardHTML(product) {
        const mainImage = this.getProductMainImage(product);
        const price = this.formatPrice(product.price);
        const originalPrice = product.originalPrice ? this.formatPrice(product.originalPrice) : null;
        
        // Badges
        let badge = '';
        if (product.isNew) {
            badge = '<span class="new-badge absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">NOVO</span>';
        } else if (product.discount > 0) {
            badge = `<span class="discount-badge absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-${product.discount}%</span>`;
        }
        
        // Preço original (se houver desconto)
        const originalPriceHtml = originalPrice ? 
            `<p class="text-sm text-gray-500 line-through ml-2">${originalPrice}</p>` : '';
        
        // Dados do produto para o modal
        const productData = {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: mainImage,
            images: this.getProductImages(product),
            description: product.description,
            stock: product.stock,
            category: product.category,
            tags: product.tags
        };
        
        return `
            <div class="product-card bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group" data-category="${product.category}">
                <div class="relative overflow-hidden">
                    <img src="${mainImage}" 
                         alt="${product.alt || product.name}" 
                         class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="product-overlay absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button class="bg-white text-gray-900 py-2 px-6 rounded-full font-semibold btn-hover transition-transform duration-300" 
                                data-action="add-to-cart" 
                                data-product-id="${product.id}"
                                data-product-name="${product.name}">
                            Adicionar ao Carrinho
                        </button>
                    </div>
                    ${badge}
                    <button class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <i data-lucide="heart" class="w-5 h-5 text-gray-600"></i>
                    </button>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-baseline">
                            <span class="text-xl font-bold text-gray-900">${price}</span>
                            ${originalPriceHtml}
                        </div>
                    </div>
                    <button class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors btn-view-product" 
                            data-product='${JSON.stringify(productData).replace(/'/g, "&apos;")}'>
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `;
    }
    
    // Configurar filtros da página de produtos
    setupProductFilters(products) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                
                // Atualizar estado ativo dos botões
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-indigo-600', 'text-white', 'border-indigo-600');
                    btn.classList.add('border-gray-300', 'text-gray-600');
                });
                
                e.target.classList.add('active', 'bg-indigo-600', 'text-white', 'border-indigo-600');
                e.target.classList.remove('border-gray-300', 'text-gray-600');
                
                // Filtrar produtos
                this.filterProducts(filter);
            });
        });
    }
    
    // Filtrar produtos por categoria
    filterProducts(category) {
        const productCards = document.querySelectorAll('#products-page-grid .product-card');
        
        productCards.forEach(card => {
            const productCategory = card.dataset.category;
            
            if (category === 'all' || productCategory === category) {
                card.style.display = 'block';
                card.classList.remove('opacity-0');
                card.classList.add('opacity-100');
            } else {
                card.classList.remove('opacity-100');
                card.classList.add('opacity-0');
                setTimeout(() => {
                    if (card.classList.contains('opacity-0')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
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