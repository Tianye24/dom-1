//creat函数测试
const div = dom.create("<div>newDiv</div>");
console.log(div);
//after函数测试
const div1 = dom.create("<div>我是test的弟弟</div>");
console.log(div1);
dom.after(test, div1);

//before函数测试
const div2 = dom.create("<div>我是test的哥哥</div>");
console.log(div2);
dom.before(test, div2);

//append函数测试
const div3 = dom.create("<div>我是test的儿子</div>");
console.log(div3);
dom.append(test, div3);


//wrap函数测试
const div4 = dom.create("<div>我是test爸爸</div>");
dom.wrap(test, div4);
console.log(div4);

//empty函数测试
const nodes = dom.empty(window.empty)
console.log(nodes)

//attr函数测试
dom.attr(test, 'title', 'Hi')
const title = dom.attr(test,'title')
console.log(`title: ${title}`)

//text函数测试
dom.text(test, '你好，这是新的内容')
dom.text(test)

//html函数测试
dom.html(test, "<p>我是新增加的html内容</p>");
const c = dom.html(test);
console.log(c);

//style函数测试
dom.style(test, {border: '1px solid red', color: 'blue'})
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')

//class函数测试
dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test,'blue'))
//on/off 函数测试
const fn = ()=>{
    console.log('点击了')
}
dom.on(test,'click', fn)
dom.off(test,'click', fn)


//find函数测试
const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])

//siblings函数测试
console.log(dom.parent(test))
//next/previous函数测试

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

//each函数测试
const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n)=> dom.style(n, 'color', 'red'))

//next函数测试
console.log(dom.index(s2))