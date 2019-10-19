!(function () {
    var a = Website;
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
        },
        path(value, pt) {
            return BBox.create('a').text(value)
                .propertie('href', "javascript:void(0)").on('click', function () {
                    a.open(pt);
                }).dom;
        }
    };
    (function () {
        var ind;
        a.append(ind = new a.Show().name("Index").value([
            "MXLib 是一个集合了许多功能的工具. 拥有极高的可自定义模式. 比如",
            BBox.create("a").propertie("href", "https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/Toolkit.Reflection.html#getCallerClass()")
                .text("Toolkit.Reflection.getCallerClass()").dom,
            ', 你可以用他代替 sun.reflect.Reflection.getCallerClass()',
            BBox.create('p').node("我们提供了可控的")
                .newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/util/PermissibleCollection.html", "Collection对象")
                .node(", 能控制Collection只能做什么, 比如只能调用 add, 只能写不能读等...")
                .newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/util/PCollectionPermission.html#ONLY_SET")
                .dom
        ]));
        if (!location.hash)
            ind.onClick();
    })();
    a.append(new a.PageDown().name("主文档").id("m").append(
        new a.PageDown().name("cn.mcres.karlatemp.mxlib").id("pck")
            .append(new a.PageDown().name("annotations").id('ann')
                .append(new a.Show().name("Bean").value([
                    "代表这是一个Bean, 可以注解到类上表示他是需要在BeanManager获取的, 但是这只是让开发者读的", tk.br(),
                    "我们更多的是用于", tk.path("AutoConfig", ['m', 'use', 'ac']),
                    "的解析."
                ]))
                .append(new a.Show().name("@Configuration").id('conf').value([
                    "标记此类是一个 ", tk.path("AutoConfig", ['m', 'use', 'ac'])
                ]))
                .append(new a.Show().name("@Depend").id('dep').value([
                    "Depend 依赖系统, 表示满足Depend才会尝试加载类, 目前对 AutoConfig 无效!",
                    tk.path("2.2 Depend系统", ['2.2', 'anno', 'Depend'])
                ]))
                .append(new a.Show().name("@AutoInstall").id('ai').value([
                    "@see ", tk.path('2.2/AutoInstall', ['2.2', 'anno', 'AutoInstall'])
                ]))
                .append(new a.Show().name("@ProhibitBean").id('pb').value([
                    "如果一个类注解了 @ProhibitBean, 他们这个类将无法作为 type 加入到 BeanManager",
                    BBox.create('pre').text('\
value: 默认值: ALL_WITH_SUBCLASS\n\
    ALL_WITH_SUBCLASS:\n\
        此类和此类的子类/实现类都无法被注册到BeanManager\n\
        @ProhibitBean class Root{}\n\
        class Extend extends Root{}\n\
        MXBukkitLib.getBeanManager().addBean(Extend.class, new Extend()); // 将不会执行 add 动作\n\
    ONLY_CURRENT:\n\
        只有此类不能作为type注册到BeanManager\n\
        @ProhubitBean(ProhibitType.ONLY_CURRENT) class Root{}\n\
        class Extend extends Root{}\n\
        MXBukkitLib.getBeanManager().addBean(Root.class,   new Extend()); // 将不会执行 add 动作\n\
        MXBukkitLib.getBeanManager().addBean(Extend.class, new Extend()); // 将会运行这 add 动作')
                ]))
                .append(new a.Show().name("@Resource").id('res').value([
                    "@Resource, 用于字段, 由MXLib进行注入加载, 可以是static值也可以是非static值, 但是不能为 final 值, 用过SpringMVC的应该很熟"
                ]))
            ).append(new a.PageDown().name("configuration").id('conf')
                .append(new a.Show().name('IConfigurationProcessor').id('processor').value([
                    "IConfigurationProcessor. 十分简单, 就是用来解析类配置文件的.",
                    tk.path("详见 AutoConfig", ['m', 'use', 'ac'])
                ]))
            ).append(new a.PageDown().name("tools").id("t")
                .append(new a.Show().name("CharCompiler").value([
                    'CharCompiler, 可用于URI编译, 还可以用非 \'%\' 字符', tk.br(),
                    "@see ", BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/CharCompiler.html", "JavaDoc")
                ]))
                .append(new a.Show().name("ResourceLoader(s)").id('res_loader').value([
                    "ResourceLoader, 类资源搜索器 见",
                    tk.path("2.2更新", ['2.2', 'module', 'ResourceLoader'])
                ]))
                .append(new a.Show().name("ClassResourceLoader(s)").id("class_res_loader").value([
                    "类字节码搜索器, 见",
                    tk.path('2.2 Update', ['2.2', 'module', 'ClassResourceLoader'])
                ]))
                .append(new a.Show().name("ServiceInstaller(s)").id("service_installer").value([
                    "服务安装器, 见",
                    tk.path('2.2 Update', ['2.2', 'module', 'ServiceInstaller'])
                ]))
                .append(new a.Show().name("DependChecker").value([
                    "DC, Depend System核心, 用于验证Depend是否有效, 见",
                    tk.path('2.2 @Depend', ['2.2', 'anno', 'Depend'])
                ]))
                .append(new a.Show().name("EmptyStream").id("es").value([
                    "EmptyStream, 空IO操作流, read方法永远为 -1, 执行write啥都不会做. ",
                    BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/EmptyStream.html", "JavaDoc")
                ]))
                .append(new a.Show().name("IClassScanner").id("class_scan").value([
                    "IClassScanner, 可在 BeanManager 获取, MXLib的自动搜索功能全得益于此类. 全部方法的返回值和传入的 list 相同(为同一个对象)"
                ]))
                .append(new a.Show().name("IMemberScanner").id("mem_scan").value([
                    "搜索Class下的全部成员工具, 在BeanManager获取"
                ]))
                .append(new a.Show().name("IObjectCreator").id("obj_creator").value([
                    "IObjectCreator, 用于直接创建一个对象, 方法的构造器的参数将使用BeanManager的值"
                ]))
                .append(new a.Show().name("ThrowHelper").id('thr').value([
                    "ThrowHelper. 可用于抛出一个错误. 无论这个错误时候是 checked 还是 unchecked 的",
                    { type: 'code', code: 'return ThrowHelper.thrown(new Exception());', height: '20px', mode: 'java' }
                ]))
                .append(new a.Show().name("Toolkit").value([
                    BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/Toolkit.html", "JavaDoc")
                ]))
                .append(new a.Show().name("Toolkit.Reflection").id("reflection").value([
                    BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/Toolkit.Reflection.html", "JavaDoc"), tk.br(),
                    {
                        type: 'package', pck: {
                            'defineClass(ClassLoader, String, byte[], int, int, ProtectionDomain)':
                                '这相当于动态调用ClassLoader的define方法, 用于动态生成类',
                            'getCallerClass()': '获取访问者. 代替 sun.reflect.Reflection.getCallerClass()',
                            'loadClassForm(String, Collectio<ClassLoader>)': '尝试从一个集合查找ClassLoader',
                            'setAccess(T, boolean)': '相当于 T.setAccessible(boolean); 然后 return T;'
                        }
                    }
                ]))
            ).append(new a.PageDown().name("logging").id('l')
                .append(new a.Show().name("Ansi").value([
                    "Bukkit颜色代码转Ansi工具 @see",
                    BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/logging/Ansi.html", "JavaDoc")
                ]))
                .append(new a.Show().name("ILogger").id('il').value(
                    "ILogger, 最基础的日志系统"
                ))
                .append(new a.Show().name("AbstractLogger").id("al").value("提供了基础了ILogger实现, 没有Prefix支持"))
                .append(new a.Show().name("AbstractBaseLogger").id("abl").value("基本的日志系统, 提供了Prefix支持, 每次输出一行信息.(以行为处理单位)"))
                .append(new a.Show().name("PrintStreamLogger").id("psl").value("使用PrintStream的日志系统"))
                .append(new a.Show().name("IMessageFactory").id("msg_fac").value("MessageFactory用于格式化ILogger的输出."))
                .append(new a.Show().name("MessageFactoryImpl").id('mfi').value("提供了实现基础, 我们推荐您的自定义MessageFactory继承此类, 带Java9+ Module支持"))
                .append(new a.Show().name("MessageFactoryAnsi").id("mfa").value("和impl一样, 不过提供了Ansi支持"))
                .append(new a.Show().name("MLogger").value("把我们的ILogger转为Java原生Logger, new MLogger(\"MXLib\", null, new PrintStreamLogger(....));"))
                .append(new a.Show().name("MLoggerHandler").value("原生日志系统的Handler, java.util.logging.Logger.addHandler(new MLoggerHandler(...));"))
            )
    ).append(
        new a.PageDown().name("在你的项目中使用").id('use').append(
            new a.Show().name("AutoConfig").id('ac').value([
                "AutoConfig, 就是用来注册Config的, 我们对于AutoConfig有以下要求: ",
                BBox.create('pre').text('\
0. 最重要的一点: 类名必须以 "AutoConfig" 结尾, 用于搜索, 比如 "你好AutoConfig", 为了增加你自己的可读性请少用诸如 AAutoConfig 之类的名字\n\
1. AutoConfig 不应该继承另一个AutoConfig\n\
2. AutoConfig 必须标记 ').append(tk.path('@Configuration', ['m', 'pck', 'ann', 'conf'])).node(', 用于确定这是一个 AutoConfig\n\
3. 我们对方法名没有任何规定, 比如 "@Bean void 你好世界(){}", 但是为了增加你的代码可读性(对于你自己/对于开源), 还请用你自己能理解的名字来命名'),
                "AutoConfig是用以注册Bean的, 你可以看我们的",
                BBox.newLink("https://github.com/Karlatemp/MXBukkitLib/blob/master/Share/src/cn/mcres/karlatemp/mxlib/share/PluginAutoConfig.java", "内置示例"), tk.br(),
                '第0点: 类名必须以 "AutoConfig" 结尾, OK.', tk.br(),
                "第1点: 没有继承其他的AutoConfig. OK.", tk.br(),
                "第2点: 标记了 @Configuration, OK", tk.br(), tk.br(),
                "我们看到下面的 mf()", tk.br(),
                "@Bean -> 代表这个方法体会注册一个Bean. IConfigurationProcessor 会调用全部带 @Bean 注解的方法", tk.br(),
                "然后是返回类型 IMessageFactory, 表示注册的类型是 IMessageFactory", tk.br(),
                "return new BukkitPluginMessageFactory() -> 表示要注册的具体示例", tk.br(),
                "另请参阅 ", BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/bean/IBeanManager.html#addBean(java.lang.Class,T)", "IBeanManager#addBean(java.lang.Class,T)"), tk.br(), tk.br(),
                "然后是下面的 processor(ICommandProcessor), 这个方法带了一个参数, 这个参数的值就是在运行当前方法时 BeanManager 中对应的Bean.", tk.br(),
                "另请参阅 ", BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/bean/IBeanManager.html#getBean(java.lang.Class)", "IBeanManager#getBean(java.lang.Class)"), tk.br(), tk.br(),
                "最底下的 onBoot(..), 他是一个 void 方法, 这个方法同样会执行, 十分的方便"
            ])
        )
    ));
    a.append(new a.PageDown().name("2.4").append(
        new a.PageDown().name("CompilationEvalProcessor").id("cep").append(
            new a.Show().name("主介绍").id("cep").value([
                "我们准备了CEP, 实现类似汇编的编写, 目前我们需要一份高级语言的解析, 有意者联系 QQ: 3279826484", tk.br(),
                "使用以下方法调用",
                {
                    type: "code", height: "500px", mode: 'java', code: '\
import cn.mcres.karlatemp.mxlib.tools.CompilationEvalProcessor;\n\
import cn.mcres.karlatemp.mxlib.tools.IEvalProcessor;\n\
import cn.mcres.karlatemp.mxlib.tools.MapBuilder;\n\
\n\
import java.io.InputStream;\n\
import java.io.InputStreamReader;\n\
import java.nio.charset.StandardCharsets;\n\
import java.util.Arrays;\n\
import java.util.HashMap;\n\
import java.util.Scanner;\n\
\n\
public class EvalTester {\n\
\n\
    public static void main(String[] args) throws Throwable {\n\
        CompilationEvalProcessor cp = CompilationEvalProcessor.open();\n\
        Object ref = cp.compile(new Scanner(new InputStreamReader(\n\
                EvalTester.class.getResourceAsStream("test.txt"),\n\
                StandardCharsets.UTF_8\n\
        ))).invoke(new MapBuilder<String, Object>().add("Sys.out.pl",\n\
                (IEvalProcessor.Function.Lambda) (x, arg0) -> {\n\
                    System.out.println(arg0[0]);\n\
                    return null;\n\
                }\n\
        ));\n\
        System.out.println(ref);\n\
\n\
    }\n\
}'},
                "我们可以把他拆分为这几部分", {
                    type: "code", height: "500px", mode: 'java', code: '\
import cn.mcres.karlatemp.mxlib.tools.CompilationEvalProcessor;\n\
import cn.mcres.karlatemp.mxlib.tools.IEvalProcessor;\n\
import cn.mcres.karlatemp.mxlib.tools.MapBuilder;\n\
\n\
import java.io.InputStream;\n\
import java.io.InputStreamReader;\n\
import java.nio.charset.StandardCharsets;\n\
import java.util.Arrays;\n\
import java.util.HashMap;\n\
import java.util.Scanner;\n\
\n\
public class EvalTester {\n\
\n\
    public static void main(String[] args) throws Throwable {\n\
        CompilationEvalProcessor cp = CompilationEvalProcessor.open(); // 创建 CEP\n\
        IEvalProcessor.CompetedCode code = cp.compile(new Scanner(new InputStreamReader(\n\
                EvalTester.class.getResourceAsStream("test.txt"),\n\
                StandardCharsets.UTF_8\n\
        ))); // 翻译进 Java 运行时\n\
        Objecr ref = code.invoke(new MapBuilder<String, Object>().add("Sys.out.pl",// 添加 Sys.out.pl content\n\
                (IEvalProcessor.Function.Lambda) (x, arg0) -> {\n\
                    System.out.println(arg0[0]);\n\
                    return null;\n\
                }\n\
        ));\n\
        System.out.println(ref);\n\
\n\
    }\n\
}'}, "对于需要重复调用的, 不应该每次调用都直接编译, 而是把CompetedCode存在内存里并使用CompetedCode"
            ])
        ).append(
            new a.Show().name("test.txt").id('tt').value({
                type: "code", mode: 'java', height: "500px", code: '\n\
// 所有以 // 开头的为注释\n\
// stacks, variables\n\
// 文件开头定义可用的堆数量和变量数量, 目前配置: [5 stacks, 4 variables]\n\
5 4\n\
\n\
// $3 = 777 + 333\n\
put_int 777 // 把 777 推到堆顶\n\
put_int 233 // 把 333 推到堆顶\n\
add // 执行相加, 并把返回值推到堆顶\n\
set_var 3 // 把堆顶的数据存到第 4 个变量中\n\
\n\
  // Sys.out.pl(null, "Var 3:" + $3)\n\
  get_context Sys.out.pl// 取出 Sys.out.pl 的值, 这里注释左边没有空格是因为会变成 "Sys.out.pl "\n\
  put_null\n\
  put_string Var 3:\n\
  get_var 3\n\
  add\n\
  // 堆栈情况: \n\
  // "Var 3:"+$3    -> 参数列表, 可有更多, 具体数量有 invoke 控制\n\
  // null           -> 传给函数的 this 指针\n\
  // Function <Sys.out.pl> -> 函数\n\
  invoke 1 // 执行函数, 1 代表传入 1 个参数\n\
\n\
put_long 666\n\
put_long 555\n\
// StackTrace:\n\
// 555\n\
// 666\n\
subtract // 执行相减, 666 - 555\n\
set_var 2\n\
\n\
  // Sys.out.pl(null, "Var 2:" + $2)\n\
  get_context Sys.out.pl\n\
  put_null\n\
  put_string Var 2:\n\
  get_var 2\n\
  add\n\
  invoke 1\n\
\n\
// Sys.out.pl(null, "RFR:" + ($2 + $3))\n\
get_context Sys.out.pl\n\
put_null\n\
\n\
put_string RFR: // "RFR:" + ($2 + $3)\n\
  get_var 2\n\
  get_var 3\n\
  // 3\n  // 2\n  // "RFR:"\n  // null\n  // Function <Sys.out.pl> // Tips: 请注意堆栈大小\n\
  add // $2 + $3\n\
  // 5\n  // "RFR:"\n  // null\n  // Function <Sys.out.pl>\n\
add\n\
// "RFR:5"\n// null\n// Function <Sys.out.pl>\n\
\n\
invoke 1\n\
\n\
put_string Test message\n\
\n\
return\n\
put_int 8848\n\
put_null\n\
get_context Sys.out.pl\n\
invoke 1'})
        )
            .append(new a.Show().name("语法").id("grammar").value(
                BBox.create("div").create("p").html("文件会无视左边的空格, 所以可以使用缩进增加可读性")
                    .parent().create("p").html("全部以 // 开头的均为注释, 没有多行/区域注释").parent()
                    .create("table").propertie("border", "1")

                    .create("tr")
                    .create("th").text("符号").parent().create("th").text("参数").parent().create("th").text("操作").parent().create("th").text("示例").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_null").parent().create("td").text("<none>").parent().create("td").text("把 null 推到堆顶").parent().create("td").text("put_null").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_NaN").parent().create("td").text("<none>").parent().create("td").text("把 NaN 推到堆顶").parent().create("td").text("put_NaN").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_Infinity").parent().create("td").text("<none>").parent().create("td").text("把 Infinity 推到堆顶").parent().create("td").text("put_Infinity").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_NInfinity").parent().create("td").text("<none>").parent().create("td").text("把 -Infinity 推到堆顶").parent().create("td").text("put_Infinity").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_int").parent().create("td").text("[int数字]").parent().create("td").text("把一个int类型的数字推到堆顶").parent().create("td").text("put_int 2333").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_long").parent().create("td").text("[long类型数字]").parent().create("td").text("把一个long类型的数字推到堆顶").parent().create("td").text("put_long 3279826484").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_short").parent().create("td").text("[short类型数字]").parent().create("td").text("把一个short类型的数字推到堆顶").parent().create("td").text("put_short 7777").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_bool").parent().create("td").text("[true/false]").parent().create("td").text("把一个布尔值推到堆顶").parent().create("td").text("put_bool false").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("put_string").parent().create("td").text("[一串文本[注意空格]]").parent().create("td").text("把一个字符串推到堆顶").parent().create("td").text("put_string WhatAreYouDoing?").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("get_context").parent().create("td").text("[context的key值[注意空格]]").parent().create("td").text("从context取值并推到堆顶").parent().create("td").text("ge_context Sys.out.pl").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("get_var").parent().create("td").text("[变量id]").parent().create("td").text("取出指定变量并推到堆顶").parent().create("td").text("get_var 0").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("set_var").parent().create("td").text("[变量]").parent().create("td").text("把堆顶的值存入变量把堆栈移前").parent().create("td").text("get_context Sys.out.pl").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("xor").parent().create("td").text("<none>").parent().create("td").text("取出堆顶的两个值并进行异或操作").parent().create("td").text("xor").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("add").parent().create("td").text("<none>").parent().create("td").text("取出堆顶的两个值并进行相加操作").parent().create("td").text("add").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("subtract").parent().create("td").text("<none>").parent().create("td").text("取出堆顶的两个值并把第二位减第一位的值存入堆顶").parent().create("td").text("subtract").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("multiply").parent().create("td").text("<none>").parent().create("td").text("取出堆顶的两个值并进行相乘操作").parent().create("td").text("multiply").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("divide").parent().create("td").text("<none>").parent().create("td").text("取出堆顶的两个值并把第二位除以第一位的值存入堆顶").parent().create("td").text("divide").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("remainder").parent().create("td").text("<none>").parent().create("td").text("取出堆顶的两个值并把第二位取余第一位的值存入堆顶, $2 % $1").parent().create("td").text("remainder").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("compare").parent().create("td").text("<none>").parent().create("td").text("取出堆顶的两个值并把第二位于第一位的比较结果值存入堆顶").parent().create("td").text("compare").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("pow").parent().create("td").text("<none>").parent().create("td").text("取出堆顶的两个值并把第二位的第一位的次方比较结果值存入堆顶, Math.pow($2, $1)").parent().create("td").text("pow").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("abs").parent().create("td").text("<none>").parent().create("td").text("取堆顶的绝对值").parent().create("td").text("abs").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("or").parent().create("td").text("<none>").parent().create("td").text("把堆顶的两个值进行 或 操作, $2 | $1").parent().create("td").text("or").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("and").parent().create("td").text("<none>").parent().create("td").text("把堆顶的两个值进行 和 操作, $2 & $1").parent().create("td").text("or").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("negate").parent().create("td").text("<none>").parent().create("td").text("把堆顶值执行取反操作 ~$1").parent().create("td").text("negate").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("invoke").parent().create("td").text("[参数数量 n]").parent().create("td").text("执行函数 Function<$(2+n)> ($(1+n),...,$3,$2,$1)").parent().create("td").text("invoke 0").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("return").parent().create("td").text("<none>").parent().create("td").text("中断执行").parent().create("td").text("negate").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("random").parent().create("td").text("<none>").parent().create("td").text("把0~1的随机数值推入堆顶").parent().create("td").text("random").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("floor").parent().create("td").text("<none>").parent().create("td").text("把堆顶值去除小数部分").parent().create("td").text("floor").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("max").parent().create("td").text("<none>").parent().create("td").text("从堆顶取出两个值, 并把较大值放入堆顶").parent().create("td").text("max").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("min").parent().create("td").text("<none>").parent().create("td").text("从堆顶取出两个值, 并把较小值放入堆顶").parent().create("td").text("min").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("sqrt").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行开方操作").parent().create("td").text("sqrt").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("log").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行log操作").parent().create("td").text("log").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("acos").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行acos操作").parent().create("td").text("acos").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("cos").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行cos操作").parent().create("td").text("cos").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("cosh").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行cosh操作").parent().create("td").text("cosh").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("asin").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行asin操作").parent().create("td").text("asin").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("sin").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行sin操作").parent().create("td").text("sin").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("sinh").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行sinh操作").parent().create("td").text("sinh").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("tan").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行tan操作").parent().create("td").text("tan").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("tanh").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行tanh操作").parent().create("td").text("tanh").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("atan").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行atan操作").parent().create("td").text("atan").parent()
                    .parent()

                    .create("tr")
                    .create("td").text("ceil").parent().create("td").text("<none>").parent().create("td").text("对堆顶值执行ceil操作").parent().create("td").text("ceil").parent()
                    .parent()

                    .parent()
            ))
    ));
    a.append(new a.PageDown().name("2.2").append(
        new a.PageDown().name("新增注解").id("anno").append(
            new a.Show().name("Depend").value([
                "这个注解表示一个依赖. 代表这个依赖是有效的才会尝试加载",
                BBox.create("p")
                    .newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/annotations/Depend.html", "JavaDoc").create('br').parent()
                    .newLink("https://github.com/Karlatemp/MXBukkitLib/blob/master/Static/src/cn/mcres/karlatemp/mxlib/SharedConfigurationProcessor.java")
                    .dom,
                BBox.create("p").node("WARMING: 根据MXLib加载的")
                    .newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/DependChecker.html", "DependChecker")
                    .node("的不同可能会有所差别, 下面是")
                    .newLink("https://github.com/Karlatemp/MXBukkitLib/blob/master/Share/src/cn/mcres/karlatemp/mxlib/share/BukkitDependChecker.java", "Bukkit")
                    .node("的").color("#ff5f5f")
                    .dom,
                {
                    type: 'package', pck: {
                        'value': "所需要的插件", 'vesion': '插件所需要的版本', 'compare': '\
版本号的比较方式, 可为这些值\n\
-1 需要给定版本号之前的版本(可用给定版本号)\n\
      version = 1.0; [0.1 OK]       [1.0 OK]       [1.1 Unload.]\n\
-2 需要给定版本号之前的版本(不为此版本号)\n\
      version = 1.0; [0.1 OK]       [1.0 Unload.]  [1.1 Unload.]\n\
 0 需要与给定版本号相同的依赖\n\
 1 需要此版本之后的依赖(包括此版本)\n\
      version = 1.0; [0.1 Unloaded] [1.0 OK]       [1.1 OK]\n\
 2  需要此版本之后的依赖(不包括此版本)\n\
      version = 1.0; [0.1 Unloaded] [1.0 Unloaded] [1.1 OK]' }
                }
            ])
        ).append(new a.Show().name("AutoInstall").value(
            BBox.create("p").node("我们使用AutoInstall标记自动注册的内容")
                .create('br').parent().node('这将会调用 ')
                .newLink('javascript:void(0)', 'ServiceInstallers', true).on('click', function () {
                    a.open(["2.2", "module", "ServiceInstaller"], true);
                }).parent()
                .dom
        ))
    ).append(new a.PageDown().name("新增模块").id("module").append(
        new a.Show().name("ServiceInstaller").value([
            "ServiceInstaller. 他就只有一个方法", tk.br(),
            BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/ServiceInstaller.html#install(java.lang.Class)", "boolean install(Class)"),
            ", 十分简单, 他的返回值就是是否成功安装这个Class.", tk.br(),
            "但是我们不允许直接注册(Bean)ServiceInstall, 因为可以有多个ServiceInstall, 所以我们使用",
            BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/ServiceInstallers.html", "ServiceInstallers"),
            "我们用BeanManager获取并add ServiceInstaller 就成功安装进去了", tk.br(), tk.br(),
            BBox.create("pre").text("\
MXBukkit.getBeanManager().getBeanNonNull(ServiceInstallers.class).add(...);\n\n\
ServiceInstaller 规范:\n\
0. 不应该处理全部的类, 因为还有其他的ServiceInstaller\n\
1. 当不处理这个类的时候, 应该返回 false.\n\
2. 处理一个类, 无论成功与否, 都应该返回 true. 除非你想让其他ServiceInstaller接手.\n\
3. 如果在处理中处理失败, 直接抛出错误.或者ignore, 不要返回 false. 除非你想让其他ServiceInstaller接手.\n\
4. 如果你想让让后续的ServiceInstaller继续处理的话, 返回 false.").dom
        ])
    ).append(new a.Show().name("ResourceLoader").value([
        "ResourceLoader, MXLib 搜索资源用, 和 ServiceInstaller 相似, 注册需要使用 ResourceLoaders"
    ])).append(new a.Show().name("ClassResourceLoader").value([
        "ClassResourceLoader, 继承于 ResourceLoader, 是MXLib设计专门用来搜索类的字节码的. ",
        BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/tools/ClassResourceLoader.html", "JavaDoc"),
        tk.br(), "特别要注意的是, ClassResourceLoader直接注定了Depend系统能否正常工作, 如果无法通过ClassResourceLoaders搜索到字节码的话Depend将不会发挥任何作用."
    ])).append(new a.Show().name("MXLibBootProvider").id('provider').value([
        "MXLibBootProvider, 看名字就能知道, 他是为MXLib提供Boot服务的, 详情看",
        BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/SharedMXLibBootProvider.html", "JavaDoc"),
        tk.br(), '在调用 MXBukkitLib.boot() 后, 如果MXLib需要boot那么将会调用一次',
        BBox.newLink("https://karlatemp.github.io/MXBukkitLib/cn/mcres/karlatemp/mxlib/event/core/MXLibBootEvent.html", "cn.mcres.karlatemp.mxlib.event.core.MXLibBootEvent"),
        ", 我们可以监听此事件达到修改Provider的加载顺序,添加/删除Provider.",
        BBox.create("s").text("这让我想到了 JavaAgent").color('gray').dom
    ])).append(new a.Show().name("Event System").id("es").value([
        "从 2.2 开始, MXLib内置了一套事件系统.",
        BBox.create("pre").text("\
我们的Event创建规范:\n\
0. Event类必须得能获取一个HandlerList;\n\
1. 必须定义 pblic static final HandlerList<MXLibBootEvent> handlers = new HandlerList<>();\n\
   (可以是继承来的), 未来将会通过此规范创建Listener集合, 就像bukkit一样\n\
2. public HandlerList getHandlerList() 的返回值必须是 handlers 常量, 否则将导致执行错误.\n\n\
怎么触发这个事件?\n\
0. new ...Event().post();\n\
1. ...Event event = Event.post(new ...Event());").dom
    ]))));
    var V1_0 = new a.PageDown().name("1.0");
    var V2_0 = new a.PageDown().name("2.0");
    var Tools = new a.PageDown().name("工具")
        .append(new a.Show().name("lastest.log.gz读取").value(
            function () {
                var pool = document.createElement("div");
                if (!window.WebConsole) return pool;
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
                "我们提供了BeanManager以供管理使用, 下面是默认处理方法(在BeanManager被赋值前是可被覆盖的)", tk.br(),
                {
                    type: 'package', pck: {
                        "<T> void addBean(@NotNull Class<T> clazz,@NotNull T bean)": [
                            "检查 Class 是否被注解: ProhibitBean 并根据实际情况决定时候忽略此Bean",
                            "执行替换 Bean 方法"
                        ], "@Nullable <T> T getBean(@NotNull Class<T> type)": [
                            "直接搜索Bean方法, 请注意, 搜索 IBeanManager.class 是无意义行为."
                        ], "@NotNull <T> T getBeanNonNull(Class<T> type)": [
                            "首先Bean对象", "对对象进行判断, 会抛出NullPointerException", "返回Bean", "",
                            "T bean = getBean(type);", "if (bean == null)", "    throw new NullPointerException();", "return bean;"
                        ]
                    }
                }
            ]))
            .append(new a.Show().name("2.0文件结构").value({
                type: 'package', pck: {
                    'cn.mcres.karlatemp.mxlib': {
                        annotations: {
                            'Bean.java': ["AutoConfig 用, 标记需要注册的Bean"],
                            'CommandHandle.java': ["命令模块使用, 标记命令入口"],
                            'CommandTabHandle.java': ["命令模块使用, 标记Tab列表入口"],
                            'Configuration.java': ["AutoConfig使用, 标记这是一个Configuration"],
                            'ProhibitBean.java': ["标记不应该被注册到BeanManager"],
                            'ProhibitType.java': [
                                "PB.java用, 定义忽略类型, 默认ALL_WITH_SUBCLASS",
                                {
                                    'ONLY_CURRENT': "不允许直接注册当前类, 但是允许子类注册",
                                    'ALL_WITH_SUCLASS': '不允许自己&子类&实现类注册'
                                }
                            ],
                            'Resource.java': ['定义资源使用']
                        },
                        bean: {
                            'IBeanManager.java': [
                                "BeanManager核心",
                                {
                                    "<T> void addBean(@NotNull Class<T>, T)": "注册/覆盖Bean",
                                    "@Nullable <T> T getBean(@NotNull Class<T>)": "在BeanManager搜索Bean",
                                    "@NotNull <T> T getBeanNonNull(@NotNull Class<?>)": "见 BeanManager章节",
                                    "@NotNull <T> Optional<T> getOptional(@NotNull Class<T>)": "略",
                                    "@NotNull Map<Class<?>, Object> getBeans()": "获取全部Bean"
                                }
                            ],
                            'IEnvironmentFactory.java': [
                                "环境构造器(读取配置的)"
                            ],
                            "IInjector.java": [
                                "为对象注入 @Resource 字段对应的内容",
                                {
                                    "<T> T inject(@NotNull T)": "注入对象(非static字段)",
                                    "<T> void inject(@NotNull Class<T>)": "注入类(static字段)"
                                }
                            ]
                        },
                        bukkit: [
                            "<Error>"
                        ],
                        logging: {
                            "ILogger.java": [
                                "日志系统的核心"
                            ],
                            "IMessageFactory.java": [
                                "ILogger的信息处理器(格式化器Formatter)",
                                {
                                    "String excpre(String)": "获取输入值相当于多少个空格",
                                    "String toConsole(String)": "获取能正确输出到控制台的值"
                                }
                            ],
                            "PrefixSupplier.java": [
                                "前缀处理器"
                            ],
                            "Ansi.java": [
                                "输出Ansi(彩色), 内置代码来源 Bukkit, Windows CMD使用需要JANSI"
                            ],
                            "MessageFactoryImpl.java": "默认实现方法, 没有ANSI颜色",
                            "MessageFactoryAnsi.java": "继承于MessageFactoryImpl, 拥有ANSI颜色",
                            "MessageFactoryBukkit.java": "于MessageFactoryAnsi一样,但是不是使用ANSI而是Bukkit的 §",
                            "AbstractLogger.java": "实现了基本ILogger.java",
                            "AbstractBaseLogger.java": "继承于AbstractLogger, 只需要实现 输出一行的方法 writeLine() 和获取前缀的方法 getPrefix() 就行",
                            "PrintStreamLogger.java": "继承于AbstractBaseLogger, 将把日志输出到PrintStream上",
                            "MLoggerHandler.java": "继承于 java.util.logging.Handler, 把java原生日志输出到ILogger里",
                            "MLogger.java": "继承于java.util.logging.Logger, 把日志转输出到一个Handler上, 此日志器不能添加Handler以及修改Parent"
                        },
                        tools: {
                            "CharCompiler.java": [
                                "URI编码/解码用,可自定义"
                            ],
                            "EmptyStream.java": "空操作流",
                            "IClassScanner.java": "Class搜索器",
                            "IMemberScanner.java": "类的全部成员搜索器",
                            "IObjectCreator.java": "对象创建器, 目标构造器参数为BeanManger搜索的值",
                            "MapBuilder.java": "Map构造工具",
                            "Pointer.java": "当做指针用",
                            "SaftList.java": "添加了验证的List",
                            "ThrowHelper.java": "错误抛出器, 可强制抛出错误(throw checked throwable)",
                            "Toolkit.java": [
                                "工具集合",
                                {
                                    "String getPackageByClassName(String className)": "截取className的包名",
                                    "String getClassSimpleName(String className)": "截取className的简短名",
                                    "Comparator<String> getPackageComparator()": "获取package比较器",
                                    "<T> Class<T> getClass(T obj)": "安全取Class",
                                    "boolean isNum(String val)": "简易判断是否是正整数数字(没长度限制)",
                                    "Reflection.java": {
                                        "MethodHandles.Lookup getRoot()": "获取最高权限的Lookup",
                                        "Class<?> defineClass(ClassLoader loader,String name,byte[] code,int off,int len,ProtocentionDomain protectionDomain)":
                                            "在ClassLoader加载一个类, 如果ClassLoader里有重复类将会报错, 常用于加载动态生成的类",
                                        "Class<?> getCallerClass()": "获取当前方法是谁访问的, 就像sun.reflection.getCallerClass() 一样,但是没有任何限制",
                                        "Class<?> getCallerClass(int pos)": [
                                            "获取第 ${pos} 个访问者", "",
                                            "\
class Core{\n\
    void run(){\n\
        System.out.println(Toolkit.Reflection.getCallerClass()); // Proxy.class\n\
        System.out.println(Toolkit.Reflection.getCallerClass(0));// Proxy.class\n\
        System.out.println(Toolkit.Reflection.getCallerClass(1));// Proxy2.class\n\
        System.out.println(Toolkit.Reflection.getCallerClass(2));// RealCaller.class\n\
        for(Object o : new Throwable().getStackTrace()) System.out.println(o); // Dump Stack Trace\n\
    }\n\
}\nclass Proxy{\n\
    void run(){\n\
        new Core().run();\n\
    }\n\
}\nclass Proxy2{\n\
    void run(){\n\
        new Proxy().run();\n\
    }\n\
}\npublic class RealCaller{\n\
    public static void main(String[] args){\n\
        new Proxy2().run();\n\
    }\n\
}"
                                        ]
                                    },
                                    "StackTrace": [
                                        "StackTraceElement和Class, 真正意义上的堆栈",
                                        "实现原理: java.lang.SecurityManager 的 protected native Class<?>[] getClassContext() 方法",
                                        {
                                            "StackTrace[] getStackTraces()": "获取当前线程的堆栈",
                                            "Class[] getClassContext()": "获取当前线程的堆栈"
                                        }
                                    ]
                                }
                            ]
                        },
                        "MXBukkitLib.java": [
                            "核心转储类",
                            {
                                "public static final String BUILD_VERSION": "获取MXLib的版本, 可用于构造依赖版本显示(用于构建时)",
                                "public static String getCurrentVersion()": "同上,但是因为是函数所以是用于运行时显示的",
                                "public static IBeanManager getBeanManager()": "获取BeanManager",
                                "public static ILogger getLogger()": "获取日志系统",
                                "public static void setLogger(ILogger logger)": "覆盖日志系统",
                                "public static synchronized void setBeanManager(@NotNull IBeanManager bm)": "设置BeanManager, 如果已经被设置了就会报错"
                            }
                        ]
                    }
                }
            }))
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