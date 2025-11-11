# Museum Artwork Images

## 如何添加真实图片纹理

将您的艺术品图片放到此目录下，系统会自动加载并应用到3D模型上。

### 支持的图片格式
- JPG / JPEG
- PNG
- WebP

### 文件命名规范

请按照以下命名规范放置图片：

1. **蒙娜丽莎 (Mona Lisa)**
   - 文件名: `mona-lisa.jpg` 或 `mona-lisa.png`
   - 推荐尺寸: 1024x1536 或更高
   - 比例: 约 2:3 (竖向)

2. **维纳斯 (Venus de Milo)**
   - 文件名: `venus.jpg` 或 `venus.png`
   - 推荐尺寸: 1024x2048 或更高
   - 比例: 约 1:2 (竖向雕塑)

3. **最后的晚餐 (The Last Supper)**
   - 文件名: `last-supper.jpg` 或 `last-supper.png`
   - 推荐尺寸: 2048x1024 或更高
   - 比例: 约 2:1 (横向壁画)

### 使用步骤

1. 下载或准备您的艺术品高清图片
2. 重命名为对应的文件名
3. 放到 `/home/user/Museum/images/` 目录下
4. 刷新浏览器页面
5. 点击对应的艺术品查看3D效果

### 示例

```bash
# 放置蒙娜丽莎图片
cp /path/to/your/monalisa.jpg /home/user/Museum/images/mona-lisa.jpg

# 或者使用 PNG 格式
cp /path/to/your/monalisa.png /home/user/Museum/images/mona-lisa.png
```

### 注意事项

- 如果没有放置图片，系统会使用程序生成的简化3D模型
- 图片文件大小建议不超过 5MB 以保证加载速度
- 推荐使用高质量的艺术品图片以获得最佳视觉效果
- 图片会自动适配3D模型的尺寸比例

### 当前状态

- ✅ 蒙娜丽莎 - 支持图片纹理加载
- ⏳ 维纳斯 - 即将支持
- ⏳ 最后的晚餐 - 即将支持

### 技术说明

- 使用 Three.js TextureLoader 加载图片
- 支持异步加载，不会阻塞页面
- 自动降级到程序生成的模型（如果图片未找到）
- 材质使用 PBR 标准材质，支持真实光照效果
