# 核桃好运签

「核桃好运签（Walnut Fortune）」是一个轻量级单页互动网页项目，用前端规则生成“今日运势 + 文玩核桃推荐”。用户输入生日（月日）、当前目标和偏好风格后，系统会自动识别星座并读取当天日期，生成一份轻松、有趣、带一点东方好运签氛围的娱乐化推荐结果。

项目定位：

- AI 娱乐应用原型
- 文玩核桃文化展示页
- 个性化推荐工具
- 前端作品集项目

> 本项目仅用于娱乐和文玩核桃兴趣推荐，不宣称真实预测命运。

## 功能介绍

- 支持输入生日（月日）、当前目标和核桃风格偏好。
- 不采集出生年份，不记录年龄信息。
- 仅使用生日（月日）自动计算星座。
- 系统会自动读取当天日期生成今日好运签，用户不需要手动填写今日日期。
- 好运签和文玩核桃推荐逻辑都在本地浏览器中运行，不会保存用户个人信息。
- 一键抽取今日好运签。
- 生成今日综合运势分数、关键词和 100-150 字娱乐化运势解读。
- 基于审核过的推荐池推荐文玩核桃，避免生成不专业的硬拼组合。
- 独立品种包括南疆石、苹果园、白狮子、四座楼、官帽、磨盘、鸡心、虎头、公子帽、麦穗虎头、老款狮子头等。
- 特殊品类包括平谷元宝、陨石元宝、龙眼元宝、蛇头、牛角、连体、双胞胎、三联体等。
- 多棱类只保留合理组合，例如南疆石四棱、南疆石五棱、苹果园三棱。
- 蟠龙纹、蚂蚁纹、水龙纹、满天星等作为纹路特色出现在推荐理由中，不作为基础品种随意拼接。
- 输出推荐理由、今日盘玩建议、幸运颜色和幸运数字。
- 支持 AI 识图鉴定：上传文玩核桃图片后，调用 `/api/analyze-image` 返回疑似品种、形制特征、纹路特点、配对度评分、盘玩建议、收藏建议和风险提示。
- 支持重新测算。
- 响应式布局，适合手机和电脑浏览。

## 技术栈

- HTML
- CSS
- JavaScript
- Vercel Serverless Function
- Gemini Vision API
- 无数据库、无构建依赖
- 可直接部署到 Vercel

## 如何本地运行

静态页面可以直接打开 `index.html` 预览，也可以启动本地静态服务：

```bash
python3 -m http.server 8000
```

然后在浏览器访问：

```text
http://localhost:8000
```

如果要在本地测试 AI 识图接口，需要使用 Vercel CLI：

```bash
vercel dev
```

并在本地或 Vercel 项目中配置环境变量：

```text
GEMINI_API_KEY=你的 Gemini API Key
GEMINI_MODEL=gemini-2.0-flash
```

`GEMINI_MODEL` 可选，也可以改为支持图片理解的 Gemini Flash 模型。

## 如何部署到 Vercel

1. 将项目上传到 GitHub、GitLab 或 Bitbucket 仓库。
2. 登录 Vercel，点击 `Add New Project`。
3. 选择该仓库并导入。
4. Framework Preset 选择 `Other` 或保持默认静态项目配置。
5. Build Command 留空。
6. Output Directory 留空或使用默认根目录。
7. 在 Vercel 项目的 `Settings -> Environment Variables` 中添加 `GEMINI_API_KEY`。
8. 可选添加 `GEMINI_MODEL`，默认使用 `gemini-2.0-flash`。
9. 点击 `Deploy` 完成部署。

前端不会直接暴露 API Key，图片识别请求会发送到 Vercel Serverless Function：`/api/analyze-image`。

如果暂时没有配置 `GEMINI_API_KEY`，基础好运签网页仍可正常使用，AI 识图模块会提示“功能开发中”。

## AI 识图接口

接口路径：

```text
POST /api/analyze-image
```

请求体：

```json
{
  "imageBase64": "图片 base64 字符串",
  "mimeType": "image/jpeg"
}
```

返回结果：

```json
{
  "result": {
    "possibleType": "疑似品种",
    "shapeFeature": "形制特征",
    "textureFeature": "纹路特点",
    "pairScore": 88,
    "playAdvice": "盘玩建议",
    "collectionAdvice": "收藏建议",
    "riskNote": "风险提示"
  }
}
```

识图结果仅供娱乐和初步参考，不能替代专业鉴定。

## 未来可扩展方向

1. 接入 Gemini API，生成更丰富、更个性化的好运签文案。
2. 增加文玩核桃百科数据库，补充品类介绍、皮质特点、产地、盘玩难度和适合人群。
3. 增加收藏价值评级系统，按稀有度、品相、配对难度和市场热度生成评级。
4. 增加用户收藏夹，保存喜欢的核桃品种和历史抽签结果。
5. 优化 AI 识图识别核桃品种功能，加入多图对比、识别置信度和图片质量检测。
6. 增加分享海报功能，把结果卡片生成图片，方便分享到朋友圈、小红书或社群。
7. 增加核桃市场行情展示，呈现价格区间、热度变化和收藏趋势。
