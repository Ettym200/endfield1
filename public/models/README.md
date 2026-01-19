# Pasta de Modelos 3D

Coloque aqui seus arquivos de modelos 3D no formato **GLB** ou **GLTF**.

## Exemplo de estrutura:

```
public/
  models/
    character.glb        <- Modelo de personagem
    operator.glb         <- Modelo de operador
    weapon.glb           <- Modelo de arma
    environment.glb      <- Modelo de ambiente
```

## Formatos suportados:
- ✅ **.glb** (recomendado - formato binário compacto)
- ✅ **.gltf** (JSON + binários separados)

## Como usar:

1. Baixe um modelo 3D de uma das fontes listadas em `RECURSOS_3D.md`
2. Converta para GLB/GLTF se necessário (usando Blender ou conversor online)
3. Coloque o arquivo nesta pasta
4. Use no componente assim:

```tsx
<ModelLoader modelPath="/models/character.glb" />
```

## Tamanhos recomendados:
- Modelos de personagens: < 5MB
- Modelos de objetos: < 2MB
- Modelos complexos: < 10MB

Dicas:
- Use compressão de texturas
- Reduza polígonos se o modelo for muito pesado
- Otimize para web sempre que possível


