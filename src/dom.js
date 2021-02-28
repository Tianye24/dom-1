window.dom = {
    //新建全局对象dom，这样我们就可以往这个对象里面增加东西，哪儿都可以用来
    //一、增加
    //1.函数create
    create(string) {
        //参数是我们想加入的HTML
        const container = document.createElement("template");//新建一个元素template当容器
        container.innerHTML = string.trim();//把HTML内容加入容器中，成为容器的第一个小孩//(字符串两边的空格已被去掉，不然前面有空格就不是第一个小孩了)
        return container.content.firstChild;//返回第一个小孩也就是我们要加的HTML
    },
    //2.after函数用于给node新建个弟弟node2
    after(node,node2) {
        console.log(node.nextSibling);
        node.parentNode.insertBefore(node2,node.nextSibling);//在node的爸爸使用在我里面 的 node后面的那个节点的前面插入node2
    },//就算没有下个节点也可以成功
    //3.before函数用于给node新建个哥哥node2
    before(node,node2){
        node.parentNode.insertBefore(node2,node);//在node的爸爸使用在我里面 的 node前面插入node2
    },
    //4.append函数用于新建个儿子
    append(parent,node){
        parent.appendChild(node)
    },
    //5.wrap函数用于新建个爸爸
    wrap(node,parent){
        dom.before(node,parent)//先让parent当node的哥哥
        dom.append(parent,node) //让parent的儿子是node//appendChild函数对最新的爸爸叫爸爸，以前的爸爸里面会被删掉
    },
    //二、删除
    //1.remove函数用于删除节点
    remove(node){
        node.parentNode.removeChild(node)//让这个节点的爸爸删除这个儿子
        return node//还可以保留这个节点的引用
    },
    //2.empty函数用于删除后代
    empty(node){
        const array = []
        let x =node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    //三、改
    //1.attr函数用于读写一个节点的属性
    attr(node, name, value){//重载：根据参数的长度实现不同的效果
        if(arguments.length === 3){
          node.setAttribute(name,value)//如果长度为3就set
        }else if(arguments.length ===2){
            return node.getAttribute(name)//如果长度为2就get
        }
    },
    //text函数读写一个节点里的文本内容，会覆盖
    text(node,string){//适配
        if(arguments.length ===2){
            if('innerText' in node){
                node.innerText = string
            }else{
                node.textContent = string
        }
    }else if(arguments.length ===1){
        if('innerText' in node){
            return node.innerText
        }else{
            return node.textContent
        }
        }
        
    },
    //html函数读写一个节点里的html内容，会覆盖
    html(node,string){
        if(arguments.length ===2){
            node.innerHTML = string
        }else if(arguments.length ===1){
            return node.innerHTML
        }
    },
    //style函数读写一个节点的style属性
    style(node, name, value){
        if(arguments.length===3){
        //dom.style(test,'color','red')增加或改color
            node.style[name] = value
        }else if(arguments.length===2){
            if(typeof name === 'string'){
             //dom.style(test,'color') 读
                return node.style[name]
            }else if(name instanceof Object){
            // dom.style(test, {color: "red" }) 增加或改所有style属
                const object = name
                for(let key in object){
                    node.style[key] = object[key]
                }
            }
          }
        },
    //class函数用于增加、删除、检查元素的class属性值 
    class: {
        add(node, className){
            node.classList.add(className)
        }, //在一个对象里，可以这样声明一个函数 //相当于'add':function (){}
        remove(node, className){
            node.classList.remove(className)
        },
        has(node, className){
            return node.classList.contains(className)
        }
    },
    //on函数用于添加事件监听
    on(node, eventName, fn){
        node.addEventListener(eventName, fn)
    },
    //off函数用于删除事件监听
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn)
    },
    //四、查
    //find函数查看满足选择器的所有元素
    find(selector, scope){
        return(scope || document).querySelectorAll(selector)//如果有scope，就用scope调用querySelectorAll，如果没有，就用document调用
    },
    //parent函数找一个节点的爸爸
    parent(node){
        return node.parentNode
    },
    //children函数找一个节点的儿子  //会实时变化
    children(node){
        return node.children
    },
    //)siblings函数找一个节点的所有兄弟姐妹
    siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n=>n!==node)//把伪数组变成数组，在用filter过滤，选择不是node本身的节点
    },
    //next函数找一个节点的弟弟
    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){//如果x存在，而且他是文本节点
            x = x.nextSibling//就让他的弟弟成为新x
        }//直到x不存在或者x不是文本节点就可以停下了
        return x
    },
    //previous函数找一个节点的哥哥
    previous(node){
        let x = node.previousSibling //把节点的哥哥叫做x
        while(x && x.nodeType === 3){ //如果x存在，而且他是文本节点
            x = x.previousSibling//就让他的哥哥成为新x
        }//直到x不存在或者x不是文本节点就可以停下了
        return x
    },
    //each函数遍历范围内所有节点，执行自写函数
    each(nodeList, fn){
        for(let i=0;i<nodeList.length;i++){
            fn.call(null, nodeList[i])
        }
    },
    //index函数用于获取一个节点排行老几
    index(node){
        const list = dom.children(node.parentNode)//因为会实时变化，所以就先把他固定起来
        let i
        for(i=0;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i 
      }
 
};


