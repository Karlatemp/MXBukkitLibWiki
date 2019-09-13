!(function () {
    var tk = {
        br() {
            return document.createElement("br");
        },
        click(/** @type {HTMLElement} */element, handler) {
            element.addEventListener("click", handler);
            return element;
        },
        fake(value, chandler) {
            var a = document.createElement("a");
            a.href = "javascript:void(0)";
            a.textContent = value;
            if (chandler) {
                a.addEventListener("click", chandler);
            }
            return a;
        }
    };
    var a = Website;
    var V1_0 = new a.PageDown().name("1.0");
    var V2_0 = new a.PageDown().name("2.0");
    var Tools = new a.PageDown().name("工具")
        .append(new a.Show().name("lastest.log.gz读取").value(
            function () {
                var pool = document.createElement("div");
                if(!window.WConsole) return pool;
                var fileSelector = document.createElement("input");
                fileSelector.type = "file";
                var WConsole = WebConsole();
                pool.appendChild(WConsole.DOM);
                pool.appendChild(fileSelector);
                function ddd(/**@type {Uint8Array} */arr) {
                    return String.fromCharCode.apply(null, arr);
                }
                fileSelector.addEventListener("change", function (ev) {
                    if (fileSelector.value) {
                        var file = fileSelector.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var data = e.target.result;
                            console.log(data);
                            /**
                             * @type {Uint8Array}
                             */
                            var dec = pako.inflate(data);
                            console.log(dec);
                            WConsole.push(dec);
                            /*var f = 0;
                            while (true) {
                                var i = dec.indexOf(10, f);
                                if (i < 0) {
                                    var arr = dec.subarray(f);
                                    console.log(ddd(arr));
                                    break;
                                } else {
                                    var arr = dec.subarray(f, i);
                                    console.log(ddd(arr));
                                    f = i + 1;
                                }
                            }*/
                        };
                        reader.readAsArrayBuffer(file);
                    }
                });
                return pool;
            }
        ));
    a.append(V2_0);
    V2_0.append(
        new a.Show().name("V2.0更新").value([
            "MXBukkitLib(现在应该叫MXLib了)现在提供了全自动配置搜索模式, 以及BeanManager. 改用设计模式(Interface -> Impl)",
            "很大程度上提供了可扩展性", tk.br(),
            "-- 因为遗留原因 plugin.yml 的name字段还是 MXBukkitLib, 并且由于不知名原因本库的核心存储名字是 cn.mcres.karlatemp.MXBukkitLib"
        ])
    ).append(
        new a.PageDown().name("全自动模块搜索:")
            .append(new a.Show().name("Index").value([
                "MXLib提供了全自动的模块搜索功能, 你可以使用它达到极高的可移植性",
                "你所需要做的也就仅仅几步", tk.br(),
                "首先创建一个项目, 把MXLib添加到依赖库", tk.br(),
                "并且把你的项目配置成这样",
                {
                    type: "package", pck: {
                        "META-INF": "mxlib.autoconfig.list",
                        "cn.mcres.karlatemp.mxlib.example": ["ExampleAutoConfig.java", "ExamplePlugin.java"]
                    }
                },
                "ExamplePlugin就是平常的插件主类,这里不再多说. 另外，我是把Bean当做模块看的所以这里的模块指的都是Bean"
            ]))
            .append(new a.Show().name("ExampleAutoConfig").value([
                "ExampleAutoConfig 定义了一整套", tk.fake("BeanManager", function () {
                    a.open(["2.0", "内置模块", "BeanManager"]);
                }), "管理器, 我们可以在这里直接注册我们的模块! 请注意, 类名必须以 'AutoConfig' 结尾",
                {
                    type: 'code', mode: 'java', height: '500px', code: "\
@Configuration\n\
public class ExampleAutoConfig {\n\
    ExampleAutoConfig(){} //必须具备默认构造器\n\n\
    @Bean\n\
    com.google.gson.Gson gson() { //注册Gson\n\
        return new com.google.gson.Gson();\n\
    }\n\n\
    @Bean\n\
    IToolkit my_toolkit() {// 设计模式: Interface -> Impl\n\
        return new IToolkit(){public String run(){return \"IToolkit\";}}\n\
    }\n\
    @Bean\n\
    void boot() {//从AutoConfig启动程序\n\
        System.out.println(\"Boot from auto configuation.\");\n\
    }\n\
    @Bean\n\
    MethodHandles.Lookup lookup(MethodHandles.Lookup old){\n\
        // MethodHandles.Lookup old -> 在lookup之前储存在BeanManager的模块 \n\
        // 可添加任意参数, 统一从BeanManager拿取\n\
        if(old == null) old = MethodHandles.lookup();\n\
        return old;\n\
    }\n\
}\n\ninterface IToolkit {\n    String run();\n}"}
            ]))
            .append(new a.Show().name("mxlib.autoconfig.list").value([
                "mxlib.autoconfig.list 存储了AutoConfig的列表, 我们需要在这里添加注册的类", tk.br(),
                "这是该文件的语法",
                {
                    type: 'code', mode: 'properties', height: '500px', code: '\
# 所有以 \'#\' 开头的都是注释\n\
# 下面的是我们的默认配置\n\
cn.mcres.karlatemp.mxlib.DefaultAutoConfig\n\
cn.mcres.karlatemp.mxlib.share.PluginAutoConfig\n\
cn.mcres.karlatemp.mxlib.impl.ImplSetupAutoConfig\n\
cn.mcres.gyhhy.MXLib.legacy.LegacyAutoConfig\n\
# 直接写上类名, 我们就会前去搜索\n\n\
cn.mcres.karlatemp.example.ExampleAutoConfig # 注释\n\
# 这是错误的, 不允许在类名后面加 \'#\'\n\n\
@/META-INF/mxlib.autoconfig.list.lowest\n\
# 我们会二次加载以 \'@\' 开头的资源文件, 使用相同的语法\n\
# 不过我们不建议, 因为这会搜索全部的 @.... 的内容\n\
@/META-INF/mxlib.autoconfig.list.low\n\
@/META-INF/mxlib.autoconfig.list.normal\n\
@/META-INF/mxlib.autoconfig.list.high\n\
@/META-INF/mxlib.autoconfig.list.highest\n\
@/META-INF/mxlib.autoconfig.list.unmodifiable\n\
# Tips: 如果你需要替换MXLib内部的Bean的话你的规则文件名需要改成 \'mxlib.autoconfig.list.lowest\'\n\
#       不这样做的话会因为资源的搜索顺序问题导致可能无法正确执行\n\n\n\n\
cn.mcres.karlatemp.mxlib.example.ExampleAutoConfig\n# cn.mcres.karlatemp.mxlib.example.ExampleAutoConfig\n# 不需要,因为会自动搜索子配置\n\
# 如果你的类不是在一个jar里面的话那么是需要指定的\ncn.mcres.karlatemp.mxlib.example.otherjar.OtherAutoConfig\n\
# 及时在同一个jar类如果没有匹配包(package)规则的话那么也不会执行, 需要指定\ncn.mcres.karlatemp.mxlib.package2.ExampleAutoConfig\n\
# 包匹配规则\n\
# 像是填入 \'cn.mcres.karlatemp.example.ExampleAutoConfig\'\n\
# 搜索这个类的jar的全部类\n\
#      cn.mcres.karlatemp.example.ExampleAutoConfig\n\
#      cn.mcres.karlatemp.example.Example2AutoConfig\n\
#      cn.mcres.karlatemp.example.Example3AutoConfig\n\
#      cn.mcres.karlatemp.example.Example4AutoConfig\n\
#      cn.mcres.karlatemp.example.ExampleAutoConfiguration\n\
#      cn.mcres.karlatemp.exampleYouWhat.ExampleHAAutoConfig\n\
#      cn.mcres.karlatemp.pack.xAutoConfig\n\
#      cn.mcres.karlatemp.pack.yAutoConfig\n\
#      cn.mcres.karlatemp.pack.zAutoConfig\n\
#\n# 获取填入类的包 -> \'cn.mcres.karlatemp.example.\'\n\
# 过滤掉不是以这个包名开头的类\n\
#      cn.mcres.karlatemp.example.ExampleAutoConfig\n\
#      cn.mcres.karlatemp.example.Example2AutoConfig\n\
#      cn.mcres.karlatemp.example.Example3AutoConfig\n\
#      cn.mcres.karlatemp.example.Example4AutoConfig\n\
#      cn.mcres.karlatemp.example.ExampleAutoConfiguration\n\
#  [-] cn.mcres.karlatemp.exampleYouWhat.ExampleHAAutoConfig\n\
#  [-] cn.mcres.karlatemp.pack.xAutoConfig\n\
#  [-] cn.mcres.karlatemp.pack.yAutoConfig\n\
#  [-] cn.mcres.karlatemp.pack.zAutoConfig\n\
# 忽略不是以 AutoConfig 结尾的类\n\
#      cn.mcres.karlatemp.example.ExampleAutoConfig\n\
#      cn.mcres.karlatemp.example.Example2AutoConfig\n\
#      cn.mcres.karlatemp.example.Example3AutoConfig\n\
#      cn.mcres.karlatemp.example.Example4AutoConfig\n\
#  [*] cn.mcres.karlatemp.example.ExampleAutoConfiguration\n\
'}
            ]))
            .append(new a.Show().name("资源(Bean)使用").value([
                "我们注册了Bean, 那么我们应该要怎么样使用Bean呢, 第一种最简单粗暴的是获取BeanManager然后获取我们的Bean",
                { type: 'code', height: '15px', mode: 'java', code: 'IToolkit kit = MXBukkitLib.getBeanManager().getBean(IToolkit.class);' },
                "这样是最直接的并且Bean被覆盖更新也能拿到更新后的Bean, 但是这样的话还略显麻烦, 我们可以使用全自动模式加载, 首先这是我们的项目",
                { type: 'package', pck: { 'META-INF': 'mxlib.autoconfig.list -> 内容 -> [cn.mcres.karlatemp.mxlib.example.EAutoConfig]', 'cn.mcres.karlatemp.mxlib': { example: ["EAutoConfig.java", "PluginClass.java", { sub: ['C1.java', 'C2.java'] }], test: ["Class1.java", "Class2.java"] } } },
                "然后根据过滤器规则 (规则和autoconfig.list的规则一样，不过没有最后的忽略非AutoConfig), 下面的类会参与 Bean 获取 Task",
                { type: 'package', pck: { 'cn.mcres.karlatemp.mxlib': { example: ["EAutoConfig.java", "PluginClass.java", { sub: ['C1.java', 'C2.java'] }] } } },
                "# 其他的都一样:",
                {
                    type: 'code', height: "150px", mode: 'java', code: '\
package .....;\n\n\
public class C1{\n\
    @Resource\n\
    private static IToolkit toolkit;\n\
    private static void $init(....){\n\
        // 如果有 $init 方法的话将会自动调用 $init 方法, 参数和 AutoConfig的方法参数一样, 在@Resource注入完成后执行\n\
        System.out.println("Class init.");\n\
    }\n\
}' },
                "然后你就可以直接使用 C1.toolkit 进行操作了"
            ]))
    ).append(
        new a.PageDown().name("内置模块")
            .append(new a.Show().name("BeanManager").value([
                "?"
            ]))
    )
        ;
    a.append(Tools);
    a.append(V1_0);
    V1_0.append(
        new a.PageDown().name("命令模块")
            .append(new a.Show().name("Index").value(
                "MXBukkitLib 提供了快速构建命令的方法, 你可以以十分快的速度构建你自己的命令"
            ))
            .append(new a.Show().name("构建命令").value([
                a.text(document.createElement("h2"), "主命令"),
                "构建命令串, 我们需要首先创建一个类作为我们的主命令(其实是个空壳),\
                并给他注解上我们的表示符.", {
                    type: "code", mode: "java", height: "80px", code: "\
package cn.example.command;\n\n\
import cn.mcres.gyhhy.MXLib.bukkit.cmd.*;\n\
\n\
@Command\n\
public class CommandMain{}"},
                "截下来,创建其他的附加类(请注意: 附加类必须和主类在同一个包内)", {
                    type: "code", mode: "java", height: "160px", code: "\
package cn.example.command;\n\n\
import cn.mcres.gyhhy.MXLib.bukkit.cmd.*;\nimport org.bukkit.command.CommandSender;\n\
\n@SubCommand\n\
public class Test{\n\
    @SubCommandHandle\n\
    //这里的方法名字允许使用其他名字, 只要你注解了 SubCommandHandle\n\
    public void handle(CommandSender sender){\n\
        sender.sendMessage(\"Hello MXBukkitLib Command.\")\n\
    }\n\
}"},
                "很好,我们已经创建了一个或者多个子命令了,但是! 这并没有什么用, 因为你还没加载!",
                tk.br(), "假如你的 plugin.yml 长这样", {
                    type: "code", mode: "yaml", height: "130px", code: "\
name: Example\n\
main: cn.example.Main\n\
version: 1.0-example\n\
depend: [MXBukkitLib]\n\
commands:\n\
    example:\n\
        usage: Hello"
                },
                "并且你的 Main.java 长这样", {
                    type: "code", mode: "java", height: "130px", code: '\
package cn.example;\n\
\n\
import org.bukkit.plugin.java.JavaPlugin;\n\
\n\
public class Main extends JavaPlugin{\n\
    @Override\n\
    public void onEnable(){\n\
\n\
    }\n\
}'},
                "那么我们需要把它改成这个样子", {
                    type: "code", mode: "java", height: "250px", code: '\
package cn.example;\n\
\n\
import org.bukkit.plugin.java.JavaPlugin;\n\
import cn.mcres.gyhhy.MXLib.bukkit.cmd.*;\n\
import cn.example.command.CommandMain;\n\
import org.bukkit.command.PluginCommand;\n\
\n\
public class Main extends JavaPlugin{\n\
    @Override\n\
    public void onEnable(){\n\
        // 这里从编写的时候就打错了, 改名的话由于是Library可能导致错误所以就一直没改过来\n\
        ExecuterEX exec = Manager.exec(CommandMain.class);\n\
        exec.setLanguageTranslator(new cn.mcres.gyhhy.MXLib.bukkit.cmd.langs.Chinese());\n\
        PluginCommand pc = getCommand("example");\n\
        pc.setExecutor(exec);\n\
        pc.setTabCompleter(exec);\n\
    }\n\
}'}
            ]))
            .append(new a.Show().name("权限配置").value([
                a.text(document.createElement("h2"), "主命令权限"),
                '@Command(permission = "example.command.example")',
                a.text(document.createElement("h2"), "子命令权限"), {
                    type: "code", mode: "java", height: "70px", code: '\
@SubCommand(\n\
    permission = "...",\n\
    checkSupPer = true / false // 是否检查主命令的权限, false时只拥有子命令的权限就可以执行\n\
)\n\
public class A{}'
                }
            ]))
            .append(new a.Show().name("子命令(详细)").value([
                "本章节将不会写任何import",
                a.text(document.createElement("h2"), "自定义子命令名字/帮助"), {
                    type: "code", mode: "java", height: "70px", code: '\
@SubCommand(name="命令", desc="这条信息将会被显示到 /example help 里")\n\
public void CCC{}' },
                a.text(document.createElement("h2"), "限制只能玩家执行"), {
                    type: "code", mode: "java", height: "70px", code: '\
public void CCC{\n\
    @SubCommandHandle\n\
    public void run(Player player){}\n\
}'}, a.text(document.createElement("h2"), "参数处理"), {
                    type: "code", mode: "java", height: "70px", code: '\
public void run(Player player, String[] argc){\n\
    // 特别注意, MXBukkitLib对传入的参数进行了处理\n\
    // 比如原本玩家执行 /example arg0 arg1 arg2 的参数列表是 [arg0, arg1, arg2]\n\
    // 而MXBukkitLib砍掉了第一个参数, 传进来的就是 [arg1, arg2]\n\
    // 如果想要关闭, @SubCommand(noRemoveFirstArg=true)\n\
}'}, a.text(document.createElement("h2"), "完整参数(可减少参数,调换参数位置,但是不允许增加参数)"), {
                    type: "code", mode: "java", height: "70px", code: '\
public void run(Player player, String[] argc, String label, org.bukkit.command.Command cmd, Executer exec){\n\
}'}
            ]))
            .append(new a.PageDown().name("Tab补全").append(
                new a.Show().name("注解Tab").value([
                    "我们需要在子命令里添加第二个方法:", {
                        type: "code", mode: "java", height: "100px", code: '\
@SubCommandTabCompleter\n\
public void onTabComplete(CommandSender cs, Command cmnd, String string, String[] args, SubCommandEX subcommand, List<String> completes) {\n\
    // 注意: 这个方法不允许增加参数/减少参数/调换参数位置\n\
    // 但是允许更换方法名字\n\
}'}
                ])
            ).append(
                new a.Show().name("接口Tab").value({
                    type: "code", mode: "java", height: "70px", code: '\
public class C implements CommandTabCompleter{\n\
    .....\n\
}'})).append(new a.Show().name("注意").value("Tab和执行一样, args 去掉了第一个参数, 而且你无需手动过滤返回列表, 我们已经进行过滤了.")))
            .append(new a.Show().name("高级命令").value([
                a.text(document.createElement("h2"), "Raw命令"), "我这里的Raw定义为直接执行命令, 像是直接执行 /example",
                {
                    type: "code", mode: "java", height: "70px", code: '\
import cn.mcres.gyhhy.MXLib.bukkit.cmd.*;\n\
@SubCommand(name=Variable.COMMAND_CMD_DEF)\npublic void RawCommand{}'},
                '"找不到命令" 命令, 此功能可用于自定义help', {
                    type: "code", mode: "java", height: "70px", code: '\
import cn.mcres.gyhhy.MXLib.bukkit.cmd.*;\n\
@SubCommand(name=Variable.COMMAND_NOSUB, noRemoveFirstArg = true)\npublic void CommandNotFoundException{}'}
            ])).append(new a.Show().name("动态注入").value([
                "这里我们要动态注入子命令, 这里推荐不要与其他命令放在同一个包下", {
                    type: 'code', mode: 'java', height: '300px', code: '\
package cn.example.exts;\n\
import cn.mcres.gyhhy.MXLib.bukkit.cmd.*;\n\
import org.bukkit.entity.Player;\n\
@SubCommand\n\
@ClassIgnore\n\
public class DXLCommand extends SubCommandExecutor{\n\
    public DXMCommand(){\n\
        setup(null, null, getClass().getDeclaredAnnotation(SubCommand.class));\n\
    }\n\n\
    @Override\n\
    protected boolean check(CommandSender sender, Executer exev){\n\
        if(!(sender instanceof Player)) return false;\n\
        return super.check0(sender, exev);\n\
    }\n\n\
    @Override\n\
    public boolean exec0(CommandSender sender, Command cmd, String ali, String[] argc, Executer exev){\n\
        Player player = (Player)sender;\n\
        // 这里也会去掉参数, 取决于setup选取了哪个@SubCommand\n\
        player.sendMessage("Hello Inject Command! " + String.join(" ", argc));\n\
    }\n\
}'}, "好,我们已经写好我们的命令了,让我们为新命令的诞生献上祝福", {
                    type: 'code', mode: 'java', height: '50px', code: '\
ExecuterEX exec = ....;\n\
exec.reg("dxl", new DXLCommand());'}
            ])))
        .append(new a.PageDown().name("GameProfile").append(
            new a.Show().name("获取GameProfile").value([
                {
                    type: "code", mode: "java", height: "50px", code: '\
import cn.mcres.gyhhy.MXLib.bukkit.profile.*;\n\
\n\
Profile profile = ProfileHelper.getPlayerProfile(null);'}
            ])
        )).append(new a.Show().name("TitleAPI").value([
            a.text(document.createElement("h2"), "获取TitleAPI"),
            {
                type: "code", mode: "java", height: "60px", code: '\
import cn.mcres.gyhhy.MXLib.bukkit.MXAPI;\nimport cn.mcres.gyhhy.MXLib.bukkit.TitleAPI;\n\
\nTitleAPI title = MXAPI.getTitleAPI();'
            },
            a.text(document.createElement("h2"), "发送action bar内容(就是物品栏上面显示的那条)"),
            { type: "code", mode: "java", height: "50px", code: 'title.sendOutChat(player, "Action bar!");' },
            a.text(document.createElement("h2"), "设置Tab标题头和标题尾"),
            { type: "code", mode: "java", height: "50px", code: 'title.sendTabTitle(player, "Tab header!", "Tab footer!");' }
        ])).append(new a.Show().name("数据加密").value([
            "我们已经封装好了一些加密方法, 位于 'cn.mcres.gyhhy.MXLib.encode' 下, 下面列出一些比较实用的",
            {
                type: 'code', mode: 'java', height: '200px', code: '\
BlowfishActuator blowfish = new BlowfishActuator("My Key");\n\
String encode = blowfish.encodeToString("Testing Message");\n\
System.out.println(encode);\n\
System.out.println(blowfish.decodeToString(encode));\n\n\
RSAActuator rsa = new RSAActuator(..., ...);\nrsa.setEncodeUsePublicKey(true);\n\
byte[] datas = rsa.encode(new byte[]{2, 3, 3, 3});\n\
System.out.println(Arrays.toString(datas));\n\
System.out.println(Arrays.toString(rsa.decode(data)));'}
        ])).append(new a.Show().name("Http访问工具").value([
            "我们封装了Http访问工具, 这对于喜欢流式的开发者是十分友好的.", {
                type: 'code', mode: 'java', height: '200px', code: '\
import cn.mcres.gyhhy.MXLib.http.WebHelper;\n\
import java.net.*;\nimport java.io.*;\n\n\
WebHelper.http("https://baidu.com").response((int responceCode, URLConnection connection, InputStream stream) -> {\n\
\n\
}).onCatch(error -> System.err.println("Failed to connect")).connect();\n\n\
WebHelper.post("https://www.example.com")\n\
    .header(connect -> ((HttpURLConnection)connect).setRequestMethod("PUT"))\n\
    .write(stream -> stream.write("w".getBytes())).connect();'}
        ])).append(new a.Show().name("日志系统").value([
            "我们制作了彩色的日志系统, 让错误输出显得十分美观/十分明显", {
                type: 'code', mode: 'java', height: '70px', code: 'import cn.mcres.gyhhy.MXLib.log.BasicLogger;\n\nBsaicLogger logger = cn.mcres.gyhhy.MXLib.log.Logger.getOrCreateLogger(plugin);'
            }
        ])).append(new a.PageDown().name("Yggdrasil").append(new a.Show().name("什么是Yggdrasil").value([
            a.text(document.createElement("h2"), "Yggdrasil"),
            "Yggdrasil, 是一套认证系统, 他负责玩家 登录, 登出, 判断玩家是否是正版, 获取玩家皮肤等功能. ",
            "是正版验证的核心, 详情: ",
            function () {
                var a = document.createElement("a");
                a.href = "https://github.com/yushijinhun/authlib-injector/wiki/Yggdrasil%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%8A%80%E6%9C%AF%E8%A7%84%E8%8C%83#%E5%9F%BA%E6%9C%AC%E7%BA%A6%E5%AE%9A";
                a.textContent = "Yggdrasil 服务端技术规范"
                return a;
            }
        ])).append(new a.Show().name("获取和使用").value([
            "我们需要调用", { type: 'code', mode: 'java', height: '30px', code: "cn.mcres.gyhhy.MXLib.yggdrasil.Yggdrasil.getServerYggdrasil();" },
            "获取Yggdrasil实例,当然你也可以直接 new 一个实例", tk.br(),
            "获取Yggdrasil实例后, 我们可以使用这些方法快速查询玩家信息, 查询玩家皮肤信息等, 下面是获取玩家皮肤的代码实例",
            {
                type: 'code', mode: 'java', height: '180px', code: '\
import cn.mcres.gyhhy.MXLib.yggdrasil.Yggdrasil;\n\
import cn.mcres.gyhhy.MXLib.yggdrasil.beans.*;\n\n\
Yggdrasil ygg = Yggdrasil.getServerYggdrasil();\n\
Profile[] r = ygg.queryProfiles("Karlatemp");\n\
for(Profile p : r){\n\
    Profile full = ygg.queryProfile(p.id, true);\n\
    Textures textures = full.textures;\n\
    Textures.Texture skin = textures.skin;\n\
    if(skin == null) System.out.println("玩家 " + p.name + " 没有皮肤");\n\
    else             System.out.println("玩家 " + p.name + " 的皮肤地址: " + skin.url);\n\
}'}
        ]))).append(new a.Show().name("ThrowHelper").value([
            "我们提供了一个可以说是违反了Java语法的工具, 那就是ThrowHelper, 只要提供了一个Throwable, 不管你有没有标注throws",
            "他都能抛",
            {
                type: 'code', mode: 'java', height: "90px", code: '\
public class Main{\n\
    public static void main(String[] args){\n\
        cn.mcres.gyhhy.MXLib.ThrowHelper.getInstance().thr(new IOException());\n\
    }\n\
}'}
        ]))
        .append(new a.Show().name("JVMHelper").value([
            "我们提供了一个超强的功能,但是他需要 JDK Runtime 的支持", {
                type: 'code', mode: 'java', height: '250px', code: '\
import cn.mcres.gyhhy.MXLib.system.VMHelper;\n\
import java.lang.instrument.Instrumentation;\n\n\
VMHelper jvm = VMHelper.getHelper();\n\
if(jvm == null){\n\
    System.out.println("当前JVM环境未加载Helper, 关闭!");\n\
    return;\n\
}\n\
Instrumentation ins = jvm.getInstrumentation();\n\
if(ins == null){\n\
    System.out.println("当前JVM环境未加载Helper, 关闭!");\n\
    return;\n\
}'
            }
        ]))
        .append(new a.PageDown().name("URL Protocol").append(new a.Show().name("主目录").value(["我们封装了些许数据方法, 这也许会对你有十分大的用处 这个区域的内容可以脱离Bukkit运行",
            tk.br(), "如果你是在 public static void main(String[] args) 运行的, 请运行此句",
            a.text(document.createElement("pre"), "cn.mcres.gyhhy.MXLib.http.URLStreamManager.load();")]))
            .append(new a.Show().name("Rcon").value(["RCON, 我们远程连接服务器所使用的协议, 十分熟悉吧", {
                type: 'code', mode: 'java', height: '250px', code: '\
import java.net.*;\nimport java.io.*;\n\n\n\
cn.mcres.gyhhy.MXLib.http.URLStreamManager.load(); // 如果你是在 public static void main(String[] args) 运行的, 请运行此句\n\n\
URL rcon = new URL("rcon://localhost:25575");\n\
URLConnection con = url.openConnection();\n\
con.addRequestProperty("passwd", "RCON Password");\n\
try(Closeable unuse = (Closeable)con){\n\
    PrintStream ps = new PrintStream(con.getOutputStream());\n\
    ps.println("?"); ps.println("list");\n\
    try(Scanner scanner = new Scanner(con.getInputStream()){\n\
        while(scanner.hasNextLine()) System.out.println(scanner.nextLine());\n\
    }\n\
}'
            }])).append(new a.Show().name("Base64").value([
                "我们提供了 base64 代理, 不过这个应该没啥用途", {
                    type: 'code', mode: 'java', height: '150px', code: '\
URLStreamManager.load();\nInputStream stream = new URL("base64:UE9JJTIx").openStream();'}
            ])).append(new a.Show().name("Data").value([
                "如果你是前端开发者的话, 你90%用过 data: 吧, 现在, 我们成功将它搬到了Java里面!", tk.br(), {
                    type: 'code', mode: 'java', height: '250px', code: '\
URL u = new URL("data:" + datas); // 这将返还datas 的内容, 不过得保证里面没有 \',\'\n\n\
URL u = new URL("data:,"+datas); // 这是推荐的方法,不会错误解析\n\n\
URL u = new URL("data:charset=gbk,"+datas); //将使用 gbk 编码\n\n\
URL u = new URL("data:base64,"+base64); // 将使用base64解码内容, 可用于图片传输'}
            ])))
        ;
})();
(function () {
    var web = Website;
    web.hash(location.hash, false);
})();