
/*
    This guy is responible with layout <-> scripts communication

    I called him mediator not beacause of mediator pattern but
    because he deals with layout.js that absolutley no one 
    wants to associate with.
*/

let LayoutMediator={
    showLeftPanel:function(){console.log("overide me");},
    showRightPanel:function(){console.log("overide me");},
    showCenter:function(){console.log("overide me");},
    hideLeftPanel:function(){console.log("overide me");},
    hideRightPanel:function(){console.log("overide me");},
};
export default LayoutMediator;
