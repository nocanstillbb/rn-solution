![76ef8e786778ab45bdef5d0092cbecff](https://github.com/user-attachments/assets/5582a788-e355-4349-8df0-19c9c64ffef1)
这是一个为了探索《用一份react native c++ jsi代码在同时用于android/ios/macos/windows》创建的工程  
使用eigen c++库中的cpu指令加速的卷积运算快速统计格子中的数字

在rn的新架构中，c++可以和ts一起封装为npm模块，由react-native的autolink机制快速集成于下列几种rn项目  
+ andorid : gradel + cmake 
+ ios/mac : xcodeproj + podspec
+ windows : vs solution project + vcxproj


 为了制作c++和ts相结合的Npm模块 需要清楚react native的autolink，是怎么处理的  
 以及turbomodule 的jsi方案   
 我制作了一些纯cpp或cpp+ts的npm模块放在npm_modules目录之中，可供参照  
 其中的prism-rn基于我的c++静态反射库`prism` 对react-native jsi的封装，可以在typescript + react hook 的环境中，双向绑定c++数据  

经评测，rn 全平台方案，截止 2025.10.29 ，版本为0.82， 新架构还不是很成熟
以微软的fulent ui 为例， 新架构的控件还不是很完善， 写点表单软件还行， 复杂的情况只能自己用fabric封装原生控件了  
不如让子弹飞一会儿

 ---


由于react native for mac不支持monorepos  
所以只能以app本身为monorepo的root  
又由于symbol link会导致metro打包失败，npm-modules又需要在 各平台的app中通用  
所以把目录结构定为  

```

../
rn-solution/
| appwin/
| | ...
| | ...
| | ...
| | npm-modules/
| appmacos/
| | ...
| | ...
| | npm-modules/
| appmobile/
| | ...
| | ...
| | npm-modules/

```
npm-modules虽然是三份代码, 但是是通过git submodule加入的,所以可以方便的通过git 同步  

这样所有递归依赖的npm模块就会者安装在app的node_modules之中  
即: 

+ react native for windows 就可以扫描到所有的npm子模块中的turbo module/fabric项目的vcxproj 加到根目录的解决方案中  
+ npm包中的c++ 代码扁平化，方便所有模块中的c++代码组织
+ 不同的平台的app可以安装不同的包, 或版本不相同的包,(mobile/win/mac的rn版本支持不是同时的)

同时可以在不修改项目按官方文档来初始化项目,不必像传统的monorepo那样修改metro打包之类的繁事项  

