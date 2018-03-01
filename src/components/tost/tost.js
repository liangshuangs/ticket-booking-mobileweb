import './tost.scss'
export default function tost(info){
  let tost = document.querySelector('#tost')
  if(!tost) {
    tost = document.createElement('div')
    tost.id = 'tost'
    tost.classList.add('tost')
    document.body.appendChild(tost)
  }

  const item = document.createElement('div')
  item.classList.add('tost-item')

  let msg = ''
  let time = 2
  if(typeof info === 'string') {
    msg = info
  }else{
    msg = info.msg
    time = info.time
  }


  const megNode = document.createTextNode(msg)

  item.appendChild(megNode)

  tost.appendChild(item)

  setTimeout(()=>{
    tost.removeChild(item)
    if(!tost.hasChildNodes()){
      document.body.removeChild(tost)
    }
  },time*1000)
}