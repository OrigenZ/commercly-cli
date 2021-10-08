import * as React from 'react'
import ReactMde from 'react-mde'

import  Showdown from 'showdown'

import 'react-mde/lib/styles/css/react-mde-all.css'


const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

export default function TextEditor() {
  const [value, setValue] = React.useState('')
  const [selectedTab, setSelectedTab] = React.useState('write')

  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
    </div>
  )
}
