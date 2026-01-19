# Endfield - Site Inspirado em Arknights: Endfield

Um site moderno e futurista inspirado no design de Arknights: Endfield, com animações 3D, vídeos de fundo e uma experiência visual impressionante.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de UI
- **Framer Motion** - Animações suaves
- **React Three Fiber** - Renderização 3D
- **Three.js** - Biblioteca 3D
- **Lenis** - Scroll suave

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd endfield
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎨 Características

### Design
- ✅ Tema escuro (fundo preto, texto branco)
- ✅ Animações de entrada suaves
- ✅ Componentes 3D interativos
- ✅ Vídeos/GIFs/Animações de fundo (placeholder)
- ✅ Design responsivo e mobile-first

### Seções
- 🏠 **Hero Section** - Banner principal com vídeo de fundo e call-to-action
- 📊 **Metas de Pré-Inscrição** - Cards com progresso e recompensas
- 👥 **Operadores** - Carrossel com modo 2D/3D
- 📖 **História/Lore** - Seção de narrativa
- 🎬 **Mídia** - Galeria de vídeos
- 🎮 **Jogabilidade** - Demonstrações de gameplay
- 📰 **Novidades** - Últimas atualizações
- 📄 **Footer** - Links e informações

## 🎯 Próximos Passos

### Para melhorar o site:

1. **Adicionar Vídeos Reais**
   - Adicione vídeos MP4 na pasta `public/`
   - Atualize os componentes para usar os vídeos

2. **Implementar 3D Completo**
   - Crie modelos 3D mais complexos
   - Adicione animações aos modelos
   - Integre GLB/GLTF models

3. **Adicionar Imagens**
   - Adicione imagens dos operadores
   - Adicione thumbnails de vídeos
   - Adicione screenshots de gameplay

4. **Melhorar Animações**
   - Adicione scroll-triggered animations
   - Implemente parallax effects
   - Adicione transições entre seções

5. **Funcionalidades**
   - Implementar formulário de pré-inscrição
   - Adicionar sistema de autenticação
   - Integrar API para dados dinâmicos

## 📁 Estrutura do Projeto

```
endfield/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/
│   ├── ui/                  # Componentes shadcn/ui
│   ├── navigation.tsx       # Navegação
│   ├── hero-section.tsx     # Seção hero
│   ├── pre-registration-section.tsx  # Metas de pré-inscrição
│   ├── operators-section.tsx  # Seção de operadores
│   ├── lore-section.tsx     # Seção de história
│   ├── media-section.tsx    # Seção de mídia
│   ├── gameplay-section.tsx # Seção de jogabilidade
│   ├── news-section.tsx     # Seção de notícias
│   ├── footer.tsx           # Rodapé
│   └── three-scene.tsx      # Componente 3D
├── lib/
│   └── utils.ts             # Utilitários
└── public/                  # Arquivos estáticos
```

## 🎨 Customização

### Cores
As cores podem ser ajustadas em `app/globals.css` nas variáveis CSS.

### Animações
As animações usam Framer Motion e podem ser ajustadas nos componentes individuais.

### Componentes 3D
O componente 3D está em `components/three-scene.tsx` e pode ser expandido com mais modelos e animações.

## 📝 Licença

Este projeto é um exemplo inspirado em Arknights: Endfield. Use como referência para seus próprios projetos.

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com melhorias, correções ou novas funcionalidades!
