let month={0:'January',1:'February',2:'March',3:'April',4:'May',5:'June',
            6:'July',7:'August',8:'September',9:'October',10:'November',11:'December'};
let year=2020
let current='clock-div'
let timers={}
let timerids={}
let stopwatch={'hr':0,'min':0,'sec':0}
let j,lapid=0,newt=0
let laphr=0,lapmin=0,lapsec=0,startnow=0


document.getElementById('clock-div').style.visibility = 'visible'
document.getElementById('clock').style.color = '#F50057'

function initclock(){
    let date = new Date()
    document.getElementById('clock-hr').innerText = date.getHours().toString().length ==1 ? '0'+date.getHours().toString(): date.getHours()
    document.getElementById('clock-min').innerText = date.getMinutes().toString().length ==1 ? '0'+date.getMinutes().toString(): date.getMinutes()
    document.getElementById('clock-sec').innerText = date.getSeconds().toString().length ==1 ? '0'+date.getSeconds().toString(): date.getSeconds()
    document.getElementById('clock-day').innerText = date.getDate()
    document.getElementById('clock-month').innerText = month[date.getMonth()]
    document.getElementById('clock-year').innerText = date.getFullYear()
}
function runtimers() {
    for(let i of Object.keys(timerids)){
        if(timers[timerids[i]['name']]['stop']==0) {
            let hr = timers[timerids[i]['name']]['hr']
            let min = timers[timerids[i]['name']]['min']
            let sec = timers[timerids[i]['name']]['sec']
            sec--
            if (sec < 0) {
                min--
                if (min < 0) {
                    hr--
                    if (hr < 0) {
                        document.getElementById(i+'pause').click()
                    }
                    else{
                        timers[timerids[i]['name']]['hr'] = hr
                        timers[timerids[i]['name']]['min'] =59
                        timers[timerids[i]['name']]['sec']=59
                    }
                }
                else{
                    timers[timerids[i]['name']]['min'] = min
                    timers[timerids[i]['name']]['sec']=59
                }
            }
            else{
                timers[timerids[i]['name']]['sec'] =sec
            }
            document.getElementById(i+'hr').innerText = timers[timerids[i]['name']]['hr'].toString().length==1? '0'+timers[timerids[i]['name']]['hr'].toString():
                timers[timerids[i]['name']]['hr'].toString()
            document.getElementById(i+'min').innerText = timers[timerids[i]['name']]['min'].toString().length==1? '0'+timers[timerids[i]['name']]['min'].toString():
                timers[timerids[i]['name']]['min'].toString()
            document.getElementById(i+'sec').innerText = timers[timerids[i]['name']]['sec'].toString().length==1? '0'+timers[timerids[i]['name']]['sec'].toString():
                timers[timerids[i]['name']]['sec'].toString()
            let tot = (timers[timerids[i]['name']]['hr']*timers[timerids[i]['name']]['min']*60) + timers[timerids[i]['name']]['sec']
            document.getElementById(i+'bar').value = tot/timers[timerids[i]['name']]['total']
        }

    }
}

function showTimers(){
    if(Object.keys(timers).length==0){
        document.getElementById('nothing').style.display='block'
    }
    else {
        document.getElementById('nothing').style.display = 'none'
    }
}

