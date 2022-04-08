import AtTabBarItem from "./AtTabBarItem";

export default function AtTabBar(props) {
  return (
    <div className="at-tab-bar">
      {props.tabList.map((tab, index) => (
        <AtTabBarItem
          image={index === props.current ? tab.selectedImage : tab.image}
          title={tab.title}
          onClick={() => {
            props.onClick?.(index)
          }}
          current={index === props.current}
          key={index}
        />
      ))}
    </div>
  )
}
