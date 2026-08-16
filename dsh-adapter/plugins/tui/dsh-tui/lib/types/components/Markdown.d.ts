import React from 'react';
/**
 * Markdown 渲染组件：marked 分词 + ANSI 格式化。
 *
 * 表格 token 交给 MarkdownTable 渲染为带边框的 flexbox 布局；
 * 其余块级内容由 formatToken 转成 ANSI 字符串，合并后包进单个
 * Text（整段去首尾空白）。代码块高亮由 cli-highlight 异步提供，
 * 加载完成后自动触发一次重渲染。无 markdown 语法的纯文本走快速
 * 路径，直接合成段落 token，省掉 lexer 调用。
 */
type Props = {
    children: string;
    /** 为 true 时全部文本内容以 dim 样式呈现 */
    dimColor?: boolean;
    /** 为 false 时跳过 token 缓存（流式尾部的内容逐帧变化，缓存必然失效） */
    cacheTokens?: boolean;
};
/**
 * 混合渲染 Markdown 内容：表格用带边框的 flexbox 组件，其余内容由
 * formatToken 生成 ANSI 字符串放入 Text。高亮对象异步就绪后自动刷新。
 */
export declare function Markdown({ children, dimColor, cacheTokens }: Props): React.ReactNode;
export {};
//# sourceMappingURL=Markdown.d.ts.map