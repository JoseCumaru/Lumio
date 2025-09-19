# 🛍️ Lumio - Loja Online

Uma loja online moderna e responsiva construída com HTML5, CSS3, JavaScript vanilla e Tailwind CSS.

![Lumio](assets/images/lumio.png)



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


### Configuração de Dados

Os dados são centralizados em arquivos JSON:

```javascript
// Exemplo: carregar produtos
fetch('config/products.json')
  .then(response => response.json())
  .then(products => {
    renderProducts(products);
  });
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


⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
