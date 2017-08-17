(function(a){
    var url=location.href.indexOf('homePage')<0 ? '/website/wp-content/themes/cheche/assets/v2/' : './';
    seajs.config({
        base:url,
        //设置路径
        paths: {
            'path': (a ? 'js' : 'produce/js'),
            'cssPath':(a ? 'css' : 'produce/css'),
        },
        alias: {
            'index':'path/index',
            'indexCss':'cssPath/index.css'
        },
        preload: ['indexCss','jQuery']
    });


})(/dev/.test(location.search))
