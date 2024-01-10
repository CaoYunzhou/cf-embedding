## cloudflare-embedding

![GitHub repo size](https://img.shields.io/github/repo-size/caoyunzhou/cf-embedding)
[![GitHub Repo stars](https://img.shields.io/github/stars/caoyunzhou/cf-embedding?style=social)](https://github.com/caoyunzhou/cf-embedding/stargazers)


这是一个`cloudflare`的ai worker,可以把`cloudflare`提供的`@cf/baai/bge-base-en-v1.5`进行文本向量化

## 部署方法

- 感谢[cloudflare](https://cloudflare.com)
- 开通cloudflare的WorkAi功能
- 把index.js的内容粘贴到cloudflare的work中
- 在cloudflare > work > 触发器,配置自定义域名就可以愉快的文本向量了


## 使用

```bash
curl https://embedding.aivvm.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-123456" \
  -d '{"input":["Your text string goes here"],
  "model":"text-embedding-ada-002"
  }'
```
