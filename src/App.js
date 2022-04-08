import { useState, useEffect } from 'react';

import './App.scss'
import config from './App.config'
import taro, { history, hooks } from './fake-tarojs/taro'

const pageToComponent = config.pages.reduce((acc, page) => {
  let component, config;
  try {
    component = require(`./${page}`)?.default
  }
  catch (e) {
    console.error(`加载页面 ${page} 失败，看看有没有这个文件吧`)
    return acc
  }
  try {
    config = require(`./${page}.config`)?.default
  }
  catch (e) {
    console.error(`加载页面 ${page} 的配置文件失败，看看有没有这个文件吧`)
    return acc
  }
  return {
    ...acc,
    ['/' + page]: {
      component,
      config 
    }
  }
}, {})

function App() {
  const [page, setPage] = useState(history.getCurrentPage())
  const [showBack, setShowBack] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [title, setTitle] = useState("")
  const [currentPage, setCurrentPage] = useState(null)

  useEffect(() => {
    const observeFn = () => {
      setPage(history.getCurrentPage())
      setShowBack(!history.isBase())
    }
    history.observe(observeFn)
    return () => history.unobserve(observeFn)
  }, [])

  useEffect(() => {
    let Page = pageToComponent[page]?.component
    setCurrentPage(Page ? <Page /> : (<div>好像不存在这个页面哦，在<code>App.config.js</code>里找找有没有"{page}"吧</div>))
    setTitle(pageToComponent[page]?.config?.navigationBarTitleText || '无标题')
  }, [page])

  useEffect(() => {
    hooks.setTitle = setTitle
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <button className='App-back' onClick={() => taro.navigateBack()} disabled={!showBack}>
          <i className="fas fa-angle-left"></i>
        </button>
        <div className='App-title'>{title}</div>
        <div className='App-pill'>
          <button className='App-pill-button' onClick={() => setShowMenu(true)}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
          <div className='App-pill-split'></div>
          <button className='App-pill-button' onClick={() => taro.reLaunch()}>
            <i className="fas fa-power-off"></i>
          </button>
        </div>
      </div>
      <div className="App-body">
        {currentPage}
      </div>
    </div>
  )
}


export default App;
