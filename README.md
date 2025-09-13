由于react native for mac不支持monorepos
所以只能以app本身为monorepo的root
又由于windows不支持symbol link，npm-modules又需要在 各平台的app中通用
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
| | npm-modules-> ...appwin/npm-modules
| appmobile/
| | ...
| | ...
| | npm-modules-> ...appwin/npm-modules

```


这样所有递归依赖的npm模块就会者安装在app的node_modules之中

这样是为了

+ react native for windows 就可以扫描到所有的npm子模块中的turbo module/fabric项目的vcxproj 加到根目录的解决方案中
+ npm包中的c++ 代码扁平化，方便所有模块中的c++代码组织

同时，即可以在不修改项目按官方文档来初始化项目,不必像传统的monorepo那样修改metro打包之类的繁事项

