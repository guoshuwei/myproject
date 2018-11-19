1、
/**
 * es67 nodejs 依赖库
 */
npm uninstall babel-core babel-preset-es2015 babel-preset-stage-2 babel-plugin-transform-class-properties babel-plugin-transform-decorators babel-plugin-syntax-dynamic-import babel-plugin-transform-es3-member-expression-literals babel-plugin-transform-es3-property-literals babel-plugin-transform-remove-strict-mode babel-preset-es2015-native-modules babel-plugin-transform-strict-mode
npm uninstall --global babel-core babel-preset-es2015 babel-preset-stage-2 babel-plugin-transform-class-properties babel-plugin-transform-decorators babel-plugin-syntax-dynamic-import babel-plugin-transform-es3-member-expression-literals babel-plugin-transform-es3-property-literals babel-plugin-transform-remove-strict-mode babel-preset-es2015-native-modules babel-plugin-transform-strict-mode
npm install --global babel-preset-es2015-script babel-plugin-transform-remove-strict-mode babel-plugin-transform-es2015-modules-commonjs babel-core babel-preset-es2015 babel-preset-stage-2 babel-plugin-transform-class-properties babel-plugin-transform-decorators babel-plugin-syntax-dynamic-import babel-plugin-transform-es3-member-expression-literals babel-plugin-transform-es3-property-literals


2、
/**
 * phpstorm 设置支持es67脚本编译
 */
菜单File/settings/Languages & Frameworks/JavaScript/JavaScript language version下拉框选择ECMAScript6



3、注意：
（1）不要使用新特性：export default, 低版本浏览器可能会有问题，用传统的export.xxx = yyy代替。
（2）不要使用新特性：import。
（3）尽量别使用this,某些转换会有问题。