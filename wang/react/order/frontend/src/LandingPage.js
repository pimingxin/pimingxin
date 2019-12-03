import React , { Suspense,useState } from 'react'
import { withRouter } from 'react-router-dom'
import createFetcher from './create-fetcher'
import api from './api'

var fetcher = createFetcher((did) => {
  return api.get('/deskinfo?did=' + did)
})

function DeskInfo({did}){
  var info = fetcher.read(did).data
  return(
    <div>
      <span>{info.name}</span>
      <span>{info.title}</span>
    </div>
  )
}

export default withRouter(function(props){
  var [custom , setCustom] = useState(0)
  var rid = props.match.params.rid
  var did = props.match.params.did
  function startOrder(){
    props.history.push(`/r/${rid}/d/${did}?customCount=${custom}`)
  }

  return <div>
    <Suspense fallback={<div>正在加载餐厅信息</div>}>
      <DeskInfo did={did} />
    </Suspense>
    <h2>请选择人数</h2>
    <ul>
      <li className={custom === 1 ? 'active' : null} onClick={() => {setCustom(1)}}>1</li>
      <li className={custom === 2 ? 'active' : null} onClick={() => {setCustom(2)}}>2</li>
      <li className={custom === 3 ? 'active' : null} onClick={() => {setCustom(3)}}>3</li>
      <li className={custom === 4 ? 'active' : null} onClick={() => {setCustom(4)}}>4</li>
    </ul>

    <button onClick={startOrder}>开始点餐</button>

  </div>
})