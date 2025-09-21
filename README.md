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

