// WAF 拦截关键词列表
// 只对消息 content 字段做处理，不会误伤 JSON 结构

export const WAF_KEYWORDS = [
  // 命令执行
  'exec',
  'system',
  'eval',
  'cmd',
  'passthru',
  'shell_exec',
  'popen',
  'proc_open',
  'Runtime',
  'getRuntime',
  'ProcessBuilder',
  'os.system',
  'subprocess',

  // SQL 注入 — 裸关键词 + 组合模式
  'SELECT * FROM',
  'UNION SELECT',
  'INSERT INTO',
  'DROP TABLE',
  'DELETE FROM',
  'select ',
  'union ',
  'insert ',
  'drop ',
  'delete ',
  'update ',
  'from ',
  'where ',
  'information_schema',
  'load_file',
  'into outfile',
  'sleep(',
  'benchmark(',
  'xp_cmdshell',
  "' or",
  "'--",
  '1=1',

  // XSS
  'javascript:',
  'document.cookie',
  'onerror=',
  'onload=',
  'alert(',
  'onmouseover',
  '<script',
  '<img',
  '<iframe',
  '<svg',

  // 文件遍历
  '/etc/passwd',
  '/windows/win.ini',
  '../',
  '..\\',

  // 模板注入/代码混淆
  'String.fromCharCode',
  '${',
  'println',
  'eprintln',

  // 文件类型/命令
  'cat ',
  'more ',
  'type ',
  '.war ',
  '.jsp ',
  '.jspx',
];
