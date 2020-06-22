module.exports = {
// 所有的postcss插件
  plugins: {
  //   自动给css样式加前缀的属性 display:flex  => 自动其他浏览器的前缀
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 基准值 font-size: 30px  =>  300/ rootValue = rem
      // rootValue 是转换px的基准值，参考设备iPhone6，设备宽度375px。
      propList: ['*'] // 包括哪些文件  所有的文件都转化rem
    }
  }
}
