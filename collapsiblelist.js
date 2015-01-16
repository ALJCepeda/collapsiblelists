/*

CollapsibleLists.js

An object allowing lists to dynamically expand and collapse

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/*
  Improved upon by me.
*/

var collapsiblelists_collapsedattribute = "collapsed";
var collapsiblelists_classname = "collapsibleList";

/*
  Genius.
  http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
*/
var css = (function(){/*<style type="text/css" id="collapsibleListsCss">
  ul.@class li:not(*:last-child) { 
    background: url("img/node.png") no-repeat; 
  }

  ul.@class li{
    margin: 0;
    padding: 0 12px;
    line-height: 20px;
  }

  ul.@class, ul.@class ul {
    list-style-type: none;
    margin: 0;
    margin-left: 10px;
    padding: 0;
    background: url("img/vline.png") repeat-y;
  }

  li:last-child {
    background: #fff url("img/lastnode.png") no-repeat;
  }

  li[@attribute] li{
    display:none;
  }

  li ul{
    display:block;
  } 
</style>*/})
.toString()
.match(/[^]*\/\*([^]*)\*\/\}$/)[1]
.replace(new RegExp('@attribute', 'g'), collapsiblelists_collapsedattribute)
.replace(new RegExp('@class', 'g'), collapsiblelists_classname);

document.head.innerHTML = css + document.head.innerHTML;

var CollapsibleLists = new function(){
  var attribute = function(){
      return collapsiblelists_collapsedattribute;
  };

  var classname = function(){
      return collapsiblelists_classname;
  };

  this.apply = function(){
    // loop over the unordered lists
    
    var elements = document.getElementsByClassName(classname());

    var uls = Array.prototype.filter.call(elements, function(element){
        return element.tagName == "UL";
    });

    for (var index = 0; index < uls.length; index ++){

        // make this list collapsible
        this.applyTo(uls[index]);
    }

  };

  /* Makes the specified list collapsible. The parameters are:
   *
   * node         - the list element
   * doNotRecurse - true if sub-lists should not be made collapsible
   */
  this.applyTo = function(node){

    // loop over the list items within this node
    var lis = node.getElementsByTagName('li');
    for (var index = 0; index < lis.length; index ++){
      // check whether this list item should be collapsible
      if (node == lis[index].parentNode){
          lis[index].addEventListener('click', createClickListener(), false);

          lis[index].setAttribute(attribute(), '');  
      }
    }
  };

  /* Returns a function that toggles the display status of any unordered
   * list elements within the specified node. The parameter is:
   *
   * node - the node containing the unordered list elements
   */
  function createClickListener(){

    // return the function
    return function(event){
      // find the list item containing the target of the event
      var node = event.target;
      var collapsed = node.getAttribute(attribute());
      // remove the current class from the node
      if(collapsed === ''){
        node.removeAttribute(attribute())
      } else {
        node.setAttribute(attribute(), '');  
      }
    };
  };

}();