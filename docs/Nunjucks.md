> 本项目中，我们使用 koa-nunjucks-2 作为模板引擎。Nunjucks 是 Mozilla 开发的，纯 js 编写的模板引擎，既可以用在 Node 环境下，也可以运行在浏览器端。koa-nunjucks-2 是基于 Nunjucks 封装出来的第三方中间件，完美支持 Koa2。

# 变量
``` bash
{{ username }}
{{ foo.bar }}
{{ foo["bar"] }}
// 如果变量的值为 undefined 或 null ，将不予显示。
```

# 过滤器
``` bash
{{ foo | title }}
{{ foo | join(",") }}
{{ foo | replace("foo", "bar") | capitalize }}
```

# if 判断
``` bash
{% if variable %}
  It is true
{% endif %}

{% if hungry %}
  I am hungry
{% elif tired %}
  I am tired
{% else %}
  I am good!
{% endif %}
```

# for 循环
``` bash
var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}]

<h1>Posts</h1>
<ul>
{% for item in items %}
  <li>{{ item.title }}</li>
{% else %}
  <li>This would display if the 'item' collection were empty</li>
{% endfor %}
</ul>
```

# macro 宏
``` bash
// 宏：定义可复用的内容，类似于编程语言中的函数
{% macro field(name, value='', type='text') %}
  <div class="field">
    <input type="{{ type }}" name="{{ name }}" value="{{ value | escape }}" />
  </div>
{% endmacro %}
// 接下来就可以把 field 当作函数一样使用：
{{ field('user') }}
{{ field('pass', type='password') }}
```

# 继承功能
网页常见的结构大多是头部、中间体加尾部，同一个网站下的多个网页，头部和尾部内容通常来说基本一致。于是我们可以采用继承功能来进行编写。
``` bash
// 先定义一个 layout.html
<html>
  <head>
    {% block head %}
    <link rel="stylesheet">
    {% endblock %}
  </head>  
  <body>
    {% block header %}
    <h1>this is header</h1>
    {% endblock %}

    {% block body %}
    <h1>this is body</h1>
    {% endblock %}

    {% block footer %}
    <h1>this is footer</h1>  
    {% endblock %}

    {% block content %}
    <script>
      //this is place for javascript
    </script>
    {% endblock %}
  </body>
</html>
```
layout 定义了五个模块，分别命名为：head、header、body、footer、content。header 和 footer 是公用的，因此基本不动。业务代码的修改只需要在 body 内容体中进行、业务样式表和业务脚本分别在头部 head 和底部 content 中引入。

``` bash
// 接下来我们再定义一个业务级别的视图页面：home.html
{% extends 'layout.html' %}

{% block head %}
<link href="home.css">
{% endblock %}

{% block body %}
<h1>home 页面内容</h1>
{% endblock %}

{% block content %}
<script src="home.js"></script>
{% endblock%}
```
最终的 home.html 输出后如下所示：

``` bash
<html>
  <head>
    <link href="home.css">
  </head>  
  <body>
    <h1>this is header</h1>

    <h1>home 页面内容</h1>

    <h1>this is footer</h1>  

    <script src="home.js"></script>
  </body>
</html>
```
