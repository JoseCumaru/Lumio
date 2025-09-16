# 🛍️ Lumio - Loja Online

Uma loja online moderna, responsiva e escalável construída com HTML5, CSS3, JavaScript vanilla e Tailwind CSS.

![Lumio](https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop)

## ✨ Características

- 📱 **Design Responsivo**: Otimizado para desktop, tablet e mobile
- 🎨 **Interface Moderna**: Design elegante com Tailwind CSS
- 🚀 **Performance**: JavaScript vanilla modular para máxima performance  
- 🔧 **Escalável**: Arquitetura modular e componentizada
- 📦 **Build System**: Scripts automatizados para desenvolvimento e produção
- 🎯 **Acessibilidade**: Implementado com boas práticas de A11y
- ⚡ **Animações Suaves**: Efeitos visuais otimizados com Intersection Observer

## 🏗️ Estrutura do Projeto

```
lumio/
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos principais
│   │   ├── components.css    # Estilos de componentes
│   │   └── responsive.css    # Media queries
│   ├── js/
│   │   ├── main.js          # Controlador principal
│   │   ├── menu.js          # Gerenciador do menu mobile
│   │   ├── countdown.js     # Timer de ofertas
│   │   └── animations.js    # Animações de scroll
│   └── images/              # Imagens do projeto
├── components/
│   ├── header.html          # Cabeçalho e navegação
│   ├── hero.html            # Seção hero principal
│   ├── categories.html      # Grid de categorias
│   ├── products.html        # Lista de produtos
│   ├── offers.html          # Seção de ofertas
│   ├── newsletter.html      # Formulário de newsletter
│   └── footer.html          # Rodapé
├── config/
│   ├── site.json           # Configurações gerais
│   ├── products.json       # Dados dos produtos
│   └── categories.json     # Dados das categorias
├── dist/                   # Build de produção (gerado)
├── index.html             # Página principal
├── package.json           # Dependências e scripts
└── README.md              # Este arquivo
```

## 🚀 Instalação e Uso

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- npm (incluído com Node.js)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/lumio.git
   cd lumio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm start
   ```

   O projeto será aberto automaticamente em `http://localhost:3000`

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run watch` | Modo desenvolvimento com live reload |
| `npm run lint` | Verifica código JavaScript |
| `npm run format` | Formata código com Prettier |
| `npm run clean` | Limpa arquivos de build |
| `npm run deploy` | Build completo para produção |

## 🔧 Desenvolvimento

### Estrutura de Componentes

Os componentes HTML são modulares e podem ser reutilizados:

```html
<!-- Exemplo de uso de componente -->
<div id="header-container"></div>

<script>
// Carregar componente dinamicamente
fetch('components/header.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;
  });
</script>
```

### Configuração de Dados

Os dados são centralizados em arquivos JSON:

```javascript
// Exemplo: carregar produtos
fetch('config/products.json')
  .then(response => response.json())
  .then(products => {
    // Renderizar produtos dinamicamente
    renderProducts(products);
  });
```

### Estilos CSS

- **main.css**: Estilos base e utilitários
- **components.css**: Estilos específicos de componentes
- **responsive.css**: Media queries e responsividade

### Módulos JavaScript

Cada módulo tem responsabilidade específica:

```javascript
// Inicialização da aplicação
const app = new LumioApp();

// Módulos individuais
const mobileMenu = new MobileMenu();
const countdown = new CountdownTimer('countdown');
const animations = new ScrollAnimations();
```

## 🎨 Customização

### Cores e Tema

As cores principais podem ser alteradas no Tailwind CSS:

```css
/* Personalize as cores principais */
:root {
  --primary-color: #4f46e5;    /* Indigo */
  --secondary-color: #7c3aed;  /* Purple */
  --accent-color: #06b6d4;     /* Cyan */
}
```

### Produtos e Categorias

Edite os arquivos JSON em `config/` para alterar produtos e categorias:

```json
{
  "id": 5,
  "name": "Novo Produto",
  "category": "nova-categoria",
  "price": 9990,
  "image": "url-da-imagem",
  "description": "Descrição do produto"
}
```

### Configurações do Site

Modifique `config/site.json` para alterar:
- Informações da empresa
- Textos da hero section
- Links de navegação
- Configurações de redes sociais

## 📱 Responsividade

O projeto utiliza uma abordagem mobile-first com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## ⚡ Performance

### Otimizações Implementadas

- **Lazy Loading**: Imagens carregadas conforme necessário
- **Intersection Observer**: Animações eficientes
- **Módulos Separados**: Carregamento sob demanda
- **Build Minificado**: CSS e JS otimizados para produção
- **CDN**: Recursos externos via CDN

### Métricas Recomendadas

- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Segurança

### Boas Práticas Implementadas

- Validação de entrada em formulários
- Sanitização de dados
- Headers de segurança
- HTTPS recomendado em produção

## 🌐 SEO

### Otimizações SEO

- Meta tags otimizadas
- Estrutura semântica HTML5
- Alt text em imagens
- URLs amigáveis
- Schema markup (recomendado adicionar)

## 🚀 Deploy

### Opções de Hospedagem

1. **Netlify** (Recomendado)
   ```bash
   npm run deploy
   # Upload da pasta dist/
   ```

2. **Vercel**
   ```bash
   vercel --prod
   ```

3. **GitHub Pages**
   ```bash
   npm run deploy
   git add dist/
   git commit -m \"Deploy\"
   git push origin gh-pages
   ```

## 🧪 Testes

Para implementar testes (futuro):

```bash
# Testes unitários
npm run test:unit

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 TODO

- [ ] Implementar carrinho de compras funcional
- [ ] Adicionar sistema de autenticação
- [ ] Integrar com API de pagamento
- [ ] Implementar busca de produtos
- [ ] Adicionar filtros de categoria
- [ ] Sistema de avaliações
- [ ] Wishlist de produtos
- [ ] Multi-idiomas (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Seu Nome**
- Website: [https://seusite.com](https://seusite.com)
- LinkedIn: [https://linkedin.com/in/seuperfil](https://linkedin.com/in/seuperfil)
- Email: seu.email@exemplo.com

## 🙏 Agradecimentos

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Lucide Icons](https://lucide.dev/) - Ícones SVG
- [Unsplash](https://unsplash.com/) - Imagens de alta qualidade
- Comunidade open source

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!