function createTimersObj(obj){
    console.log(obj)
    let ele = document.createElement('div')
    let id = Math.floor(Math.random()*1000).toString()+'rnd'
    ele.id=id
    timerids[id]={'name':obj.name}
    ele.className='timerobj'

    let timername = document.createElement('label')
    timername.innerText = obj.name
    timername.style.fontSize='larger'
    timername.style.gridArea = '1/1/1/span 2'
    timername.style.textAlign= 'center'
    timername.style.margin = 'auto'
    ele.appendChild(timername)

    let timedisplay  =document.createElement('div')
    timedisplay.style.display = 'flex'
    timedisplay.style.flexDirection = 'row'
    timedisplay.style.fontSize = 'xx-large'
    timedisplay.style.gridArea = '2/1/2/span 2'
    timedisplay.style.textAlign = 'center'
    timedisplay.style.margin='auto'
    let span = document.createElement('span')
    let span1 = document.createElement('span')
    let hr = document.createElement('span')
    let min = document.createElement('span')
    let sec = document.createElement('span')
    hr.innerText = obj.hr.toString().length ==1 ? '0'+obj.hr.toString():obj.hr.toString()
    min.innerText = obj.min.toString().length ==1 ? '0'+obj.min.toString():obj.min.toString()
    sec.innerText = obj.sec.toString().length ==1 ? '0'+obj.sec.toString():obj.sec.toString()
    hr.id=id+'hr'
    min.id=id+'min'
    sec.id=id+'sec'
    span.innerText=':'
    span1.innerText=':'
    span.style.margin='0 5px'
    span1.style.margin='0 5px'
    timedisplay.append(hr,span,min,span1,sec)
    ele.append(timedisplay)

    let bar = document.createElement('progress')
    bar.value=1
    bar.id=id+'bar'
    bar.className='bar'
    bar.style.gridArea = '2/1/2/span 2'
    bar.style.width = '100%'
    ele.append(bar)

    let play = document.createElement('label')
    let playlbl = document.createElement('span')
    let playicon = document.createElement('i')
    playlbl.id = id+'play'
    playicon.id = id+'playi'
    playicon.className = 'fal fa-play'
    playicon.style.margin = 'auto 10px'
    play.style.gridArea = '3/1/3/2'
    playlbl.innerText = 'play'
    play.className = 'textborder cursor controls'
    playlbl.onclick = (e)=>{
        let id= e.target.id.slice(0,-4)
        console.log(id)
        timers[timerids[id]['name']]['stop'] = 0
        document.getElementById(id+'pause').parentElement.style.display = 'block'
        document.getElementById(id+'play').parentElement.style.display = 'none'
    }
    playicon.onclick = (e)=>{
        let id= e.target.id.slice(0,-5)
        console.log(id)
        timers[timerids[id]['name']]['stop'] = 0
        document.getElementById(id+'pause').parentElement.style.display = 'block'
        document.getElementById(id+'play').parentElement.style.display = 'none'
    }
    play.append(playicon,playlbl)

    let pause = document.createElement('label')
    let pauselbl = document.createElement('span')
    let pauseicon = document.createElement('i')
    pauseicon.className = 'fal fa-stop'
    pauseicon.style.margin = 'auto 10px'
    pauselbl.innerText = 'pause'
    pauseicon.id = id+'pausei'
    pauselbl.id = id+'pause'
    pause.style.display='none'
    pause.style.gridArea = '3/1/3/2'
    pause.className = 'textborder cursor controls'
    pauselbl.onclick = (e)=>{
        let id = e.target.id.slice(0,-5)
        console.log(e.target.id)
        timers[timerids[id]['name']]['stop'] = 1
        document.getElementById(id+'pause').parentElement.style.display = 'none'
        document.getElementById(id+'play').parentElement.style.display = 'block'
    }
    pauseicon.onclick = (e)=>{
        let id = e.target.id.slice(0,-6)
        console.log(e.target.id)
        timers[timerids[id]['name']]['stop'] = 1
        document.getElementById(id+'pause').parentElement.style.display = 'none'
        document.getElementById(id+'play').parentElement.style.display = 'block'
    }
    pause.append(pauseicon, pauselbl)

    let remove = document.createElement('label')
    let removeicon = document.createElement('i')
    let removelbl = document.createElement('span')
    removelbl.innerText = 'remove'
    removeicon.className= 'fal fa-trash'
    removelbl.id = id+'remove'
    pauseicon.id = id+'removei'
    removeicon.style.margin = 'auto 10px'
    remove.style.gridArea = '3/2/3/2'
    remove.className = 'textborder cursor controls'
    removelbl.onclick =(e)=>{
        let id = e.target.id.slice(0,-6)
        console.log(id)
        delete timers[timerids[id]['name']]
        delete timerids[id]
        document.getElementById('timer-div').removeChild(document.getElementById(id))
        if(Object.keys(timerids).length==0){
            document.getElementById('nothing').style.display='block'
        }
    }
    removeicon.onclick =(e)=>{
        let id = e.target.id.slice(0,-7)
        console.log(id)
        delete timers[timerids[id]['name']]
        delete timerids[id]
        document.getElementById('timer-div').removeChild(document.getElementById(id).parentElement)
        if(Object.keys(timerids).length==0){
            document.getElementById('nothing').style.display='block'
        }
    }
    remove.append(removeicon,removelbl)
    ele.append(play,pause,remove)
    document.getElementById('timer-div').append(ele)
}

