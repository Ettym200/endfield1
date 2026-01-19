# 🎯 Guia Rápido: Como Baixar Modelo 3D do Sketchfab

## 📥 Formato Recomendado: **GLB**

### ✅ Por que GLB?
- ✅ **Um único arquivo** - Tudo incluído (modelo + texturas)
- ✅ **Mais rápido** para carregar no site
- ✅ **Fácil de usar** - Só precisa colocar um arquivo na pasta
- ✅ **Comprimido** - Arquivos menores
- ✅ **Suportado nativamente** pelo React Three Fiber

---

## 📋 Passo a Passo no Sketchfab:

### 1. Encontre um modelo
- Acesse: https://sketchfab.com
- Procure por: "character", "robot", "cyberpunk", "mech"
- Clique no modelo que gostar

### 2. Verifique se é gratuito
- Procure por modelos com **"Download"** disponível
- Filtre por "Free" na busca

### 3. Baixe no formato GLB
1. Clique no botão **"Download"** (ícone de download ⬇️)
2. Se aparecer opções de formato, escolha:
   - **"glTF Binary (.glb)"** ← ⭐ RECOMENDADO
   - ou **"glTF 2.0 (.glb)"**
3. Aguarde o download

### 4. Coloque na pasta do projeto
```
public/models/seu-modelo.glb
```

### 5. Use no site
O componente `ModelLoader` já está pronto para usar!

---

## ❌ Formatos a EVITAR no Sketchfab:
- ❌ **OBJ** - Não inclui texturas direito
- ❌ **FBX** - Precisa converter depois
- ❌ **STL** - Sem cores/texturas
- ❌ **DAE** - Formato antigo

---

## 💡 Dica Extra:
Se só encontrar em **GLTF** (não GLB):
- **GLTF** também funciona, mas é mais de um arquivo
- Geralmente vem: `.gltf` + `.bin` + pasta de texturas
- Neste caso, coloque TODOS os arquivos na pasta `public/models/`

---

## 🔍 Exemplo Visual do Sketchfab:
```
[Modelo 3D]
    ↓
[Botão Download ⬇️]
    ↓
[Escolher formato]
    ↓
✅ glTF Binary (.glb) ← ESCOLHA ESTE
   glTF (.gltf)
   OBJ (.obj)
   FBX (.fbx)
```

---

## ✨ Resumo:
**SEMPRE escolha GLB quando disponível!** É o melhor formato para web.



