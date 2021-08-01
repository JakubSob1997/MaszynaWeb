

const minBarWidth = 8;
const minpageWidth=12;
const maxBarWidth = 100-minBarWidth-minpageWidth;


let leftWidth=20;
let rightWidth=20;



const leftBarHandle= document.getElementById("left-handle")
const rightBarHandle = document.getElementById("right-handle");

const leftWidthVar= "--editor-width"
const rightWidthVar= "--inspector-width"




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




function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}



leftBarHandle.addEventListener("mousedown",(e)=>{


    e=e || window.event;
    pauseEvent(e);

    window.addEventListener("mousemove", leftBarMove);
    window.addEventListener("mouseup", leftBarUp);


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