function startstopwatch() {
    let sec = stopwatch['sec']
    let min = stopwatch['min']
    let hr = stopwatch['hr']
    sec++
    if(sec>59){
        sec=0
        min++
        if(min>59){
            min=0
            hr++
            stopwatch['min'] = min
            stopwatch['hr']=hr
            stopwatch['sec'] = sec
        }
        else {
            stopwatch['sec'] = sec
            stopwatch['min'] = min
        }
    }
    else {
        stopwatch['sec'] = sec
    }
    document.getElementById('sw-hr').innerText=stopwatch['hr'].toString().length == 1? '0'+stopwatch['hr'].toString():stopwatch['hr'].toString()
    document.getElementById('sw-min').innerText=stopwatch['min'].toString().length == 1? '0'+stopwatch['min'].toString():stopwatch['min'].toString()
    document.getElementById('sw-sec').innerText=stopwatch['sec'].toString().length == 1? '0'+stopwatch['sec'].toString():stopwatch['sec'].toString()
}
function stopwatchreset() {
    stopwatch['hr'] = 0
    stopwatch['min'] = 0
    stopwatch['sec'] =0
    document.getElementById('sw-hr').innerText = 0
    document.getElementById('sw-min').innerText = 0
    document.getElementById('sw-sec').innerText = 0
    try {
        clearInterval(j)
    }catch (e) {}
    lapid=0
    document.getElementById('sw-pause').click()
    document.getElementById('lap-div').removeChild(document.getElementById('lap-data'))
    let e = document.createElement('div');e.id='lap-data'
    document.getElementById('lap-div').append(e)
}

function addlap(){
    let ele = document.createElement('div')
    ele.className = 'lapobj'
    let id = document.createElement('span')
    lapid++
    id.innerText =lapid

    let laptime = document.createElement('lap')
    let ldhr = 24-laphr
    let ldmin = 60-lapmin
    let ldsec = 60-lapsec

    let stdhr = 24-stopwatch['hr']
    let stdmin = 60-stopwatch['min']
    let stdsec = 60-stopwatch['sec']

    let dhr = Math.abs(stdhr-ldhr)
    let dmin = Math.abs(stdmin-ldmin)
    if(lapmin> stopwatch['min']) {
        dmin = ldmin + stopwatch['min']
        dhr--
    }
    let dsec = Math.abs(stdsec-ldsec)
    if(lapsec>stopwatch['sec']) {
        dsec = ldsec + stopwatch['sec']
        dmin--
    }
    dhr = dhr.toString().length == 1? '0'+dhr.toString(): dhr.toString()
    dmin = dmin.toString().length == 1? '0'+dmin.toString(): dmin.toString()
    dsec = dsec.toString().length == 1? '0'+dsec.toString(): dsec.toString()
    laphr = stopwatch['hr']
    lapmin = stopwatch['min']
    lapsec = stopwatch['sec']

    laptime.innerText=`${dhr} : ${dmin} : ${dsec}`
    let overall = document.createElement('span')
    overall.innerText = `${stopwatch['hr'].toString().length==1? '0'+stopwatch['hr'].toString(): stopwatch['hr']} : `+
    `${stopwatch['min'].toString().length==1 ? '0'+stopwatch['min'].toString():stopwatch['min']} : ${stopwatch['sec'].toString().length==1? '0'+stopwatch['sec'].toString():
    stopwatch['sec']}`
    id.style.gridArea = '1/1/1/2'
    laptime.style.gridArea = '1/2/1/3'
    overall.style.gridArea = '1/3/1/3'
    id.style.textAlign = 'center'
    laptime.style.textAlign = 'center'
    overall.style.textAlign = 'center'
    ele.append(id,laptime,overall)
    document.getElementById('lap-data').append(ele)
}

function showcalender(){
    document.getElementById('year').innerText=year
    let d = new Date(year,0,1)
    while(d.getFullYear()!=year+1){
        let month = {'month':d.getMonth(),'days':[],'start':d.getDay()}
        while(month['month']==d.getMonth()){
            month['days'].push(d.getDate())
            d.setDate(d.getDate()+1)
        }
        console.log(month)
        createmonth(month)
    }
}

function createmonth(obj){
    let week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

    let ele = document.createElement('div')
    ele.className = 'calenderobj'
    ele.id = month[obj.month]

    let calhead = document.createElement('div')
    calhead.className='calenderheader'

    let calmonth = document.createElement('label')
    calmonth.innerText=month[obj['month']]
    calmonth.style.fontSize = 'large'
    calmonth.style.color = '#AA00FF'
    calmonth.style.textAlign='center'
    calmonth.style.marginBottom='10px'
    calhead.append(calmonth)

    let calweek =document.createElement('div')
    calweek.className= 'calenderweek'

    for(let i=0;i<7;i++){
        let span = document.createElement('div')
        span.innerText = week[i]
        span.className='calenderweektext'
        span.style.width='42px'
        span.style.height='30px'
        span.style.color = '#2962FF'
        calweek.append(span)
    }
    calhead.append(calweek)
    ele.append(calhead)
    let days = document.createElement('div')
    days.className = 'calenderdays'

    if(obj.start==0)
        obj.start=7
    for(let i=1;i<obj.start;i++){
        let span = document.createElement('div')
        span.innerText='  '
        span.className='calendertext'
        span.style.width='42px'
        span.style.height='40px'
        days.append(span)
    }
    let d = new Date()
    for(let i=0;i<obj.days.length;i++){
        let span = document.createElement('span')
        span.innerText = obj.days[i]
        span.className='calendertext'
        span.style.width='42px'
        span.style.height='40px'
        span.style.color = '#FF3D00'
        if(d.getMonth() == obj.month && d.getFullYear() == year && d.getDate()==obj.days[i]) {
            span.style.color = '#ff383c'
            span.style.fontWeight='bold'
        }
        days.append(span)
    }
    ele.append(days)
    document.getElementById('calender-div').append(ele)
}

