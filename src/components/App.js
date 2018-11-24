import React, { Component } from 'react'
import Stave from './Stave/index'

class App extends Component {
  render() {
    return (
      <div>
        <div>Clef de sol</div>
        <Stave
          clef='treble'
          notes={[
            ['c', '', '5'],
            ['e', '', '4'],
            ['g', '', '4'],
            ['d', '', '4'],
            ['b', '', '4'],
            ['a', '', '4'],
            ['f', '', '4'],
          ]}
        />
        <div>Clef de fa</div>
        <Stave
          clef='bass'
          notes={[
            ['c', '', '3'],
            ['e', '', '3'],
            ['g', '', '3'],
            ['d', '', '3'],
            ['b', '', '3'],
            ['a', '', '3'],
            ['f', '', '3'],
          ]}
        />
      </div>
    )
  }
}

export default App
