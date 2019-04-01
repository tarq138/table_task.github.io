window.onload = function(){
    var max = 20;
    
    
    var request = new XMLHttpRequest();

    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/', false);

    request.send();

    if (request.status != 200){
        console.log(request.status + ' ' + request.statusText)
    } else {
        var Data = JSON.parse(request.responseText)
        var tbody = document.querySelector('tbody');
        function print(){
            tbody.innerHTML = "";
            for (user in Data){
                if (user == max) break;
                if (Data[user].completed){
                    tbody.innerHTML += "<tr><td class='userId' id='" + user + "'>" + Data[user].userId + "</td><th scope='row' class='Id' id='" + user + "'>" + Data[user].id + "</th><td class='title' id='" + user + "'>" + Data[user].title + "</td><td><div class='donecheck'" + "id='" + user + "'><i class='fas fa-check'></i></div><div class='nonetimes'" + "id='" + user + "'><i class='fas fa-times'></i></div></td></tr>";
                } else{
                    tbody.innerHTML += "<tr><td class='userId' id='" + user + "'>" + Data[user].userId + "</td><th scope='row' class='Id' id='" + user + "'>" + Data[user].id + "</th><td class='title' id='" + user + "'>" + Data[user].title + "</td><td><div class='nonecheck'" + "id='" + user + "'><i class='fas fa-check'></i></div><div class='donetimes'" + "id='" + user + "'><i class='fas fa-times'></i></div></td></tr>";
                }
            }
            return;
        }
        window.onscroll = () =>{
            if ((20 * Math.floor(scrollY/100) + 20) > max) max = (20 * Math.floor(scrollY/100) + 20);
            print();
        }
        print();
        var userid = true;
        var id = true;
        var title = true;
        var completed = true;
        var tmp = [];

        document.getElementById('UserId').onclick = function(){
            if (userid){
                userid = false
                for (var left = 0; left < Data.length-1; left++){
                    for (var right = left + 1; right < Data.length; right++){
                        if (Data[left].userId < Data[right].userId){
                            tmp[0] = Data[left];
                            Data[left] = Data[right];
                            Data[right] = tmp[0];
                        }
                    } 
                }
            } else{
               userid = true
               for (var left = 0; left < Data.length-1; left++){
                    for (var right = left + 1; right < Data.length; right++){
                        if (Data[left].id > Data[right].id){
                            tmp[0] = Data[left];
                            Data[left] = Data[right];
                            Data[right] = tmp[0];
                        }
                    } 
                }  
            }
            print();
        }

        document.getElementById('Id').onclick = function(){
            if (id){
                id = false
                for (var left = 0; left < Data.length-1; left++){
                    for (var right = left + 1; right < Data.length; right++){
                        if (Data[left].id < Data[right].id){
                            tmp[0] = Data[left];
                            Data[left] = Data[right];
                            Data[right] = tmp[0];
                        }
                    } 
                }
            } else{
               id = true
               for (var left = 0; left < Data.length-1; left++){
                    for (var right = left + 1; right < Data.length; right++){
                        if (Data[left].id > Data[right].id){
                            tmp[0] = Data[left];
                            Data[left] = Data[right];
                            Data[right] = tmp[0];
                        }
                    } 
                }  
            }
            print();
        };

        document.getElementById('Title').onclick = function(){
            if (title){
                title = false
                for (var left = 0; left < Data.length-1; left++){
                    for (var right = left + 1; right < Data.length; right++){
                        if (Data[left].title.length > Data[right].title.length){
                            tmp[0] = Data[left];
                            Data[left] = Data[right];
                            Data[right] = tmp[0];
                        }
                    } 
                }
            } else{
               title = true
               for (var left = 0; left < Data.length-1; left++){
                    for (var right = left + 1; right < Data.length; right++){
                        if (Data[left].title.length < Data[right].title.length){
                            tmp[0] = Data[left];
                            Data[left] = Data[right];
                            Data[right] = tmp[0];
                        }
                    } 
                }  
            }
            print();
        }

        document.getElementById('Completed').onclick = function(){
            if (completed){
                completed = false
                for (var left = 0; left < Data.length-1; left++){
                    for (var right = left + 1; right < Data.length; right++){
                        if (Data[left].completed < Data[right].completed){
                            tmp[0] = Data[left];
                            Data[left] = Data[right];
                            Data[right] = tmp[0];
                        }
                    } 
                }
            } else{
               completed = true
               for (var left = 0; left < Data.length-1; left++){
                    for (var right = left + 1; right < Data.length; right++){
                        if (Data[left].completed > Data[right].completed){
                            tmp[0] = Data[left];
                            Data[left] = Data[right];
                            Data[right] = tmp[0];
                        }
                    } 
                }  
            }
            print();
        }

        var editing;
        var idvalue;
        tbody.onclick = function(event){
            var target = event.target;
            while (target != tbody){
                if (target.className == 'title'){
                    idvalue = target.id;
                    if (editing) return; // already editing
                    makeEditable(target);
                    return;
                }
                if (target.className == 'edit-ok') {
                    finishTdEdit(editing.elem);
                    return;
                }
                if ((target.className == 'nonecheck') || (target.className == 'donecheck')){
                    Data[target.id].completed = true;
                    print();
                    return;
                }
                if ((target.className == 'nonetimes') || (target.className == 'donetimes')){
                    Data[target.id].completed = false;
                    print();
                    return;
                }
                target = target.parentNode;

            }
        }

        function makeEditable(td){
            editing = {
                elem: td,
                data: td.innerHTML
            };
            td.classList.add('edit-td'); // title hasn't textarea!

            var textArea = document.createElement('textarea');
            textArea.style.width = '100%';
            textArea.style.height = '100%';
            textArea.className = 'edit-area';
            textArea.value = td.innerHTML;
            td.innerHTML = '';
            td.appendChild(textArea);
            textArea.focus();
            td.insertAdjacentHTML("beforeEnd",
            '<div class="edit-controls"><button class="edit-ok">OK</button></div>'
            );

        }

        function finishTdEdit(td) {
            td.innerHTML = td.firstChild.value;
            Data[idvalue].title = td.innerHTML;
            td.classList.remove('edit-td'); // remove edit class
            editing = null;
        }
    }
}