function destroycalender(){
    let k = Object.keys(month)
    for(let i=0;i<k.length;i++){
        document.getElementById('calender-div').removeChild(document.getElementById(month[k[i]]))
    }
    showcalender()
}

initclock()
setInterval(initclock,1000)
setInterval(runtimers,1000)

document.getElementById('new').onclick = ()=> {
    if (newt == 0) {
        document.getElementById('create-timer').style.display = 'flex'
        document.getElementById('create-timer').style.animationName='newtimer'
        newt=1
    }
    else{
        newt=0
        document.getElementById('create-timer').style.animationName= 'newtimerclose'
        setTimeout(()=>{
            document.getElementById('create-timer').style.display='none'
        },1000)
    }
}

document.getElementById('clock').onclick = ()=>{
    document.getElementById(current).style.display = 'none'
    document.getElementById(current.slice(0,-4)).style.color = 'black'
    current = 'clock-div'
    document.getElementById(current).style.display = 'flex'
    document.getElementById('clock').style.color = '#F50057'
}
document.getElementById('timer').onclick = ()=>{
    document.getElementById(current).style.display = 'none'
    document.getElementById(current.slice(0,-4)).style.color = 'black'
    current = 'timer-div'
    document.getElementById(current).style.display = 'flex'
    document.getElementById('timer').style.color = '#F50057'
    showTimers()
}
document.getElementById('stopwatch').onclick = ()=>{
    document.getElementById(current).style.display = 'none'
    document.getElementById(current.slice(0,-4)).style.color = 'black'
    current = 'stopwatch-div'
    document.getElementById(current).style.display = 'flex'
    document.getElementById('stopwatch').style.color = '#F50057'
}
document.getElementById('calender').onclick = ()=>{
    document.getElementById(current).style.display = 'none'
    document.getElementById(current.slice(0,-4)).style.color = 'black'
    current = 'calender-div'
    document.getElementById(current).style.display = 'flex'
    document.getElementById('calender').style.color = '#F50057'
    showcalender()
}

document.getElementById('sw-play').onclick=()=>{
    document.getElementById('sw-play').style.display = 'none'
    document.getElementById('sw-pause').style.display='block'
    document.getElementById('sw-lap').style.display = 'block'
    j = setInterval(startstopwatch,1000)
}
document.getElementById('sw-pause').onclick = ()=>{
    document.getElementById('sw-play').style.display = 'block'
    document.getElementById('sw-pause').style.display='none'
    document.getElementById('sw-lap').style.display = 'none'
    clearInterval(j)
}
document.getElementById('sw-reset').onclick = ()=>{
    stopwatchreset()
}
document.getElementById('sw-lap').onclick = ()=>{
    addlap()
}
document.getElementById('cancel').onclick = ()=>{
    document.getElementById('new').click()
}


document.getElementById('done').onclick = ()=>{
    let name = document.getElementById('timer-name').value
    let hr = document.getElementById('timer-hr').value
    let min = document.getElementById('timer-min').value
    let sec = document.getElementById('timer-sec').value
    let st=1
    if(startnow==1)
        st=0
    if(Object.keys(timers).length==0)
        document.getElementById('nothing').style.display='none'
    if(hr.toString().length==0)
        hr=0
    if(min.toString().length==0)
        min=0
    if(sec.toString().length==0)
        sec=0
    let tot = (hr*min*60)+sec
    timers[name] ={'name':name,'hr':hr,'min':min,'sec':sec,'stop':st,'total':tot}
    createTimersObj(timers[name])
    document.getElementById('new').click()
}
document.getElementById('start-now').onclick = ()=>{
    if(startnow==0){
        document.getElementById('start-now').style.backgroundColor = 'black'
        document.getElementById('start-now').style.color='#0eff23'
        startnow=1
    }
    else{
        startnow=0
        document.getElementById('start-now').style.backgroundColor = 'white'
        document.getElementById('start-now').style.color='black'
    }
}
document.getElementById('prevyear').onclick =()=>{
    year-=1
    destroycalender()
}

document.getElementById('nextyear').onclick = ()=>{
    year+=1
    destroycalender()
}
document.getElementById('now').onclick = ()=>{
    year = new Date().getFullYear()
    destroycalender()
}
