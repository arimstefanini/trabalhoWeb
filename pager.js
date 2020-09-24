
//Pager is a class containing the core logic of an interactive table.
//It displays a manageable subset of an arbitrarily sized dataset, provided to it
//as a javascript object array with its members having predefined structure.
class Pager{
    constructor(target, jsonData){
        this.target=target;
        this.page=0;
        this.pagesize=10;
        this.customers=jsonData;//expects an object array.
        this.refresh();
    }

    //renders the whole table again to show any new content.
    refresh(){
        this.target.innerHTML=" <tr><th>nome</th><th>sobrenome</th><th>email</th><th>endereço</th><th>país</th><th>estado</th><th>telefone</th></tr>";
        var i;
        for(i=0;i<this.pagesize;i++){
            if(!(this.pagesize*this.page +i >=this.customers.length)){
            let unit=this.customers[this.pagesize*this.page +i];
            this.target.innerHTML=
            this.target.innerHTML.concat("<tr>", this.addTableCol(unit.firstName),
            this.addTableCol(unit.lastName), this.addTableCol(unit.emailAddress), 
            this.addTableCol(unit.address), this.addTableCol(unit.country), 
            this.addTableCol(unit.state), this.addTableCol(unit.phoneNumber), "</tr>");
            }
        }
        this.target.innerHTML.concat()
    }

    //increments page by one if there is anything to display;
    //triggers a refresh. 
    next(){
        this.page+=1;
        if(this.page*this.pagesize >= this.customers.length){
            this.page-=1;
        }
        else{
            this.refresh();
        }
    }

    //decrements page number by one if not already zero.
    //triggers refresh.
    prev(){
        this.page-=1;
        if(this.page<0){
            this.page+=1;
        }
        else{
            this.refresh();
        }
    }

    //utility function for churning out table rows.
    addTableCol(sauce){
        return "<td>"+sauce+"</td>"
    }
}

var thePager;

var externalOBJ;
//get customer list as JSON built from a string 
//that was fetched via an HTTP GET request
//and build the paged table from it.
let request= new XMLHttpRequest();
request.onreadystatechange=function(){
    if(this.readyState==4 && this.status ==200){
        externalOBJ=JSON.parse(this.responseText);
        thePager=new Pager(document.getElementById("pager"), externalOBJ);
    }
}
request.open("GET", "customers.json", true);
request.send();

//point the onclick attributes of left-button and right-button
//to prev() and next() respectively on the pager object.
//yes, it's that simple.
document.getElementById("lb").onclick= function(){
    thePager.prev();
}
document.getElementById("rb").onclick= function(){
    thePager.next();
}

var pagebtn=document.getElementById("pageSizeBtn");
