

//
/*CLASSES FOR PAGED LIST OPERATION*/
//

//Pager is a class containing the core logic of an interactive table.
//It displays a manageable subset of an arbitrarily sized dataset, provided to it
//as a javascript object array with its members having predefined structure.
class Pager{
    constructor(target, jsonData){
        this.target=target;
        this.page=0;
        this.pagesize=10;
        this.customers=jsonData;//expects an object array.
        this.observers=null;
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
        this.target.innerHTML.concat();

        if(this.observers!=null){
            var member;
            for(member of this.observers)
                member.notify(this);
        }
    }

    //attempts to increment page number. 
    next(){
        this.setPage(this.page+1);
    }

    //attempts to decrement page number.
    prev(){
        this.setPage(this.page-1);
    }

    //discards any page number outside valid range;
    //updates list if valid.
    setPage(newValue){
        if((newValue>=0) && (newValue*this.pagesize < this.customers.length)){
            this.page=newValue;
        }
        this.refresh();
    }

    //sets maximum ammount of customers on each page.
    setPageSize(newValue){
        if((newValue>0)&&(newValue*this.page < this.customers.length)){
            this.pagesize=newValue;
        }
        this.refresh();
    }

    //utility function for churning out table rows.
    addTableCol(sauce){
        return "<td>"+sauce+"</td>"
    }

    //add observers to the observer list.
    addObserver(observer){
        if(this.observer==null){
            this.observers=[observer];
        }
        else{
            this.observers.push(observer);
        }
    }


}


//PageList is a list of buttons that watches over a Pager.
//  Their relationship is two-way:
//-the PageList triggers page changes on Pager when any of
//its buttons are pressed.
//-the button notifies all observers (PageList included)
//when internal state is changed. PageList observes 
//for changes in Pager to decide how many pages are available.  
class PageList{
    constructor(target, pager){
        this.target=target;
        this.sourcePager=pager;
        this.pages=this.calculatePageCount();
        this.sourcePager.addObserver(this);
        this.notify(this.sourcePager);
    }

    calculatePageCount(){
        return Math.ceil(this.sourcePager.customers.length / this.sourcePager.pagesize);
    }

    //TWO-WAY BINDING VIA OBSERVER PATTERN
    //might rename this later.
    //having subscribed to Pager as an Observer, the Pager calls this method 
    //to announce that some data has changed and presentation may have to change.
    notify(pager){
        this.pages=this.calculatePageCount();

        this.target.innerHTML="";
        let cta=0;
        
        //honestly i'm just lucky this works.
        //as of commiting this the event handling is trial and error.
        for(cta=0;cta<this.pages;cta++){
            let child=document.createElement("BUTTON");
            child.innerHTML=""+(cta+1);
            let pager=this.sourcePager;
            //callback MUST use a copy of some old state
            //of the counter; directly assigning 'cta' as an argument
            //makes the page not switch.
            let orderNumber=cta;
            child.onclick=() => {
                pager.setPage(orderNumber);
            }
            this.target.appendChild(child);
        }
    }


}






//
/*AUXILLIARY FUNCTIONS FOR MAIN SCRIPT
this code does stuff... sorry, i couldn't come up with a fancy description.
*/
//

//wraps an XMLHttpRequest fetch operation in a Promise object.
function XMLHttpPromiseWrapper(url){
    return new Promise(function(succ, fail){
        var json;
        let request=new XMLHttpRequest();
        request.onreadystatechange=function(){
            if(this.readyState==4 && this.status==200){
                json=JSON.parse(this.responseText);
                succ(json);
            }
        };
        request.open("GET",url,true);
        request.send();
    })
}

//initialize pager from JSON using callbacks
//(induces callback pyramid of doom)
function makePagerWithCallbacks(target, url,lb,rb){
    var thePager;

    var externalOBJ;

    //get customer list as JSON built from a string 
    //that was fetched via an HTTP GET request
    //and build the paged table from it.
    let request= new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(this.readyState==4 && this.status ==200){
            externalOBJ=JSON.parse(this.responseText);
            thePager=new Pager(target, externalOBJ);
            //point the onclick attributes of left-button and right-button
            //to prev() and next() respectively on the pager object.
            //yes, it's that simple.
            lb.onclick= function(){
                thePager.prev();
            }
            rb.onclick= function(){
                thePager.next();
            }

        }
    }
    request.open("GET", url, true);
    request.send();
}

//chain promises together to assemble the pager object.
//(cleaner code than with nested callbacks)
function makePagerWithPromises(target,url,lb,rb){
    results=XMLHttpPromiseWrapper(url)
    .then((json)=>{
        let newPager=new Pager(target,json);
        lb.onclick=function(){newPager.prev();};
        rb.onclick=function(){newPager.next();}})
    .catch((val)=>{console.log("failure in promise chain.");});
}





//initialize pager from JSON using async await javascript functionality
//(syntax results in even cleaner code)
async function makePagerWithAsync(target,url,lb,rb,pb){
    let result= await XMLHttpPromiseWrapper(url);
    let pager =new Pager(target,result);
    
    //code below
    lb.onclick= function(){
        pager.prev();
    }
    rb.onclick= function(){
        pager.next();
    }
    pb.oninput= function(){
        pager.setPageSize(pb.value);
    }
    
    let pagesElement=document.getElementById("pageList");
    let pagesManager= new PageList(pagesElement,pager);

    return pager;

}

let pager=document.getElementById("pager");
let lb=document.getElementById("lb");
let rb=document.getElementById("rb");
let pb=document.getElementById("pageSelector");
let url="https://hostel-app-back-end-api.herokuapp.com/customers";
//makePagerWithCallbacks(pager,url,lb,rb);

var thePager=makePagerWithAsync(pager,url,lb,rb,pb);

//makePagerWithPromises(pager,url,lb,rb);

var pagebtn=document.getElementById("pageSizeBtn");



