// 启动钩子：若设置了 NUAA_CLI_CHDIR，则在 dsh 进程启动早期切换工作目录
// （headless 模式用 --import 链注入；Web 模式不设置该变量则无操作）
const target = process.env.NUAA_CLI_CHDIR;
if (target) {
  try {
    process.chdir(target);
  } catch (e) {
    console.error(`[nuaagent-launch] 切换到工作区 ${target} 失败：${e.message}`);
  }
}
