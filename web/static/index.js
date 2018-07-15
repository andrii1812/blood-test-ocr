(function(){
    fetch('/reference_names')
        .then(x => x.json())
        .then(x => x.map(s => document.write(s + '<br>')));
})()