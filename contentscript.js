for (x = 0, list = document.querySelectorAll('.checkableListItem'); x < list.length; x++) 
{
    classes = list[x].className;
    
    if(classes.indexOf('checkableListItem') > -1 && classes.indexOf('disabledCheckable') == -1)
    {
        list[x].querySelectorAll('.checkbox')[0].click();  
    }
}