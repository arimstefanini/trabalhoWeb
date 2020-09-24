

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  } 

  //global variable navigatorState tracks wether the navigator is on display or hidden;
  //this variable persists for the runtime of the web page.
  let navigatorState="OFF";
  //opens navigator if closed; closes navigator if open.
  function toggleNavigator(){
    if(navigatorState=="OFF"){
      openNav();
      navigatorState="ON";
    }
    else{
      closeNav();
      navigatorState="OFF";
    }
  }