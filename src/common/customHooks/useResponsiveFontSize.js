import { useEffect, useState } from 'react'

const useResponsiveFontSize = () => {
  // const getFontSize = () => (window.innerWidth < 450 ? '14px' : '14px')
  const getFontSize = () => '14px'
  const [fontSize, setFontSize] = useState(getFontSize)

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize())
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return fontSize
}

export default useResponsiveFontSize
