# 多行文本擦除效果

## 实现思路

这个实现是一个创意的文字擦除动画效果，主要思路如下：

## 核心实现原理

1. **双层文本结构**：
   - 底层显示完整文本（白色）
   - 上层覆盖一个相同的文本，通过特殊效果实现"擦除"

2. **CSS动画技术**：
   - 使用CSS自定义属性（变量）配合@keyframes动画
   - 通过@property定义--p变量，使其可以在动画中变化
   - 利用linear-gradient创建渐变遮罩效果

3. **渐变遮罩效果**：
   - 将上层文本设置为透明
   - 使用线性渐变背景，从透明到黑色
   - 通过改变渐变位置实现擦除效果

## 技术要点

1. **布局处理**：
   - 使用绝对定位让擦除层完全覆盖文本
   - 设置inset: 0确保覆盖整个父容器

2. **动画实现**：
   - 使用CSS动画改变--p变量值从0%到100%
   - 渐变效果：`background: linear-gradient(to right, transparent var(--p), black calc(var(--p) + 30px))`
   - 30px的渐变宽度提供平滑的擦除效果

3. **JavaScript处理**：
   - 动态获取文本内容
   - 将相同内容复制到擦除层

## 创新点

1. 解决了CSS变量不能直接用于@keyframes的问题，通过@property定义CSS变量
2. 使用渐变而非纯色实现更自然的擦除效果
3. 双层文本结构确保文本始终可见，同时实现擦除动画

## 效果特点

- 黑色背景上的白色文字
- 从左到右的擦除动画
- 5秒的动画时长
- 线性动画效果
- 动画结束后保持最终状态

这个实现巧妙地结合了CSS自定义属性、渐变和动画，创造出一个简单而优雅的文字擦除效果。

## 代码实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    html,
    body {
      background-color: #000;
      height: 100%;
    }

    .container {
      width: 80%;
      margin: 1em auto;
      line-height: 2;
      text-indent: 2em;
      position: relative;
      font-size: 20px;
    }

    .text {
      color: white;
    }

    .eraser {
      position: absolute;
      /* 完全覆盖父元素内容 */
      inset: 0;
    }

    /* 变量不可使用@keyframe动画，使用自定义属性解决 */
    @property --p {
      syntax: '<percentage>';
      inherits: false;
      initial-value: 0%;
    }

    .eraser-text {
      --p: 0%;

      color: transparent;
      background: linear-gradient(to right, transparent var(--p), black calc(var(--p) + 30px));
      animation: eraser 5s linear forwards;
    }

    @keyframes eraser {
      to {
        --p: 100%;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <p class="text"></p>
    <p class="eraser">
      <span class="eraser-text"></span>
    </p>
  </div>
  <script>

    const text = document.querySelector('.text');
    const eraserText = document.querySelector('.eraser-text');
    text.innerHTML = `When using the canvas element or the Canvas API, rendering,
      animation, and user interaction usually happen on the main execution thread of a web application.
      The computation relating to canvas animations and rendering can have a significant impact on application performance.
The OffscreenCanvas interface provides a canvas that can be rendered off screen, decoupling the DOM and the
Canvas API so that the canvas element is no longer entirely dependent on the DOM. Rendering operations can
  also be run inside a worker context, allowing you to run some tasks in a separate thread and avoid heavy work on the main thread.
OffscreenCanvas is a transferable object.OffscreenCanvas.getContext()
Returns a drawing context for the offscreen canvas, or null if the context identifier
is not supported, or the offscreen canvas has already been set to a different context mode.
OffscreenCanvas.convertToBlob()
Creates a Blob object representing the image contained
in the canvas.OffscreenCanvas.transferToImageBitmap()
 Creates an ImageBitmap object from the most recently rendered image of the OffscreenCanvas.
 See its reference for important notes on managing this ImageBitmap.`
    eraserText.innerHTML = text.textContent;
  </script>
</body>

</html>
```
