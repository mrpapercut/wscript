class renderVFS {
    constructor(vfsobj, parentel) {
        this.treeObj = this.createTree(vfsobj);
        this.parentel = parentel || document.body;
        this.elid = 0;

        for (var u in this.treeObj) {
            this.generateHTML(u, this.treeObj[u]);
        }

        document.querySelector('li#el0').parentElement.style.display = 'block';
    }

    createTree(vfs) {
        var PATH_SEP = '\\';
        var tree = {};

        var populateTree = function(item) {
            var paths = item.path.split(PATH_SEP).filter(_=>_),
                current = tree,
                i;

            for (i = 0; i < paths.length; i++) {
                if (current[paths[i]] === undefined) {
                    current[paths[i]] = {};
                    if (item.type === 'file' && i === paths.length - 1) {
                        current[paths[i]] = item;
                    }

                }

                current = current[paths[i]];
            }
        }

        for (var i = 0; i < vfs.length; i++) {
            if (vfs[i].type !== 'drive') {
                populateTree(vfs[i]);
            }
        }

        return tree;
    }

    generateHTML(name, item) {
        var a2h = str => str.split('').map(e=>e.charCodeAt(0).toString(16)).join(''),
            pospar = this.parentel.innerText.length > 0 ? document.querySelector(`li[data-name=el-${a2h(this.parentel.innerText)}]`) : null,
            ul = document.createElement('ul'),
            li = document.createElement('li');

        ul.addEventListener('click', function(e) {
            e.stopPropagation();
            e.target.classList.toggle('open');
        })

        li.classList.add('open');
        li.innerText = name;
        li.id = 'el' + this.elid;
        li.setAttribute('data-name', 'el-' + a2h(name));
        this.elid++;

        ul.appendChild(li);
        this.parentel.appendChild(ul);
        this.parentel = li;

        if (!item.hasOwnProperty('type')) {
            for (var i in item) {
                this.generateHTML(i, item[i]);
            }
        } else {
            this.addFile(item);
        }

        this.parentel = pospar || document.querySelector('li#el0');
    }

    addFile(file) {
        var ul = document.createElement('ul'),
            li = content => {
                var el = document.createElement('li');
                el.classList.add('fileprop');
                el.innerText = content;
                return el;
            };

        for (var i in file) {
            ul.appendChild(li(`${i}: "${file[i]}"`));
        }

        ul.classList.add('fileobject');
        this.parentel.appendChild(ul);
    }
}