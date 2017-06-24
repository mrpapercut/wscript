if (window.WScript && window.VFS) {
    window.setTimeout(_ => {
        new renderVFS(VFS._vfs, document.getElementById("vfs"));
        attachTabs()
    }, 500);

    // Attaching Run button from Input tab
    var runBtn = document.getElementById('runInput');
    runBtn.addEventListener('click', function() {
        window.parent.setIframeCode(document.getElementById('input').children[1].value, 'input');
    });
}