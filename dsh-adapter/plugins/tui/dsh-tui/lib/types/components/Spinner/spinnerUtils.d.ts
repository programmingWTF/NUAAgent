/**
 * Spinner 动画的通用工具集：平台相关的帧字符选择、RGB 颜色插值、
 * HSL 色相转 RGB，以及 `rgb(...)` 颜色字符串的解析与记忆化。
 * 这些纯函数被 Spinner 组件及若干加载/装饰元素复用。
 */
export type RGBColor = {
    r: number;
    g: number;
    b: number;
};
/**
 * 返回适合当前终端/平台的 spinner 帧字符序列。
 * 每次调用都返回独立数组，调用方可以安全持有或改动，互不影响。
 */
export declare function getDefaultCharacters(): string[];
/**
 * 在两种颜色之间按系数 t 线性插值（t ∈ [0, 1]），
 * 各分量四舍五入到整数后返回。
 */
export declare function interpolateColor(color1: RGBColor, color2: RGBColor, t: number): RGBColor;
/**
 * 把 RGB 对象格式化为 `rgb(r,g,b)` 字符串，供 Ink 的 Text 组件使用。
 */
export declare function toRGBColor(color: RGBColor): string;
/**
 * 把色相角（单位：度）转换为 RGB 颜色。
 * 采用固定饱和度 0.7、亮度 0.6 的 HSL 参数（波形动画的配色基准）；
 * 色相先归一化到 [0, 360)，任意角度（含负数、超一圈）都能安全转换。
 */
export declare function hueToRgb(hue: number): RGBColor;
/**
 * 解析 `rgb(r,g,b)` 颜色字符串；格式不合法时返回 null。
 * 同一输入的解析结果会被缓存（含 null），之后取用零成本。
 */
export declare function parseRGB(colorStr: string): RGBColor | null;
//# sourceMappingURL=spinnerUtils.d.ts.map