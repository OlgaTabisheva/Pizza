import React from "react"
import ContentLoader from "react-content-loader"

  const SkeletonPizza = (props) => (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="126" cy="135" r="114" />
      <rect x="0" y="267" rx="7" ry="7" width="260" height="31" />
      <rect x="0" y="322" rx="5" ry="5" width="255" height="67" />
      <rect x="0" y="411" rx="6" ry="6" width="91" height="28" />
      <rect x="120" y="409" rx="29" ry="29" width="127" height="45" />
      <rect x="199" y="425" rx="0" ry="0" width="2" height="7" />
      <rect x="181" y="429" rx="0" ry="0" width="0" height="2" />
    </ContentLoader>
  )

  export default SkeletonPizza

