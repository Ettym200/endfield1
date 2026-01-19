# Recursos 3D para o Projeto Endfield

## 🎨 Fontes Gratuitas de Modelos 3D

### 1. **Sketchfab** (Recomendado)
- **URL**: https://sketchfab.com
- **Vantagens**: Maior biblioteca de modelos 3D gratuitos
- **Formato**: **GLB** (recomendado) ou GLTF (suportado pelo React Three Fiber)
- **Licenças**: Filtre por "Downloadable" e "Free"
- **Dicas**: Procure por "character", "robot", "mech", "cyberpunk"
- **Como baixar**: 
  1. Clique no modelo desejado
  2. Clique no botão "Download" (ícone de download)
  3. Selecione **"glTF Binary (.glb)"** ou **"glTF 2.0 (.glb)"**
  4. ✅ **GLB é melhor porque**: É um único arquivo (mais fácil), inclui texturas e é mais rápido para carregar

### 2. **Poly Haven**
- **URL**: https://polyhaven.com
- **Vantagens**: Modelos HD gratuitos, sem necessidade de cadastro
- **Formato**: GLB, OBJ, FBX
- **Categorias**: Personagens, objetos, cenários

### 3. **TurboSquid** (Free Models)
- **URL**: https://www.turbosquid.com/Search/3D-Models/free
- **Vantagens**: Muitos modelos profissionais gratuitos
- **Formato**: Vários formatos (use GLB/GLTF quando disponível)

### 4. **Free3D**
- **URL**: https://free3d.com
- **Vantagens**: Coleção grande de modelos gratuitos
- **Formato**: Vários formatos

### 5. **CGTrader** (Free Models)
- **URL**: https://www.cgtrader.com/free-3d-models
- **Vantagens**: Modelos de qualidade
- **Formato**: Vários formatos

### 6. **Mixamo** (Personagens Animados)
- **URL**: https://www.mixamo.com
- **Vantagens**: Personagens 3D prontos com animações
- **Formato**: FBX (pode converter para GLB)
- **Dica**: Perfeito para personagens de jogos

## 🔧 Como Converter Formatos

### Opção 1: Blender (Gratuito)
1. Baixe o Blender: https://www.blender.org
2. Importe o modelo (File > Import)
3. Exporte como GLB/GLTF (File > Export > glTF 2.0)

### Opção 2: Online Converters
- **AnyConv**: https://anyconv.com/fbx-to-gltf-converter/
- **Aspose**: https://products.aspose.com/3d/conversion

## 📦 Como Adicionar Modelos 3D ao Projeto

### Passo 1: Coloque o arquivo na pasta `public/models/`
```
public/
  models/
    character.glb
    operator.glb
```

### Passo 2: Use o `useGLTF` do @react-three/drei

Exemplo de uso no componente:

```tsx
import { useGLTF } from '@react-three/drei';

function Model3D({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

// Uso:
<Model3D modelPath="/models/character.glb" />
```

## 🎯 Modelos Recomendados para o Tema Endfield

Procure por termos como:
- "cyberpunk character"
- "mech robot"
- "sci-fi operator"
- "futuristic armor"
- "space suit"
- "tactical character"

## ⚠️ Atenção às Licenças

- Sempre verifique a licença do modelo
- Modelos gratuitos podem ter restrições comerciais
- Prefira licenças: CC0, CC BY, MIT

## 🚀 Próximos Passos

1. Escolha um modelo de uma das fontes acima
2. Baixe no formato GLB/GLTF
3. Coloque na pasta `public/models/`
4. Atualize o componente `EnhancedThreeScene` para carregar o modelo

