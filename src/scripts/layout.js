
import Alerter from "./alerter.js";
import LayoutMediator from "./layout-mediator.js";
import ShortcutManager from "./shortcut-manager.js";
import Shorutcut from "./shortcut.js";
import Translator from "./translator.js";

/*
    This pice of code is a mess by design.
    Don't you ever try to imporoty this file into any other files
    Just use singleton object LayoutMediator for comunication

    All of this code does is amanage the widths of both sidepanels.

    Only two important functions are
        scrollLeft()
        srollRight()
    They set left/right panel widths in vw units 
    and resize other elements to match.

    Everything else are just event handlers and
    difrent variaties of using srollLeft() and scrollRight()

    Example:
    scrollLeft(100)
        will set left to maz width and shrink everything else acordingly;

*/

const setupLayout = ()=>{


const minBarWidth = 8;
const minpageWidth=12;
const maxBarWidth = 100-minBarWidth-minpageWidth;
const widthTouchTreshold=30;


const targetShowPanelWidth = 400//in px
const showCenterWdths=0;
let showPanelWidth=25;



const keyboardScroll=2.5;

const mobilePanelStickines = 10; //in vw

function onResize(){
    
    showPanelWidth = (targetShowPanelWidth/window.innerWidth)*100;
}

window.addEventListener("resize",onResize);
onResize();



let leftWidth=18;
let rightWidth=18;



const leftBarHandle= document.getElementById("left-handle");
const rightBarHandle = document.getElementById("right-handle");



const leftPanel = document.getElementById("left-panel");
const rightPanel = document.getElementById("right-panel");
const center=document.getElementById("center")

const leftWidthVar= "--editor-width";
const rightWidthVar= "--inspector-width";


leftBarHandle.setAttribute("tabindex",0);
rightBarHandle.setAttribute("tabindex",0);





function scrollLeft(_newWidth){



    if(_newWidth<minBarWidth){
        _newWidth=minBarWidth;
    }
    let pageWidth = 100 - _newWidth - rightWidth;
    
    leftWidth = _newWidth;

    if(pageWidth<minpageWidth){
        let newOtherWidth =   rightWidth +( pageWidth -minpageWidth); 
        rightWidth = newOtherWidth;

        if(rightWidth<minBarWidth){
            rightWidth = minBarWidth

        }

        document.documentElement.style.setProperty(rightWidthVar,rightWidth.toString()+"vw");

    }

    if(leftWidth>maxBarWidth){
        leftWidth=maxBarWidth;
    }
    

    document.documentElement.style.setProperty(leftWidthVar,leftWidth.toString()+"vw");;
}

function scrollRight(_newWidth){

    if(_newWidth<minBarWidth){
        _newWidth=minBarWidth;
    }
    let pageWidth = 100 - _newWidth - leftWidth;
    
    rightWidth = _newWidth;

    if(pageWidth<minpageWidth){
        let newOtherWidth =   leftWidth +( pageWidth -minpageWidth); 
        leftWidth = newOtherWidth;

        if(leftWidth<minBarWidth){
            leftWidth = minBarWidth

        }

        document.documentElement.style.setProperty(leftWidthVar,leftWidth.toString()+"vw");

    }

    if(rightWidth>maxBarWidth){
        rightWidth=maxBarWidth;
    }
    

    document.documentElement.style.setProperty(rightWidthVar,rightWidth.toString()+"vw");;
}


function showLeftPanel (){

    let targetWidth;


    if(leftWidth<showPanelWidth){
        scrollLeft(showPanelWidth);
    }

}

function showRightPanel(){

    if(rightWidth<showPanelWidth){
        scrollRight(showPanelWidth);
    }
}

function showCenter(){

    if(showCenterWdths<leftWidth){
        scrollLeft(showCenterWdths);
    }
    if(showCenterWdths<rightWidth){
        scrollRight(showCenterWdths);
    }
    
}

function hideLeftPanel(){
    scrollLeft(0);
}

function hideRightPanel(){
    scrollRight(0);
}


LayoutMediator.showLeftPanel=showLeftPanel;
LayoutMediator.showRightPanel=showRightPanel;
LayoutMediator.showCenter=showCenter;
LayoutMediator.hideLeftPanel=hideLeftPanel;
LayoutMediator.hideRightPanel=hideRightPanel;


function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

function onRightPanelTouched(e){
    Alerter.sendMessage("right")
    if(rightWidth<minBarWidth+minpageWidth){
        pauseEvent(e)
    }

    showRightPanel();
    rightPanel.focus();
}

function onCenterTouched(e){
    if(rightWidth>minBarWidth+minpageWidth){
        pauseEvent(e)
    }

    if(leftWidth>minBarWidth+minpageWidth){
        pauseEvent(e)
    }

    showCenter();
    center.focus();
}




leftPanel.addEventListener("touchstart",(e)=>{


    //e=e || window.event;
    //pauseEvent(e);

    leftPanel.addEventListener("touchmove", leftBarTouchMove);
    window.addEventListener("touchend", leftBarTouchUp);


    let offset = (e.touches[0].clientX*100)/window.innerWidth;
    let oldWidth=leftWidth;
    let isStickyBroken =false;
    showLeftPanel();

    function leftBarTouchMove(e){
        


        

        let newX = e.touches[0].clientX;
        newX = (newX*100/window.innerWidth);

        const width =newX-offset+oldWidth;

        if(Math.abs(oldWidth-width)<mobilePanelStickines&&isStickyBroken==false){
            return;
        }else{
            isStickyBroken=true;
        }

        scrollLeft(width);
       
     }
    
     function leftBarTouchUp(){
        leftPanel.removeEventListener("touchmove", leftBarTouchMove)
        window.removeEventListener("touchend", leftBarTouchUp)
     }

})

rightPanel.addEventListener("touchstart",(e)=>{

    
    //e=e || window.event;
    //pauseEvent(e);

    rightPanel.addEventListener("touchmove", rightBarTouchMove);
    window.addEventListener("touchend", rightBarTouchUp);

    let offset = ((window.innerWidth-e.touches[0].clientX)*100)/window.innerWidth;
    let oldWidth=rightWidth;
    let isStickyBroken =false;
    showRightPanel();

    function rightBarTouchMove(e){
        
        

        let newX = e.touches[0].clientX;
        newX = ((window.innerWidth-newX)*100/window.innerWidth);

        const width =newX-offset+oldWidth;

        if(Math.abs(oldWidth-width)<mobilePanelStickines&&isStickyBroken==false){
            return;
        }else{
            isStickyBroken=true;
        }
    
        scrollRight(width);

     }

    
     function rightBarTouchUp(){
        rightPanel.removeEventListener("touchmove", rightBarTouchMove)
        window.removeEventListener("touchend", rightBarTouchUp)
     }

})

center.addEventListener("touchstart",onCenterTouched);
center.addEventListener("dblclick", showCenter);

leftPanel.addEventListener("dblclick",showLeftPanel);
rightPanel.addEventListener("dblclick",showRightPanel);

leftBarHandle.addEventListener("keydown",(e)=>{

    
    if(e.which==37){
        //Left Arrow
        scrollLeft(leftWidth-keyboardScroll);
    }else if(e.which==39){
        //Right Arrow
        scrollLeft(leftWidth+keyboardScroll);

    }


})


rightBarHandle.addEventListener("keydown",(e)=>{


    
    if(e.which==37){
        //Left Arrow
        scrollRight(rightWidth+keyboardScroll);
    }else if(e.which==39){
        //Right Arrow
        scrollRight(rightWidth-keyboardScroll);

    }
})


leftBarHandle.addEventListener("mousedown",(e)=>{

    e=e || window.event;
    pauseEvent(e);

    window.addEventListener("mousemove", leftBarMove);
    window.addEventListener("mouseup", leftBarUp);
    
    leftBarHandle.focus();

    let prevX = e.clientX;
    let prevY = e.clientY;

    function leftBarMove(e){
        
        e=e || window.event;
        pauseEvent(e);

        let newX =  e.clientX;
        let newY = e.clientY;

        const width = (newX*100/window.innerWidth);
        scrollLeft(width);
       
     }
    
     function leftBarUp(){
        window.removeEventListener("mousemove", leftBarMove)
        window.removeEventListener("mouseup", leftBarUp)
     }

    
})





rightBarHandle.addEventListener("mousedown",(e)=>{


    e=e || window.event;
    pauseEvent(e);

    window.addEventListener("mousemove", rightBarMove);
    window.addEventListener("mouseup", rightBarUp);

    rightBarHandle.focus();

    let prevX = e.clientX;
    let prevY = e.clientY;

    function rightBarMove(e){
        
        e=e || window.event;
        pauseEvent(e);

        let newX =  e.clientX;
        let newY = e.clientY;

        const width  =((window.innerWidth-newX)*100/window.innerWidth);
        scrollRight(width);
        

     }
    
     function rightBarUp(){
        window.removeEventListener("mousemove", rightBarMove)
        window.removeEventListener("mouseup", rightBarUp)
     }

    
})

    
}
export default setupLayout;