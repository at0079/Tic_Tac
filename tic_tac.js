let cell=document.querySelectorAll('.cell');
let sel=document.querySelectorAll('.inp');
let tm=document.querySelector('.ttm');
let ttm=document.querySelectorAll('.tm');
let firdiv=document.querySelector('.sel');
let ex=document.querySelector('#exit');
let count=0;
let start=1;
let input;
let idx=0;
let k;
let row;
let col;
let ans=[];
let uans=[];
for (let i = 0; i < 3; i++) {
    uans[i] = [];
    for (let j = 0; j < 3; j++) {
        uans[i][j] = ' ';
    }
}

for(c of cell)
    {
    c.addEventListener("click",press)
}
for(i of sel)
    {
        i.addEventListener("click",selected)
    }
function selected()
{
    start=0
    input=this.innerText;
    tm.classList.add("upttm");
    firdiv.classList.add("ttm");
    ttm[0].innerText+=input;
    ttm[1].innerText+=input=="X"?"0":"X";
}
function press()
{
    if(start==1)
        {
            alert(" PLEASE SELECT (X || 0) ");
            return;
        }
        
    let btn=this;
    row=Math.floor(btn.getAttribute("id")/3);
    col=Math.floor(btn.getAttribute("id")%3);
    let flag=1;
    if(ans.length==0)
        {   
            btn.classList.add("cf");
            btn.innerText=input;
            
            uans[row][col]=input;
            ans.push(btn.getAttribute("id"));
        }
    else
    {
        for(i of ans)
        {
            if(i==btn.getAttribute("id"))
                {
                    count--;
                    console.log("repeated");
                    flag=0;
                    break;
                }
        }
    if(flag)
        {
            btn.classList.add("cf");
            if(ans.length==1)
                {
                    
                    if(input==0)
                        {
                            btn.innerText="X";
                        }
                        else
                        {
                            btn.innerText="0";
                        }
                }
            else
                {
                    if(idx==0)
                        btn.innerText=input;
                    else
                        btn.innerText=(input=="X"?"0":"X");
                    idx = idx==0 ? 1 : 0;
                }
                
                uans[row][col]=btn.innerText;
                ans.push(btn.getAttribute("id"));
        }
    }
    count++;
    if(valid())
        {
            setTimeout(function(){alert("GAME IS OVER !! \n"+(uans[row][col]=="X"?(input=="X"?"U WON":"OPPONENT WON"):(input=="0"?"U WON":"OPPONENT WON")))},500);
            setTimeout(function(){location.href=""},1000);

        }
    close();
}
ex.addEventListener("click",function()
{
    count=9;
    close();
});
function show_winMove(m)
{
    
    if(m==1)
        {
            row==0?0:row==1?3:6;
            for( k=0;k<3;k++)
                {
                    cell[row+k].style.backgroundColor="green";
                }
        }
    else if(m==2)
        {
            while(col<10)
                {
                    cell[col].style.backgroundColor="green";
                    col=col+3;
                }
        }
    else if(m==3)
        {
            let i=0;
            while(i<10)
                {
                    cell[i].style.backgroundColor="green";
                    i=i+4;
                }
        }
    else
        {
            let i=2;
            while(i<=6)
                {
                    cell[i].style.backgroundColor="green";
                    i=i+2;
                }
        }
}
function close()
{
    if(count==9)
        {
            setTimeout(function(){alert("GAME IS OVER !! \n")},500);
            setTimeout(function(){location.href=""},1000);
        }
}
function valid()
{
        let inp=uans[row][col];
        
        // validate row
        for( k=0;k<3;k++)
        {
            if(uans[row][k]!=inp)
                break;
        }
        if(k==3)
            {
                show_winMove(1);
                return true;
            }
            
        // validate col
        for( k=0;k<3;k++)
        {
            if(uans[k][col]!=inp)
                break;
        }
        if(k==3)
            {
                show_winMove(2);
                return true;
            }
        // validate cross wise
        if((row+col)%2==0)
        {
            let i;
            let j;
            k=1;
        // left to rigth diagonal
            // left UP cross
            for( i=row-1,j=col-1;i>=0 && j>=0;i--,j--)
            {
                k++;
                    if(uans[i][j]!=inp)
                    {
                        k--;
                        break;
                    }
            }
            // right DOWN cross
            for( i=row+1,j=col+1;i<3 && j<3;i++,j++)
                {
                    k++;
                        if(uans[i][j]!=inp)
                        {
                            k--;
                            break;
                        }
                }
                if(k==3)
                    {
                        show_winMove(3);
                        return true;
                    } 

        // right to left diagonal
                k=1;
            // left DOWN cross
            for( i=row+1,j=col-1;i<3 && j>=0;i++,j--)
            {
                k++;
                    if(uans[i][j]!=inp)
                    {
                        k--;
                        break;
                    }
            }
            // right UP cross
            for( i=row-1,j=col+1;i>=0 && j<3;i--,j++)
            {
                k++;
                    if(uans[i][j]!=inp)
                    {
                        k--;
                        break;
                    }
            }
            
        }
        if(k==3)
            {
                show_winMove(4);
                return true;
            }
        return false;
}

